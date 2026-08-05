<script lang="ts">
	import '$lib/water/styles.css';
	import { onMount } from 'svelte';
	import { waterDict } from '$lib/i18n/water';
	import Header from '$lib/water/sections/Header.svelte';
	import Hero from '$lib/water/sections/Hero.svelte';
	import Problem from '$lib/water/sections/Problem.svelte';
	import RevealSection from '$lib/water/sections/RevealSection.svelte';
	import Partners from '$lib/water/sections/Partners.svelte';
	import Features from '$lib/water/sections/Features.svelte';
	import Survive from '$lib/water/sections/Survive.svelte';
	import Pricing from '$lib/water/sections/Pricing.svelte';
	import Testimonials from '$lib/water/sections/Testimonials.svelte';
	import Faq from '$lib/water/sections/Faq.svelte';
	import Footer from '$lib/water/sections/Footer.svelte';

	const t = $derived($waterDict); // unwrap once; reference `t` directly in markup

	// Page-level UI state. Sections that own their own behaviour (FAQ accordion
	// in Faq.svelte, newsletter swap in Footer.svelte) keep their state local;
	// only the splash, cookie and thermometer live here.
	let splashDone = $state(false);
	let cookieHidden = $state(false);

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

		// ---- reveal-on-scroll: the CSS contract (.js [data-reveal] / .in) is
		// shipped by src/app.css and shared across all products, but each
		// product still has to toggle .in itself. The IntersectionObserver and
		// 4.5s safety net match the original client.ts so the visual reveal is
		// identical to the standalone Astro build. ----
		const revealEls = Array.from(document.querySelectorAll<HTMLElement>('.water-root [data-reveal]'));
		let io: IntersectionObserver | null = null;
		if (reduce || !('IntersectionObserver' in window)) {
			revealEls.forEach((el) => el.classList.add('in'));
		} else {
			io = new IntersectionObserver(
				(entries) =>
					entries.forEach((e) => {
						if (e.isIntersecting) {
							e.target.classList.add('in');
							io?.unobserve(e.target);
						}
					}),
				{ rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
			);
			revealEls.forEach((el) => io!.observe(el));
		}
		const safetyNet = window.setTimeout(
			() => revealEls.forEach((el) => el.classList.add('in')),
			4500
		);

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
			window.clearTimeout(safetyNet);
			io?.disconnect();
			html.style.scrollBehavior = prevScrollBehavior;
			void motionPromise.then((controls) =>
				controls.forEach((c) => (typeof c === 'function' ? c() : c.cancel()))
			);
		};
	});
</script>

<svelte:head>
	<title>Wet Water - {t.tagline}</title>
	<meta name="description" content={t.hero.subhead} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:wght@400;700&display=swap"
		rel="stylesheet"
	/>
	<link
		rel="icon"
		href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💧</text></svg>"
	/>
</svelte:head>

<main class="water-root">
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
