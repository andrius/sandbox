<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { waterDict } from '$lib/products/water/i18n';
	import Hero from './Hero.svelte';

	/** the certified-wetness promise
	 *
	 *  Wet Water's sections take their copy as a `t` prop rather than reading a
	 *  store, so the story passes the dictionary through. Reading it from the
	 *  store here (not freezing one language into args) is what makes the
	 *  Locale toolbar work on these stories too. */
	const { Story } = defineMeta({
		title: 'Water/Hero',
		component: Hero,
		parameters: { product: 'water' }
	});
</script>

<Story name="Default">
	{#snippet template()}
		<Hero t={$waterDict} />
	{/snippet}
</Story>
