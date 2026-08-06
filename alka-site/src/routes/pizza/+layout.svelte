<script lang="ts">
	import '$lib/products/pizza/styles.css';
	import { onMount } from 'svelte';
	import { product } from '$lib/products/registry';
	import { initKonami, rainNothing } from '$lib/products/pizza/easter';
	import { pizzaT } from '$lib/products/pizza/i18n';
	import ProductHead from '$lib/components/ProductHead.svelte';
	import Header from '$lib/products/pizza/components/Header.svelte';
	import Footer from '$lib/products/pizza/components/Footer.svelte';
	import CallModal from '$lib/products/pizza/components/CallModal.svelte';

	let { children } = $props();

	const pizza = product('pizza');

	onMount(() => {
		console.info(
			'%c🍕 Fake Pizza Hotline',
			'font:700 15px/1.5 system-ui;color:#ffd24a',
			'\nNo pizza in the source either. We checked.\nPsst: try the Konami code.'
		);
		return initKonami(rainNothing);
	});
</script>

<!-- Faces are requested once for the whole division, so /pizza and
     /pizza/checkout no longer carry two copies of the same Google Fonts URL. -->
<ProductHead id="pizza" />

<a
	href="#main"
	style="z-index:200"
	class="sr-only rounded-full bg-cream-50 px-4 py-2 text-sm font-bold text-void-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
>
	{$pizzaT('a11y.skip')}
</a>

<div class={pizza.rootClass}>
	<Header />
	<main id="main">
		{@render children()}
	</main>
	<Footer />
	<CallModal />
</div>
