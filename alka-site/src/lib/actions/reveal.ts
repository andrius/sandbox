import type { Action } from 'svelte/action';

type RevealParams = {
	/** Stagger, in ms, applied as `transition-delay` on the node. */
	delay?: number;
	/** Fraction of the node that must be visible before it fires. */
	threshold?: number;
	/** IntersectionObserver rootMargin. Read the dead-zone note below first. */
	rootMargin?: string;
};

/**
 * Adds `is-visible` to an element the first time it intersects the viewport.
 * Paired with the matching CSS transition wherever the product defines it -
 * `.reveal-up` / `.rule-wipe` in the AL.KA tokens, `.reveal` in the Pizza
 * stylesheet. The action only ever toggles a class, so each product keeps
 * full control of what "revealing" actually looks like.
 *
 * This is the only reveal action in the app. The Pizza port arrived with its
 * own near-identical copy tuned to `threshold: 0.12` and a `-8%` bottom
 * rootMargin; both are gone in favour of the defaults below, for the reason
 * in note 2.
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
 * 2. **Bottom dead-zone**: a negative bottom rootMargin delays reveals until
 *    the element is well inside the viewport, which sounds nicer and then
 *    strands anything that only ever reaches the excluded band at
 *    scroll-bottom - the AL.KA footer sign-off never fired. Default
 *    rootMargin, and a low threshold, so page-bottom content always resolves.
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
		{ threshold: params?.threshold ?? 0.01, rootMargin: params?.rootMargin }
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

type RevealWithinOptions = {
	/** Everything visible immediately, no observer. Set from a media query. */
	reduced?: boolean;
	threshold?: number;
	rootMargin?: string;
	/** Backstop, in ms, after which every element is revealed regardless. */
	safetyNet?: number;
};

/**
 * The attribute-driven half of the same idea: observe every `[data-reveal]`
 * inside `root` and add `.in` as each scrolls into view. Returns a teardown.
 *
 * Wet Water arrived from Astro with this vocabulary - a plain attribute on
 * markup, styled by the shared `.js [data-reveal]` rule in app.css - and some
 * thirty lines of observer plumbing inlined in its page component. The
 * plumbing lives here now so the page reads as a page. The vocabulary itself
 * stays: rewriting eleven sections onto `use:reveal` would churn a lot of
 * working markup to change a class name.
 *
 * Use `use:reveal` for new work. This exists for markup that already speaks
 * the attribute form, and for any product that would rather annotate markup
 * than import an action into every section.
 */
export function revealWithin(root: ParentNode, options: RevealWithinOptions = {}): () => void {
	const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
	const showAll = () => els.forEach((el) => el.classList.add('in'));

	if (options.reduced || typeof IntersectionObserver === 'undefined') {
		showAll();
		return () => {};
	}

	const io = new IntersectionObserver(
		(entries) =>
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add('in');
					io.unobserve(e.target);
				}
			}),
		{
			rootMargin: options.rootMargin ?? '0px 0px -8% 0px',
			threshold: options.threshold ?? 0.08
		}
	);
	els.forEach((el) => io.observe(el));

	const timer = window.setTimeout(showAll, options.safetyNet ?? 4500);

	return () => {
		window.clearTimeout(timer);
		io.disconnect();
	};
}
