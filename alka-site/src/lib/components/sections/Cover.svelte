<script lang="ts">
	import { dict } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import Wordmark from '../Wordmark.svelte';
	import LanguageSwitcher from '../LanguageSwitcher.svelte';
</script>

<section class="cover">
	<!-- Top register strip. Four items in mono; the language switcher sits as
	     the fourth, integrated rather than floated over. -->
	<div class="register rule-wipe" use:reveal>
		<span class="left">AL.KA · {$dict.labels.annual_report} · 2026</span>
		<span class="page">{$dict.labels.page} 01 / 12</span>
		<span class="co">{$dict.labels.private_co}</span>
		<LanguageSwitcher />
	</div>

	<div class="grid">
		<div class="lhs">
			<div class="wordmark-wrap">
				<Wordmark animated={true} />
			</div>
			<div class="tagline reveal-up" use:reveal={{ delay: 600 }}>
				{$dict.tagline}
			</div>
		</div>
		<aside class="rhs">
			<div class="meta reveal-up" use:reveal={{ delay: 300 }}>{$dict.labels.established}</div>
			<div class="year reveal-up" use:reveal={{ delay: 400 }}>{$dict.estd}</div>
			<div class="meta reveal-up" use:reveal={{ delay: 500 }}>{$dict.labels.head_office}</div>
			<div class="addr reveal-up" use:reveal={{ delay: 600 }}>{$dict.hq}</div>
		</aside>
	</div>
</section>

<style>
	.cover {
		padding: 40px var(--s-section-x) var(--s-section-y);
		border-bottom: 2px solid var(--rule);
		position: relative;
		overflow: hidden;
	}

	.register {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 24px;
		font-family: var(--font-mono);
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		padding-bottom: 14px;
		border-bottom: 1px solid var(--rule);
		margin-bottom: 56px;
	}

	.register .left { color: var(--orng-text); font-weight: 700; }
	.register .page,
	.register .co { color: var(--dim); }

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 2fr) minmax(220px, 1fr);
		gap: var(--s-gap-lg);
		align-items: end;
	}

	.lhs { min-width: 0; }

	.wordmark-wrap {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(120px, 19vw, var(--t-display));
		line-height: 0.85;
		color: var(--ink);
		letter-spacing: -0.055em;
		display: block;
	}

	.tagline {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: 36px;
		line-height: 1.05;
		margin-top: 28px;
		color: var(--ink);
		letter-spacing: -0.02em;
		max-width: 720px;
	}

	.rhs {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--dim);
		line-height: 1.6;
		text-align: right;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		min-width: 0;
	}

	.year {
		font-family: var(--font-sans);
		font-size: var(--t-display-s);
		font-weight: 700;
		color: var(--ink);
		letter-spacing: -0.02em;
		margin: 4px 0 14px;
	}

	.addr {
		font-family: var(--font-sans);
		font-size: 14px;
		color: var(--ink);
		text-transform: none;
		letter-spacing: 0;
		margin-top: 4px;
	}

	@media (max-width: 1023px) {
		.tagline { font-size: 28px; }
	}

	@media (max-width: 639px) {
		.grid { grid-template-columns: 1fr; gap: var(--s-gap-md); }
		.register { font-size: 10px; letter-spacing: 0.1em; flex-wrap: wrap; gap: 12px; }
		.register .page { display: none; }
		.tagline { font-size: 22px; max-width: none; }
		.rhs { text-align: left; }
	}
</style>
