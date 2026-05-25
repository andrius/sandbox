<script lang="ts">
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	const items = $derived($t('stats.items') as { value: string; label: string }[]);
</script>

<section class="shell py-12">
	<p class="reveal mb-8 text-center font-display text-sm font-bold uppercase tracking-widest text-void-400" use:reveal>
		{$t('stats.title')}
	</p>
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each items as s, i (s.label)}
			<div class="reveal card p-6 text-center" use:reveal={{ delay: i * 80 }}>
				<div class="font-display text-4xl font-extrabold text-gradient sm:text-5xl">{s.value}</div>
				<div class="mt-2 text-sm text-void-300">{s.label}</div>
			</div>
		{/each}
	</div>
</section>
