import { INTL_TAG, type Locale } from '$lib/i18n';
import { antsContent } from './entries/ants/i18n/content';

/**
 * The chronicles are a blog, and this is its table of contents.
 *
 * Entries are not divisions: they live inside `/chronicles`, not beside it in
 * the portfolio, and their back link points at the index rather than the AL.KA
 * menu. But each one is still allowed its own look - "The President and the
 * Queen" arrived as a storybook in Comfortaa and Caveat and keeps every bit of
 * it - so an entry declares the same three things a division does: the wrapper
 * class that scopes its tokens, the faces it needs, and its favicon.
 *
 * `summary` returns the index card's copy for a locale. It reads the entry's
 * own dictionary rather than duplicating the title into a third place, so
 * translating an entry translates its card too.
 *
 * To add an entry: drop a folder under `entries/`, add one object here, and
 * create `src/routes/chronicles/<slug>/+page.svelte`. Newest first.
 */
export interface ChronicleEntry {
	slug: string;
	/** ISO date the entry was written, used for display and for ordering. */
	date: string;
	rootClass: string;
	fontHref?: string;
	iconHref?: string;
	summary: (locale: Locale) => { title: string; lead: string };
}

const GOOGLE_FONTS = 'https://fonts.googleapis.com/css2';

export const entries: ChronicleEntry[] = [
	{
		slug: 'ants',
		date: '2026-08-05',
		rootClass: 'ants-root',
		fontHref: `${GOOGLE_FONTS}?family=Comfortaa:wght@500;700&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&family=Caveat:wght@500;700&display=swap`,
		iconHref:
			"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐜</text></svg>",
		summary: (l) => ({ title: antsContent[l].title, lead: antsContent[l].subtitle })
	}
];

export function entry(slug: string): ChronicleEntry {
	const found = entries.find((e) => e.slug === slug);
	if (!found) throw new Error(`Unknown chronicle entry: ${slug}`);
	return found;
}

/**
 * Dates render in each language's own convention rather than one house format:
 * `5 августа 2026`, `5 augustus 2026`, `5 August 2026`, `5 de agosto de 2026`.
 * Built from a fixed UTC timestamp so the day never shifts by timezone.
 */
export function formatEntryDate(iso: string, locale: Locale): string {
	return new Intl.DateTimeFormat(INTL_TAG[locale], {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(new Date(`${iso}T00:00:00Z`));
}
