<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { initLocale, localeFromSearch, locale, setLocale } from '$lib/i18n';

	let { children } = $props();

	onMount(initLocale);

	/* `?lang=` has to keep working after the first paint too. `initLocale` runs
	   once at mount, but SvelteKit navigates between routes without remounting
	   this layout, so a link like /water?lang=es clicked from /pizza would
	   otherwise be read as an ordinary in-app navigation and ignored. */
	$effect(() => {
		const requested = localeFromSearch(page.url.searchParams);
		if (requested && requested !== $locale) setLocale(requested);
	});

	/* Keep <html lang> in sync with the active locale - screen readers and
	   browser translation tools rely on it. */
	$effect(() => {
		if (typeof document !== 'undefined') document.documentElement.lang = $locale;
	});
</script>

{@render children()}
