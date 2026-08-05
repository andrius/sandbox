<script lang="ts">
	/**
	 * The one piece of chrome every product shares: a way back to the AL.KA
	 * menu at `/`.
	 *
	 * The three products look nothing like each other on purpose (cream
	 * editorial / pale-blue product marketing / near-black neon), so this
	 * component paints almost nothing of its own. It draws in `currentColor`
	 * and inherits the host header's font, which is why it reads correctly on
	 * all three backgrounds without a per-product variant.
	 *
	 * Hosts may tune two things:
	 *   --btm-accent   colour of the wordmark dot (defaults to currentColor)
	 *   --btm-hover    background on hover (defaults to a neutral tint)
	 *
	 * It renders inline so it sits inside each site's existing header rather
	 * than floating over it - a fixed overlay collided with all three brands,
	 * which live in the same top-left corner.
	 */
	type Props = { label?: string; compact?: boolean };
	let { label = 'AL.KA', compact = false }: Props = $props();
</script>

<a class="back-to-main" class:compact href="/" aria-label="{label} - на главную / naar hoofdmenu / back to main">
	<svg class="arrow" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
		<path
			d="M10 3.5 5.5 8 10 12.5"
			fill="none"
			stroke="currentColor"
			stroke-width="1.75"
			stroke-linecap="square"
		/>
	</svg>
	<span class="wm">AL<span class="dot">.</span><span class="ka">Ka</span></span>
</a>

<style>
	.back-to-main {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		/* Font is inherited from the host header on purpose - this control
		   should read as part of whichever site it is sitting in. */
		font-family: inherit;
		font-size: 13px;
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.01em;
		color: inherit;
		text-decoration: none;
		/* Padding + negative margin: the visual box stays tight inside the
		   header, while the hit area clears the 44x44 touch-target minimum. */
		padding: 14px 12px;
		margin: -14px -12px;
		border-radius: 2px;
		transition:
			background 200ms cubic-bezier(0.22, 1, 0.36, 1),
			opacity 200ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.back-to-main.compact {
		font-size: 12px;
		gap: 6px;
	}

	.arrow {
		flex: none;
		transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.wm {
		white-space: nowrap;
	}

	.dot {
		color: var(--btm-accent, currentColor);
	}

	/* The Fraunces italic "Ka" is the AL.KA signature and the one thing that
	   does NOT inherit - it has to stay recognisable on every product. */
	.ka {
		font-family: 'Fraunces', 'Times New Roman', Times, serif;
		font-style: italic;
		letter-spacing: -0.02em;
	}

	.back-to-main:hover {
		background: var(--btm-hover, rgba(127, 127, 127, 0.14));
	}

	.back-to-main:hover .arrow {
		transform: translateX(-3px);
	}

	.back-to-main:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 3px;
	}

	@media (prefers-reduced-motion: reduce) {
		.back-to-main,
		.arrow {
			transition: none;
		}
		.back-to-main:hover .arrow {
			transform: none;
		}
	}
</style>
