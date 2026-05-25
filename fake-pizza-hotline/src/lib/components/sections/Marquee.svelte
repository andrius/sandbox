<script lang="ts">
	import { t } from '$lib/i18n';
	const items = $derived($t('marquee') as string[]);
</script>

<div class="relative my-6 overflow-hidden border-y border-white/8 bg-tomato-600/8 py-4">
	<div class="marquee-track">
		{#each [...items, ...items] as word, i (i)}
			<span class="flex items-center font-display text-lg font-extrabold uppercase tracking-wide text-cheese-300">
				<span class="mx-7">{word}</span>
				<span class="text-tomato-500">●</span>
			</span>
		{/each}
	</div>
	<div class="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void-950 to-transparent"></div>
	<div class="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void-950 to-transparent"></div>
</div>
