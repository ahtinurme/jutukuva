/**
 * Streaming audio file decoder → 16 kHz mono Float32 PCM chunks.
 *
 * For m4a / mp4 / aac files we stream-demux with MP4Box.js and decode with
 * WebCodecs `AudioDecoder`, so peak memory stays in the low MB range regardless
 * of file length (critical for 1h+ recordings).
 *
 * For other formats (mp3 / wav / ogg / flac / …) we fall back to the original
 * full-file `AudioContext.decodeAudioData` path. Peak memory there scales with
 * the decoded buffer; acceptable for files up to a few hundred MB of decoded
 * audio.
 */

import { decodeAudioFileTo16kMono } from './audioFileDecoder';

const TARGET_SAMPLE_RATE = 16000;

export interface StreamOptions {
	/** Aborts decoding mid-stream. */
	signal?: AbortSignal;
	/**
	 * Called with the fraction of the input file consumed so far (0..1). For
	 * the streaming path this maps to compressed bytes demuxed; for the
	 * fallback path it's 1.0 once decoding completes.
	 */
	onProgress?: (fraction: number) => void;
}

export type ChunkHandler = (samples: Float32Array) => Promise<void> | void;

/**
 * Stream an audio file into 16 kHz mono Float32 PCM chunks. `onChunk` is
 * invoked sequentially with slices of decoded audio (no guaranteed size) and
 * the promise returned here resolves once the whole file has been processed.
 */
export async function streamAudioFileTo16kMono(
	file: File,
	onChunk: ChunkHandler,
	options: StreamOptions = {}
): Promise<void> {
	if (canStreamViaWebCodecs(file)) {
		let emitted = false;
		const guardedOnChunk: ChunkHandler = (samples) => {
			emitted = true;
			return onChunk(samples);
		};
		try {
			await streamMp4(file, guardedOnChunk, options);
			return;
		} catch (err) {
			if (emitted) {
				// We've already fed audio to the caller — rewinding via full
				// decode would duplicate. Propagate the failure instead.
				throw err;
			}
			console.warn('[audioFileStreamer] MP4 streaming failed, falling back to full decode:', err);
		}
	}

	await fallbackFullDecode(file, onChunk, options);
}

function canStreamViaWebCodecs(file: File): boolean {
	if (typeof AudioDecoder === 'undefined') {
		return false;
	}
	const name = file.name.toLowerCase();
	const type = (file.type || '').toLowerCase();
	return (
		name.endsWith('.m4a') ||
		name.endsWith('.mp4') ||
		name.endsWith('.aac') ||
		type === 'audio/mp4' ||
		type === 'audio/aac' ||
		type === 'audio/x-m4a'
	);
}

async function fallbackFullDecode(
	file: File,
	onChunk: ChunkHandler,
	options: StreamOptions
): Promise<void> {
	const pcm = await decodeAudioFileTo16kMono(file);
	// Emit in ~1-second chunks so the caller can interleave its own work
	// (frame buffering + IPC) with GC pressure relief between chunks.
	const CHUNK = TARGET_SAMPLE_RATE;
	for (let offset = 0; offset < pcm.length; offset += CHUNK) {
		if (options.signal?.aborted) {
			return;
		}
		const end = Math.min(offset + CHUNK, pcm.length);
		// Copy into a fresh array so the caller can transfer/retain it without
		// pinning the entire pcm buffer.
		const chunk = new Float32Array(end - offset);
		chunk.set(pcm.subarray(offset, end));
		await onChunk(chunk);
		options.onProgress?.(Math.min(1, end / pcm.length));
	}
	options.onProgress?.(1);
}

// ────────────────────────────────────────────────────────────────────────────
// MP4 / m4a streaming path
// ────────────────────────────────────────────────────────────────────────────

interface Mp4BoxSample {
	cts: number;
	dts: number;
	duration: number;
	data: ArrayBuffer;
	is_sync: boolean;
}

