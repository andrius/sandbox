<script lang="ts">
	import { pizzaT } from '$lib/i18n/pizza';
	import { PHONE_DISPLAY } from '$lib/pizza/constants';
	import { openCall } from '$lib/pizza/ui.svelte';
	import Logo from './Logo.svelte';

	const year = new Date().getFullYear();

	const explore = [
		{ href: '/pizza#menu', key: 'footer.links.menu' },
		{ href: '/pizza#how', key: 'footer.links.how' },
		{ href: '/pizza#guarantee', key: 'footer.links.guarantee' },
		{ href: '/pizza#faq', key: 'footer.links.faq' }
	];
	const notLegal = [
		'footer.links.terms',
		'footer.links.privacy',
		'footer.links.refunds',
		'footer.links.careers'
	];
</script>

<footer class="relative mt-24 overflow-hidden border-t border-white/8 pt-16">
	<div class="shell">
		<div class="grid-footer">
			<div class="max-w-sm">
				<div class="flex items-center gap-2.5 font-display text-lg font-extrabold">
					<Logo size={38} />
					<span>{$pizzaT('brand.short')}</span>
				</div>
				<p class="mt-4 text-sm leading-relaxed text-void-300">{$pizzaT('footer.tagline')}</p>
				<div class="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2">
					<span class="text-xs font-semibold uppercase tracking-wide text-void-400">
						{$pizzaT('hero.phoneLabel')}
					</span>
					<span class="font-display text-base font-bold text-cheese-300">{PHONE_DISPLAY}</span>
				</div>
			</div>

			<div>
				<h3 class="text-xs font-bold uppercase tracking-widest text-void-400">{$pizzaT('footer.explore')}</h3>
				<ul class="mt-4 space-y-3 text-sm">
					{#each explore as item (item.href)}
						<li>
							<a class="text-void-200 transition-colors hover:text-cream-50" href={item.href}>
								{$pizzaT(item.key)}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="text-xs font-bold uppercase tracking-widest text-void-400">{$pizzaT('footer.notLegal')}</h3>
				<ul class="mt-4 space-y-3 text-sm">
					{#each notLegal as key (key)}
						<li>
							<a
								class="text-void-200 transition-colors hover:text-cream-50"
								href="#top"
								onclick={(e) => e.preventDefault()}
							>
								{$pizzaT(key)}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="text-xs font-bold uppercase tracking-widest text-void-400">{$pizzaT('footer.contact')}</h3>
				<ul class="mt-4 space-y-3 text-sm text-void-200">
					<li>{$pizzaT('openStatus.hoursShort')}</li>
					<li>
						<button class="text-cheese-300 transition-colors hover:text-cheese-200" onclick={openCall}>
							{$pizzaT('hero.secondaryCta')} →
						</button>
					</li>
				</ul>
			</div>
		</div>

		<p class="mt-12 max-w-3xl text-xs leading-relaxed text-void-400">{$pizzaT('footer.disclaimer')}</p>

		<div class="mt-8 flex flex-col items-start justify-between gap-3 border-t border-white/8 py-7 text-xs text-void-400 sm:flex-row sm:items-center">
			<span>{$pizzaT('footer.rights', { year })}</span>
			<span>{$pizzaT('footer.madeWith')}</span>
		</div>
	</div>

	<div
		aria-hidden="true"
		class="wordmark-bg pointer-events-none select-none overflow-hidden whitespace-nowrap text-center font-display font-extrabold leading-none text-white/3"
	>
		NO PIZZA
	</div>
</footer>
