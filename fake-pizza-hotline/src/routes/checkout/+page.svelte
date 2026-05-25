<script lang="ts">
	import { fade, fly, scale } from 'svelte/transition';
	import { t, locale } from '$lib/i18n';
	import { cart, setQty, removeFromCart, clearCart } from '$lib/cart.svelte';
	import { menuById } from '$lib/data/menu';
	import { formatMoney } from '$lib/format';
	import { TAX_RATE, TEST_CARD } from '$lib/constants';
	import VoidPizza from '$lib/components/VoidPizza.svelte';

	type Stage = 'form' | 'processing' | 'success';
	let stage = $state<Stage>('form');

	// form state
	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let address = $state('');
	let city = $state('');
	let zip = $state('');
	let card = $state('');
	let expiry = $state('');
	let cvc = $state('');
	let cardName = $state('');
	let agree = $state(false);
	let errors = $state<Record<string, string>>({});

	// processing / success
	let procStep = $state(0);
	let orderNo = $state('');
	let trackRevealed = $state(false);

	const lines = $derived(
		cart.lines
			.map((l) => {
				const m = menuById(l.id);
				return m ? { id: l.id, qty: l.qty, price: m.price, emoji: m.emoji } : null;
			})
			.filter((l): l is { id: string; qty: number; price: number; emoji: string } => l !== null)
	);
	const subtotal = $derived(lines.reduce((sum, l) => sum + l.price * l.qty, 0));
	const tax = $derived(subtotal * TAX_RATE);
	const steps = $derived($t('checkout.processing.steps') as string[]);
	const successStages = $derived($t('checkout.success.stages') as string[]);

	function setError(field: string, msg: string | null) {
		if (msg) {
			errors = { ...errors, [field]: msg };
		} else if (errors[field]) {
			const next = { ...errors };
			delete next[field];
			errors = next;
		}
	}
	const clearError = (field: string) => setError(field, null);

	function validateField(field: string) {
		const req = $t('checkout.errors.required');
		if (field === 'name') setError('name', name.trim() ? null : req);
		else if (field === 'email')
			setError(
				'email',
				!email.trim() ? req : /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? null : $t('checkout.errors.email')
			);
		else if (field === 'card') {
			const d = card.replace(/\s/g, '');
			setError('card', !d ? req : d.length < 16 ? $t('checkout.errors.card') : null);
		} else if (field === 'expiry')
			setError('expiry', /^\d{2}\/\d{2}$/.test(expiry) ? null : $t('checkout.errors.expiry'));
		else if (field === 'cvc') setError('cvc', cvc.length >= 3 ? null : $t('checkout.errors.cvc'));
		else if (field === 'agree') setError('agree', agree ? null : $t('checkout.errors.agree'));
	}

	function onCardInput(e: Event) {
		const digits = (e.currentTarget as HTMLInputElement).value.replace(/\D/g, '').slice(0, 16);
		card = digits.replace(/(.{4})/g, '$1 ').trim();
		clearError('card');
	}
	function onExpiryInput(e: Event) {
		let v = (e.currentTarget as HTMLInputElement).value.replace(/\D/g, '').slice(0, 4);
		if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
		expiry = v;
		clearError('expiry');
	}
	function onCvcInput(e: Event) {
		cvc = (e.currentTarget as HTMLInputElement).value.replace(/\D/g, '').slice(0, 3);
		clearError('cvc');
	}

	function useTestCard() {
		card = TEST_CARD;
		expiry = '12/34';
		cvc = '123';
		if (!cardName) cardName = name.toUpperCase() || 'JANE NOPIZZA';
	}

	function validate(): boolean {
		const e: Record<string, string> = {};
		const req = $t('checkout.errors.required');
		if (!name.trim()) e.name = req;
		if (!email.trim()) e.email = req;
		else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = $t('checkout.errors.email');
		const digits = card.replace(/\s/g, '');
		if (!digits) e.card = req;
		else if (digits.length < 16) e.card = $t('checkout.errors.card');
		if (!/^\d{2}\/\d{2}$/.test(expiry)) e.expiry = $t('checkout.errors.expiry');
		if (cvc.length < 3) e.cvc = $t('checkout.errors.cvc');
		if (!agree) e.agree = $t('checkout.errors.agree');
		errors = e;
		return Object.keys(e).length === 0;
	}

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!validate()) {
			document.querySelector('.field.invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			return;
		}
		stage = 'processing';
	}

	// Once the success screen mounts, let the "non-tracking" bar animate in,
	// then stall forever at "Never arriving".
	$effect(() => {
		if (stage !== 'success') {
			trackRevealed = false;
			return;
		}
		const id = setTimeout(() => (trackRevealed = true), 80);
		return () => clearTimeout(id);
	});

	$effect(() => {
		if (stage !== 'processing') return;
		procStep = 0;
		const total = steps.length;
		const id = setInterval(() => {
			procStep += 1;
			if (procStep >= total) {
				clearInterval(id);
				orderNo = 'FPH-' + Math.floor(100000 + Math.random() * 900000);
				clearCart();
				stage = 'success';
			}
		}, 760);
		return () => clearInterval(id);
	});
