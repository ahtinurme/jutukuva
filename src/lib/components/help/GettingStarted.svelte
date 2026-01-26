<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div class="prose prose-sm max-w-none">
	<h2 class="text-xl font-bold mb-4">{$_('help.gettingStarted.title')}</h2>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.gettingStarted.installation.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.gettingStarted.installation.description')}</p>
		<ol class="list-decimal list-inside space-y-2 text-base-content/80">
			<li>{$_('help.gettingStarted.installation.step1')}</li>
			<li>{$_('help.gettingStarted.installation.step2')}</li>
			<li>{$_('help.gettingStarted.installation.step3')}</li>
		</ol>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.gettingStarted.audioSource.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.gettingStarted.audioSource.description')}</p>
		<ul class="list-disc list-inside space-y-2 text-base-content/80">
			<li><strong>{$_('help.gettingStarted.audioSource.microphone')}</strong> - {$_('help.gettingStarted.audioSource.microphoneDesc')}</li>
			<li><strong>{$_('help.gettingStarted.audioSource.system')}</strong> - {$_('help.gettingStarted.audioSource.systemDesc')}</li>
		</ul>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.gettingStarted.recording.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.gettingStarted.recording.description')}</p>
		<ol class="list-decimal list-inside space-y-2 text-base-content/80">
			<li>{$_('help.gettingStarted.recording.step1')}</li>
			<li>{$_('help.gettingStarted.recording.step2')}</li>
			<li>{$_('help.gettingStarted.recording.step3')}</li>
		</ol>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.gettingStarted.modelDownload.title')}</h3>
		<p class="text-base-content/80">{$_('help.gettingStarted.modelDownload.description')}</p>
	</section>
</div>
