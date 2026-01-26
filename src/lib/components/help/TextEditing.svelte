<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div class="prose prose-sm max-w-none">
	<h2 class="text-xl font-bold mb-4">{$_('help.textEditing.title')}</h2>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.textEditing.realtime.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.textEditing.realtime.description')}</p>
		<ul class="list-disc list-inside space-y-2 text-base-content/80">
			<li>{$_('help.textEditing.realtime.feature1')}</li>
			<li>{$_('help.textEditing.realtime.feature2')}</li>
			<li>{$_('help.textEditing.realtime.feature3')}</li>
		</ul>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.textEditing.shortcuts.title')}</h3>
		<div class="overflow-x-auto">
			<table class="table table-zebra table-sm w-full">
				<thead>
					<tr>
						<th>{$_('help.textEditing.shortcuts.action')}</th>
						<th>{$_('help.textEditing.shortcuts.shortcut')}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{$_('help.textEditing.shortcuts.confirmWords')}</td>
						<td><kbd class="kbd kbd-sm">Enter</kbd></td>
					</tr>
					<tr>
						<td>{$_('help.textEditing.shortcuts.undo')}</td>
						<td><kbd class="kbd kbd-sm">Ctrl</kbd> + <kbd class="kbd kbd-sm">Z</kbd></td>
					</tr>
					<tr>
						<td>{$_('help.textEditing.shortcuts.redo')}</td>
						<td><kbd class="kbd kbd-sm">Ctrl</kbd> + <kbd class="kbd kbd-sm">Shift</kbd> + <kbd class="kbd kbd-sm">Z</kbd></td>
					</tr>
					<tr>
						<td>{$_('help.textEditing.shortcuts.newParagraph')}</td>
						<td><kbd class="kbd kbd-sm">Shift</kbd> + <kbd class="kbd kbd-sm">Enter</kbd></td>
					</tr>
					<tr>
						<td>{$_('help.textEditing.shortcuts.newParagraphSpeaker')}</td>
						<td><kbd class="kbd kbd-sm">Tab</kbd></td>
					</tr>
					<tr>
						<td>{$_('help.textEditing.shortcuts.nextWord')}</td>
						<td><kbd class="kbd kbd-sm">Ctrl</kbd> + <kbd class="kbd kbd-sm">&#8594;</kbd></td>
					</tr>
					<tr>
						<td>{$_('help.textEditing.shortcuts.prevWord')}</td>
						<td><kbd class="kbd kbd-sm">Ctrl</kbd> + <kbd class="kbd kbd-sm">&#8592;</kbd></td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.textEditing.speakers.title')}</h3>
		<p class="text-base-content/80 mb-3">{$_('help.textEditing.speakers.description')}</p>
		<ul class="list-disc list-inside space-y-2 text-base-content/80">
			<li>{$_('help.textEditing.speakers.feature1')}</li>
			<li>{$_('help.textEditing.speakers.feature2')}</li>
			<li>{$_('help.textEditing.speakers.feature3')}</li>
		</ul>
	</section>

	<section class="mb-6">
		<h3 class="text-lg font-semibold mb-2">{$_('help.textEditing.autoScroll.title')}</h3>
		<p class="text-base-content/80">{$_('help.textEditing.autoScroll.description')}</p>
	</section>
</div>
