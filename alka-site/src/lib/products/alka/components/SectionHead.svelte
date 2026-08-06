<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	type Props = { num: string; kicker: string; title: string; onDark?: boolean };
	let { num, kicker, title, onDark = false }: Props = $props();
</script>

<div class="head" class:on-dark={onDark}>
	<div class="num reveal-up" use:reveal>§ {num}</div>
	<div class="body">
		<div class="kicker reveal-up" use:reveal={{ delay: 80 }}>{kicker}</div>
		<h2 class="title reveal-up" use:reveal={{ delay: 160 }}>{title}</h2>
	</div>
</div>

<style>
	.head {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 32px;
		margin-bottom: 56px;
	}
	@media (max-width: 1023px) {
		.head { grid-template-columns: 80px 1fr; gap: 24px; margin-bottom: 44px; }
	}
	@media (max-width: 639px) {
		.head { grid-template-columns: 1fr; gap: 12px; margin-bottom: 32px; }
	}

	.num {
		font-family: var(--font-mono);
		font-size: 14px;
		color: var(--orng-text);
		font-weight: 700;
		letter-spacing: 0.1em;
	}

	.kicker {
		font-family: var(--font-sans);
		font-size: var(--t-kicker);
		letter-spacing: 0.32em;
		text-transform: uppercase;
		font-weight: 700;
		color: var(--orng-text);
		margin-bottom: 16px;
	}

	.title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: var(--t-h1);
		line-height: 0.95;
		margin: 0;
		color: var(--ink);
		letter-spacing: -0.035em;
	}

	.on-dark .title { color: var(--bg); }
</style>
