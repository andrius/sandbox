<script lang="ts">
	import { dict } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import Wordmark from '../Wordmark.svelte';
</script>

<footer class="disclaimer">
	<div class="top reveal-up" use:reveal>
		<div class="brand">
			<Wordmark size="96px" />
		</div>
		<div class="meta">
			{$dict.labels.private_co}<br />
			{$dict.labels.established} {$dict.estd} · {$dict.hq}
		</div>
	</div>

	<div class="body">
		<div class="legend reveal-up" use:reveal={{ delay: 120 }}>§ {$dict.section_disclaimer}</div>
		<p class="text reveal-up" use:reveal={{ delay: 200 }}>{$dict.disclaimer}</p>
	</div>

	<div class="goodnight reveal-up" use:reveal={{ delay: 320 }}>
		<span aria-hidden="true">z z z &nbsp;·&nbsp;</span>
		{$dict.labels.keep_dreaming}
	</div>
</footer>

<style>
	.disclaimer {
		padding: 64px var(--s-section-x);
		background: var(--bg);
		color: var(--ink);
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 32px;
		padding-bottom: 28px;
		border-bottom: 2px solid var(--ink);
		margin-bottom: 28px;
	}

	.brand {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: 96px;
		color: var(--ink);
		letter-spacing: -0.05em;
		line-height: 0.9;
	}

	.meta {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--dim);
		text-align: right;
	}

	.body {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 32px;
	}

	.legend {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--orng-text);
		font-weight: 700;
	}

	.text {
		font-family: var(--font-sans);
		font-size: 12px;
		line-height: 1.65;
		color: var(--dim);
		margin: 0;
		max-width: 880px;
		column-count: 2;
		column-gap: 32px;
	}

	/* Deliberate brand-warmth exemption: the bright --orng (#ff7a1a) reads
	   ~2.4:1 on cream and fails WCAG, but on this 15px italic decorative
	   sign-off the warmth IS the point and the line is non-critical. The
	   deep --orng-text alternative reads as a brown whisper and kills the
	   emotional close. Keep the warm orange here, only here. */
	.goodnight {
		margin-top: 36px;
		font-family: var(--font-serif);
		font-style: italic;
		font-size: 15px;
		color: var(--orng);
		letter-spacing: 0.05em;
		text-align: center;
	}

	@media (max-width: 1023px) {
		.body { grid-template-columns: 120px 1fr; gap: 24px; }
		.brand { font-size: 64px; }
	}

	@media (max-width: 639px) {
		.top { flex-direction: column; gap: 16px; align-items: flex-start; }
		.meta { text-align: left; }
		.body { grid-template-columns: 1fr; }
		.text { column-count: 1; }
		.brand { font-size: 56px; }
	}
</style>
