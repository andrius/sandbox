<script lang="ts">
	import { pizzaT } from '$lib/products/pizza/i18n';
	import ProductHead from '$lib/components/ProductHead.svelte';
	import Hero from '$lib/products/pizza/components/sections/Hero.svelte';
	import Marquee from '$lib/products/pizza/components/sections/Marquee.svelte';
	import Stats from '$lib/products/pizza/components/sections/Stats.svelte';
	import Features from '$lib/products/pizza/components/sections/Features.svelte';
	import HowItWorks from '$lib/products/pizza/components/sections/HowItWorks.svelte';
	import Menu from '$lib/products/pizza/components/sections/Menu.svelte';
	import Guarantee from '$lib/products/pizza/components/sections/Guarantee.svelte';
	import Testimonials from '$lib/products/pizza/components/sections/Testimonials.svelte';
	import Hours from '$lib/products/pizza/components/sections/Hours.svelte';
	import Faq from '$lib/products/pizza/components/sections/Faq.svelte';
	import FinalCta from '$lib/products/pizza/components/sections/FinalCta.svelte';
</script>

<ProductHead title={$pizzaT('meta.title')} description={$pizzaT('meta.description')} />

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
