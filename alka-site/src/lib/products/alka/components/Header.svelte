<script lang="ts">
	import { dict } from '$lib/products/alka/i18n';
	import { reveal } from '$lib/actions/reveal';
	import BackToMain from '$lib/components/BackToMain.svelte';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import { product as lookup, type ProductId } from '$lib/products/registry';

	/**
	 * The AL.KA house header: a mono register strip above a hairline rule.
	 *
	 * Three routes wear the AL.KA identity - the menu at `/`, the chronicles
	 * holding page, and Sleep solutions - and each had its own copy of this
	 * strip, drifting slightly. One component now, in two states:
	 *
	 *   no `id`   the menu itself. Prints who this is; there is nowhere to go
	 *             back to, so no back link.
	 *   an `id`   a division. Prints the way back to the menu and the
	 *             division's portfolio ordinal, which comes from the registry
	 *             rather than being typed into the markup as `· 02`.
	 *
	 * The other two products (Wet Water, Fake Pizza Hotline) look nothing like
	 * this and keep their own headers. What they share is only the contract
	 * that a product header renders `BackToMain` - see
	 * `scripts/check-products.mjs`, which fails the build if one stops.
	 */
	type Props = {
		id?: ProductId;
		/** Adds the 56px gap the Sleep cover wants under the strip. */
		spaced?: boolean;
	};

	let { id, spaced = false }: Props = $props();

	const meta = $derived(id ? lookup(id) : undefined);
</script>

<div class="strip rule-wipe" class:spaced use:reveal>
	{#if meta}
		<span class="left"><BackToMain compact /></span>
		<span class="division">{$dict.labels.portfolio} · {meta.code}</span>
	{:else}
		<span class="who">{$dict.name} · {$dict.labels.established} {$dict.estd}</span>
	{/if}
	<LanguageSwitcher />
</div>

<style>
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
		color: var(--dim);
		--lang-active: var(--ink);
	}

	.strip.spaced {
		margin-bottom: 56px;
	}

	.who,
	.left {
		color: var(--orng-text);
		font-weight: 700;
	}

	/* The back-link paints the wordmark dot in the brand orange. */
	.left {
		--btm-accent: var(--orng);
		--btm-hover: rgba(20, 10, 5, 0.06);
	}

	.division {
		color: var(--dim);
	}

	@media (max-width: 639px) {
		.strip {
			font-size: 10px;
			letter-spacing: 0.1em;
			flex-wrap: wrap;
			gap: 12px;
		}
		/* At this width the ordinal is the first thing worth losing: the back
		   link and the language switcher both do work, "Портфель · 02" does not. */
		.division {
			display: none;
		}
	}
</style>