</script>

<svelte:head>
	<title>{$t('checkout.title')} · {$t('brand.short')}</title>
</svelte:head>

<section class="shell pt-24 pb-10">
	<a
		href="/#menu"
		class="inline-flex items-center gap-1.5 text-sm font-semibold text-void-300 transition-colors hover:text-cream-50"
	>
		<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M15 18l-6-6 6-6" />
		</svg>
		{$t('checkout.back')}
	</a>

	<h1 class="mt-5 font-display text-4xl font-extrabold sm:text-5xl">{$t('checkout.title')}</h1>

	<div class="mt-5 flex items-start gap-3 rounded-2xl border border-cheese-500/30 bg-cheese-500/8 p-4 text-sm text-cheese-100">
		<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="mt-0.5 shrink-0 text-cheese-300">
			<path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
		</svg>
		<span>{$t('checkout.simBanner')}</span>
	</div>

	{#if stage === 'success'}
		<!-- SUCCESS -->
		<div class="mt-8" in:fade={{ duration: 300 }}>
			<div class="card overflow-hidden p-8 text-center sm:p-12" in:scale={{ duration: 320, start: 0.96 }}>
				<div class="relative mx-auto h-28 w-28" role="img" aria-label={$t('checkout.success.mascotAlt')}>
					<VoidPizza size={112} class="anim-float-slow drop-shadow-2xl" />
					<span
						class="absolute right-0 bottom-1 grid h-9 w-9 place-items-center rounded-full bg-basil-500 text-white"
						style="box-shadow: 0 0 0 4px var(--color-void-950)"
					>
						<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path class="anim-check" d="M20 6 9 17l-5-5" />
						</svg>
					</span>
				</div>
				<h2 class="mx-auto mt-6 max-w-xl text-balance text-3xl font-extrabold sm:text-4xl">
					{$t('checkout.success.title')}
				</h2>
				<p class="mx-auto mt-4 max-w-lg text-void-200">{$t('checkout.success.subtitle')}</p>

				<div class="mx-auto mt-8 grid max-w-lg gap-3 sm:grid-cols-3">
					<div class="anim-rise rounded-2xl border border-white/8 bg-white/3 p-4" style="animation-delay: 0.25s">
						<div class="text-[11px] uppercase tracking-wide text-void-400">{$t('checkout.success.orderNo')}</div>
						<div class="mt-1 font-display text-sm font-extrabold text-cream-50">{orderNo}</div>
					</div>
					<div class="anim-rise rounded-2xl border border-white/8 bg-white/3 p-4" style="animation-delay: 0.35s">
						<div class="text-[11px] uppercase tracking-wide text-void-400">{$t('checkout.success.charged')}</div>
						<div class="mt-1 font-display text-sm font-extrabold text-cheese-300">{formatMoney(0, $locale)}</div>
					</div>
					<div class="anim-rise rounded-2xl border border-white/8 bg-white/3 p-4" style="animation-delay: 0.45s">
						<div class="text-[11px] uppercase tracking-wide text-void-400">{$t('checkout.success.etaLabel')}</div>
						<div class="mt-1 font-display text-sm font-extrabold text-tomato-400">{$t('checkout.success.eta')}</div>
					</div>
				</div>

				<!-- non-tracking -->
				<div class="mx-auto mt-9 max-w-lg text-left">
					<div class="mb-4 text-sm font-bold uppercase tracking-widest text-void-400">
						{$t('checkout.success.trackingTitle')}
					</div>
					<div class="relative flex justify-between">
						<div class="absolute top-3 right-3 left-3 h-0.5 bg-white/10"></div>
						<div class="track-fill absolute top-3 left-3 h-0.5 bg-gradient-to-r from-basil-500 to-cheese-500" style="transform: scaleX({trackRevealed ? 1 : 0})"></div>
						{#each successStages as st, i (st)}
							<div class="relative z-10 flex w-1/4 flex-col items-center text-center">
								<span
									class="grid h-6 w-6 place-items-center rounded-full border-2 transition-colors duration-300 {i < 3
										? trackRevealed
											? 'border-cheese-400 bg-cheese-400 text-void-950'
											: 'border-white/15 bg-void-900 text-transparent'
										: 'border-tomato-500 bg-void-900 text-tomato-400 anim-pulse-dot'}"
									style={i < 3 ? `transition-delay:${i * 0.45}s` : ''}
								>
									{#if i < 3}
										<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
											<path d="M20 6 9 17l-5-5" />
										</svg>
									{/if}
								</span>
								<span class="mt-2 text-[11px] leading-tight text-void-300">{st}</span>
							</div>
						{/each}
					</div>
				</div>

				<p class="mt-9 text-xs italic text-void-400">{$t('checkout.success.receiptNote')}</p>

				<div class="mt-6 flex flex-wrap justify-center gap-3">
					<a href="/#menu" class="btn btn-primary">{$t('checkout.success.again')}</a>
					<a href="/" class="btn btn-secondary">{$t('checkout.success.home')}</a>
				</div>
			</div>
		</div>
	{:else if stage === 'processing'}
		<!-- PROCESSING -->
		<div class="mt-8" in:fade={{ duration: 200 }}>
			<div class="card mx-auto max-w-lg p-10 text-center">
				<div class="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-tomato-500"></div>
				<h2 class="mt-7 font-display text-2xl font-extrabold">{$t('checkout.processing.title')}</h2>
				{#key procStep}
					<p class="mx-auto mt-3 max-w-sm text-void-200" style="min-height:3rem" in:fly={{ y: 8, duration: 240 }}>
						{steps[Math.min(procStep, steps.length - 1)]}
					</p>
				{/key}
				<div class="mt-6 h-2 overflow-hidden rounded-full bg-white/8">
					<div
						class="h-full rounded-full bg-gradient-to-r from-tomato-500 to-cheese-400 transition-all duration-500"
						style="width: {Math.round((procStep / steps.length) * 100)}%"
					></div>
				</div>
			</div>
		</div>
	{:else if lines.length === 0}
		<!-- EMPTY -->
		<div class="mt-8 card p-10 text-center sm:p-16">
			<div class="text-6xl">🕳️</div>
			<h2 class="mt-5 font-display text-2xl font-extrabold">{$t('checkout.empty.title')}</h2>
			<p class="mx-auto mt-3 max-w-md text-void-300">{$t('checkout.empty.subtitle')}</p>
			<a href="/#menu" class="btn btn-primary mt-7">{$t('checkout.empty.cta')}</a>
		</div>
	{:else}
		<!-- FORM -->
		<form class="mt-8 grid-checkout" onsubmit={submit} novalidate>
			<div class="space-y-5">
				<!-- contact -->
				<fieldset class="card p-6">
					<legend class="px-1 font-display text-lg font-bold">{$t('checkout.form.contactTitle')}</legend>
					<div class="mt-4 grid gap-4 sm:grid-cols-2">
						<div class="sm:col-span-2">
							<label class="label" for="name">{$t('checkout.form.name')}</label>
							<input id="name" class="field" class:invalid={errors.name} bind:value={name} oninput={() => clearError('name')} onblur={() => validateField('name')} placeholder={$t('checkout.form.namePlaceholder')} autocomplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
							{#if errors.name}<p id="name-error" role="alert" class="mt-1.5 text-xs text-tomato-400">{errors.name}</p>{/if}
						</div>
						<div>
							<label class="label" for="email">{$t('checkout.form.email')}</label>
							<input id="email" class="field" class:invalid={errors.email} bind:value={email} oninput={() => clearError('email')} onblur={() => validateField('email')} placeholder={$t('checkout.form.emailPlaceholder')} inputmode="email" autocomplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
							{#if errors.email}<p id="email-error" role="alert" class="mt-1.5 text-xs text-tomato-400">{errors.email}</p>{/if}
						</div>
						<div>
							<label class="label" for="phone">{$t('checkout.form.phone')}</label>
							<input id="phone" class="field" bind:value={phone} placeholder={$t('checkout.form.phonePlaceholder')} autocomplete="tel" />
						</div>
					</div>
				</fieldset>

				<!-- address -->
				<fieldset class="card p-6">
					<legend class="px-1 font-display text-lg font-bold">{$t('checkout.form.addressTitle')}</legend>
					<p class="mt-1 px-1 text-xs italic text-void-400">{$t('checkout.form.addressNote')}</p>
					<div class="mt-4 grid gap-4 sm:grid-cols-2">
						<div class="sm:col-span-2">
							<label class="label" for="address">{$t('checkout.form.address')}</label>
							<input id="address" class="field" bind:value={address} placeholder={$t('checkout.form.addressPlaceholder')} autocomplete="street-address" />
						</div>
						<div>
							<label class="label" for="city">{$t('checkout.form.city')}</label>
							<input id="city" class="field" bind:value={city} placeholder={$t('checkout.form.cityPlaceholder')} autocomplete="address-level2" />
						</div>
						<div>
							<label class="label" for="zip">{$t('checkout.form.zip')}</label>
							<input id="zip" class="field" bind:value={zip} placeholder={$t('checkout.form.zipPlaceholder')} autocomplete="postal-code" />
						</div>
					</div>
				</fieldset>

				<!-- payment -->
				<fieldset class="card p-6">
					<div class="flex items-center justify-between gap-3">
						<legend class="px-1 font-display text-lg font-bold">{$t('checkout.form.paymentTitle')}</legend>
						<button type="button" onclick={useTestCard} class="chip transition-colors hover:bg-white/10">
							{$t('checkout.form.useTestCard')}
						</button>
					</div>
					<div class="mt-4 grid gap-4 sm:grid-cols-2">
						<div class="sm:col-span-2">
							<label class="label" for="card">{$t('checkout.form.card')}</label>
							<div class="relative">
								<input id="card" class="field pr-12" class:invalid={errors.card} value={card} oninput={onCardInput} onblur={() => validateField('card')} placeholder={$t('checkout.form.cardPlaceholder')} inputmode="numeric" autocomplete="off" aria-invalid={!!errors.card} aria-describedby={errors.card ? 'card-error' : undefined} />
								<span class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-lg" aria-hidden="true">💳</span>
							</div>
							{#if errors.card}<p id="card-error" role="alert" class="mt-1.5 text-xs text-tomato-400">{errors.card}</p>{/if}
						</div>
						<div>
							<label class="label" for="expiry">{$t('checkout.form.expiry')}</label>
							<input id="expiry" class="field" class:invalid={errors.expiry} value={expiry} oninput={onExpiryInput} onblur={() => validateField('expiry')} placeholder={$t('checkout.form.expiryPlaceholder')} inputmode="numeric" autocomplete="off" aria-invalid={!!errors.expiry} aria-describedby={errors.expiry ? 'expiry-error' : undefined} />
							{#if errors.expiry}<p id="expiry-error" role="alert" class="mt-1.5 text-xs text-tomato-400">{errors.expiry}</p>{/if}
						</div>
						<div>
							<label class="label" for="cvc">{$t('checkout.form.cvc')}</label>
							<input id="cvc" class="field" class:invalid={errors.cvc} value={cvc} oninput={onCvcInput} onblur={() => validateField('cvc')} placeholder={$t('checkout.form.cvcPlaceholder')} inputmode="numeric" autocomplete="off" aria-invalid={!!errors.cvc} aria-describedby={errors.cvc ? 'cvc-error' : undefined} />
							{#if errors.cvc}<p id="cvc-error" role="alert" class="mt-1.5 text-xs text-tomato-400">{errors.cvc}</p>{/if}
						</div>
						<div class="sm:col-span-2">
							<label class="label" for="cardName">{$t('checkout.form.cardName')}</label>
							<input id="cardName" class="field" bind:value={cardName} placeholder={$t('checkout.form.cardNamePlaceholder')} autocomplete="cc-name" />
						</div>
					</div>
				</fieldset>
			</div>

			<!-- summary -->
			<aside class="card p-6 lg:sticky lg:top-24">
				<h2 class="font-display text-lg font-bold">{$t('checkout.summary.title')}</h2>

				<ul class="mt-4 space-y-4">
					{#each lines as line (line.id)}
						<li class="flex items-start gap-3">
							<span class="text-2xl">{line.emoji}</span>
							<div class="min-w-0 flex-1">
								<div class="truncate text-sm font-bold text-cream-50">{$t(`menu.items.${line.id}.name`)}</div>
								<div class="mt-0.5 text-xs text-void-400">
									{formatMoney(line.price, $locale)} {$t('checkout.summary.each')}
								</div>
								<div class="mt-2 flex items-center gap-2">
									<div class="inline-flex items-center rounded-lg border border-white/12">
										<button type="button" class="px-2.5 py-1 text-void-200 hover:text-cream-50" onclick={() => setQty(line.id, line.qty - 1)} aria-label="−">−</button>
										<span class="w-7 text-center text-sm font-bold">{line.qty}</span>
										<button type="button" class="px-2.5 py-1 text-void-200 hover:text-cream-50" onclick={() => setQty(line.id, line.qty + 1)} aria-label="+">+</button>
									</div>
									<button type="button" class="text-xs text-void-400 underline-offset-2 hover:text-tomato-400 hover:underline" onclick={() => removeFromCart(line.id)}>
										{$t('checkout.summary.remove')}
									</button>
								</div>
							</div>
							<span class="font-display text-sm font-bold text-cream-50">{formatMoney(line.price * line.qty, $locale)}</span>
						</li>
					{/each}
				</ul>

				<hr class="hairline my-5" />

				<dl class="space-y-2.5 text-sm">
					<div class="flex justify-between">
						<dt class="text-void-300">{$t('checkout.summary.subtotal')}</dt>
						<dd class="text-cream-100">{formatMoney(subtotal, $locale)}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-void-300">{$t('checkout.summary.tax')}</dt>
						<dd class="text-cream-100">{formatMoney(tax, $locale)}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-void-300">{$t('checkout.summary.delivery')}</dt>
						<dd class="text-basil-300">{$t('checkout.summary.deliveryFree')}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-void-300">{$t('checkout.summary.discount')}</dt>
						<dd class="text-basil-300">−{formatMoney(subtotal + tax, $locale)}</dd>
					</div>
				</dl>

				<hr class="hairline my-5" />

				<div class="flex items-end justify-between">
					<span class="font-display text-base font-bold">{$t('checkout.summary.total')}</span>
					<span class="font-display text-3xl font-extrabold text-cheese-300">{formatMoney(0, $locale)}</span>
				</div>

				<label class="mt-6 flex cursor-pointer items-start gap-3 text-sm text-void-200">
					<input type="checkbox" bind:checked={agree} onchange={() => validateField('agree')} class="mt-0.5 h-4 w-4 shrink-0 accent-tomato-500" aria-invalid={!!errors.agree} aria-describedby={errors.agree ? 'agree-error' : undefined} />
					<span>{$t('checkout.form.agree')}</span>
				</label>
				{#if errors.agree}<p id="agree-error" role="alert" class="mt-1.5 text-xs text-tomato-400">{errors.agree}</p>{/if}

				<p class="mt-5 flex items-center gap-2 rounded-xl border border-cheese-500/30 bg-cheese-500/8 px-3 py-2 text-xs text-cheese-100">
					<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="shrink-0 text-cheese-300">
						<path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
					</svg>
					{$t('checkout.summary.simNote')}
				</p>

				<button type="submit" class="btn btn-primary mt-3 w-full py-3.5">
					{$t('checkout.form.pay', { amount: formatMoney(0, $locale) })}
				</button>
				<p class="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-void-400">
					<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="3" y="11" width="18" height="11" rx="2" />
						<path d="M7 11V7a5 5 0 0 1 10 0v4" />
					</svg>
					{$t('checkout.secured')}
				</p>
			</aside>
		</form>
	{/if}
</section>
