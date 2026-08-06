import { derived } from 'svelte/store';
import { locale } from '$lib/i18n';
import { en, type Dict } from './en';
import { ru } from './ru';
import { nl } from './nl';
import { es } from './es';

/**
 * Pizza's dictionary namespace, derived off the single shared `locale` store
 * from `$lib/i18n` (the standalone site's own `en|ru` store and its private
 * storage key are gone). Missing keys fall back to English.
 */
const dictionaries: Record<string, Dict> = { ru, nl, en, es };

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

const ZWNJ = '‌';

/**
 * Break the Dutch IJ digraph so it stays readable in the display face.
 *
 * Unbounded substitutes `IJ` for a single digraph glyph that renders like a
 * "U", so Dutch display copy read "GEEN SPUT" for `GEEN SPIJT` and
 * "DE CUFERS" for `De cijfers`. Measured at 30px/800:
 *
 *     IJ            25.63px      <- the substituted glyph
 *     U             26.53px      <- what a reader sees
 *     I + J         35.33px      <- what it should be
 *     I + ZWNJ + J  35.33px      <- restored
 *
 * The substitution is NOT reachable from CSS: `font-variant-ligatures: none`,
 * `no-common-ligatures`, `liga`/`dlig`/`rlig` at 0 and even `ccmp` at 0 all
 * leave it in place. A zero-width non-joiner is the only thing that breaks it,
 * so it has to happen in the string rather than the stylesheet.
 *
 * Applied to Dutch only, at the translator boundary rather than in `nl.ts`, so
 * new Dutch copy is covered automatically and the dictionary stays clean, plain
 * text. ZWNJ is invisible and inert in Manrope body copy, which has no such
 * substitution - the only cost is that copied Dutch text carries the character.
 *
 * EN and RU have no `ij` pair and never enter this path.
 */
function separateIJ(value: string): string {
	return value.replace(/I(?=J)|i(?=j)/g, (ch) => ch + ZWNJ);
}

/**
 * Reactive translator. Returns a string (with `{{param}}` interpolation) for
 * leaf keys, or the raw array/object for structured keys (menus, lists, etc).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pizzaT = derived(locale, ($locale) => {
	const fixDigraph = $locale === 'nl';
	const format = (value: string, params?: Record<string, unknown>) => {
		const out = interpolate(value, params);
		return fixDigraph ? separateIJ(out) : out;
	};
	return (key: string, params?: Record<string, unknown>): any => {
		const value = resolve(dictionaries[$locale], key) ?? resolve(dictionaries.en, key);
		if (value === undefined) return key;
		if (typeof value === 'string') return format(value, params);
		// Structured keys (marquee list, menu items, FAQ entries) carry display
		// copy too, so they need the same treatment one level down.
		if (fixDigraph && Array.isArray(value)) {
			return value.map((item) =>
				typeof item === 'string'
					? separateIJ(item)
					: item && typeof item === 'object'
						? Object.fromEntries(
								Object.entries(item as Record<string, unknown>).map(([k, v]) => [
									k,
									typeof v === 'string' ? separateIJ(v) : v
								])
							)
						: item
			);
		}
		return value;
	};
});

export type { Dict };
