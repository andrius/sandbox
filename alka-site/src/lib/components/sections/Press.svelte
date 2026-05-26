<script lang="ts">
	import { dict } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import SectionHead from '../SectionHead.svelte';
</script>

<section class="press">
	<SectionHead num="05" kicker={$dict.labels.kicker_press} title={$dict.section_press} />
	<div class="wrap">
		<div class="gutter"></div>
		<div class="grid">
			{#each $dict.press as p, i (i)}
				<figure class="card reveal-up" use:reveal={{ delay: i * 90 }}>
					<span class="qmark" aria-hidden="true">“</span>
					<blockquote class="quote">{p.quote}”</blockquote>
					<figcaption class="src">{p.source} <span class="sep">· {p.date}</span></figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>

<style>
	.press {
		padding: var(--s-section-y) var(--s-section-x);
		border-bottom: 1px solid var(--rule);
	}

	.wrap {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 32px;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 32px;
	}

	/* No side-stripe. A 1px hairline frames the card; the oversize Fraunces
	   opening quote floats as a drop-quote that the body text wraps around,
	   which is the print-layout convention this card is borrowing from. */
	.card {
		padding: 28px 32px 24px;
		background: var(--bg);
		border: 1px solid var(--rule);
		margin: 0;
		transition: transform 380ms var(--ease-out);
	}
	.card:hover {
		transform: translateY(-2px);
	}

	.qmark {
		float: left;
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 800;
		font-size: 88px;
		line-height: 0.85;
		color: var(--orng-text);
		margin: 4px 14px -8px 0;
		user-select: none;
	}

	.quote {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: var(--t-quote);
		line-height: 1.3;
		color: var(--ink);
		margin: 0 0 18px;
		letter-spacing: -0.01em;
	}

	.src {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--dim);
	}
	.sep { margin-left: 8px; }

	@media (max-width: 1023px) {
		.wrap { grid-template-columns: 80px 1fr; gap: 24px; }
		.qmark { font-size: 72px; margin-right: 12px; }
	}
	@media (max-width: 767px) {
		.wrap { grid-template-columns: 1fr; }
		.gutter { display: none; }
		.grid { grid-template-columns: 1fr; }
		.card { padding: 24px 24px 20px; }
		.qmark { font-size: 64px; margin-right: 10px; }
	}
</style>
