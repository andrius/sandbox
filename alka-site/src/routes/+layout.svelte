<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initLocale, locale } from '$lib/i18n';

	let { children } = $props();

	onMount(initLocale);

	/* Keep <html lang> in sync with the active locale - screen readers and
	   browser translation tools rely on it. */
	$effect(() => {
		if (typeof document !== 'undefined') document.documentElement.lang = $locale;
	});
</script>

{@render children()}
