import type { Action } from 'svelte/action';

const FOCUSABLE =
	'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab focus within `node` while it is mounted, moves focus inside on open,
 * marks the rest of the page `inert`, and restores focus to the trigger on close.
 * `inert` selects the elements to disable behind the overlay (default: the page
 * landmarks; pass a narrower set for an overlay that lives inside one of them).
 */
export const trapFocus: Action<HTMLElement, { inert?: string } | undefined> = (node, params) => {
	const doc = node.ownerDocument;
	const previouslyFocused = doc.activeElement as HTMLElement | null;

	const inerted = Array.from(
		doc.querySelectorAll<HTMLElement>(params?.inert ?? 'header, main, footer')
	).filter((el) => !el.contains(node));
	inerted.forEach((el) => el.setAttribute('inert', ''));

	const focusable = () =>
		Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
			(el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === doc.activeElement
		);

	(focusable()[0] ?? node).focus();

	function onKeydown(e: KeyboardEvent) {
		if (e.key !== 'Tab') return;
		const items = focusable();
		if (items.length === 0) {
			e.preventDefault();
			return;
		}
		const first = items[0];
		const last = items[items.length - 1];
		if (e.shiftKey && doc.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && doc.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}

	node.addEventListener('keydown', onKeydown);

	return {
		destroy() {
			node.removeEventListener('keydown', onKeydown);
			inerted.forEach((el) => el.removeAttribute('inert'));
			previouslyFocused?.focus?.();
		}
	};
};
