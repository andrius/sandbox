<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { waterDict } from '$lib/products/water/i18n';
	import Footer from './Footer.svelte';

	/** the closing bar and the newsletter that does nothing
	 *
	 *  Wet Water's sections take their copy as a `t` prop rather than reading a
	 *  store, so the story passes the dictionary through. Reading it from the
	 *  store here (not freezing one language into args) is what makes the
	 *  Locale toolbar work on these stories too. */
	const { Story } = defineMeta({
		title: 'Water/Footer',
		component: Footer,
		parameters: { product: 'water' }
	});
</script>

<Story name="Default">
	{#snippet template()}
		<Footer t={$waterDict} />
	{/snippet}
</Story>
