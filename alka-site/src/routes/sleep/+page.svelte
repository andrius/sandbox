<script lang="ts">
	import '$lib/products/alka/styles/tokens.css';
	import { dict } from '$lib/products/alka/i18n';
	import { product } from '$lib/products/registry';
	import ProductHead from '$lib/components/ProductHead.svelte';
	import Cover from '$lib/products/sleep/components/Cover.svelte';
	import Letter from '$lib/products/sleep/components/Letter.svelte';
	import Numbers from '$lib/products/sleep/components/Numbers.svelte';
	import Services from '$lib/products/sleep/components/Services.svelte';
	import Team from '$lib/products/sleep/components/Team.svelte';
	import Press from '$lib/products/sleep/components/Press.svelte';
	import Contact from '$lib/products/sleep/components/Contact.svelte';
	import Disclaimer from '$lib/products/sleep/components/Disclaimer.svelte';

	const sleep = product('sleep');
</script>

<ProductHead
	id="sleep"
	title={$dict.meta_sleep_title}
	description={$dict.meta_sleep_description}
/>

<main class={sleep.rootClass}>
	<Cover />
	<Letter />
	<Numbers />
	<Services />
	<Team />
	<Press />
	<Contact />
	<Disclaimer />
</main>
