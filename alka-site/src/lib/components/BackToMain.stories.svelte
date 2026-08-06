<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import BackToMain from './BackToMain.svelte';

	/**
	 * The only component the whole holding shares.
	 *
	 * It paints almost nothing of its own - it draws in `currentColor` and
	 * inherits the host header's font - which is the entire reason one
	 * component can sit in three headers that look nothing alike. That claim
	 * is only worth anything if you can see it hold, so each story below puts
	 * the same component in a different division's header and lets you check.
	 *
	 * Look for: the wordmark reading as native chrome in each context, the
	 * `.` picking up the host's accent through `--btm-accent`, and a hover
	 * tint that belongs to the host rather than to this component.
	 */
	/* Full-height rather than centered on purpose: each stand-in header should
	   sit at the top of its product's canvas the way a real one does. */
	const { Story } = defineMeta({
		title: 'Shared/BackToMain',
		component: BackToMain
	});
</script>

<Story name="On AL.KA cream" parameters={{ product: 'sleep' }}>
	{#snippet template()}
		<div class="host alka">
			<BackToMain compact />
			<span class="alka-meta">Портфель · 02</span>
		</div>
	{/snippet}
</Story>

<Story name="On Wet Water pale blue" parameters={{ product: 'water' }}>
	{#snippet template()}
		<div class="host water">
			<BackToMain label="AL.KA" />
			<span class="water-meta">Wet Water</span>
		</div>
	{/snippet}
</Story>

<Story name="On Pizza near-black" parameters={{ product: 'pizza' }}>
	{#snippet template()}
		<div class="host pizza" style="--btm-accent: var(--color-cheese-400)">
			<BackToMain />
			<span class="pizza-meta">Fake Pizza Hotline</span>
		</div>
	{/snippet}
</Story>

<style>
	/* Minimal stand-ins for each product's header bar - just enough type and
	   colour for the inheritance to be visible. The real headers live in each
	   product's own `Header.svelte`. */
	.host {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 18px 24px;
	}

	.alka {
		font-family: var(--font-mono);
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: var(--orng-text);
		border-bottom: 1px solid var(--rule);
		--btm-accent: var(--orng);
		--btm-hover: rgba(20, 10, 5, 0.06);
	}
	.alka-meta {
		color: var(--dim);
	}

	.water {
		font-family: var(--font-display, 'Space Grotesk', sans-serif);
		font-size: 15px;
		font-weight: 700;
		color: var(--ink);
		background: var(--bg);
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	}
	.water-meta {
		color: var(--cyan);
	}

	.pizza {
		font-family: 'Unbounded', sans-serif;
		font-size: 15px;
		font-weight: 800;
		letter-spacing: -0.01em;
		color: var(--color-cream-50);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}
	.pizza-meta {
		color: var(--color-cheese-300);
	}
</style>
