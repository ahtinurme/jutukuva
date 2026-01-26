<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div class="prose prose-sm max-w-none">
	<h2 class="text-xl font-bold mb-4">{$_('help.overlaySubtitles.title')}</h2>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.overlaySubtitles.overview.title')}</h3>
		<p class="text-base-content/80">{$_('help.overlaySubtitles.overview.description')}</p>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.overlaySubtitles.installation.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.overlaySubtitles.installation.description')}</p>
		<ul class="list-disc list-inside space-y-2 text-base-content/80">
			<li>{$_('help.overlaySubtitles.installation.windows')}</li>
			<li>{$_('help.overlaySubtitles.installation.macos')}</li>
			<li>{$_('help.overlaySubtitles.installation.linux')}</li>
		</ul>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.overlaySubtitles.joining.title')}</h3>
		<ol class="list-decimal list-inside space-y-2 text-base-content/80">
			<li>{$_('help.overlaySubtitles.joining.step1')}</li>
			<li>{$_('help.overlaySubtitles.joining.step2')}</li>
			<li>{$_('help.overlaySubtitles.joining.step3')}</li>
		</ol>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.overlaySubtitles.controls.title')}</h3>
		<ul class="list-disc list-inside space-y-2 text-base-content/80">
			<li>{$_('help.overlaySubtitles.controls.move')}</li>
			<li>{$_('help.overlaySubtitles.controls.resize')}</li>
			<li>{$_('help.overlaySubtitles.controls.toggle')}</li>
		</ul>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.overlaySubtitles.customization.title')}</h3>
		<ul class="list-disc list-inside space-y-2 text-base-content/80">
			<li>{$_('help.overlaySubtitles.customization.fontSize')}</li>
			<li>{$_('help.overlaySubtitles.customization.fontWeight')}</li>
			<li>{$_('help.overlaySubtitles.customization.colors')}</li>
			<li>{$_('help.overlaySubtitles.customization.presets')}</li>
		</ul>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.overlaySubtitles.shortcut.title')}</h3>
		<div class="bg-base-200 rounded-lg p-4">
			<p class="text-center">
				<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">O</kbd>
			</p>
			<p class="text-xs text-center text-base-content/60 mt-2">{$_('help.overlaySubtitles.shortcut.description')}</p>
		</div>
	</section>
</div>
