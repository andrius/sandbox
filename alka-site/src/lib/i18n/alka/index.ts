import { derived } from 'svelte/store';
import { locale, type Locale } from '$lib/i18n';
import { ru } from './ru';
import { nl } from './nl';
import { en } from './en';
import type { Dict } from './types';

/**
 * AL.KA's own dictionary namespace. Wet Water and the Pizza Hotline keep
 * their dictionaries under `$lib/i18n/water` and `$lib/i18n/pizza`; all three
 * read the single shared `locale` store from `$lib/i18n`.
 */
const dictionaries: Record<Locale, Dict> = { ru, nl, en };

export const dict = derived(locale, ($l): Dict => dictionaries[$l]);

export { locale };
export type { Dict };
