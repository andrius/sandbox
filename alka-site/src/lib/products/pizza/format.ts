import { MONEY_TAG, type Locale } from '$lib/i18n';

export function formatMoney(amount: number, locale: Locale): string {
	return new Intl.NumberFormat(MONEY_TAG[locale], {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	}).format(amount);
}
