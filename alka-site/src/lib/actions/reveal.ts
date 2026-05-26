import type { Action } from 'svelte/action';

type RevealParams = { delay?: number; threshold?: number };

/**
 * Adds `is-visible` to a `.reveal` / `.reveal-up` / `.rule-wipe` element
 * the first time it scrolls into view. Pair with the matching CSS in tokens.css.
 */
export const reveal: Action<HTMLElement, RevealParams | undefined> = (node, params) => {
	if (params?.delay) node.style.transitionDelay = `${params.delay}ms`;

	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('is-visible');
		return {};
	}

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-visible');
					io.unobserve(node);
				}
			}
		},
		{ threshold: params?.threshold ?? 0.12, rootMargin: '0px 0px -8% 0px' }
	);

	io.observe(node);
	return { destroy: () => io.disconnect() };
};
