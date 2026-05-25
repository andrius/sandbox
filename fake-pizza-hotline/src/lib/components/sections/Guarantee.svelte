<script lang="ts">
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	const points = $derived($t('guarantee.points') as string[]);
</script>

<section id="guarantee" class="scroll-mt-24 py-16">
	<div class="shell">
		<div
			class="reveal relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-tomato-600/25 via-void-900 to-void-900 p-8 sm:p-14"
			use:reveal
		>
			<div
				aria-hidden="true"
				class="absolute -top-10 -right-10 hidden h-44 w-44 rotate-12 place-items-center rounded-full border-4 border-dashed border-cheese-400/40 text-center sm:grid"
			>
				<span class="font-display text-sm font-extrabold uppercase leading-tight text-cheese-300">
					100%<br />NO<br />PIZZA
				</span>
			</div>

			<p class="text-sm font-bold uppercase tracking-widest text-cheese-300">{$t('guarantee.kicker')}</p>
			<h2 class="mt-4 max-w-3xl text-balance text-3xl font-extrabold leading-tight sm:text-5xl">
				{$t('guarantee.title')}
			</h2>
			<p class="mt-5 max-w-2xl text-lg leading-relaxed text-void-200">{$t('guarantee.body')}</p>

			<ul class="mt-9 grid gap-3 sm:grid-cols-3">
				{#each points as point (point)}
					<li class="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/3 p-4">
						<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="mt-0.5 shrink-0 text-basil-400">
							<path d="M20 6 9 17l-5-5" />
						</svg>
						<span class="text-sm leading-relaxed text-cream-100">{point}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
