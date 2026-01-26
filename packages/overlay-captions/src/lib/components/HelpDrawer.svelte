<script lang="ts">
	import { _ } from 'svelte-i18n';

	interface Props {
		open: boolean;
		onClose: () => void;
	}

	let { open, onClose }: Props = $props();

	function handleBackdropKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}
</script>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="drawer-backdrop"
		onclick={onClose}
		onkeydown={handleBackdropKeydown}
		tabindex="-1"
		aria-hidden="true"
	></div>

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="help-drawer open"
		role="dialog"
		aria-modal="true"
		aria-label={$_('help.title')}
		tabindex="-1"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
	>
		<div class="drawer-header">
			<div class="header-content">
				<span class="drawer-title">{$_('help.title')}</span>
				<span class="drawer-subtitle">{$_('help.subtitle')}</span>
			</div>
			<button type="button" class="close-button" onclick={onClose} aria-label={$_('settings.close')}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
					<path
						d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
					/>
				</svg>
			</button>
		</div>

		<div class="drawer-body">
			<!-- Joining a Session -->
			<section class="drawer-section">
				<div class="section-header">
					<div class="section-icon">🔗</div>
					<div>
						<h2 class="section-title">{$_('help.joining.title')}</h2>
					</div>
				</div>
				<div class="content-text">
					<ol class="numbered-list">
						<li>{$_('help.joining.step1')}</li>
						<li>{$_('help.joining.step2')}</li>
						<li>{$_('help.joining.step3')}</li>
					</ol>
				</div>
			</section>

			<div class="section-divider"></div>

			<!-- Overlay Controls -->
			<section class="drawer-section">
				<div class="section-header">
					<div class="section-icon">🎬</div>
					<div>
						<h2 class="section-title">{$_('help.controls.title')}</h2>
					</div>
				</div>
				<div class="content-text">
					<ul class="bullet-list">
						<li>{$_('help.controls.move')}</li>
						<li>{$_('help.controls.resize')}</li>
						<li>{$_('help.controls.toggle')}</li>
						<li>{$_('help.controls.clickThrough')}</li>
					</ul>
				</div>
			</section>

			<div class="section-divider"></div>

			<!-- Keyboard Shortcuts -->
			<section class="drawer-section">
				<div class="section-header">
					<div class="section-icon">⌨️</div>
					<div>
						<h2 class="section-title">{$_('help.shortcuts.title')}</h2>
					</div>
				</div>
				<div class="shortcuts-grid">
					<div class="shortcut-item">
						<kbd class="shortcut-key">Ctrl</kbd>
						<span class="plus">+</span>
						<kbd class="shortcut-key">Shift</kbd>
						<span class="plus">+</span>
						<kbd class="shortcut-key">O</kbd>
					</div>
					<div class="shortcut-desc">{$_('help.shortcuts.toggleOverlay')}</div>
				</div>
			</section>

			<div class="section-divider"></div>

			<!-- Customization -->
			<section class="drawer-section">
				<div class="section-header">
					<div class="section-icon">🎨</div>
					<div>
						<h2 class="section-title">{$_('help.customization.title')}</h2>
					</div>
				</div>
				<div class="content-text">
					<ul class="bullet-list">
						<li>{$_('help.customization.fontSize')}</li>
						<li>{$_('help.customization.colors')}</li>
						<li>{$_('help.customization.presets')}</li>
						<li>{$_('help.customization.alignment')}</li>
					</ul>
				</div>
			</section>

			<div class="section-divider"></div>

			<!-- Tips -->
			<section class="drawer-section">
				<div class="section-header">
					<div class="section-icon">💡</div>
					<div>
						<h2 class="section-title">{$_('help.tips.title')}</h2>
					</div>
				</div>
				<div class="content-text">
					<ul class="bullet-list">
						<li>{$_('help.tips.tip1')}</li>
						<li>{$_('help.tips.tip2')}</li>
						<li>{$_('help.tips.tip3')}</li>
					</ul>
				</div>
			</section>
		</div>
	</div>
{/if}

<style>
	/* Drawer Container */
	.help-drawer {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		max-width: 380px;
		background: #111111;
		color: #ffffff;
		box-shadow: -4px 0 24px rgba(0, 0, 0, 0.4);
		transform: translateX(100%);
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		z-index: 50;
		display: flex;
		flex-direction: column;
		border-left: 1px solid rgba(255, 255, 255, 0.1);
	}

	.help-drawer.open {
		transform: translateX(0);
	}

	.drawer-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(2px);
		z-index: 40;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Header */
	.drawer-header {
		padding: 24px;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		background: #111111;
	}

	.header-content {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.drawer-title {
		font-size: 24px;
		font-weight: 700;
		line-height: 1.2;
		color: #ffffff;
	}

	.drawer-subtitle {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.6);
	}

	.close-button {
		background: none;
		border: none;
		color: rgba(255, 255, 255, 0.6);
		cursor: pointer;
		padding: 8px;
		margin: -8px;
		border-radius: 50%;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-button:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #ffffff;
	}

	.close-button svg {
		width: 24px;
		height: 24px;
	}

	/* Body */
	.drawer-body {
		flex: 1;
		overflow-y: auto;
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	/* Scrollbar styling */
	.drawer-body::-webkit-scrollbar {
		width: 8px;
	}

	.drawer-body::-webkit-scrollbar-track {
		background: transparent;
	}

	.drawer-body::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
	}

	.drawer-body::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	/* Sections */
	.drawer-section {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.section-divider {
		height: 1px;
		background: rgba(255, 255, 255, 0.1);
		margin: 0 -24px;
	}

	.section-header {
		display: flex;
		gap: 12px;
		align-items: flex-start;
	}

	.section-icon {
		font-size: 20px;
		line-height: 1;
	}

	.section-title {
		font-size: 16px;
		font-weight: 600;
		color: #ffffff;
		margin: 0;
	}

	/* Content */
	.content-text {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.6;
	}

	.numbered-list {
		margin: 0;
		padding-left: 20px;
		list-style: decimal;
	}

	.numbered-list li {
		margin-bottom: 8px;
	}

	.bullet-list {
		margin: 0;
		padding-left: 20px;
		list-style: disc;
	}

	.bullet-list li {
		margin-bottom: 8px;
	}

	/* Shortcuts */
	.shortcuts-grid {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.shortcut-item {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.shortcut-key {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 6px;
		padding: 4px 8px;
		font-size: 12px;
		font-family: monospace;
		color: #ffffff;
	}

	.plus {
		color: rgba(255, 255, 255, 0.4);
		font-size: 12px;
	}

	.shortcut-desc {
		font-size: 13px;
		color: rgba(255, 255, 255, 0.6);
		margin-top: 4px;
	}
</style>
