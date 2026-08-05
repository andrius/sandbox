<script lang="ts">
	import '$lib/styles/tokens.css';
	import { dict } from '$lib/i18n/alka';
	import Cover from '$lib/components/sleep/Cover.svelte';
	import Letter from '$lib/components/sleep/Letter.svelte';
	import Numbers from '$lib/components/sleep/Numbers.svelte';
	import Services from '$lib/components/sleep/Services.svelte';
	import Team from '$lib/components/sleep/Team.svelte';
	import Press from '$lib/components/sleep/Press.svelte';
	import Contact from '$lib/components/sleep/Contact.svelte';
	import Disclaimer from '$lib/components/sleep/Disclaimer.svelte';
</script>

<svelte:head>
	<title>{$dict.meta_sleep_title}</title>
	<meta name="description" content={$dict.meta_sleep_description} />
	<meta property="og:title" content={$dict.meta_sleep_title} />
	<meta property="og:description" content={$dict.meta_sleep_description} />
	<meta property="og:type" content="website" />
</svelte:head>

<main class="alka-root">
	<Cover />
	<Letter />
	<Numbers />
	<Services />
	<Team />
	<Press />
	<Contact />
	<Disclaimer />
</main>
