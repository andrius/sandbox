<script lang="ts">
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	const items = $derived(
		$t('testimonials.items') as { quote: string; name: string; city: string }[]
	);
</script>

<section class="shell py-16">
	<div class="reveal max-w-2xl" use:reveal>
		<p class="text-sm font-bold uppercase tracking-widest text-tomato-400">{$t('testimonials.kicker')}</p>
		<h2 class="mt-3 text-4xl font-extrabold sm:text-5xl">{$t('testimonials.title')}</h2>
	</div>

	<div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each items as item, i (item.name + i)}
			<figure class="reveal card flex flex-col p-6" use:reveal={{ delay: i * 80 }}>
				<div class="flex gap-0.5 text-cheese-400" aria-hidden="true">
					{#each Array(5) as _, s (s)}
						<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
							<path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 6 20.4l1.4-6.8L2.3 9l6.9-.7z" />
						</svg>
					{/each}
				</div>
				<blockquote class="mt-4 grow text-sm leading-relaxed text-cream-100">“{item.quote}”</blockquote>
				<figcaption class="mt-5 border-t border-white/8 pt-4 text-sm">
					<span class="font-bold text-cream-50">{item.name}</span>
					<span class="text-void-400"> · {item.city}</span>
				</figcaption>
			</figure>
		{/each}
	</div>
</section>
