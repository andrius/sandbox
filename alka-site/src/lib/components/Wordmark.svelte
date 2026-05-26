<script lang="ts">
	type Props = { size?: string; animated?: boolean };
	let { size = 'var(--t-display)', animated = false }: Props = $props();
</script>

<span class="wordmark" class:animated style="font-size:{size}">
	<span class="char c1">A</span><span class="char c2">L</span><span class="char dot c3">.</span><span
		class="char ka c4">K</span><span class="char ka c5">a</span>
</span>

<style>
	.wordmark {
		display: inline-block;
		white-space: nowrap;
	}

	.char {
		display: inline-block;
		transform-origin: 50% 100%;
	}

	.dot {
		color: var(--orng);
	}

	.ka {
		font-family: var(--font-serif);
		font-style: italic;
		letter-spacing: -0.04em;
	}

	.animated .char {
		opacity: 0;
		transform: translateY(40%);
		animation: charIn 700ms var(--ease-out-soft) forwards;
	}

	.animated .c1 { animation-delay: 100ms; }
	.animated .c2 { animation-delay: 180ms; }
	.animated .c3 { animation-delay: 260ms; }
	.animated .c4 { animation-delay: 340ms; }
	.animated .c5 { animation-delay: 420ms; }

	@keyframes charIn {
		0%   { opacity: 0; transform: translateY(40%) scaleY(0.85); }
		60%  { opacity: 1; transform: translateY(-2%) scaleY(1.02); }
		100% { opacity: 1; transform: translateY(0) scaleY(1); }
	}

	@media (prefers-reduced-motion: reduce) {
		.animated .char {
			animation: none !important;
			opacity: 1;
			transform: none;
		}
	}
</style>
