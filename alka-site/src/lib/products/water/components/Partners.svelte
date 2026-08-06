<script lang="ts">
	import type { Dict } from '$lib/products/water/i18n/content';

	let { t }: { t: Dict } = $props();
</script>

<section class="partners" id="partners">
	<div class="wrap">
		<div class="section-head" data-reveal>
			<span class="eyebrow">{t.partners.eyebrow}</span>
			<h2>{t.partners.title}</h2>
		</div>
		<div class="grid-auto partner-grid" data-reveal>
			{#each t.partners.cards as card (card.name)}
				<div class="partner-card">
					<div class="icon">{card.icon}</div>
					<div class="name">{card.name}</div>
					<div class="desc">{card.desc}</div>
					<!-- AFFILIATE LINK SLOT: replace href="#" with the real partner/affiliate URL -->
					<a href="#" data-affiliate="replace-me" class="affiliate">{card.button} →</a>
				</div>
			{/each}
		</div>
		<div class="note" data-reveal>{t.partners.note}</div>
	</div>
</section>
