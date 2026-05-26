<script lang="ts">
	import { locale, locales, setLocale } from '$lib/i18n';
</script>

<div class="switcher" role="group" aria-label="Language">
	{#each locales as code, i (code)}
		{#if i > 0}<span class="sep" aria-hidden="true">/</span>{/if}
		<button
			type="button"
			class="loc"
			class:active={$locale === code}
			aria-pressed={$locale === code}
			onclick={() => setLocale(code)}
		>
			{code.toUpperCase()}
		</button>
	{/each}
</div>

<style>
	/* Editorial inline switcher. No pill, no background, no fixed position -
	   sits inside the cover's register strip alongside the other mono labels,
	   inherits the register's font + size. The active locale prints in the
	   page ink; the inactive locale prints dim and brightens on hover. */
	.switcher {
		display: inline-flex;
		align-items: baseline;
		gap: 6px;
		font-family: inherit;
		font-size: inherit;
		letter-spacing: inherit;
		text-transform: inherit;
	}

	/* Negative-margin trick: visual baseline stays inside the inline register
	   register, but the actual hit area expands to comfortably meet iOS HIG
	   44pt / Material 48dp finger targets. The vertical margin cancels into
	   the parent strip; nothing shifts visually. */
	.loc {
		appearance: none;
		background: none;
		border: 0;
		padding: 8px 6px;
		margin: -8px 0;
		font: inherit;
		letter-spacing: inherit;
		text-transform: inherit;
		color: var(--dim);
		cursor: pointer;
		transition: color 200ms var(--ease-out);
	}

	.loc:hover { color: var(--orng-text); }
	.loc.active { color: var(--ink); }

	.loc:focus-visible {
		outline: 1px solid var(--orng-text);
		outline-offset: 4px;
	}

	.sep {
		color: var(--dim);
		opacity: 0.5;
		user-select: none;
	}
</style>
