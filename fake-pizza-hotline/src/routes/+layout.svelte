<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initLocale, t } from '$lib/i18n';
	import { initKonami, rainNothing } from '$lib/easter';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CallModal from '$lib/components/CallModal.svelte';

	let { children } = $props();

	onMount(() => {
		initLocale();
		console.info(
			'%c🍕 Fake Pizza Hotline',
			'font:700 15px/1.5 system-ui;color:#ffd24a',
			'\nNo pizza in the source either. We checked.\nPsst: try the Konami code.'
		);
		return initKonami(rainNothing);
	});
</script>

<svelte:head>
	<title>{$t('meta.title')}</title>
	<meta name="description" content={$t('meta.description')} />
	<meta property="og:title" content={$t('meta.title')} />
	<meta property="og:description" content={$t('meta.description')} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/og.svg" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="/og.svg" />
</svelte:head>

<a
	href="#main"
	style="z-index:200"
	class="sr-only rounded-full bg-cream-50 px-4 py-2 text-sm font-bold text-void-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
>
	Skip to content
</a>

<Header />
<main id="main">
	{@render children()}
</main>
<Footer />
<CallModal />
