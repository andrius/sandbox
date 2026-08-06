import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { readCookie, writeCookie } from '$lib/cookies';

/**
 * One locale store for the whole holding. Every product route (AL.KA, Wet
 * Water, Fake Pizza Hotline, the chronicles) reads this single store, so
 * switching language on one product and navigating to another keeps the
 * choice.
 *
 * Wet Water originally shipped route-based locales (`/`, `/ru/`, `/nl/`) with
 * hreflang alternates. That model cannot survive the merge - locale would
 * reset every time the visitor crossed a product boundary - so the store wins
 * and the per-locale URLs are dropped.
 */
export type Locale = 'ru' | 'nl' | 'en' | 'es';

export const locales: Locale[] = ['ru', 'nl', 'en', 'es'];

/**
 * Everything a language chooser needs, declared once.
 *
 * Four switchers render this list - the shared strip, the Pizza pill row, the
 * Wet Water tabs and the chronicles bar - and each used to carry its own
 * hardcoded copy of the codes and names. They drifted: Wet Water's array was
 * still `['en','ru','nl']` and would have silently hidden Spanish.
 *
 * `native` is the endonym, never the exonym: a Spanish-speaking child looks
 * for "Español", not for "Spanish". `flag` is a deliberate simplification -
 * languages are not countries - but it is the only label that works for a
 * visitor who cannot yet read any of the four names, which is the audience
 * the start page is built for.
 */
export interface LocaleMeta {
	code: Locale;
	native: string;
	flag: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
	ru: { code: 'ru', native: 'Русский', flag: '🇷🇺' },
	nl: { code: 'nl', native: 'Nederlands', flag: '🇳🇱' },
	en: { code: 'en', native: 'English', flag: '🇬🇧' },
	es: { code: 'es', native: 'Español', flag: '🇪🇸' }
};

export const localeList: LocaleMeta[] = locales.map((code) => LOCALE_META[code]);

/**
 * Accessible name for a language group, in all four languages at once.
 *
 * It cannot be translated into the active locale like everything else: a
 * visitor stuck in the wrong language is exactly the person who needs to find
 * this control, and by then the dictionary is working against them.
 */
export const LANGUAGE_GROUP_LABEL = 'Язык / Taal / Language / Idioma';

/**
 * The word "back", per locale.
 *
 * `BackToMain` is the one component every product shares and it deliberately
 * carries no dictionary - it has to read correctly inside four unrelated
 * designs, so it inherits everything and imports nothing product-shaped. Its
 * accessible name is the one string it cannot inherit, so it lives here.
 */
export const BACK_LABEL: Record<Locale, string> = {
	ru: 'назад',
	nl: 'terug',
	en: 'back',
	es: 'atrás'
};

/**
 * The query parameter that forces a language, e.g. `/water?lang=es`.
 *
 * It outranks every stored preference so a link can be handed to someone
 * whose browser is set to something else and still arrive in the intended
 * language. Following it also writes it through to the cookie, so the choice
 * survives the moment the visitor clicks away from the linked page.
 */
export const LANG_PARAM = 'lang';

/** Where the choice is remembered. The cookie is authoritative. */
export const LOCALE_COOKIE = 'alka_lang';
/** Pre-cookie key. Still read, so a returning visitor keeps their language. */
const STORAGE_KEY = 'alka:loc';

/** Server / prerender always starts in Russian; the client upgrades in onMount. */
export const locale = writable<Locale>('ru');

/**
 * Per-locale numeric conventions. The numbers carry a lot of the joke on both
 * AL.KA and Wet Water, so they must read native in each language:
 *   ru  4 380   99,7%   EUR 4,50   (no-break space thousands, comma decimal)
 *   nl  4.380   99,7%   EUR 4,50   (period thousands, comma decimal)
 *   en  4,380   99.7%   EUR 4.50   (comma thousands, period decimal)
 *   es  4.380   99,7%   EUR 4,50   (period thousands, comma decimal)
 */
export const NUMBER_FORMATS: Record<Locale, { thousands: string; decimal: string }> = {
	ru: { thousands: ' ', decimal: ',' },
	nl: { thousands: '.', decimal: ',' },
	en: { thousands: ',', decimal: '.' },
	es: { thousands: '.', decimal: ',' }
};

/**
 * BCP 47 tags for `Intl.*`. Dates, and anything else that formats by locale.
 *
 * These were declared twice, in two product folders, and had already diverged
 * on `en` - which turned out to be deliberate, so the split is kept but is now
 * visible in one place instead of being two files that happened to disagree.
 */
export const INTL_TAG: Record<Locale, string> = {
	ru: 'ru-RU',
	nl: 'nl-NL',
	en: 'en-GB',
	es: 'es-ES'
};

/**
 * The same, for money. `en` is US English here rather than British: the Pizza
 * Hotline prices in USD and is set in Toronto, and `en-GB` would render that
 * as `US$18.50` where the joke wants `$18.50`. Every other locale formats USD
 * the same either way.
 */
export const MONEY_TAG: Record<Locale, string> = { ...INTL_TAG, en: 'en-US' };

function isLocale(value: unknown): value is Locale {
	return locales.includes(value as Locale);
}

/**
 * Read `?lang=` off a URL, or null when it is absent or not one of ours.
 *
 * Exactly the four two-letter codes - `ru`, `nl`, `en`, `es` - and nothing
 * else. Regional tags like `es-MX` are deliberately NOT accepted: the site has
 * one Spanish, not a Mexican and a Peninsular one, so honouring a regional tag
 * would promise a distinction that does not exist. An unrecognised value falls
 * through to the cookie and then the browser, which is the same path a visitor
 * with no `?lang=` at all takes.
 *
 * Exported because the root layout re-checks it on every client-side
 * navigation - `initLocale` only runs once, at mount.
 */
export function localeFromSearch(search: URLSearchParams | string): Locale | null {
	const params = typeof search === 'string' ? new URLSearchParams(search) : search;
	const raw = params.get(LANG_PARAM);
	if (!raw) return null;
	const code = raw.trim().toLowerCase();
	return isLocale(code) ? code : null;
}

function detectLocale(): Locale {
	if (!browser) return 'ru';

	const fromUrl = localeFromSearch(location.search);
	if (fromUrl) return fromUrl;

	const fromCookie = readCookie(LOCALE_COOKIE);
	if (isLocale(fromCookie)) return fromCookie;

	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (isLocale(saved)) return saved;
	} catch {
		/* private mode / storage disabled */
	}

	// `navigator.languages` before `navigator.language`: a browser set to
	// Spanish-then-English should land on Spanish, and only the list says so.
	const tags =
		typeof navigator !== 'undefined'
			? [...(navigator.languages ?? []), navigator.language ?? '']
			: [];
	for (const raw of tags) {
		const tag = raw.toLowerCase();
		if (tag.startsWith('nl')) return 'nl';
		if (tag.startsWith('es')) return 'es';
		if (tag.startsWith('en')) return 'en';
		if (tag.startsWith('ru')) return 'ru';
	}
	return 'ru';
}

export function setLocale(next: Locale) {
	locale.set(next);
	if (!browser) return;

	writeCookie(LOCALE_COOKIE, next);
	try {
		localStorage.setItem(STORAGE_KEY, next);
	} catch {
		/* ignore - the cookie already carries the choice */
	}
	document.documentElement.lang = next;
}

/** Call once on the client (root layout onMount). */
export function initLocale() {
	setLocale(detectLocale());
}
