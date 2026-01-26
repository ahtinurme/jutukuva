<script lang="ts">
	import { locale } from 'svelte-i18n';
	import { uiLanguages } from '$lib/i18n';

	const languageNames: Record<string, string> = {
		et: 'Eesti',
		en: 'English',
		fi: 'Suomi'
	};

	function changeLanguage(lang: string) {
		locale.set(lang);
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('language', lang);
		}
	}

	let currentLocale = $state($locale || 'et');

	$effect(() => {
		currentLocale = $locale || 'et';
	});
</script>

<div class="dropdown dropdown-end dropdown-top">
	<button tabindex="0" class="btn btn-ghost btn-xs text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all" aria-label="Select language">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
			/>
		</svg>
		<span class="text-[10px] uppercase tracking-wider">{languageNames[currentLocale]}</span>
	</button>
	<ul
		class="dropdown-content menu bg-[#1a1a1a] border border-white/10 rounded-lg z-[100] w-28 p-1 shadow-xl"
	>
		{#each uiLanguages as lang}
			<li>
				<button
					class="text-xs text-white/70 hover:text-white hover:bg-white/10 {currentLocale === lang ? 'bg-white/10 text-white' : ''}"
					onclick={() => changeLanguage(lang)}
				>
					{languageNames[lang]}
				</button>
			</li>
		{/each}
	</ul>
</div>
