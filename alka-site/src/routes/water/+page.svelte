<script lang="ts">
	import '$lib/products/water/styles.css';
	import { onMount } from 'svelte';
	import { waterDict } from '$lib/products/water/i18n';
	import { revealWithin } from '$lib/actions/reveal';
	import { product } from '$lib/products/registry';
	import ProductHead from '$lib/components/ProductHead.svelte';
	import Header from '$lib/products/water/components/Header.svelte';
	import Hero from '$lib/products/water/components/Hero.svelte';
	import Problem from '$lib/products/water/components/Problem.svelte';
	import RevealSection from '$lib/products/water/components/RevealSection.svelte';
	import Partners from '$lib/products/water/components/Partners.svelte';
	import Features from '$lib/products/water/components/Features.svelte';
	import Survive from '$lib/products/water/components/Survive.svelte';
	import Pricing from '$lib/products/water/components/Pricing.svelte';
	import Testimonials from '$lib/products/water/components/Testimonials.svelte';
	import Faq from '$lib/products/water/components/Faq.svelte';
	import Footer from '$lib/products/water/components/Footer.svelte';

	const t = $derived($waterDict); // unwrap once; reference `t` directly in markup
	const water = product('water');

	// Page-level UI state. Sections that own their own behaviour (FAQ accordion
	// in Faq.svelte, newsletter swap in Footer.svelte) keep their state local;
	// only the splash, cookie and thermometer live here.
	let splashDone = $state(false);
	let cookieHidden = $state(false);

	let root: HTMLElement | undefined = undefined;
	let splashDrop: HTMLElement | undefined = undefined;
	let thermFill: HTMLElement | undefined = undefined;

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// ---- smooth anchor scrolling. The original had `html { scroll-behavior:
		// smooth }` plus a reduced-motion override to `auto`. We cannot put that
		// rule in any CSS file here: bare `html` would repaint the other products
		// and `.water-root` is not a scroll container (no overflow), so the
		// declaration would be a silent no-op. Setting it inline on the document
		// element from JS reproduces the original behaviour and lets us restore
		// the previous value on unmount so /pizza and /sleep are not affected. ----
		const html = document.documentElement;
		const prevScrollBehavior = html.style.scrollBehavior;
		if (!reduce) html.style.scrollBehavior = 'smooth';

		// ---- loading splash ----
		const splashTimer = window.setTimeout(() => (splashDone = true), reduce ? 200 : 1500);

		// ---- reveal-on-scroll. The CSS contract (.js [data-reveal] / .in) is
		// shipped by src/app.css and shared across all products; the observer
		// itself is `revealWithin` in $lib/actions/reveal, whose defaults are
		// the ones the original client.ts used, so the visual reveal is still
		// identical to the standalone Astro build. ----
		const stopReveal = revealWithin(root!, { reduced: reduce });

		// ---- motion (droplet float, problem glow, scroll-linked thermometer,
		// splash drop pulse). Imported lazily inside onMount so the module
		// never runs under SSR/prerender. ----
		type Control = { cancel: () => void } | (() => void);
		const motionPromise = import('motion').then(({ animate, scroll }) => {
			const controls: Control[] = [];

			if (splashDrop && !reduce) {
				controls.push(
					animate(
						splashDrop,
						{ scale: [1, 1.14, 1], opacity: [0.8, 1, 0.8] },
						{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }
					)
				);
			}

			if (!reduce) {
				document.querySelectorAll<HTMLElement>('.water-root [data-float]').forEach((el) => {
					const dur = Number(el.dataset.dur ?? 7);
					const delay = Number(el.dataset.delay ?? 0);
					controls.push(
						animate(el, { y: [0, -15, 0] }, { duration: dur, delay, repeat: Infinity, ease: 'easeInOut' })
					);
				});
				document.querySelectorAll<HTMLElement>('.water-root [data-glow]').forEach((el, i) => {
					controls.push(
						animate(
							el,
							{ opacity: [0.45, 0.85, 0.45], scale: [1, 1.05, 1] },
							{ duration: 6 + i * 1.5, delay: i, repeat: Infinity, ease: 'easeInOut' }
						)
					);
				});
			}

			if (thermFill) {
				controls.push(
					scroll((progress: number) => {
						thermFill!.style.height = `${(90 - progress * 76).toFixed(1)}%`;
					})
				);
			}

			return controls;
		});

		return () => {
			window.clearTimeout(splashTimer);
			stopReveal();
			html.style.scrollBehavior = prevScrollBehavior;
			void motionPromise.then((controls) =>
				controls.forEach((c) => (typeof c === 'function' ? c() : c.cancel()))
			);
		};
	});
</script>

<ProductHead id="water" title="Wet Water - {t.tagline}" description={t.hero.subhead} />

<main class={water.rootClass} bind:this={root}>
	<div class="splash" id="splash" class:done={splashDone}>
		<div class="drop" id="splash-drop" bind:this={splashDrop}>💧</div>
		<div class="text">{t.loading}</div>
	</div>

	<Header t={t} />
	<Hero t={t} />
	<Problem t={t} />
	<RevealSection t={t} />
	<Partners t={t} />
	<Features t={t} />
	<Survive t={t} />
	<Pricing t={t} />
	<Testimonials t={t} />
	<Faq t={t} />
	<Footer t={t} />

	<div class="therm" id="therm" aria-hidden="true">
		<span class="label">{t.thermLabel}</span>
		<div class="tube"><div class="fill" id="therm-fill" bind:this={thermFill}></div></div>
		<div class="bulb"></div>
	</div>

	<div class="cookie" id="cookie" class:hidden={cookieHidden}>
		<div class="inner">
			<span class="text">{t.cookie.text}</span>
			<div style="display:flex;gap:8px">
				<button class="accept" onclick={() => (cookieHidden = true)}>{t.cookie.accept}</button>
				<button class="dismiss" onclick={() => (cookieHidden = true)}>{t.cookie.dismiss}</button>
			</div>
		</div>
	</div>
</main>
