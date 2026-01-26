<script lang="ts">
	import { _ } from 'svelte-i18n';
	import GettingStarted from '$lib/components/help/GettingStarted.svelte';
	import TextEditing from '$lib/components/help/TextEditing.svelte';
	import Dictionaries from '$lib/components/help/Dictionaries.svelte';
	import SessionSharing from '$lib/components/help/SessionSharing.svelte';
	import OverlaySubtitles from '$lib/components/help/OverlaySubtitles.svelte';
	import Tips from '$lib/components/help/Tips.svelte';
	import TechnicalInfo from '$lib/components/help/TechnicalInfo.svelte';

	type Section = 'gettingStarted' | 'textEditing' | 'dictionaries' | 'sessionSharing' | 'overlaySubtitles' | 'tips' | 'technicalInfo';

	interface Props {
		open: boolean;
		onClose?: () => void;
	}

	let { open = $bindable(false), onClose }: Props = $props();

	let activeSection = $state<Section>('gettingStarted');

	const sections: { id: Section; labelKey: string; icon: string }[] = [
		{ id: 'gettingStarted', labelKey: 'help.nav.gettingStarted', icon: '🚀' },
		{ id: 'textEditing', labelKey: 'help.nav.textEditing', icon: '✏️' },
		{ id: 'dictionaries', labelKey: 'help.nav.dictionaries', icon: '📖' },
		{ id: 'sessionSharing', labelKey: 'help.nav.sessionSharing', icon: '🔗' },
		{ id: 'overlaySubtitles', labelKey: 'help.nav.overlaySubtitles', icon: '🎬' },
		{ id: 'tips', labelKey: 'help.nav.tips', icon: '💡' },
		{ id: 'technicalInfo', labelKey: 'help.nav.technicalInfo', icon: '⚙️' }
	];

	function closeModal() {
		open = false;
		onClose?.();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			closeModal();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<dialog class="modal modal-open">
		<div class="modal-box max-w-5xl w-full max-h-[90vh] p-0 flex flex-col overflow-hidden">
			<!-- Header -->
			<div class="flex justify-between items-center px-6 py-4 border-b border-base-200 shrink-0">
				<div>
					<h1 class="text-2xl font-bold">{$_('help.title', { default: 'Kasutusjuhend' })}</h1>
					<p class="text-base-content/70 text-sm mt-1">{$_('help.description', { default: 'Jutukuva rakenduse juhendid ja tehniline info' })}</p>
				</div>
				<button
					class="btn btn-sm btn-circle btn-ghost"
					onclick={closeModal}
				>
					✕
				</button>
			</div>

			<!-- Content with sidebar -->
			<div class="flex flex-1 min-h-0">
				<!-- Sidebar Navigation -->
				<nav class="w-56 border-r border-base-200 p-3 overflow-y-auto shrink-0 bg-base-200/30">
					<ul class="menu menu-sm p-0 gap-1">
						{#each sections as section (section.id)}
							<li>
								<button
									class="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
										{activeSection === section.id
											? 'bg-primary text-primary-content font-medium'
											: 'hover:bg-base-200'}"
									onclick={() => activeSection = section.id}
								>
									<span class="text-base">{section.icon}</span>
									<span class="text-sm">{$_(section.labelKey)}</span>
								</button>
							</li>
						{/each}
					</ul>
				</nav>

				<!-- Main Content -->
				<div class="flex-1 overflow-y-auto p-6">
					{#if activeSection === 'gettingStarted'}
						<GettingStarted />
					{:else if activeSection === 'textEditing'}
						<TextEditing />
					{:else if activeSection === 'dictionaries'}
						<Dictionaries />
					{:else if activeSection === 'sessionSharing'}
						<SessionSharing />
					{:else if activeSection === 'overlaySubtitles'}
						<OverlaySubtitles />
					{:else if activeSection === 'tips'}
						<Tips />
					{:else if activeSection === 'technicalInfo'}
						<TechnicalInfo />
					{/if}
				</div>
			</div>
		</div>
		<div class="modal-backdrop bg-black/50" role="presentation" onclick={closeModal} onkeydown={(e) => e.key === 'Escape' && closeModal()}>
			<button type="button" class="sr-only">close</button>
		</div>
	</dialog>
{/if}
