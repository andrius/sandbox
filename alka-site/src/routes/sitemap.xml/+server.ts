import { products } from '$lib/products/registry';
import { absoluteUrl } from '$lib/site';

export const prerender = true;

/**
 * The sitemap reads the registry, so a new division appears here the moment
 * it is registered - there is no second list to remember to update.
 *
 * `soon` divisions are left out on purpose: they already ship `noindex`
 * because they are holding pages, and listing a page you have asked not to
 * index is a contradiction crawlers report as a warning.
 *
 * `/pizza/checkout` is also absent. It is a simulated flow reached from the
 * menu, not a landing point, and nothing links to it from outside the site.
 */
const paths = ['/', ...products.filter((p) => p.status === 'live').map((p) => p.href)];

export function GET() {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `\t<url><loc>${absoluteUrl(path)}</loc></url>`).join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'content-type': 'application/xml; charset=utf-8' }
	});
}
