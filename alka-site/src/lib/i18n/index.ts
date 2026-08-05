import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * One locale store for the whole holding. Every product route (AL.KA, Wet
 * Water, Fake Pizza Hotline) reads this single store, so switching language
 * on one product and navigating to another keeps the choice.
 *
 * Wet Water originally shipped route-based locales (`/`, `/ru/`, `/nl/`) with
 * hreflang alternates. That model cannot survive the merge - locale would
 * reset every time the visitor crossed a product boundary - so the store wins
 * and the per-locale URLs are dropped.
 */
export type Locale = 'ru' | 'nl' | 'en';

export const locales: Locale[] = ['ru', 'nl', 'en'];

const STORAGE_KEY = 'alka:loc';

/** Server / prerender always starts in Russian; the client upgrades in onMount. */
export const locale = writable<Locale>('ru');

/**
 * Per-locale numeric conventions. The numbers carry a lot of the joke on both
 * AL.KA and Wet Water, so they must read native in each language:
 *   ru  4 380   99,7%   EUR 4,50   (no-break space thousands, comma decimal)
 *   nl  4.380   99,7%   EUR 4,50   (period thousands, comma decimal)
 *   en  4,380   99.7%   EUR 4.50   (comma thousands, period decimal)
 */
export const NUMBER_FORMATS: Record<Locale, { thousands: string; decimal: string }> = {
	ru: { thousands: ' ', decimal: ',' },
	nl: { thousands: '.', decimal: ',' },
	en: { thousands: ',', decimal: '.' }
};

function isLocale(value: unknown): value is Locale {
	return value === 'ru' || value === 'nl' || value === 'en';
}

function detectLocale(): Locale {
	if (!browser) return 'ru';
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (isLocale(saved)) return saved;
	} catch {
		/* private mode / storage disabled */
	}
	const tag = (typeof navigator !== 'undefined' ? navigator.language || '' : '').toLowerCase();
	if (tag.startsWith('nl')) return 'nl';
	if (tag.startsWith('en')) return 'en';
	return 'ru';
}

export function setLocale(next: Locale) {
	locale.set(next);
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, next);
	} catch {
		/* ignore */
	}
	document.documentElement.lang = next;
}

/** Call once on the client (root layout onMount). */
export function initLocale() {
	setLocale(detectLocale());
}
