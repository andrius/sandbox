import { derived, writable } from 'svelte/store';
import { browser } from '$app/environment';
import { en } from './en';
import { ru } from './ru';

export type Locale = 'en' | 'ru';

export const locales: Locale[] = ['en', 'ru'];

const dictionaries = { en, ru };

const STORAGE_KEY = 'fph_lang';

/** Server / prerender always starts in English; the client upgrades in onMount. */
export const locale = writable<Locale>('en');

function resolve(dict: unknown, path: string): unknown {
	return path.split('.').reduce<unknown>((acc, key) => {
		if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
		return undefined;
	}, dict);
}

function interpolate(value: string, params?: Record<string, unknown>): string {
	if (!params) return value;
	return value.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
		key in params ? String(params[key]) : `{{${key}}}`
	);
}

/**
 * Reactive translator. Returns a string (with `{{param}}` interpolation) for
 * leaf keys, or the raw array/object for structured keys (menus, lists, etc).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const t = derived(locale, ($locale) => {
	return (key: string, params?: Record<string, unknown>): any => {
		const value = resolve(dictionaries[$locale], key) ?? resolve(dictionaries.en, key);
		if (value === undefined) return key;
		return typeof value === 'string' ? interpolate(value, params) : value;
	};
});

function detectLocale(): Locale {
	if (!browser) return 'en';
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved === 'en' || saved === 'ru') return saved;
	return (navigator.language || '').toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

export function setLocale(next: Locale) {
	locale.set(next);
	if (browser) {
		localStorage.setItem(STORAGE_KEY, next);
		document.documentElement.lang = next;
	}
}

/** Call once on the client (root layout onMount) to pick up the saved/preferred locale. */
export function initLocale() {
	setLocale(detectLocale());
}
