<script lang="ts">
	import '$lib/styles/tokens.css';
	import { dict } from '$lib/i18n/alka';
	import { reveal } from '$lib/actions/reveal';
	import Wordmark from '$lib/components/Wordmark.svelte';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
</script>

<svelte:head>
	<title>{$dict.meta_home_title}</title>
	<meta name="description" content={$dict.meta_home_description} />
	<meta property="og:title" content={$dict.meta_home_title} />
	<meta property="og:description" content={$dict.meta_home_description} />
	<meta property="og:type" content="website" />
</svelte:head>

<main class="alka-root menu">
	<!-- The strip that used to print "AL.KA · Годовой отчёт · 2026 · стр. 01 / 12
	     · Частная компания". The pagination and the document type are gone: a
	     holding page has no page 1 of 12. What is left is what a visitor
	     actually needs - who this is, and what language to read it in. -->
	<div class="strip rule-wipe" use:reveal>
		<span class="who">{$dict.name} · {$dict.labels.established} {$dict.estd}</span>
		<LanguageSwitcher />
	</div>

	<header class="hero">
		<h1 class="wordmark-wrap">
			<Wordmark animated={true} />
			<span class="sr-only">{$dict.name}</span>
		</h1>
		<p class="tagline reveal-up" use:reveal={{ delay: 600 }}>{$dict.tagline}</p>
	</header>

	<nav class="portfolio" aria-label={$dict.labels.portfolio}>
		<h2 class="portfolio-label reveal-up" use:reveal>{$dict.labels.portfolio}</h2>
		<ul class="rows">
			{#each $dict.products as p, i (p.code)}
				<li>
					<a
						class="row reveal-up"
						class:soon={p.status === 'soon'}
						href={p.href}
						use:reveal={{ delay: 120 + i * 90 }}
					>
						<span class="code">{p.code}</span>
						<span class="name">{p.name}</span>
						<span class="blurb">{p.blurb}</span>
						{#if p.status === 'soon'}
							<span class="tag">{$dict.labels.soon}</span>
						{:else}
							<span class="arrow" aria-hidden="true">→</span>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<footer class="foot reveal-up" use:reveal={{ delay: 200 }}>
		<div class="cell">
			<div class="k">{$dict.labels.head_office}</div>
			<div class="v">{$dict.hq}</div>
		</div>
		<div class="cell">
			<div class="k">{$dict.labels.email}</div>
			<div class="v"><a href="mailto:{$dict.contact.email}">{$dict.contact.email}</a></div>
		</div>
		<div class="goodnight">{$dict.labels.keep_dreaming}</div>
	</footer>
</main>

<style>
	.menu {
		display: flex;
		flex-direction: column;
		padding: 40px var(--s-section-x) 48px;
	}

	.strip {
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
		--lang-active: var(--ink);
		color: var(--dim);
	}
	.strip .who { color: var(--orng-text); font-weight: 700; }

	/* The wordmark is the whole hero. It gets the space a cover would get,
	   because on a menu page there is nothing else competing for attention. */
	.hero {
		padding: clamp(48px, 9vw, 104px) 0 clamp(40px, 7vw, 80px);
	}

	.wordmark-wrap {
		font-family: var(--font-sans);
		font-weight: 700;
		/* 17vw with a 120px floor overflowed 320px-wide phones and the cover
		   clipped it. The floor is gone; vw carries the small end. */
		font-size: clamp(76px, 17vw, var(--t-display));
		line-height: 0.85;
		color: var(--ink);
		letter-spacing: -0.055em;
		margin: 0;
	}

	.tagline {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: clamp(20px, 2.6vw, 34px);
		line-height: 1.1;
		margin-top: 24px;
		color: var(--ink);
		letter-spacing: -0.02em;
		max-width: 22ch;
		text-wrap: balance;
	}

	.portfolio { margin-top: auto; }

	.portfolio-label {
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
		/* Last column sized for the longest "in development" tag across all
		   three locales ("in ontwikkeling" is 15 chars at 10px + 0.16em
		   tracking), not for the arrow - at 88px the Russian tag wrapped. */
		grid-template-columns: 56px minmax(0, 1fr) minmax(0, 1.4fr) 128px;
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
	.row:focus-visible {
		outline: 2px solid var(--orng-text);
		outline-offset: -2px;
	}

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

	.tag {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--dim);
		text-align: right;
	}

	/* A division still under construction reads quieter, but stays a real
	   link - it has a page that says so, which is more honest than a dead row. */
	.row.soon .name { color: var(--dim); }
	.row.soon .blurb { opacity: 0.6; }

	.foot {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		gap: 40px;
		margin-top: 56px;
	}
	.foot .cell { min-width: 0; }
	.foot .k {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--dim);
		margin-bottom: 6px;
	}
	.foot .v { font-size: 14px; color: var(--ink); }
	.foot .v a {
		color: var(--orng-text);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.goodnight {
		margin-left: auto;
		font-family: var(--font-serif);
		font-style: italic;
		/* Bright --orng is 2.17:1 on cream and fails AA even as large text, so
		   the sign-off uses --orng-text (5.17:1) and earns its warmth back
		   from size instead of saturation. */
		font-size: clamp(20px, 2.4vw, 28px);
		color: var(--orng-text);
		letter-spacing: 0.01em;
	}

	/* Below 1024 the row folds to two lines. Areas are declared explicitly:
	   a 3-column track with 4 children left the arrow auto-placed into a
	   phantom third row, orphaned under the blurb, and pushed the grid wider
	   than the viewport so the blurb clipped at the right edge. */
	@media (max-width: 1023px) {
		.row {
			grid-template-columns: 44px minmax(0, 1fr) auto;
			grid-template-areas:
				'code name status'
				'.    blurb blurb';
			gap: 8px 16px;
		}
		.code { grid-area: code; }
		.name { grid-area: name; }
		.blurb { grid-area: blurb; min-width: 0; }
		.arrow,
		.tag { grid-area: status; align-self: center; }
	}

	@media (max-width: 639px) {
		.menu { padding-bottom: 36px; }
		.strip { font-size: 10px; letter-spacing: 0.1em; }
		.row { padding: 20px 0; }
		.name { font-size: 20px; }
		.blurb { font-size: 14px; }
		.foot { gap: 24px; margin-top: 40px; }
		.goodnight { margin-left: 0; }
	}
</style>
