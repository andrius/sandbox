<script lang="ts">
	import type { Dict, Lang } from '$lib/products/water/i18n/content';
	import BackToMain from '$lib/components/BackToMain.svelte';
	import { locale, locales as allLocales, setLocale } from '$lib/i18n';

	let { t }: { t: Dict } = $props();

	// The original rendered three locale tabs (EN/RU/NL) as anchors to per-locale
	// URLs. The merge drops per-locale URLs in favour of the shared store, so the
	// tabs become buttons that call `setLocale`. Visual identity is preserved.
	const langCodes: Lang[] = ['en', 'ru', 'nl'];
	let current = $derived($locale as Lang);
</script>

<header class="site-header" id="top">
	<div class="wrap">
		<BackToMain label="AL.KA" />
		<a href="#top" class="brand">
			<span class="drop">💧</span>
			<span style="display:flex;flex-direction:column">
				<span class="name">Wet Water</span>
				<span class="tag">{t.tagline}</span>
			</span>
		</a>
		<nav class="nav">
			<a href="#features">{t.nav.product}</a>
			<a href="#survive">{t.nav.survive}</a>
			<a href="#partners">{t.nav.partners}</a>
			<a href="#pricing">{t.nav.pricing}</a>
			<a href="#faq">{t.nav.faq}</a>
		</nav>
		<div class="header-right">
			<div class="lang-switch">
				{#each langCodes as code (code)}
					<button
						type="button"
						class={code === current ? 'active' : ''}
						aria-pressed={code === current}
						onclick={() => setLocale(code as (typeof allLocales)[number])}
					>
						{code.toUpperCase()}
					</button>
				{/each}
			</div>
			<a href="#partners" class="btn btn-primary btn-sm">💧 {t.nav.getWater}</a>
		</div>
	</div>
</header>
