/**
 * Where this site actually lives.
 *
 * AL.KA sits on a subdomain of `ka.fyi`, which is a real registered domain -
 * the earlier `al.ka` in the contact copy was part of the joke and is not a
 * TLD anyone can send mail to. Canonical URLs, `og:url` and the sitemap all
 * read from here, so pointing the site somewhere else is a one-line change.
 *
 * No trailing slash: every consumer appends a path that already starts with
 * one.
 */
export const SITE_ORIGIN = 'https://al.ka.fyi';

export const SITE_NAME = 'AL.KA';

/** Absolute URL for a route path (`/sleep` -> `https://al.ka.fyi/sleep`). */
export function absoluteUrl(pathname: string): string {
	/* SvelteKit hands us `/` for the root and no trailing slash elsewhere.
	   Dropping a lone `/` keeps the canonical for the start page as the bare
	   origin rather than `https://al.ka.fyi/`, which search engines treat as
	   the same document but which reads wrong in an og:url. */
	return pathname === '/' ? SITE_ORIGIN : `${SITE_ORIGIN}${pathname}`;
}
