<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div class="prose prose-sm max-w-none">
	<h2 class="text-xl font-bold mb-4">{$_('help.dictionaries.title')}</h2>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.dictionaries.overview.title')}</h3>
		<p class="text-base-content/80">{$_('help.dictionaries.overview.description')}</p>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.dictionaries.creating.title')}</h3>
		<ol class="list-decimal list-inside space-y-2 text-base-content/80">
			<li>{$_('help.dictionaries.creating.step1')}</li>
			<li>{$_('help.dictionaries.creating.step2')}</li>
			<li>{$_('help.dictionaries.creating.step3')}</li>
		</ol>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.dictionaries.entries.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.dictionaries.entries.description')}</p>
		<div class="bg-base-200 rounded-lg p-4 mb-3">
			<p class="text-sm font-mono">
				<span class="text-primary">{$_('help.dictionaries.entries.trigger')}</span> → <span class="text-secondary">{$_('help.dictionaries.entries.replacement')}</span>
			</p>
			<p class="text-xs text-base-content/60 mt-2">{$_('help.dictionaries.entries.example')}</p>
		</div>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.dictionaries.usage.title')}</h3>
		<ul class="list-disc list-inside space-y-2 text-base-content/80">
			<li><kbd class="kbd kbd-sm">{$_('help.dictionaries.usage.spaceKey')}</kbd> - {$_('help.dictionaries.usage.applyDesc')}</li>
			<li><kbd class="kbd kbd-sm">Escape</kbd> - {$_('help.dictionaries.usage.cancelDesc')}</li>
		</ul>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.dictionaries.importExport.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.dictionaries.importExport.description')}</p>
		<ul class="list-disc list-inside space-y-2 text-base-content/80">
			<li>{$_('help.dictionaries.importExport.export')}</li>
			<li>{$_('help.dictionaries.importExport.import')}</li>
		</ul>
	</section>
</div>
