import { browser } from '$app/environment';

/**
 * The two first-party cookies this site sets, and nothing else.
 *
 * Both are preferences the visitor set themselves, both hold a value from a
 * fixed short list, and neither identifies anybody or leaves this origin.
 * That is the whole cookie story here - worth keeping in one file so it stays
 * that way.
 */
const ONE_YEAR = 60 * 60 * 24 * 365;

export function readCookie(name: string): string | null {
	if (!browser || typeof document === 'undefined') return null;
	const prefix = `${name}=`;
	for (const part of document.cookie.split(';')) {
		const entry = part.trim();
		if (entry.startsWith(prefix)) return decodeURIComponent(entry.slice(prefix.length));
	}
	return null;
}

/**
 * `SameSite=Lax` keeps the cookie off cross-site requests; `Secure` is set
 * only on https so `vite dev` over plain http still remembers the choice.
 */
export function writeCookie(name: string, value: string, maxAge: number = ONE_YEAR) {
	if (!browser || typeof document === 'undefined') return;
	const secure = location.protocol === 'https:' ? '; Secure' : '';
	document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}
