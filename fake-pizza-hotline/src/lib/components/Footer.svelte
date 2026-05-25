<script lang="ts">
	import { t } from '$lib/i18n';
	import { PHONE_DISPLAY } from '$lib/constants';
	import { openCall } from '$lib/ui.svelte';
	import Logo from './Logo.svelte';

	const year = new Date().getFullYear();

	const explore = [
		{ href: '/#menu', key: 'footer.links.menu' },
		{ href: '/#how', key: 'footer.links.how' },
		{ href: '/#guarantee', key: 'footer.links.guarantee' },
		{ href: '/#faq', key: 'footer.links.faq' }
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
					<span>{$t('brand.short')}</span>
				</div>
				<p class="mt-4 text-sm leading-relaxed text-void-300">{$t('footer.tagline')}</p>
				<div class="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2">
					<span class="text-xs font-semibold uppercase tracking-wide text-void-400">
						{$t('hero.phoneLabel')}
					</span>
					<span class="font-display text-base font-bold text-cheese-300">{PHONE_DISPLAY}</span>
				</div>
			</div>

			<div>
				<h3 class="text-xs font-bold uppercase tracking-widest text-void-400">{$t('footer.explore')}</h3>
				<ul class="mt-4 space-y-3 text-sm">
					{#each explore as item (item.href)}
						<li>
							<a class="text-void-200 transition-colors hover:text-cream-50" href={item.href}>
								{$t(item.key)}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="text-xs font-bold uppercase tracking-widest text-void-400">{$t('footer.notLegal')}</h3>
				<ul class="mt-4 space-y-3 text-sm">
					{#each notLegal as key (key)}
						<li>
							<a
								class="text-void-200 transition-colors hover:text-cream-50"
								href="#top"
								onclick={(e) => e.preventDefault()}
							>
								{$t(key)}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="text-xs font-bold uppercase tracking-widest text-void-400">{$t('footer.contact')}</h3>
				<ul class="mt-4 space-y-3 text-sm text-void-200">
					<li>{$t('openStatus.hoursShort')}</li>
					<li>
						<button class="text-cheese-300 transition-colors hover:text-cheese-200" onclick={openCall}>
							{$t('hero.secondaryCta')} →
						</button>
					</li>
				</ul>
			</div>
		</div>

		<p class="mt-12 max-w-3xl text-xs leading-relaxed text-void-400">{$t('footer.disclaimer')}</p>

		<div class="mt-8 flex flex-col items-start justify-between gap-3 border-t border-white/8 py-7 text-xs text-void-400 sm:flex-row sm:items-center">
			<span>{$t('footer.rights', { year })}</span>
			<span>{$t('footer.madeWith')}</span>
		</div>
	</div>

	<div
		aria-hidden="true"
		class="wordmark-bg pointer-events-none select-none overflow-hidden whitespace-nowrap text-center font-display font-extrabold leading-none text-white/3"
	>
		NO PIZZA
	</div>
</footer>
