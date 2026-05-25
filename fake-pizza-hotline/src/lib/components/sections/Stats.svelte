<script lang="ts">
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	const items = $derived($t('stats.items') as { value: string; label: string }[]);
</script>

<section class="shell py-14">
	<p class="reveal mb-9 text-center font-display text-sm font-bold uppercase tracking-widest text-void-300" use:reveal>
		{$t('stats.title')}
	</p>
	<dl class="reveal grid grid-cols-2 gap-x-6 gap-y-10 border-y border-white/8 py-10 md:grid-cols-4" use:reveal>
		{#each items as s (s.label)}
			<div class="text-center">
				<dt class="sr-only">{s.label}</dt>
				<dd class="stat-value text-cheese-300">{s.value}</dd>
				<p class="mt-2 text-sm text-void-300">{s.label}</p>
			</div>
		{/each}
	</dl>
</section>
