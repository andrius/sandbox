<script lang="ts">
	import '$lib/products/ants/styles.css';
	import { onMount } from 'svelte';
	import { antsDict } from '$lib/products/ants/i18n';
	import { revealWithin } from '$lib/actions/reveal';
	import { product } from '$lib/products/registry';
	import ProductHead from '$lib/components/ProductHead.svelte';
	import Header from '$lib/products/ants/components/Header.svelte';
	import Hero from '$lib/products/ants/components/Hero.svelte';
	import ChapterOne from '$lib/products/ants/components/ChapterOne.svelte';
	import ChapterTwo from '$lib/products/ants/components/ChapterTwo.svelte';
	import ChapterThree from '$lib/products/ants/components/ChapterThree.svelte';
	import ChapterFour from '$lib/products/ants/components/ChapterFour.svelte';
	import Decree from '$lib/products/ants/components/Decree.svelte';

	const t = $derived($antsDict);
	const ants = product('ants');

	let root: HTMLElement | undefined = undefined;

	onMount(() => {
		/* The artifact revealed its chapters with its own observer, on the same
		   `[data-reveal]` attribute Wet Water uses. The markup keeps the
		   attribute; the observer is the shared one, whose defaults already
		   match what the original used. */
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		return revealWithin(root!, { reduced: reduce });
	});
</script>

<ProductHead id="ants" title="{t.title} - AL.KA" description={t.subtitle} />

<main class={ants.rootClass} bind:this={root}>
	<Header />
	<Hero />
	<ChapterOne />
	<ChapterTwo />
	<ChapterThree />
	<ChapterFour />
	<Decree />
</main>
