<script lang="ts">
	import { dict } from '$lib/i18n/alka';
	import { locale, NUMBER_FORMATS, type Locale } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import { countUp } from '$lib/actions/countUp';
	import SectionHead from '../SectionHead.svelte';

	/**
	 * Parse a localised stat string into a count-up config.
	 *
	 *   ru  "4 380"  "99,7%"  "€4,50"  "14 ч"
	 *   nl  "4.380"  "99,7%"  "€ 4,50" "14 uur"
	 *   en  "4,380"  "99.7%"  "€4.50"  "14 h"
	 *
	 * Separators come from NUMBER_FORMATS rather than being inferred, because
	 * "." is a thousands separator in Dutch and a decimal point in English -
	 * guessing gets 4.380 wrong in one direction or the other.
	 */
	function parseStat(raw: string, loc: Locale) {
		const fmt = NUMBER_FORMATS[loc];

		// Anchor on a digit at both ends so a trailing unit ("14 ч") is not
		// swallowed into the numeric block along with its separating space.
		const match = raw.match(/-?\d[\d\s  .,]*\d|-?\d/);
		if (!match) return null;
		const numStr = match[0];
		const at = match.index ?? 0;
		const prefix = raw.slice(0, at);
		const suffix = raw.slice(at + numStr.length);

		const cleaned = numStr
			.split(fmt.thousands)
			.join('')
			.replace(/[\s  ]/g, '')
			.replace(fmt.decimal, '.');
		const value = parseFloat(cleaned);
		if (Number.isNaN(value)) return null;

		const decIdx = numStr.lastIndexOf(fmt.decimal);
		const fractionDigits = decIdx >= 0 ? numStr.length - decIdx - 1 : 0;

		return {
			to: value,
			fractionDigits,
			thousands: fmt.thousands,
			decimal: fmt.decimal,
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

	<div class="footnote reveal-up" use:reveal={{ delay: 200 }}>{$dict.numbers_footnote}</div>
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

	/* The hero stat is the visual peak of the entire page. Pushed from Onest
	   to Fraunces italic 800: a dramatic display-serif numeric that visually
	   rhymes with the wordmark "Ka" and the goodnight sign-off (the only
	   three Fraunces italic moments on the site). The footnote superscript
	   completes the McKinsey-prospectus chrome around what is, in fact, an
	   estimate of how many naps a 10-year-old has taken since founding. */
	.mega {
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 800;
		font-size: clamp(110px, 22vw, 360px);
		line-height: 0.85;
		color: var(--orng);
		letter-spacing: -0.04em;
		white-space: nowrap;
		min-width: 0;
		position: relative;
	}
	.mega span { white-space: nowrap; display: inline-block; }

	.footnote {
		margin-top: 56px;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--bg);
		opacity: 0.45;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-align: right;
	}

	/* Bumped from 22 -> 28 to keep up with the now-louder Fraunces italic
	   hero next to it. The label has to read as a peer of the stat, not
	   as supporting micro-copy. */
	.featured-label {
		font-family: var(--font-sans);
		font-size: 28px;
		font-weight: 500;
		line-height: 1.3;
		letter-spacing: -0.01em;
		color: var(--bg);
		opacity: 0.88;
		max-width: 24ch;
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
