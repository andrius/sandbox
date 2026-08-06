<script lang="ts">
	import type { Dict } from '$lib/products/water/i18n/content';

	let { t }: { t: Dict } = $props();
</script>

<section class="pricing" id="pricing">
	<div class="wrap">
		<div class="section-head" data-reveal>
			<span class="eyebrow">{t.pricing.eyebrow}</span>
			<h2>{t.pricing.title}</h2>
		</div>
		<div class="grid-auto price-grid" data-reveal>
			{#each t.pricing.tiers as tier (tier.name)}
				<div class={tier.popular ? 'price-card popular' : 'price-card'}>
					{#if tier.popular}<div class="price-badge">{t.pricing.popularBadge}</div>{/if}
					<div class="name">{tier.name}</div>
					<div class="price">{tier.price}</div>
					<div class="desc">{tier.desc}</div>
					<a href="#partners" class="buy">{tier.button}</a>
				</div>
			{/each}
		</div>
		<div class="note" data-reveal style="max-width:60ch;margin-left:auto;margin-right:auto;line-height:1.6">{t.pricing.footnote}</div>
	</div>
</section>
