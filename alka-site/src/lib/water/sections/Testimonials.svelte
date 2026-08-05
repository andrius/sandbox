<script lang="ts">
	import type { Dict } from '$lib/i18n/water/content';

	let { t }: { t: Dict } = $props();
</script>

<section class="testimonials">
	<div class="wrap">
		<div class="section-head" data-reveal>
			<div class="stars" style="font-size:18px;letter-spacing:.3em">★★★★★</div>
			<h2 style="margin-top:8px">{t.testimonials.title}</h2>
		</div>
		<div class="grid-auto testi-grid" data-reveal>
			{#each t.testimonials.items as rev (rev.author)}
				<div class="testi-card">
					<div class="stars" style="font-size:14px">★★★★★</div>
					<p class="quote">“{rev.quote}”</p>
					<div class="author"> - {rev.author}</div>
				</div>
			{/each}
		</div>
	</div>
</section>
