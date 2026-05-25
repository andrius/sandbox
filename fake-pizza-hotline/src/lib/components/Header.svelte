<script lang="ts">
	import { t } from '$lib/i18n';
	import { cartCount } from '$lib/cart.svelte';
	import { openCall } from '$lib/ui.svelte';
	import Logo from './Logo.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	let scrolled = $state(false);
	let mobileOpen = $state(false);

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 12);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const links = [
		{ href: '/#menu', key: 'nav.menu' },
		{ href: '/#how', key: 'nav.how' },
		{ href: '/#guarantee', key: 'nav.guarantee' },
		{ href: '/#faq', key: 'nav.faq' }
	];

	const count = $derived(cartCount());

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') mobileOpen = false;
	}
</script>

<svelte:window onkeydown={onKeydown} />

<header
	class="fixed inset-x-0 top-0 z-50 transition-all duration-300
		{scrolled || mobileOpen ? 'border-b border-white/8 bg-void-950/80 backdrop-blur-xl' : 'border-b border-transparent'}"
>
	<div class="shell flex h-16 items-center justify-between gap-3">
		<a href="/" class="flex items-center gap-2.5 font-display text-base font-extrabold tracking-tight">
			<Logo size={34} />
			<span class="hidden sm:inline">{$t('brand.short')}</span>
		</a>

		<nav class="hidden items-center gap-1 md:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="rounded-full px-3.5 py-2 text-sm font-semibold text-void-200 transition-colors hover:bg-white/6 hover:text-cream-50"
				>
					{$t(link.key)}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<LanguageSwitcher />

			<button
				type="button"
				onclick={openCall}
				aria-label={$t('hero.secondaryCta')}
				class="hidden h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-cream-50 transition-colors hover:bg-white/12 sm:inline-flex"
			>
				<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" class="anim-ring">
					<path
						d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1z"
					/>
				</svg>
			</button>

			<a
				href="/checkout"
				class="relative inline-flex h-9 items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 text-sm font-bold text-cream-50 transition-colors hover:bg-white/12"
				aria-label="Cart"
			>
				<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M4 5h2l1.6 9.3a2 2 0 0 0 2 1.7h6.9a2 2 0 0 0 2-1.6L20 8H7" />
					<circle cx="10" cy="20" r="1" />
					<circle cx="17" cy="20" r="1" />
				</svg>
				{#if count > 0}
					<span
						class="grid min-w-5 place-items-center rounded-full bg-tomato-500 px-1.5 text-xs font-extrabold text-white"
					>
						{count}
					</span>
				{/if}
			</a>

			<a href="/checkout" class="btn btn-primary hidden h-9 px-4 py-0 text-sm sm:inline-flex">
				{$t('nav.order')}
			</a>

			<button
				type="button"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label="Menu"
				aria-expanded={mobileOpen}
				aria-controls="mobile-menu"
				class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-cream-50 transition-colors hover:bg-white/12 md:hidden"
			>
				{#if mobileOpen}
					<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
						<path d="M6 6l12 12M18 6L6 18" />
					</svg>
				{:else}
					<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
						<path d="M4 7h16M4 12h16M4 17h16" />
					</svg>
				{/if}
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<div id="mobile-menu" class="border-t border-white/8 md:hidden">
			<nav class="shell flex flex-col gap-1 py-4">
				{#each links as link (link.href)}
					<a
						href={link.href}
						onclick={() => (mobileOpen = false)}
						class="rounded-xl px-3 py-3 text-base font-semibold text-cream-100 transition-colors hover:bg-white/6"
					>
						{$t(link.key)}
					</a>
				{/each}
				<button
					type="button"
					onclick={() => {
						mobileOpen = false;
						openCall();
					}}
					class="rounded-xl px-3 py-3 text-left text-base font-semibold text-cream-100 transition-colors hover:bg-white/6"
				>
					{$t('hero.secondaryCta')}
				</button>
				<a href="/checkout" onclick={() => (mobileOpen = false)} class="btn btn-primary mt-2 w-full">
					{$t('nav.order')}
				</a>
			</nav>
		</div>
	{/if}
</header>
