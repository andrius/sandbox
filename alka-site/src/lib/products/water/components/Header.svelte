<script lang="ts">
	import type { Dict } from '$lib/products/water/i18n/content';
	import BackToMain from '$lib/components/BackToMain.svelte';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';

	let { t }: { t: Dict } = $props();

	// The original rendered three locale tabs (EN/RU/NL) as anchors to per-locale
	// URLs. The merge dropped per-locale URLs in favour of the shared store, and
	// the tabs became hand-written buttons here - carrying their own copy of the
	// language list, which was still `['en','ru','nl']` and would have hidden
	// Spanish on this page alone. The markup is now the shared component; the
	// look is still this division's, painted by `.water-root .lang-switch` in
	// styles.css.
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
			<LanguageSwitcher variant="group" />
			<a href="#partners" class="btn btn-primary btn-sm">💧 {t.nav.getWater}</a>
		</div>
	</div>
</header>
