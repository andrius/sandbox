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

	<div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each items as f, i (f.title)}
			<div
				class="reveal card card-glow group p-6 hover:-translate-y-1.5 hover:border-white/16"
				use:reveal={{ delay: i * 80 }}
			>
				<div class="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-tomato-500/20 to-ember-500/10 text-3xl transition-transform group-hover:scale-110">
					{f.icon}
				</div>
				<h3 class="mt-5 font-display text-lg font-bold text-cream-50">{f.title}</h3>
				<p class="mt-2 text-sm leading-relaxed text-void-300">{f.desc}</p>
			</div>
		{/each}
	</div>
</section>
