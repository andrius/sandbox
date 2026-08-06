<script lang="ts">
	import { pizzaT } from '$lib/products/pizza/i18n';
	import { reveal } from '$lib/actions/reveal';
	import { openCall } from '$lib/products/pizza/ui.svelte';
</script>

<section class="shell py-16">
	<div
		class="reveal relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-tomato-600/30 via-ember-500/10 to-void-900 px-6 py-16 text-center sm:px-12 sm:py-20"
		use:reveal
	>
		<div aria-hidden="true" style="font-size:9rem" class="pointer-events-none absolute -top-16 -left-10 opacity-10 anim-float">🍕</div>
		<div aria-hidden="true" style="font-size:9rem" class="pointer-events-none absolute -right-8 -bottom-20 opacity-10 anim-float-slow">📦</div>

		<h2 class="mx-auto max-w-2xl text-balance font-extrabold display-cta">
			{$pizzaT('finalCta.title')}
		</h2>
		<p class="mx-auto mt-5 max-w-xl text-lg text-void-200">{$pizzaT('finalCta.subtitle')}</p>

		<div class="mt-9 flex flex-wrap items-center justify-center gap-3">
			<a href="/pizza/checkout" class="btn btn-primary btn-lg">{$pizzaT('finalCta.primary')}</a>
			<button type="button" onclick={openCall} class="btn btn-secondary btn-lg">
				{$pizzaT('finalCta.secondary')}
			</button>
		</div>
	</div>
</section>
