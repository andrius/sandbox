<script lang="ts">
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
</script>

<section class="shell py-16">
	<div class="reveal mx-auto max-w-2xl" use:reveal>
		<div class="relative overflow-hidden rounded-[2rem] border border-dashed border-white/15 bg-void-900/60 p-8 text-center sm:p-12">
			<p class="text-sm font-bold uppercase tracking-widest text-cheese-300">{$t('hours.kicker')}</p>
			<h2 class="mx-auto mt-4 max-w-md text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
				{$t('hours.title')}
			</h2>

			<div class="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
				<div class="flex-1 rounded-2xl border border-white/8 bg-white/3 p-5">
					<div class="text-xs font-semibold uppercase tracking-widest text-void-400">
						{$t('hours.fromLabel')}
					</div>
					<div class="mt-1 font-display text-lg font-extrabold text-cream-50">{$t('hours.from')}</div>
				</div>
				<div class="font-display text-2xl text-tomato-400">→</div>
				<div class="flex-1 rounded-2xl border border-white/8 bg-white/3 p-5">
					<div class="text-xs font-semibold uppercase tracking-widest text-void-400">
						{$t('hours.toLabel')}
					</div>
					<div class="mt-1 font-display text-lg font-extrabold text-cream-50">{$t('hours.to')}</div>
				</div>
			</div>

			<p class="mx-auto mt-7 max-w-md text-sm leading-relaxed text-void-300">{$t('hours.note')}</p>
			<hr class="hairline my-6" />
			<p class="text-xs italic text-void-400">{$t('hours.reserveNote')}</p>
		</div>
	</div>
</section>
