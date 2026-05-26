<script lang="ts">
	import '$lib/styles/tokens.css';
	import { onMount } from 'svelte';
	import { initLocale, dict, locale } from '$lib/i18n';

	let { children } = $props();

	onMount(() => {
		initLocale();
		console.info(
			'%cAL.KA',
			'font:700 18px/1 Onest, "Helvetica Neue", Helvetica, sans-serif;color:#ff7a1a;background:#140a05;padding:8px 14px;border-radius:4px',
			'\nВертикально-интегрированные решения в области тихого часа.\nA. K., основатель.'
		);
	});

	/* Keep <html lang> in sync with the active locale - screen readers and
	   browser translation tools rely on it. */
	$effect(() => {
		if (typeof document !== 'undefined') document.documentElement.lang = $locale;
	});
</script>

<svelte:head>
	<title>{$dict.meta_title}</title>
	<meta name="description" content={$dict.meta_description} />
	<meta property="og:title" content={$dict.meta_title} />
	<meta property="og:description" content={$dict.meta_description} />
	<meta property="og:type" content="website" />
</svelte:head>

<main>
	{@render children()}
</main>

<style>
	main {
		display: block;
		width: 100%;
		min-height: 100vh;
		background: var(--bg);
		color: var(--ink);
	}
</style>
