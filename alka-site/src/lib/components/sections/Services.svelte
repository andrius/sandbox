<script lang="ts">
	import { dict } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import SectionHead from '../SectionHead.svelte';
</script>

<section class="services">
	<SectionHead num="03" kicker={$dict.labels.kicker_services} title={$dict.section_services} />
	<div class="wrap">
		<div class="gutter"></div>
		<div class="rows">
			{#each $dict.services as s, i (s.code)}
				<div
					class="row reveal-up"
					class:last={i === $dict.services.length - 1}
					use:reveal={{ delay: i * 70 }}
				>
					<div class="code">{s.code}</div>
					<div class="name">{s.name}</div>
					<div class="blurb">{s.blurb}</div>
					<div class="arrow" aria-hidden="true">→</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.services {
		padding: var(--s-section-y) var(--s-section-x);
		border-bottom: 1px solid var(--rule);
	}

	.wrap {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 32px;
	}

	@media (max-width: 1023px) {
		.wrap { grid-template-columns: 80px 1fr; gap: 24px; }
	}
	@media (max-width: 639px) {
		.wrap { grid-template-columns: 1fr; }
		.gutter { display: none; }
	}

	.row {
		display: grid;
		grid-template-columns: 80px 1fr 1.5fr 60px;
		gap: 32px;
		padding: 28px 0;
		border-top: 1px solid var(--rule);
		align-items: baseline;
		transition: background 240ms var(--ease-out);
	}
	.row.last { border-bottom: 1px solid var(--rule); }
	.row:hover { background: rgba(255, 122, 26, 0.05); }

	.code {
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--dim);
		letter-spacing: 0.1em;
	}

	.name {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: var(--t-card-h);
		color: var(--ink);
		letter-spacing: -0.015em;
		line-height: 1.15;
	}

	.blurb {
		font-family: var(--font-sans);
		font-size: 15px;
		line-height: 1.55;
		color: var(--ink);
		opacity: 0.78;
		max-width: 65ch;
	}

	.arrow {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: 22px;
		color: var(--orng-text);
		text-align: right;
		letter-spacing: -0.02em;
		transition:
			transform 320ms var(--ease-out),
			color 240ms var(--ease-out);
		opacity: 0.8;
	}

	.row:hover .arrow {
		transform: translateX(10px);
		opacity: 1;
		color: var(--orng);
	}

	@media (max-width: 1023px) {
		.row { grid-template-columns: 56px 1fr 1.5fr 40px; gap: 20px; }
	}

	@media (max-width: 639px) {
		.row {
			grid-template-columns: 56px 1fr;
			grid-template-areas:
				'code name'
				'.    blurb';
			row-gap: 8px;
		}
		.code { grid-area: code; }
		.name { grid-area: name; }
		.blurb { grid-area: blurb; }
		.arrow { display: none; }
	}
</style>
