<script lang="ts">
	import { dict } from '$lib/products/alka/i18n';
	import { locale } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import Header from '$lib/products/alka/components/Header.svelte';
	import { entries, formatEntryDate } from '$lib/products/chronicles/entries';

	/**
	 * Founder chronicles - division 01, and the only division that is a blog.
	 *
	 * It shipped as a holding page saying the record existed but only on paper.
	 * It has entries now, so the apology is gone and the page is what it always
	 * claimed it would be: the notebook, transcribed, newest page first.
	 *
	 * Entries keep their own look. This index does not preview it - a strip of
	 * five different visual identities would read as a mess rather than as a
	 * portfolio - so every row is set in the AL.KA house style and the surprise
	 * is saved for the entry itself.
	 */
	const rows = $derived(
		entries.map((e) => ({
			...e,
			...e.summary($locale),
			display: formatEntryDate(e.date, $locale)
		}))
	);
</script>

<section class="chronicles">
	<Header id="chronicles" />

	<header class="head">
		<div class="kicker reveal-up" use:reveal>{$dict.chronicles.kicker}</div>
		<h1 class="title reveal-up" use:reveal={{ delay: 80 }}>{$dict.chronicles.title}</h1>
		<p class="lead reveal-up" use:reveal={{ delay: 160 }}>{$dict.chronicles.lead}</p>
	</header>

	<div class="body">
		<div class="gutter"></div>
		<div class="col">
			{#each $dict.chronicles.body as para, i (i)}
				<p class="para reveal-up" use:reveal={{ delay: 220 + i * 80 }}>{para}</p>
			{/each}
		</div>
	</div>

	<nav class="entries" aria-label={$dict.labels.entries}>
		<h2 class="entries-label reveal-up" use:reveal>{$dict.labels.entries}</h2>
		<ul class="rows">
			{#each rows as e, i (e.slug)}
				<li>
					<a
						class="row reveal-up"
						href="/chronicles/{e.slug}"
						use:reveal={{ delay: 120 + i * 90 }}
					>
						<time class="date" datetime={e.date}>{e.display}</time>
						<span class="name">{e.title}</span>
						<span class="blurb">{e.lead}</span>
						<span class="arrow" aria-hidden="true">&#8594;</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

</section>

<style>
	.chronicles {
		display: flex;
		flex-direction: column;
		padding: 40px var(--s-section-x) var(--s-section-y);
	}


	.head { padding: clamp(48px, 8vw, 96px) 0 clamp(32px, 5vw, 56px); }

	.kicker {
		font-family: var(--font-mono);
		font-size: var(--t-kicker);
		letter-spacing: 0.28em;
		text-transform: uppercase;
		font-weight: 700;
		color: var(--orng-text);
		margin-bottom: 18px;
	}

	.title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: var(--t-h1);
		line-height: 0.95;
		letter-spacing: -0.035em;
		color: var(--ink);
		margin: 0;
		text-wrap: balance;
	}

	.lead {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: var(--t-mission);
		line-height: 1.3;
		letter-spacing: -0.015em;
		color: var(--ink);
		margin-top: 28px;
		max-width: 34ch;
		text-wrap: pretty;
	}

	.body {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 32px;
		border-top: 1px solid var(--rule);
		padding-top: 40px;
	}

	.para {
		font-family: var(--font-sans);
		font-size: var(--t-body);
		line-height: 1.6;
		color: var(--ink);
		margin: 0 0 18px;
		max-width: 62ch;
		text-wrap: pretty;
	}


	@media (max-width: 1023px) {
		.body { grid-template-columns: 80px 1fr; gap: 24px; }
	}

	@media (max-width: 767px) {
		.body { grid-template-columns: 1fr; }
		.gutter { display: none; }
	}

	/* The entry list borrows the portfolio menu's row grammar on purpose: same
	   hairline rules, same hover wash, same arrow. A reader who came from the
	   start page has already learned how to read one of these. */
	.entries { margin-top: clamp(48px, 7vw, 80px); }

	.entries-label {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: var(--orng-text);
		margin: 0 0 20px;
	}

	.rows { list-style: none; margin: 0; padding: 0; }

	.row {
		display: grid;
		grid-template-columns: 160px minmax(0, 1fr) minmax(0, 1.4fr) 40px;
		gap: 28px;
		align-items: baseline;
		padding: 26px 0;
		border-top: 1px solid var(--rule);
		text-decoration: none;
		color: inherit;
		transition: background 240ms var(--ease-out);
	}
	.rows li:last-child .row { border-bottom: 1px solid var(--rule); }

	.row:hover { background: rgba(255, 122, 26, 0.07); }
	.row:focus-visible { outline: 2px solid var(--orng-text); outline-offset: -2px; }

	.date {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--dim);
	}

	.name {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: var(--t-card-h);
		line-height: 1.15;
		letter-spacing: -0.015em;
		color: var(--ink);
	}

	.blurb {
		font-family: var(--font-sans);
		font-size: 15px;
		line-height: 1.55;
		color: var(--ink);
		opacity: 0.78;
		max-width: 52ch;
	}

	.arrow {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: 22px;
		color: var(--orng-text);
		text-align: right;
		transition: transform 320ms var(--ease-out);
	}
	.row:hover .arrow { transform: translateX(10px); }

	/* Same fold as the portfolio menu: areas declared explicitly so the arrow
	   cannot be auto-placed into a phantom row and widen the grid. */
	@media (max-width: 1023px) {
		.row {
			grid-template-columns: minmax(0, 1fr) auto;
			grid-template-areas:
				'date  arrow'
				'name  name'
				'blurb blurb';
			gap: 6px 16px;
		}
		.date { grid-area: date; }
		.name { grid-area: name; }
		.blurb { grid-area: blurb; min-width: 0; }
		.arrow { grid-area: arrow; align-self: center; }
	}
</style>
