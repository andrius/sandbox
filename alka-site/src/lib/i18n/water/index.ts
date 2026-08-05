import { derived } from 'svelte/store';
import { locale, type Locale } from '$lib/i18n';
import { locales, type Dict, type Lang } from './content';

/**
 * Wet Water's dictionary as a derived store off the shared `locale`.
 *
 * The original Astro project keyed its dictionary on route-based locales
 * (`/`, `/ru/`, `/nl/`) and rendered three prerendered pages. The merge moves
 * every product under one shared `locale` store so a visitor can switch
 * language on AL.KA and arrive at /water with the choice preserved. The store
 * covers `'ru' | 'nl' | 'en'`; `Lang` from content.ts covers the same set, so
 * the cast is structural.
 */
export const waterDict = derived(locale, ($l: Locale): Dict => locales[$l as Lang]);

export { locale };
export type { Dict, Lang };
