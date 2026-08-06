<script lang="ts">
	import '$lib/products/alka/styles/tokens.css';
	import { dict } from '$lib/products/alka/i18n';
	import { product } from '$lib/products/registry';
	import ProductHead from '$lib/components/ProductHead.svelte';
	import Chronicles from '$lib/products/chronicles/components/Chronicles.svelte';

	const chronicles = product('chronicles');
</script>

<!-- `noindex`: under construction, so real content but nothing worth indexing. -->
<ProductHead
	id="chronicles"
	title={$dict.meta_chronicles_title}
	description={$dict.meta_chronicles_description}
	noindex
/>

<main class={chronicles.rootClass}>
	<Chronicles />
</main>
