import type { Decorator, Preview } from '@storybook/sveltekit';

/**
 * Every product stylesheet is imported here at once, which would be reckless
 * in most projects and is safe in this one: each product scopes all of its
 * tokens, background and body styling under its own wrapper class rather than
 * `:root`. That rule exists so three conflicting palettes can share one app -
 * and it is exactly what lets one Storybook host all four divisions without
 * them bleeding into each other. If a story ever picks up another product's
 * colours, the leak is in that product's CSS, not here.
 */
import '../src/app.css';
import '../src/lib/products/alka/styles/tokens.css';
import '../src/lib/products/water/styles.css';
import '../src/lib/products/pizza/styles.css';
import './preview.css';

import { products, type ProductId } from '../src/lib/products/registry';
import { LOCALE_META, locales, setLocale, type Locale } from '../src/lib/i18n';

const byId = new Map(products.map((p) => [p.id, p]));

/** Request a product's faces once per preview iframe. */
function ensureFont(href?: string) {
	if (!href || document.querySelector(`link[href="${CSS.escape(href)}"]`)) return;
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = href;
	document.head.appendChild(link);
}

const allRootClasses = new Set(products.map((p) => p.rootClass));

/**
 * Dress the story in its product.
 *
 * `parameters.product` names the division; the wrapper class and the typefaces
 * both come from the registry, so a new product needs no change here.
 *
 * The class goes on `#storybook-root`, the div the story renders into, which
 * is the same shape production has: a wrapper div inside `<body>`, with the
 * neutral overscroll colour from app.css behind it. Putting it on `<body>`
 * instead looks like it should work and does not - Pizza declares its base
 * styling inside `@layer components`, and an unlayered rule beats a layered
 * one whatever the specificity, so app.css's `body { background: … }` would
 * win and paint the dark Pizza sections onto cream.
 *
 * Classes are added rather than assigned: Storybook puts its own layout
 * classes on this node and clobbering them breaks `layout: 'centered'`.
 */
const dressAsProduct: Decorator = (story, ctx) => {
	const meta = byId.get(ctx.parameters.product as ProductId);
	const rootEl = document.getElementById('storybook-root');
	if (rootEl) {
		for (const cls of allRootClasses) rootEl.classList.remove(cls);
		rootEl.classList.add(meta?.rootClass ?? 'alka-root');
	}
	ensureFont(meta?.fontHref);

	/* Note the absence of `.js` on <html>. That class gates the
	   `[data-reveal]` rule in app.css, which starts elements at opacity 0 and
	   waits for a page-level observer to add `.in`. A story has no page, and
	   wiring an observer here is a trap: `revealWithin` snapshots its elements
	   when called, and the decorator runs before the story mounts, so it would
	   find nothing and Wet Water's sections would render permanently blank.
	   Leaving `.js` off means the same no-JS path a visitor without scripts
	   gets - everything visible, nothing hidden. Products using `use:reveal`
	   (AL.KA, Pizza) are unaffected: their CSS is not gated, and the action
	   reveals above-the-fold content synchronously. */

	setLocale(ctx.globals.locale as Locale);
	return story();
};

const preview: Preview = {
	decorators: [dressAsProduct],
	globalTypes: {
		locale: {
			description: 'Language, shared by every division through one store',
			toolbar: {
				title: 'Locale',
				icon: 'globe',
				/* Names come from the registry rather than a local map, which was a
				   fifth hand-kept copy of the language list and would have
				   labelled Spanish `undefined`. */
				items: locales.map((code) => ({
					value: code,
					title: `${LOCALE_META[code].flag} ${LOCALE_META[code].native}`
				})),
				dynamicTitle: true
			}
		}
	},
	initialGlobals: { locale: 'ru' satisfies Locale },
	parameters: {
		layout: 'fullscreen',
		controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
		options: {
			/* Divisions in portfolio order, shared chrome last. */
			storySort: { order: ['AL.KA', 'Sleep', 'Pizza', 'Water', 'Shared'] }
		}
	}
};

export default preview;
