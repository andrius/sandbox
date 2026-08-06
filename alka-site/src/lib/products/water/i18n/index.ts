import { derived } from 'svelte/store';
import { locale, type Locale } from '$lib/i18n';
import { locales, type Dict } from './content';

/**
 * Wet Water's dictionary as a derived store off the shared `locale`.
 *
 * The original Astro project keyed its dictionary on route-based locales
 * (`/`, `/ru/`, `/nl/`) and rendered three prerendered pages. The merge moves
 * every product under one shared `locale` store so a visitor can switch
 * language on AL.KA and arrive at /water with the choice preserved.
 *
 * `content.ts` used to export its own `Lang` union and this file cast the
 * store's value across to it. Both are gone: the copy is keyed on `Locale`
 * directly, so there is nothing left for a cast to bridge.
 */
export const waterDict = derived(locale, ($l: Locale): Dict => locales[$l]);

export { locale };
export type { Dict };
