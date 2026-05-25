<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { t } from '$lib/i18n';
	import { ui, closeCall } from '$lib/ui.svelte';
	import { PHONE_DISPLAY } from '$lib/constants';
	import { trapFocus } from '$lib/actions/trapFocus';

	let stage = $state(0); // 0 = connecting, 1 = on hold, 2 = operator

	$effect(() => {
		if (!ui.callOpen) {
			stage = 0;
			return;
		}
		stage = 0;
		const a = setTimeout(() => (stage = 1), 1500);
		const b = setTimeout(() => (stage = 2), 3800);
		return () => {
			clearTimeout(a);
			clearTimeout(b);
		};
	});

	const message = $derived(
		stage === 0 ? $t('call.connecting') : stage === 1 ? $t('call.hold') : $t('call.operator')
	);

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeCall();
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if ui.callOpen}
	<div class="z-modal fixed inset-0 grid place-items-center p-4">
		<button
			type="button"
			aria-label={$t('call.hangUp')}
			onclick={closeCall}
			transition:fade={{ duration: 180 }}
			class="modal-backdrop cursor-default"
		></button>

		<div
			role="dialog"
			aria-modal="true"
			aria-label={$t('call.title')}
			tabindex="-1"
			use:trapFocus
			transition:scale={{ duration: 240, start: 0.94 }}
			class="card relative w-full max-w-md p-7 text-center shadow-2xl"
		>
			<div class="mx-auto grid h-20 w-20 place-items-center rounded-full bg-tomato-500/15">
				<span class="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-tomato-500 to-ember-500 text-white anim-pulse-dot">
					<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="anim-ring">
						<path
							d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1z"
						/>
					</svg>
				</span>
			</div>

			<p class="mt-5 text-xs font-bold uppercase tracking-widest text-void-400">{$t('call.title')}</p>
			<p class="mt-1 font-display text-2xl font-extrabold text-cheese-300">{PHONE_DISPLAY}</p>

			<p class="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-cream-100" style="min-height:4.5rem">
				{message}
			</p>

			<div class="mt-6 flex flex-col gap-2">
				<a href="/checkout" onclick={closeCall} class="btn btn-primary">{$t('call.online')}</a>
				<button type="button" onclick={closeCall} class="btn btn-ghost text-void-300">
					{$t('call.hangUp')}
				</button>
			</div>
		</div>
	</div>
{/if}
