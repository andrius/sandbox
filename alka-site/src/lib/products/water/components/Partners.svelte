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
					<!-- AFFILIATE SLOT: swap this button for
					     `<a href="…" data-affiliate="…" class="affiliate">` once the
					     real partner URL exists. It is a button, not `<a href="#">`,
					     because a link to "#" is not a link: it announces itself to a
					     screen reader as a destination, and activating it scrolls the
					     reader back to the top of the page instead of doing nothing.
					     A button is the honest element until there is somewhere to go. -->
					<button type="button" data-affiliate="replace-me" class="affiliate">
						{card.button} →
					</button>
				</div>
			{/each}
		</div>
		<div class="note" data-reveal>{t.partners.note}</div>
	</div>
</section>
