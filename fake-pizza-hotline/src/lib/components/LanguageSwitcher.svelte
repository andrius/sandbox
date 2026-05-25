<script lang="ts">
	import { locale, locales, setLocale, t } from '$lib/i18n';
</script>

<div
	class="inline-flex items-center rounded-full border border-white/12 bg-white/5 p-0.5"
	role="group"
	aria-label={$t('lang.label')}
>
	{#each locales as l (l)}
		<button
			type="button"
			onclick={() => setLocale(l)}
			aria-pressed={$locale === l}
			class="rounded-full px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider transition-colors
				{$locale === l ? 'bg-cream-50 text-void-950' : 'text-void-300 hover:text-cream-50'}"
		>
			{$t(`lang.${l}`)}
		</button>
	{/each}
</div>
