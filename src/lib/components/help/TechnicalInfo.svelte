<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div class="prose prose-sm max-w-none">
	<h2 class="text-xl font-bold mb-4">{$_('help.technicalInfo.title')}</h2>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.technicalInfo.database.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.technicalInfo.database.description')}</p>
		<div class="overflow-x-auto">
			<table class="table table-zebra table-sm w-full">
				<thead>
					<tr>
						<th>{$_('help.technicalInfo.database.os')}</th>
						<th>{$_('help.technicalInfo.database.path')}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Windows</td>
						<td><code class="text-xs">%APPDATA%\jutukuva\</code></td>
					</tr>
					<tr>
						<td>macOS</td>
						<td><code class="text-xs">~/Library/Application Support/jutukuva/</code></td>
					</tr>
					<tr>
						<td>Linux</td>
						<td><code class="text-xs">~/.config/jutukuva/</code></td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.technicalInfo.logs.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.technicalInfo.logs.description')}</p>
		<div class="overflow-x-auto">
			<table class="table table-zebra table-sm w-full">
				<thead>
					<tr>
						<th>{$_('help.technicalInfo.database.os')}</th>
						<th>{$_('help.technicalInfo.database.path')}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Windows</td>
						<td><code class="text-xs">%APPDATA%\jutukuva\logs\</code></td>
					</tr>
					<tr>
						<td>macOS</td>
						<td><code class="text-xs">~/Library/Logs/jutukuva/</code></td>
					</tr>
					<tr>
						<td>Linux</td>
						<td><code class="text-xs">~/.local/share/jutukuva/logs/</code></td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.technicalInfo.network.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.technicalInfo.network.description')}</p>
		<ul class="list-disc list-inside space-y-2 text-base-content/80">
			<li>{$_('help.technicalInfo.network.requirement1')}</li>
			<li>{$_('help.technicalInfo.network.requirement2')}</li>
		</ul>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.technicalInfo.macosAudio.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.technicalInfo.macosAudio.description')}</p>
		<ol class="list-decimal list-inside space-y-2 text-base-content/80">
			<li>{$_('help.technicalInfo.macosAudio.step1')}</li>
			<li>{$_('help.technicalInfo.macosAudio.step2')}</li>
			<li>{$_('help.technicalInfo.macosAudio.step3')}</li>
		</ol>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.technicalInfo.troubleshooting.title')}</h3>
		<div class="space-y-4">
			<div class="bg-base-200 rounded-lg p-4">
				<p class="font-semibold text-sm mb-2">{$_('help.technicalInfo.troubleshooting.issue1.title')}</p>
				<p class="text-base-content/70 text-sm">{$_('help.technicalInfo.troubleshooting.issue1.solution')}</p>
			</div>
			<div class="bg-base-200 rounded-lg p-4">
				<p class="font-semibold text-sm mb-2">{$_('help.technicalInfo.troubleshooting.issue2.title')}</p>
				<p class="text-base-content/70 text-sm">{$_('help.technicalInfo.troubleshooting.issue2.solution')}</p>
			</div>
			<div class="bg-base-200 rounded-lg p-4">
				<p class="font-semibold text-sm mb-2">{$_('help.technicalInfo.troubleshooting.issue3.title')}</p>
				<p class="text-base-content/70 text-sm">{$_('help.technicalInfo.troubleshooting.issue3.solution')}</p>
			</div>
		</div>
	</section>
</div>
