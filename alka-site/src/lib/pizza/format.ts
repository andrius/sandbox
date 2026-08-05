import type { Locale } from '$lib/i18n';

const TAGS: Record<Locale, string> = {
	ru: 'ru-RU',
	nl: 'nl-NL',
	en: 'en-US'
};

export function formatMoney(amount: number, locale: Locale): string {
	return new Intl.NumberFormat(TAGS[locale], {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	}).format(amount);
}
