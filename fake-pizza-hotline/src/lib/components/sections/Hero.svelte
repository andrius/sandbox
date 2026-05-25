<script lang="ts">
	import { t } from '$lib/i18n';
	import { openCall } from '$lib/ui.svelte';
	import { getOpenStatus, formatCountdown } from '$lib/hours';
	import { PHONE_DISPLAY } from '$lib/constants';
	import VoidPizza from '$lib/components/VoidPizza.svelte';

	let now = $state<Date | null>(null);

	$effect(() => {
		now = new Date();
		const id = setInterval(() => (now = new Date()), 30000);
		return () => clearInterval(id);
	});

	const status = $derived(now ? getOpenStatus(now) : null);
</script>

<section class="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
	<div class="shell grid-hero">
		<!-- Copy -->
		<div>
			<div class="anim-rise" style="animation-delay: 40ms">
				{#if status}
					<span class="chip">
						<span
							class="h-2 w-2 rounded-full {status.isOpen
								? 'bg-basil-400 anim-pulse-dot'
								: 'bg-tomato-500'}"
						></span>
						{status.isOpen
							? $t('openStatus.openNow')
							: $t('openStatus.opensIn', {
									time: formatCountdown(
										status.minutesUntilOpen,
										$t('openStatus.unitH'),
										$t('openStatus.unitM')
									)
								})}
					</span>
				{:else}
					<span class="chip">{$t('openStatus.hoursShort')}</span>
				{/if}
			</div>

			<h1 class="anim-rise mt-6 font-display display-hero" style="animation-delay: 100ms">
				<span class="block text-cheese-300">{$t('hero.titleTop')}</span>
				<span class="block text-cream-50">{$t('hero.titleBottom')}</span>
			</h1>

			<p class="anim-rise mt-6 max-w-md text-lg leading-relaxed text-void-200" style="animation-delay: 160ms">
				{$t('hero.subtitle')}
			</p>

			<div class="anim-rise mt-8 flex flex-wrap items-center gap-3" style="animation-delay: 220ms">
				<a href="/checkout" class="btn btn-primary btn-lg">{$t('hero.primaryCta')}</a>
				<button type="button" onclick={openCall} class="btn btn-secondary btn-lg">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
						<path
							d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1z"
						/>
					</svg>
					{$t('hero.secondaryCta')}
				</button>
			</div>

			<div class="anim-rise mt-6 flex items-center gap-2.5 text-sm text-void-300" style="animation-delay: 280ms">
				<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="shrink-0 text-basil-400">
					<path d="M20 6 9 17l-5-5" />
				</svg>
				<span>{$t('hero.guaranteeBadge')}</span>
			</div>
		</div>

		<!-- Illustration -->
		<div class="relative mx-auto h-[24rem] w-full max-w-md sm:h-[28rem]">
			<div class="absolute inset-0 grid place-items-center">
				<div class="h-64 w-64 rounded-full bg-tomato-500/15 blur-3xl anim-float-slow"></div>
			</div>
			<div class="absolute inset-0 grid place-items-center">
				<div class="anim-float">
					<div class="anim-spin-slow">
						<VoidPizza size={340} class="max-w-full drop-shadow-2xl" />
					</div>
				</div>
			</div>

			<!-- Floating order card -->
			<div class="absolute -bottom-2 -left-2 rotate-[-7deg] anim-float-slow">
				<div class="card flex items-center gap-3 px-4 py-3 backdrop-blur-md">
					<span class="text-2xl">📦</span>
					<div class="text-left">
						<div class="text-[11px] font-semibold uppercase tracking-wide text-void-400">
							{$t('hero.boxLabel')}
						</div>
						<div class="font-display text-base font-extrabold text-cream-50">{$t('hero.boxValue')}</div>
					</div>
				</div>
			</div>

			<!-- Floating price chip -->
			<div class="absolute top-2 right-0 rotate-[6deg] anim-float">
				<div class="card px-4 py-2 text-center backdrop-blur-md">
					<div class="font-display text-lg font-extrabold text-cheese-300">$0.00</div>
					<div class="text-[10px] uppercase tracking-wide text-void-400">{PHONE_DISPLAY}</div>
				</div>
			</div>
		</div>
	</div>
</section>
