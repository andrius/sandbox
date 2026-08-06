import { derived } from 'svelte/store';
import { locale, type Locale } from '$lib/i18n';
import { antsContent, type AntsDict } from './content';

/**
 * Division 05's dictionary, derived off the one shared `locale` store like
 * every other division. The artifact this page came from kept its own
 * three-way language switch in component state; that is gone, so the choice a
 * visitor makes on the AL.KA menu survives the walk to Palanga.
 */
export const antsDict = derived(locale, ($l: Locale): AntsDict => antsContent[$l]);

export type { AntsDict, AntsChapter, AntsTerm } from './content';