async function streamMp4(
	file: File,
	onChunk: ChunkHandler,
	options: StreamOptions
): Promise<void> {
	const { createFile } = await import('mp4box');

	const mp4boxfile: any = createFile();
	let trackId: number | null = null;
	interface CodecConfig {
		codec: string;
		sampleRate: number;
		numberOfChannels: number;
	}
	let codecConfig: CodecConfig | null = null;
	let decoderConfig: Uint8Array | null = null;

	let decoder: AudioDecoder | null = null;
	let decodeError: Error | null = null;
	const pendingDecodes: Promise<void>[] = [];

	// Running linear-interp resampler state. Positions are in absolute
	// input-sample coordinates (at the decoder's native sample rate) so that
	// chunk boundaries don't cause phase resets.
	let resampleCarry = new Float32Array(0);
	let inputSamplesConsumed = 0; // absolute count of samples dropped from the stream
	let nextOutputInputPos = 0; // absolute input-sample position of the next output sample

	// Push decoded AudioData → resample → onChunk. Batches into ~1s chunks so
	// we're not paying IPC overhead per AAC frame (AAC frames are 1024 samples
	// ≈ 23 ms at 44.1 kHz).
	const outBuffer: Float32Array[] = [];
	let outBufferSamples = 0;
	const OUT_FLUSH_THRESHOLD = TARGET_SAMPLE_RATE; // 1 second

	async function flushOut(force = false) {
		if (outBufferSamples === 0) return;
		if (!force && outBufferSamples < OUT_FLUSH_THRESHOLD) return;
		const merged = new Float32Array(outBufferSamples);
		let o = 0;
		for (const buf of outBuffer) {
			merged.set(buf, o);
			o += buf.length;
		}
		outBuffer.length = 0;
		outBufferSamples = 0;
		await onChunk(merged);
	}

	// Construct a streaming pipeline from AudioData → 16 kHz mono Float32.
	function handleAudioData(ad: AudioData) {
		try {
			if (options.signal?.aborted) {
				ad.close();
				return;
			}

			const inRate = ad.sampleRate;
			const channels = ad.numberOfChannels;
			const frames = ad.numberOfFrames;

			// Pull planar f32 samples out of AudioData. Some implementations only
			// support interleaved; try planar first, fall back to interleaved.
			const planar = new Float32Array(frames * channels);
			try {
				ad.copyTo(planar, { planeIndex: 0, format: 'f32-planar' });
				if (channels > 1) {
					// Copy subsequent channels into the rest of the planar buffer.
					for (let ch = 1; ch < channels; ch++) {
						const view = new Float32Array(planar.buffer, frames * ch * 4, frames);
						ad.copyTo(view, { planeIndex: ch, format: 'f32-planar' });
					}
				}
			} catch {
				// Fall back to interleaved f32.
				const interleaved = new Float32Array(frames * channels);
				ad.copyTo(interleaved, { planeIndex: 0, format: 'f32' });
				// De-interleave into planar shape.
				for (let ch = 0; ch < channels; ch++) {
					for (let i = 0; i < frames; i++) {
						planar[ch * frames + i] = interleaved[i * channels + ch];
					}
				}
			}
			ad.close();

			// Downmix to mono.
			const mono = new Float32Array(frames);
			if (channels === 1) {
				mono.set(planar);
			} else {
				const invC = 1 / channels;
				for (let i = 0; i < frames; i++) {
					let sum = 0;
					for (let ch = 0; ch < channels; ch++) {
						sum += planar[ch * frames + i];
					}
					mono[i] = sum * invC;
				}
			}

			// Resample to 16 kHz via linear interpolation with a phase-stable
			// carry across chunks. `nextOutputInputPos` is in absolute input-
			// sample coordinates, so boundaries don't reset the phase.
			const combined = new Float32Array(resampleCarry.length + mono.length);
			combined.set(resampleCarry);
			combined.set(mono, resampleCarry.length);
			const combinedInputEnd = inputSamplesConsumed + combined.length;

			let resampled: Float32Array;
			if (inRate === TARGET_SAMPLE_RATE) {
				resampled = new Float32Array(combined.length);
				resampled.set(combined);
				resampleCarry = new Float32Array(0);
				inputSamplesConsumed += combined.length;
				nextOutputInputPos = inputSamplesConsumed;
			} else {
				const step = inRate / TARGET_SAMPLE_RATE;
				const out: number[] = [];
				// We can produce samples while idx+1 is still inside `combined`.
				while (nextOutputInputPos + 1 < combinedInputEnd) {
					const rel = nextOutputInputPos - inputSamplesConsumed;
					const idx = Math.floor(rel);
					const frac = rel - idx;
					out.push(combined[idx] * (1 - frac) + combined[idx + 1] * frac);
					nextOutputInputPos += step;
				}
				resampled = new Float32Array(out);

				// Keep only the samples we still need for the next call: we need
				// combined[idx] and combined[idx+1] where idx = floor(nextOutputInputPos - inputSamplesConsumed).
				const keepFromRel = Math.max(
					0,
					Math.min(combined.length, Math.floor(nextOutputInputPos) - inputSamplesConsumed)
				);
				resampleCarry = combined.slice(keepFromRel);
				inputSamplesConsumed += keepFromRel;
			}

			if (resampled.length > 0) {
				outBuffer.push(resampled);
				outBufferSamples += resampled.length;
			}
		} catch (err) {
			decodeError = err as Error;
		}
	}

	mp4boxfile.onError = (err: string) => {
		decodeError = new Error(`MP4Box error: ${err}`);
	};

	mp4boxfile.onReady = (info: any) => {
		const audio = info.tracks.find((t: any) => t.type === 'audio');
		if (!audio) {
			decodeError = new Error('No audio track in file');
			return;
		}
		trackId = audio.id;
		codecConfig = {
			codec: audio.codec,
			sampleRate: audio.audio.sample_rate,
			numberOfChannels: audio.audio.channel_count
		};

		// Extract decoder config (AudioSpecificConfig for AAC) from esds box.
		const esdsBox = findEsdsBox(mp4boxfile, trackId!);
		if (esdsBox) {
			decoderConfig = esdsBox;
		}

		mp4boxfile.setExtractionOptions(trackId!, null, { nbSamples: 100 });
		mp4boxfile.start();
	};

	mp4boxfile.onSamples = (id: number, _user: unknown, samples: Mp4BoxSample[]) => {
		if (id !== trackId || !decoder) return;
		for (const s of samples) {
			if (decodeError) break;
			try {
				const chunk = new EncodedAudioChunk({
					type: s.is_sync ? 'key' : 'delta',
					timestamp: Math.round((s.cts * 1_000_000) / codecConfig!.sampleRate),
					data: s.data
				});
				decoder.decode(chunk);
			} catch (err) {
				decodeError = err as Error;
			}
		}
	};

	// Kick things off. Read the file in 4 MB slices and append to MP4Box.
	const SLICE = 4 * 1024 * 1024;
	let position = 0;

	// Wait for onReady before we construct the decoder, so we have the
	// codec config.
	await appendUntilReady();

	if (!codecConfig || !decoderConfig) {
		throw new Error('Could not extract audio codec config from MP4');
	}

	const cfg: CodecConfig = codecConfig;
	const descBytes: Uint8Array = decoderConfig;

	decoder = new AudioDecoder({
		output: (ad) => {
			const p = Promise.resolve().then(() => handleAudioData(ad));
			pendingDecodes.push(p);
		},
		error: (e) => {
			decodeError = e;
		}
	});

	decoder.configure({
		codec: cfg.codec,
		sampleRate: cfg.sampleRate,
		numberOfChannels: cfg.numberOfChannels,
		description: descBytes
	});

	// Continue appending the rest of the file.
	while (position < file.size) {
		if (options.signal?.aborted) break;
		const end = Math.min(position + SLICE, file.size);
		const buf = await file.slice(position, end).arrayBuffer();
		(buf as any).fileStart = position;
		mp4boxfile.appendBuffer(buf);
		position = end;

		// Periodically flush output to the caller so downstream IPC can start
		// processing before the whole file has been demuxed.
		await Promise.all(pendingDecodes.splice(0));
		await flushOut();
		options.onProgress?.(Math.min(0.99, position / file.size));

		if (decodeError) throw decodeError;
	}

	mp4boxfile.flush();
	await decoder.flush();
	await Promise.all(pendingDecodes.splice(0));

	// Drain the resample carry. The final few samples won't be resampled
	// (linear interp needs a following sample), which is fine — <1 ms lost.
	await flushOut(true);

	decoder.close();
	options.onProgress?.(1);

	if (decodeError) throw decodeError;

	async function appendUntilReady() {
		while (position < file.size && trackId === null && !decodeError) {
			const end = Math.min(position + SLICE, file.size);
			const buf = await file.slice(position, end).arrayBuffer();
			(buf as any).fileStart = position;
			mp4boxfile.appendBuffer(buf);
			position = end;
			// Let MP4Box parse what we fed it.
			await new Promise((r) => setTimeout(r, 0));
		}
		if (decodeError) throw decodeError;
		if (trackId === null) {
			throw new Error('MP4Box did not report an audio track after reading the whole file');
		}
	}
}

/**
 * Walks MP4Box's box tree to find the AudioSpecificConfig bytes embedded in
 * the track's `esds` box. Returns just the ASC (the `decSpecificInfo.data`),
 * which is what WebCodecs `AudioDecoder.configure({ description })` expects
 * for AAC.
 */
function findEsdsBox(mp4boxfile: any, trackId: number): Uint8Array | null {
	const trak = mp4boxfile.getTrackById?.(trackId) ?? findTrak(mp4boxfile, trackId);
	const mp4a = trak?.mdia?.minf?.stbl?.stsd?.entries?.find?.((e: any) => e.esds);
	const asc = mp4a?.esds?.esd?.descs?.[0]?.descs?.[0]?.data;
	if (asc instanceof Uint8Array) {
		return asc;
	}
	if (Array.isArray(asc)) {
		return new Uint8Array(asc);
	}
	return null;
}

function findTrak(mp4boxfile: any, trackId: number): any {
	const moov = mp4boxfile?.moov;
	if (!moov?.traks) return null;
	for (const trak of moov.traks) {
		if (trak?.tkhd?.track_id === trackId) return trak;
	}
	return null;
}
