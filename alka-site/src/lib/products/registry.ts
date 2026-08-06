/**
 * The single place a division is registered.
 *
 * Every product under `/` looks deliberately different - cream editorial,
 * pale-blue product marketing, near-black neon - so almost nothing about
 * their appearance can be shared. What CAN be shared is the handful of facts
 * the shell needs to know about each one: where it lives, which wrapper class
 * scopes its tokens, which faces it loads, and whether it is finished.
 *
 * Those facts used to be spread across three locale files (href, code and
 * status were duplicated in ru.ts, nl.ts and en.ts) and three route files.
 * Adding a division meant editing seven places and hoping they agreed. Now
 * they live here once, and the dictionaries carry only the two fields that
 * are genuinely translatable: `name` and `blurb`.
 *
 * To add a division, see `docs/adding-a-product.md`.
 */

export type ProductId = 'chronicles' | 'sleep' | 'pizza' | 'water';

export interface Product {
	id: ProductId;
	/** Portfolio ordinal. Printed in the menu and in the product's own header. */
	code: string;
	href: string;
	/**
	 * The class the product's page wrapper carries. Every product declares its
	 * tokens, background and body font under this class instead of `:root` -
	 * that scoping is the only reason three conflicting palettes can share one
	 * app. `alka-root` is the house style, reused by `/sleep`.
	 */
	rootClass: string;
	/**
	 * Stylesheet URL for the faces this product needs, emitted per route by
	 * `ProductHead`. Omitted when the product dresses itself in the AL.KA
	 * shell faces that `app.html` already loads for the menu chrome.
	 */
	fontHref?: string;
	/** Extra <link rel="icon"> for products that override the shell favicon. */
	iconHref?: string;
	/**
	 * `soon` divisions still get a real page that says so - more honest than a
	 * dead row - but read recessive in the menu and stay out of the index.
	 */
	status: 'live' | 'soon';
}

const GOOGLE_FONTS = 'https://fonts.googleapis.com/css2';

export const products: Product[] = [
	{
		id: 'chronicles',
		code: '01',
		href: '/chronicles',
		rootClass: 'alka-root',
		status: 'soon'
	},
	{
		id: 'sleep',
		code: '02',
		href: '/sleep',
		rootClass: 'alka-root',
		status: 'live'
	},
	{
		id: 'pizza',
		code: '03',
		href: '/pizza',
		rootClass: 'pizza-root',
		fontHref: `${GOOGLE_FONTS}?family=Unbounded:wght@500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap`,
		status: 'live'
	},
	{
		id: 'water',
		code: '04',
		href: '/water',
		rootClass: 'water-root',
		fontHref: `${GOOGLE_FONTS}?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:wght@400;700&display=swap`,
		iconHref:
			"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💧</text></svg>",
		status: 'live'
	}
];

const byId = new Map(products.map((p) => [p.id, p]));

export function product(id: ProductId): Product {
	const found = byId.get(id);
	if (!found) throw new Error(`Unknown product: ${id}`);
	return found;
}
