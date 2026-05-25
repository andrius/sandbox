import type { Locale } from './i18n';

export function formatMoney(amount: number, locale: Locale): string {
	return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	}).format(amount);
}
