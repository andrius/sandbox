<script lang="ts">
	import { LANGUAGE_GROUP_LABEL, LOCALE_META, localeList, locale, locales, setLocale } from '$lib/i18n';

	/**
	 * The only language switcher in the app.
	 *
	 * There were five: this one, a Tailwind pill row in Pizza, hand-written
	 * markup in the Wet Water header and again in the chronicles bar, and the
	 * big chooser on the start page. Five copies of one control meant five
	 * places to keep a language list, and they had already drifted - Wet Water
	 * still listed three languages and would have hidden Spanish outright.
	 *
	 * What is shared is everything that can be wrong: the list itself, the
	 * pressed state, the `lang` attribute, the endonym tooltip, the accessible
	 * group name, and the call to `setLocale`. What is NOT shared is how any of
	 * it looks - four products with four palettes need four looks, and that was
	 * never the duplication worth removing.
	 *
	 * So this ships structure and stable class names, and each product paints
	 * `.lang-switch` / `.lang-option` from its own stylesheet under its own root
	 * class. Those selectors carry three classes and so outrank anything
	 * declared here, which is what lets a product restyle the control without
	 * `!important` and without the component knowing any product exists.
	 *
	 *   rule    RU / NL / EN / ES, separated, inheriting the host's type.
	 *           The AL.KA register strip. Styled here because it is generic:
	 *           it inherits font, size, tracking and casing from whatever bar
	 *           it lands in and paints nothing of its own.
	 *   group   A segmented control. Wet Water's tabs, Pizza's pills and the
	 *           chronicles bar are all this shape wearing three costumes.
	 *   cards   Flag plus endonym at reading size, for the start page, where
	 *           the reader may not yet be able to read any of the four names.
	 */
	type Variant = 'rule' | 'group' | 'cards';

	let { variant = 'rule' }: { variant?: Variant } = $props();
</script>

<div class="lang-switch {variant}" role="group" aria-label={LANGUAGE_GROUP_LABEL}>
	{#if variant === 'cards'}
		{#each localeList as { code, native, flag } (code)}
			<button
				type="button"
				class="lang-option"
				class:is-active={$locale === code}
				aria-pressed={$locale === code}
				lang={code}
				onclick={() => setLocale(code)}
			>
				<span class="lang-flag" aria-hidden="true">{flag}</span>
				<span class="lang-native">{native}</span>
			</button>
		{/each}
	{:else}
		{#each locales as code, i (code)}
			{#if variant === 'rule' && i > 0}<span class="lang-sep" aria-hidden="true">/</span>{/if}
			<button
				type="button"
				class="lang-option"
				class:is-active={$locale === code}
				aria-pressed={$locale === code}
				lang={code}
				title={LOCALE_META[code].native}
				onclick={() => setLocale(code)}
			>
				{code.toUpperCase()}
			</button>
		{/each}
	{/if}
</div>

<style>
	.lang-switch {
		display: inline-flex;
	}

	.lang-option {
		appearance: none;
		background: none;
		border: 0;
		font: inherit;
		color: inherit;
		cursor: pointer;
	}

	.lang-option:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}

	/* ---- rule: the AL.KA register strip ----------------------------------- */

	.lang-switch.rule {
		align-items: baseline;
		gap: 4px;
		font-family: inherit;
		font-size: inherit;
		letter-spacing: inherit;
		text-transform: inherit;
	}

	/* Negative margin on both axes: the visual baseline stays inside the host
	   header, but the hit area expands to meet the 44x44 touch-target
	   guidance without shifting the layout. */
	.rule .lang-option {
		padding: 12px 8px;
		margin: -12px -4px;
		letter-spacing: inherit;
		text-transform: inherit;
		opacity: 0.55;
		transition: opacity 200ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.rule .lang-option:hover {
		opacity: 0.85;
	}

	.rule .lang-option.is-active {
		opacity: 1;
		color: var(--lang-active, inherit);
	}

	.lang-sep {
		opacity: 0.35;
		user-select: none;
	}

	/* ---- group and cards: structure only ---------------------------------- */

	.lang-switch.group {
		align-items: center;
	}

	.lang-switch.cards {
		display: flex;
		flex-wrap: wrap;
	}

	.cards .lang-option {
		display: inline-flex;
		align-items: center;
	}

	@media (prefers-reduced-motion: reduce) {
		.lang-option {
			transition: none;
		}
	}
</style>
