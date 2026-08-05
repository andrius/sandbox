import { derived } from 'svelte/store';
import { locale } from '$lib/i18n';
import { en, type Dict } from './en';
import { ru } from './ru';
import { nl } from './nl';

/**
 * Pizza's dictionary namespace, derived off the single shared `locale` store
 * from `$lib/i18n` (the standalone site's own `en|ru` store and its
 * `fph_lang` storage key are gone). Missing keys fall back to English.
 */
const dictionaries: Record<string, Dict> = { ru, nl, en };

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
export const pizzaT = derived(locale, ($locale) => {
	return (key: string, params?: Record<string, unknown>): any => {
		const value = resolve(dictionaries[$locale], key) ?? resolve(dictionaries.en, key);
		if (value === undefined) return key;
		return typeof value === 'string' ? interpolate(value, params) : value;
	};
});

export type { Dict };
