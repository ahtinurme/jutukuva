<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div class="prose prose-sm max-w-none">
	<h2 class="text-xl font-bold mb-4">{$_('help.tips.title')}</h2>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.tips.microphone.title')}</h3>
		<ul class="list-disc list-inside space-y-2 text-base-content/80">
			<li>{$_('help.tips.microphone.tip1')}</li>
			<li>{$_('help.tips.microphone.tip2')}</li>
			<li>{$_('help.tips.microphone.tip3')}</li>
		</ul>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.tips.environment.title')}</h3>
		<ul class="list-disc list-inside space-y-2 text-base-content/80">
			<li>{$_('help.tips.environment.tip1')}</li>
			<li>{$_('help.tips.environment.tip2')}</li>
			<li>{$_('help.tips.environment.tip3')}</li>
		</ul>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.tips.speaking.title')}</h3>
		<ul class="list-disc list-inside space-y-2 text-base-content/80">
			<li>{$_('help.tips.speaking.tip1')}</li>
			<li>{$_('help.tips.speaking.tip2')}</li>
			<li>{$_('help.tips.speaking.tip3')}</li>
		</ul>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.tips.estonian.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.tips.estonian.description')}</p>
		<ul class="list-disc list-inside space-y-2 text-base-content/80">
			<li>{$_('help.tips.estonian.tip1')}</li>
			<li>{$_('help.tips.estonian.tip2')}</li>
		</ul>
	</section>
</div>
