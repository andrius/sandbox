<script lang="ts">
	import { dict } from '$lib/products/alka/i18n';
	import { reveal } from '$lib/actions/reveal';
	import Header from '$lib/products/alka/components/Header.svelte';

	/**
	 * Founder chronicles - a division that ships as an honest holding page.
	 *
	 * It lives here rather than inline in the route for the same reason every
	 * other division's markup does: the route should be head plus wrapper, and
	 * the page body should be something Storybook can render on its own.
	 */
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
			<div class="eta reveal-up" use:reveal={{ delay: 220 + $dict.chronicles.body.length * 80 }}>
				{$dict.chronicles.eta}
			</div>
		</div>
	</div>
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

	/* The one piece of chrome that says "not finished" without apologising. */
	.eta {
		display: inline-block;
		margin-top: 20px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--orng-text);
		border: 1px solid var(--rule);
		padding: 10px 14px;
	}

	@media (max-width: 1023px) {
		.body { grid-template-columns: 80px 1fr; gap: 24px; }
	}

	@media (max-width: 767px) {
		.body { grid-template-columns: 1fr; }
		.gutter { display: none; }
	}

</style>
