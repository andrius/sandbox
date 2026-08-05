<script lang="ts">
	import type { Dict } from '$lib/i18n/water/content';

	let { t }: { t: Dict } = $props();
</script>

<section class="reveal-section">
	<div class="inner" data-reveal>
		<div class="emoji">💧</div>
		<h2 class="h2">{t.reveal.headline}</h2>
		<p>{t.reveal.body}</p>
		<p class="sub">{t.reveal.sub}</p>
		<a href="#partners" class="btn btn-primary btn-lg" style="margin-top:30px">{t.reveal.cta} →</a>
	</div>
</section>
