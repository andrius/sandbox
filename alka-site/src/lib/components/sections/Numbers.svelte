<script lang="ts">
	import { dict, locale } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import { countUp } from '$lib/actions/countUp';
	import SectionHead from '../SectionHead.svelte';

	/** Parse "4 380", "99,7%", "€4,50", "14 ч", "14 uur", "0" into a count-up config. */
	function parseStat(raw: string, loc: 'ru' | 'nl') {
		// Locate the numeric block (allowing comma/period/space).
		const match = raw.match(/(-?\d[\d\s.,]*)/);
		if (!match) return null;
		const numStr = match[1];
		const prefix = raw.slice(0, match.index ?? 0);
		const suffix = raw.slice((match.index ?? 0) + numStr.length);

		// Normalize to a JS-parseable number.
		// RU uses comma as decimal, space as thousands.
		// NL uses comma as decimal, period as thousands.
		const cleaned = numStr.replace(/\s/g, '').replace(/\./g, loc === 'nl' ? '' : '');
		const dotted = cleaned.replace(',', '.');
		const value = parseFloat(dotted);
		if (Number.isNaN(value)) return null;

		const commaIdx = numStr.indexOf(',');
		const fractionDigits = commaIdx >= 0 ? numStr.length - commaIdx - 1 : 0;

		const thousands = loc === 'nl' ? '.' : ' ';
		const decimal = ',';

		return {
			to: value,
			fractionDigits,
			thousands,
			decimal,
			prefix,
			suffix,
			duration: 1800
		};
	}

	const featured = $derived($dict.numbers[0]);
	const featuredCfg = $derived(parseStat(featured.value, $locale));
	const rest = $derived($dict.numbers.slice(1));
</script>

<section class="numbers">
	<SectionHead
		num="02"
		kicker={$dict.labels.kicker_numbers}
		title={$dict.section_numbers}
		onDark={true}
	/>

	<div class="featured rule-wipe" use:reveal>
		<div class="mega tabular">
			{#if featuredCfg}
				<span use:countUp={featuredCfg}>{featured.value}</span>
			{:else}
				{featured.value}
			{/if}
		</div>
		<div class="featured-label reveal-up" use:reveal={{ delay: 280 }}>{featured.label}</div>
	</div>

	<div class="grid">
		{#each rest as n, i (n.label + i)}
			{@const cfg = parseStat(n.value, $locale)}
			<div class="cell reveal-up" use:reveal={{ delay: 100 + i * 90 }}>
				<div class="idx">0{i + 2}</div>
				<div class="val tabular">
					{#if cfg}
						<span use:countUp={cfg}>{n.value}</span>
					{:else}
						{n.value}
					{/if}
				</div>
				<div class="lbl">{n.label}</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.numbers {
		padding: var(--s-section-y) var(--s-section-x);
		background: var(--ink);
		color: var(--bg);
		border-bottom: 1px solid var(--rule);
		position: relative;
		overflow: hidden;
		/* Dark-section override: orange text on near-black ink has plenty of
		   contrast already, so SectionHead / sub-stat indices in here can use
		   the brighter brand orange. */
		--orng-text: var(--orng);
	}

	.featured {
		display: grid;
		grid-template-columns: minmax(0, 2fr) minmax(180px, 1fr);
		gap: 32px;
		padding: 40px 0;
		border-top: 1px solid var(--rule-on-dark);
		border-bottom: 1px solid var(--rule-on-dark);
		align-items: end;
		position: relative;
	}

	.mega {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(120px, 18vw, var(--t-mega-num));
		line-height: 0.85;
		color: var(--orng);
		letter-spacing: -0.05em;
		white-space: nowrap;
		min-width: 0;
	}
	.mega span { white-space: nowrap; display: inline-block; }

	.featured-label {
		font-family: var(--font-sans);
		font-size: 22px;
		line-height: 1.35;
		color: var(--bg);
		opacity: 0.85;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
	}

	.cell {
		padding: 40px 20px 0;
		border-right: 1px solid var(--rule-on-dark-soft);
		transition: background 300ms var(--ease-out);
	}
	.cell:last-child { border-right: none; }
	.cell:hover { background: rgba(243, 233, 216, 0.04); }

	.idx {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--orng);
		letter-spacing: 0.18em;
		margin-bottom: 14px;
	}

	.val {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: var(--t-stat);
		line-height: 1;
		color: var(--bg);
		letter-spacing: -0.04em;
		margin-bottom: 16px;
	}

	.lbl {
		font-family: var(--font-sans);
		font-size: 12px;
		line-height: 1.5;
		color: var(--bg);
		opacity: 0.75;
	}

	@media (max-width: 1023px) {
		.grid { grid-template-columns: repeat(3, 1fr); }
		.cell:nth-child(3n) { border-right: none; }
		.cell { padding: 32px 16px 0; }
		.featured-label { font-size: 18px; }
	}

	@media (max-width: 639px) {
		.featured { grid-template-columns: 1fr; gap: 16px; }
		.grid { grid-template-columns: repeat(2, 1fr); }
		.cell:nth-child(2n) { border-right: none; }
		.cell:nth-child(3n) { border-right: 1px solid var(--rule-on-dark-soft); }
		.cell:nth-child(5) { border-right: none; }
	}
</style>
