<script lang="ts">
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n';
	import '../app.css';
	import '$lib/i18n';

	let { children } = $props();

	onMount(() => {
		// Load saved language preference
		const savedLang = localStorage.getItem('language');
		if (savedLang && ['et', 'en', 'fi'].includes(savedLang)) {
			locale.set(savedLang);
		}
	});
</script>

{@render children()}
