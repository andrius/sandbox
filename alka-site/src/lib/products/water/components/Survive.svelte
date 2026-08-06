<script lang="ts">
	import type { Dict } from '$lib/products/water/i18n/content';

	let { t }: { t: Dict } = $props();

	// `$derived` so a locale switch (which mutates `t` from the parent) re-runs
	// the warn-detection; otherwise a one-time `.map` would freeze step text in
	// the language active at first paint.
	const bodySteps = $derived(
		t.guideBody.steps.map((s, i) => {
			const warn = s.includes('112');
			return { n: i + 1, warn, text: warn ? s.replace('⚠️ ', '') : s };
		})
	);
</script>

<section class="survive" id="survive">
	<div class="wrap">
		<div class="section-head" data-reveal style="margin-bottom:42px">
			<span class="eyebrow">{t.surviveEyebrow}</span>
		</div>
		<div class="guides">
			<div class="guide" data-reveal>
				<div class="emoji">🏠</div>
				<h3>{t.guideHome.title}</h3>
				<ul>
					{#each t.guideHome.steps as step, i (i)}
						<li class="step">
							<span class="n">{i + 1}</span>
							<span class="text">{step}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="guide" data-reveal>
				<div class="emoji">🧊</div>
				<h3>{t.guideBody.title}</h3>
				<ul>
					{#each bodySteps as step (step.n)}
						<li class={step.warn ? 'step warn' : 'step'}>
							<span class="n">{step.warn ? '⚠️' : step.n}</span>
							<span class="text">{step.text}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
