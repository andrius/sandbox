<script lang="ts">
	import { slide } from 'svelte/transition';
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';

	const items = $derived($t('faq.items') as { q: string; a: string }[]);
	let open = $state<number | null>(0);

	function toggle(i: number) {
		open = open === i ? null : i;
	}
</script>

<section id="faq" class="scroll-mt-24 py-16">
	<div class="shell grid-faq">
		<div class="reveal" use:reveal>
			<p class="text-sm font-bold uppercase tracking-widest text-tomato-400">{$t('faq.kicker')}</p>
			<h2 class="mt-3 text-4xl font-extrabold sm:text-5xl">{$t('faq.title')}</h2>
		</div>

		<div class="reveal divide-y divide-white/8 border-y border-white/8" use:reveal={{ delay: 80 }}>
			{#each items as item, i (item.q)}
				<div>
					<button
						type="button"
						onclick={() => toggle(i)}
						aria-expanded={open === i}
						class="flex w-full items-center justify-between gap-4 py-5 text-left"
					>
						<span class="font-display text-base font-bold text-cream-50 sm:text-lg">{item.q}</span>
						<span
							class="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/12 text-cream-100 transition-transform duration-300 {open ===
							i
								? 'rotate-45 bg-tomato-500 text-white'
								: ''}"
						>
							<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
								<path d="M12 5v14M5 12h14" />
							</svg>
						</span>
					</button>
					{#if open === i}
						<p class="pr-12 pb-5 text-sm leading-relaxed text-void-300" transition:slide={{ duration: 240 }}>
							{item.a}
						</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
