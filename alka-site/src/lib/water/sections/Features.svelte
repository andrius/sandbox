<script lang="ts">
	import type { Dict } from '$lib/i18n/water/content';

	let { t }: { t: Dict } = $props();
</script>

<section class="features" id="features">
	<div class="wrap">
		<div class="section-head" data-reveal>
			<span class="eyebrow">Features</span>
			<h2>{t.features.title}</h2>
		</div>
		<div class="grid-auto feature-grid" data-reveal>
			{#each t.features.items as feat (feat.title)}
				<div class="feature-card">
					<div class="icon">{feat.icon}</div>
					<div>
						<div class="title">{feat.title}</div>
						{#if feat.desc}<div class="desc">{feat.desc}</div>{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
