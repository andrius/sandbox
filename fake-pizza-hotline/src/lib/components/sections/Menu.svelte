<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import { MENU } from '$lib/data/menu';
	import { addToCart } from '$lib/cart.svelte';
	import { formatMoney } from '$lib/format';

	let addedId = $state<string | null>(null);
	let timer: ReturnType<typeof setTimeout>;

	function add(id: string) {
		addToCart(id);
		addedId = id;
		clearTimeout(timer);
		timer = setTimeout(() => (addedId = null), 1300);
	}
</script>

<section id="menu" class="scroll-mt-24 py-16">
	<div class="shell">
		<div class="reveal max-w-2xl" use:reveal>
			<p class="text-sm font-bold uppercase tracking-widest text-tomato-400">{$t('menu.kicker')}</p>
			<h2 class="mt-3 text-4xl font-extrabold sm:text-5xl">{$t('menu.title')}</h2>
			<p class="mt-4 text-lg text-void-300">{$t('menu.subtitle')}</p>
		</div>

		<div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each MENU as item, i (item.id)}
				<article class="reveal card flex flex-col p-6" use:reveal={{ delay: i * 70 }}>
					<div class="flex items-start justify-between gap-3">
						<span class="text-4xl">{item.emoji}</span>
						<div class="flex flex-wrap justify-end gap-1.5">
							{#if item.popular}
								<span class="chip border-cheese-500/30 bg-cheese-500/10 px-2 py-0.5 text-[11px] text-cheese-300">
									{$t('menu.badges.popular')}
								</span>
							{/if}
							{#if item.vegan}
								<span class="chip border-basil-400/30 bg-basil-400/10 px-2 py-0.5 text-[11px] text-basil-300">
									{$t('menu.badges.vegan')}
								</span>
							{/if}
							{#if item.gf}
								<span class="chip px-2 py-0.5 text-[11px] text-void-200">{$t('menu.badges.gf')}</span>
							{/if}
						</div>
					</div>

					<h3 class="mt-4 font-display text-xl font-bold text-cream-50">
						{$t(`menu.items.${item.id}.name`)}
					</h3>
					<p class="mt-2 text-sm leading-relaxed text-void-300">
						{$t(`menu.items.${item.id}.desc`)}
					</p>

					<div class="mt-auto flex items-center justify-between pt-6">
						<div class="leading-tight">
							<div class="text-[11px] uppercase tracking-wide text-void-400">{$t('menu.from')}</div>
							<div class="font-display text-xl font-extrabold text-cream-50">
								{formatMoney(item.price, $locale)}
							</div>
						</div>
						<button
							type="button"
							onclick={() => add(item.id)}
							class="btn text-sm transition-colors {addedId === item.id
								? 'bg-basil-500 text-white'
								: 'btn-secondary'}"
						>
							{#if addedId === item.id}
								<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
									<path d="M20 6 9 17l-5-5" />
								</svg>
								{$t('menu.added')}
							{:else}
								{$t('menu.add')}
							{/if}
						</button>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
