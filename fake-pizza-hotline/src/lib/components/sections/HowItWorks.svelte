<script lang="ts">
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	const steps = $derived($t('how.steps') as { step: string; title: string; desc: string }[]);
</script>

<section id="how" class="scroll-mt-24 py-16">
	<div class="shell">
		<div class="reveal max-w-2xl" use:reveal>
			<p class="text-sm font-bold uppercase tracking-widest text-tomato-400">{$t('how.kicker')}</p>
			<h2 class="mt-3 text-4xl font-extrabold sm:text-5xl">{$t('how.title')}</h2>
			<p class="mt-4 text-lg text-void-300">{$t('how.subtitle')}</p>
		</div>

		<div class="relative mt-12 grid gap-6 md:grid-cols-3">
			<div class="pointer-events-none absolute top-12 right-8 left-8 hidden h-px bg-gradient-to-r from-tomato-500/40 via-cheese-500/40 to-transparent md:block"></div>
			{#each steps as s, i (s.step)}
				<div class="reveal relative" use:reveal={{ delay: i * 120 }}>
					<div class="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-void-900 font-display text-2xl font-extrabold text-gradient">
						{s.step}
					</div>
					<h3 class="mt-5 font-display text-xl font-bold text-cream-50">{s.title}</h3>
					<p class="mt-2 max-w-xs text-sm leading-relaxed text-void-300">{s.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
