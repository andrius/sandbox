<script lang="ts">
	import type { Dict } from '$lib/products/water/i18n/content';

	let { t }: { t: Dict } = $props();

	// Single-open accordion: -1 means all closed. The original client.ts walked
	// every .faq-item on the page and removed `.open` from siblings; we keep the
	// same observable behaviour with one piece of component state. The CSS rule
	// `.faq-item.open .faq-a { max-height: 280px; opacity: 1 }` does the visual
	// reveal, so toggling `.open` here is all that is needed.
	let openIndex = $state(-1);
</script>

<section class="faq" id="faq">
	<div class="inner">
		<div class="section-head" data-reveal style="margin-bottom:38px">
			<h2>{t.faq.title}</h2>
		</div>
		<div class="faq-list" data-reveal>
			{#each t.faq.items as item, i (i)}
				<div class="faq-item" class:open={openIndex === i}>
					<button
						class="faq-q"
						type="button"
						aria-expanded={openIndex === i ? 'true' : 'false'}
						onclick={() => (openIndex = openIndex === i ? -1 : i)}
					>
						<span>{item.q}</span>
						<span class="sign">{openIndex === i ? '–' : '+'}</span>
					</button>
					<div class="faq-a">
						<p>{item.a}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
