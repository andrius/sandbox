<script lang="ts">
	import '$lib/pizza/styles.css';
	import { onMount } from 'svelte';
	import { initKonami, rainNothing } from '$lib/pizza/easter';
	import Header from '$lib/pizza/components/Header.svelte';
	import Footer from '$lib/pizza/components/Footer.svelte';
	import CallModal from '$lib/pizza/components/CallModal.svelte';

	let { children } = $props();

	onMount(() => {
		console.info(
			'%c🍕 Fake Pizza Hotline',
			'font:700 15px/1.5 system-ui;color:#ffd24a',
			'\nNo pizza in the source either. We checked.\nPsst: try the Konami code.'
		);
		return initKonami(rainNothing);
	});
</script>

<a
	href="#main"
	style="z-index:200"
	class="sr-only rounded-full bg-cream-50 px-4 py-2 text-sm font-bold text-void-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
>
	Skip to content
</a>

<div class="pizza-root">
	<Header />
	<main id="main">
		{@render children()}
	</main>
	<Footer />
	<CallModal />
</div>
