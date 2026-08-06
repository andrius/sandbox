<script lang="ts">
	import type { Dict } from '$lib/products/water/i18n/content';
	import { PROBLEM_NUMBER } from '$lib/products/water/i18n/content';

	let { t }: { t: Dict } = $props();
</script>

<section class="problem" id="problem">
	<div class="glow" data-glow style="background:radial-gradient(circle at 50% 130%, rgba(255,255,255,.22), transparent 58%)"></div>
	<div class="glow" data-glow style="background:radial-gradient(circle at 20% 0%, rgba(255,255,255,.14), transparent 42%)"></div>
	<div class="inner">
		<div class="label">{t.problem.label}</div>
		<div class="number">{PROBLEM_NUMBER}</div>
		<h2>{t.problem.title}</h2>
		<p>{t.problem.body}</p>
	</div>
	<svg class="wave" style="height:70px" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
		<path d="M0,42 C240,82 480,2 720,36 C960,68 1200,10 1440,46 L1440,90 L0,90 Z" fill="#eef9ff"></path>
	</svg>
</section>
