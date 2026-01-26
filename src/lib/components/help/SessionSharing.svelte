<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div class="prose prose-sm max-w-none">
	<h2 class="text-xl font-bold mb-4">{$_('help.sessionSharing.title')}</h2>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.sessionSharing.overview.title')}</h3>
		<p class="text-base-content/80">{$_('help.sessionSharing.overview.description')}</p>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.sessionSharing.creating.title')}</h3>
		<ol class="list-decimal list-inside space-y-2 text-base-content/80">
			<li>{$_('help.sessionSharing.creating.step1')}</li>
			<li>{$_('help.sessionSharing.creating.step2')}</li>
			<li>{$_('help.sessionSharing.creating.step3')}</li>
		</ol>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.sessionSharing.code.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.sessionSharing.code.description')}</p>
		<div class="bg-base-200 rounded-lg p-4">
			<p class="font-mono text-2xl text-center tracking-widest text-primary">ABC123</p>
			<p class="text-xs text-center text-base-content/60 mt-2">{$_('help.sessionSharing.code.example')}</p>
		</div>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.sessionSharing.qr.title')}</h3>
		<p class="text-base-content/80">{$_('help.sessionSharing.qr.description')}</p>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.sessionSharing.webLink.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.sessionSharing.webLink.description')}</p>
		<div class="bg-base-200 rounded-lg p-3">
			<p class="font-mono text-sm text-center">tekstiks.ee/kt/KOOD</p>
		</div>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.sessionSharing.password.title')}</h3>
		<p class="text-base-content/80">{$_('help.sessionSharing.password.description')}</p>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.sessionSharing.participants.title')}</h3>
		<p class="text-base-content/80">{$_('help.sessionSharing.participants.description')}</p>
	</section>
</div>
