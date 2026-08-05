<script lang="ts">
	import { pizzaT } from '$lib/i18n/pizza';
	import Hero from '$lib/pizza/components/sections/Hero.svelte';
	import Marquee from '$lib/pizza/components/sections/Marquee.svelte';
	import Stats from '$lib/pizza/components/sections/Stats.svelte';
	import Features from '$lib/pizza/components/sections/Features.svelte';
	import HowItWorks from '$lib/pizza/components/sections/HowItWorks.svelte';
	import Menu from '$lib/pizza/components/sections/Menu.svelte';
	import Guarantee from '$lib/pizza/components/sections/Guarantee.svelte';
	import Testimonials from '$lib/pizza/components/sections/Testimonials.svelte';
	import Hours from '$lib/pizza/components/sections/Hours.svelte';
	import Faq from '$lib/pizza/components/sections/Faq.svelte';
	import FinalCta from '$lib/pizza/components/sections/FinalCta.svelte';
</script>

<svelte:head>
	<title>{$pizzaT('meta.title')}</title>
	<meta name="description" content={$pizzaT('meta.description')} />
	<meta property="og:title" content={$pizzaT('meta.title')} />
	<meta property="og:description" content={$pizzaT('meta.description')} />
	<meta property="og:type" content="website" />
	<link
		href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Hero />
<Marquee />
<Stats />
<Features />
<HowItWorks />
<Menu />
<Guarantee />
<Testimonials />
<Hours />
<Faq />
<FinalCta />
