<script lang="ts">
	import '$lib/products/chronicles/entries/ants/styles.css';
	import { onMount } from 'svelte';
	import { antsDict } from '$lib/products/chronicles/entries/ants/i18n';
	import { revealWithin } from '$lib/actions/reveal';
	import { entry } from '$lib/products/chronicles/entries';
	import EntryHead from '$lib/products/chronicles/components/EntryHead.svelte';
	import Header from '$lib/products/chronicles/entries/ants/components/Header.svelte';
	import Hero from '$lib/products/chronicles/entries/ants/components/Hero.svelte';
	import ChapterOne from '$lib/products/chronicles/entries/ants/components/ChapterOne.svelte';
	import ChapterTwo from '$lib/products/chronicles/entries/ants/components/ChapterTwo.svelte';
	import ChapterThree from '$lib/products/chronicles/entries/ants/components/ChapterThree.svelte';
	import ChapterFour from '$lib/products/chronicles/entries/ants/components/ChapterFour.svelte';
	import Decree from '$lib/products/chronicles/entries/ants/components/Decree.svelte';

	const t = $derived($antsDict);
	const ants = entry('ants');

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

<EntryHead slug="ants" title="{t.title} - AL.KA" description={t.subtitle} />

<main class={ants.rootClass} bind:this={root}>
	<Header />
	<Hero />
	<ChapterOne />
	<ChapterTwo />
	<ChapterThree />
	<ChapterFour />
	<Decree />
</main>
