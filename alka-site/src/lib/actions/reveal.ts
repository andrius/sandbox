import type { Action } from 'svelte/action';

type RevealParams = { delay?: number; threshold?: number };

/**
 * Adds `is-visible` to a `.reveal` / `.reveal-up` / `.rule-wipe` element
 * the first time it intersects the viewport. Paired with matching CSS
 * transitions in tokens.css.
 *
 * Two implementation notes earned by past bugs:
 *
 * 1. **Above-the-fold race**: when the action mounts after layout has
 *    already settled (notably with several Onest font faces hydrating),
 *    the IntersectionObserver's first callback can fire against stale
 *    geometry and miss elements that ARE in view. We do a synchronous
 *    bounding-rect check right after observing - if the element is
 *    already in the viewport, mark it visible immediately.
 *
 * 2. **Bottom dead-zone**: the previous version used a negative bottom
 *    rootMargin to delay reveals until ~92% scroll-progress. That kept
 *    page-bottom content (notably the footer "Спокойной ночи." sign-off)
 *    from ever firing on screens where the element sat in the excluded
 *    band at scroll-bottom. Default rootMargin now.
 */
export const reveal: Action<HTMLElement, RevealParams | undefined> = (node, params) => {
	if (params?.delay) node.style.transitionDelay = `${params.delay}ms`;

	const markVisible = () => node.classList.add('is-visible');

	if (typeof IntersectionObserver === 'undefined') {
		markVisible();
		return {};
	}

	const isInViewport = () => {
		const r = node.getBoundingClientRect();
		const vh = window.innerHeight || document.documentElement.clientHeight;
		const vw = window.innerWidth || document.documentElement.clientWidth;
		return r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw;
	};

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					markVisible();
					io.unobserve(node);
				}
			}
		},
		{ threshold: params?.threshold ?? 0.01 }
	);

	io.observe(node);

	// Synchronous fallback for above-the-fold elements: if it's in view at
	// observation time, fire now without waiting for the IO callback.
	if (isInViewport()) {
		markVisible();
		io.unobserve(node);
	}

	return { destroy: () => io.disconnect() };
};
