import { derived, writable } from 'svelte/store';
import { browser } from '$app/environment';
import { ru } from './ru';
import { nl } from './nl';
import type { Dict } from './types';

export type Locale = 'ru' | 'nl';
export const locales: Locale[] = ['ru', 'nl'];

const dictionaries: Record<Locale, Dict> = { ru, nl };
const STORAGE_KEY = 'alka:loc';

/** Server / prerender always starts in Russian; the client upgrades in onMount. */
export const locale = writable<Locale>('ru');

/** Reactive dictionary store - the typed bundle for the current language. */
export const dict = derived(locale, ($l): Dict => dictionaries[$l]);

function detectLocale(): Locale {
	if (!browser) return 'ru';
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved === 'ru' || saved === 'nl') return saved;
	} catch {
		/* ignore */
	}
	const tag = (typeof navigator !== 'undefined' ? navigator.language || '' : '').toLowerCase();
	if (tag.startsWith('nl')) return 'nl';
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
