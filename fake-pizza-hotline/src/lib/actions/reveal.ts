import type { Action } from 'svelte/action';

type RevealParams = { delay?: number };

/**
 * Adds `is-visible` to a `.reveal` element when it scrolls into view, once.
 * Pair with the `.reveal` / `.reveal.is-visible` CSS in app.css.
 */
export const reveal: Action<HTMLElement, RevealParams | undefined> = (node, params) => {
	if (params?.delay) node.style.transitionDelay = `${params.delay}ms`;

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-visible');
					io.unobserve(node);
				}
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
	);

	io.observe(node);

	return {
		destroy() {
			io.disconnect();
		}
	};
};
