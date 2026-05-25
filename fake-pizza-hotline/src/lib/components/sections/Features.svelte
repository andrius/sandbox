<script lang="ts">
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	const items = $derived($t('features.items') as { icon: string; title: string; desc: string }[]);
</script>

<section class="shell py-16">
	<div class="reveal max-w-2xl" use:reveal>
		<p class="text-sm font-bold uppercase tracking-widest text-tomato-400">{$t('features.kicker')}</p>
		<h2 class="mt-3 text-balance text-4xl font-extrabold sm:text-5xl">{$t('features.title')}</h2>
		<p class="mt-4 text-lg text-void-300">{$t('features.subtitle')}</p>
	</div>

	<div class="mt-8 border-b border-white/8">
		{#each items as f, i (f.title)}
			<div class="feature-row reveal" use:reveal={{ delay: (i % 2) * 80 }}>
				<div class="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-tomato-500/20 to-ember-500/10 text-4xl">
					{f.icon}
				</div>
				<div>
					<h3 class="font-display text-xl font-bold text-cream-50 sm:text-2xl">{f.title}</h3>
					<p class="mt-2 leading-relaxed text-void-300">{f.desc}</p>
				</div>
			</div>
		{/each}
	</div>
</section>
