import type { Action } from 'svelte/action';

type CountUpParams = {
	/** The final numeric value (e.g. 4380). Decimals + leading zeros preserved. */
	to: number;
	/** Duration in ms. Defaults to 1600. */
	duration?: number;
	/** Decimal separator. Defaults to '.'. RU/NL pages should pass ','. */
	decimal?: string;
	/** Thousands separator. Defaults to ''. RU pages pass ' ', NL pages pass '.'. */
	thousands?: string;
	/** Number of fractional digits. Defaults to 0. */
	fractionDigits?: number;
	/** Prefix (e.g. '€') and suffix (e.g. '%', ' ч', ' uur'). */
	prefix?: string;
	suffix?: string;
};

const prefersReducedMotion = () =>
	typeof window !== 'undefined' &&
	window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function format(n: number, p: CountUpParams) {
	const fixed = n.toFixed(p.fractionDigits ?? 0);
	const [intPart, fracPart] = fixed.split('.');
	const grouped = (p.thousands ?? '')
		? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, p.thousands ?? '')
		: intPart;
	const body = fracPart ? `${grouped}${p.decimal ?? '.'}${fracPart}` : grouped;
	return `${p.prefix ?? ''}${body}${p.suffix ?? ''}`;
}

/**
 * Animates the element's textContent from 0 → `to` once it enters the viewport.
 * Combines IntersectionObserver + requestAnimationFrame; respects reduced-motion.
 */
export const countUp: Action<HTMLElement, CountUpParams> = (node, params) => {
	let current = params;
	let started = false;

	const finalize = () => {
		node.textContent = format(current.to, current);
	};

	const run = () => {
		if (started) return;
		started = true;
		if (prefersReducedMotion()) {
			finalize();
			return;
		}
		const duration = current.duration ?? 1600;
		const start = performance.now();
		const tick = (now: number) => {
			const t = Math.min(1, (now - start) / duration);
			// easeOutCubic
			const eased = 1 - Math.pow(1 - t, 3);
			const v = eased * current.to;
			node.textContent = format(v, current);
			if (t < 1) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	};

	// Initial paint to lock width and avoid CLS
	finalize();

	if (typeof IntersectionObserver === 'undefined') {
		run();
		return {};
	}

	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					run();
					io.unobserve(node);
				}
			}
		},
		{ threshold: 0.35 }
	);
	io.observe(node);

	return {
		update(next: CountUpParams) {
			current = next;
			if (started) finalize();
		},
		destroy() {
			io.disconnect();
		}
	};
};
