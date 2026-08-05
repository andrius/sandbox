<script lang="ts">
	import { locale, locales, setLocale } from '$lib/i18n';

	/**
	 * Shared RU / NL / EN switcher, host-neutral: it inherits the surrounding
	 * font, size, tracking and casing so it reads as native chrome on the
	 * editorial AL.KA header, the Wet Water product header and the dark Pizza
	 * header alike.
	 */
	const NAMES: Record<string, string> = {
		ru: 'Русский',
		nl: 'Nederlands',
		en: 'English'
	};
</script>

<div class="switcher" role="group" aria-label="Language / Taal / Язык">
	{#each locales as code, i (code)}
		{#if i > 0}<span class="sep" aria-hidden="true">/</span>{/if}
		<button
			type="button"
			class="loc"
			class:active={$locale === code}
			aria-pressed={$locale === code}
			lang={code}
			title={NAMES[code]}
			onclick={() => setLocale(code)}
		>
			{code.toUpperCase()}
		</button>
	{/each}
</div>

<style>
	.switcher {
		display: inline-flex;
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
	.loc {
		appearance: none;
		background: none;
		border: 0;
		padding: 12px 8px;
		margin: -12px -4px;
		font: inherit;
		letter-spacing: inherit;
		text-transform: inherit;
		color: inherit;
		opacity: 0.55;
		cursor: pointer;
		transition: opacity 200ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.loc:hover {
		opacity: 0.85;
	}

	.loc.active {
		opacity: 1;
		color: var(--lang-active, inherit);
	}

	.loc:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}

	.sep {
		opacity: 0.35;
		user-select: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.loc {
			transition: none;
		}
	}
</style>
