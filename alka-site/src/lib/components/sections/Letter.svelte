<script lang="ts">
	import { dict } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import SectionHead from '../SectionHead.svelte';

	const paragraphs = $derived($dict.hero_letter.split('\n\n'));
</script>

<section class="letter">
	<SectionHead num="01" kicker={$dict.hero_kicker} title={$dict.section_mission} />
	<div class="grid">
		<div class="gutter"></div>
		<div class="lead-col">
			<p class="lead reveal-up" use:reveal>{$dict.mission_lead}</p>
			<div class="caption reveal-up" use:reveal={{ delay: 120 }}>
			 - {$dict.labels.a_letter_excerpt}
			</div>
		</div>
		<div class="body-col">
			{#each paragraphs as p, i (i)}
				<p class="para reveal-up" use:reveal={{ delay: 80 + i * 80 }}>{p}</p>
			{/each}
			<div class="signed reveal-up" use:reveal={{ delay: 80 + paragraphs.length * 80 }}>
				{$dict.labels.letter_signed}
			</div>
		</div>
	</div>
</section>

<style>
	.letter {
		padding: var(--s-section-y) var(--s-section-x);
		border-bottom: 1px solid var(--rule);
	}

	.grid {
		display: grid;
		grid-template-columns: 120px 1fr 1fr;
		gap: 32px;
	}

	.lead {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: var(--t-mission);
		line-height: 1.3;
		margin: 0 0 28px;
		color: var(--ink);
		letter-spacing: -0.015em;
		max-width: 30ch;
	}

	.caption {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--orng-text);
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}

	.para {
		font-family: var(--font-sans);
		font-size: var(--t-body);
		line-height: 1.55;
		color: var(--ink);
		margin: 0 0 16px;
		max-width: 60ch;
	}

	.signed {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: 14px;
		color: var(--ink);
		margin-top: 24px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	@media (max-width: 1023px) {
		.grid { grid-template-columns: 80px 1fr 1fr; gap: 24px; }
	}

	@media (max-width: 767px) {
		.grid { grid-template-columns: 1fr; }
		.gutter { display: none; }
	}
</style>
