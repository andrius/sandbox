#!/usr/bin/env node
/**
 * Enforces the one contract every division shares.
 *
 * The three products look nothing like each other and share almost no code,
 * which is the point - but it also means nothing about them is checked by
 * types or by the compiler. The rules below are the ones that, when broken,
 * produce a page that builds and deploys and is quietly wrong: a division
 * with no way back to the menu, tokens leaking onto `:root`, a registry entry
 * pointing at a route that does not exist.
 *
 * Run by `npm run check`. Node reads registry.ts directly - it is plain data
 * with no imports, so type stripping handles it.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { products } = await import(pathToFileURL(join(root, 'src/lib/products/registry.ts')));

const failures = [];
const fail = (id, msg) => failures.push(`${id}: ${msg}`);

/** Every file under a directory, recursively. */
function walk(dir) {
	if (!existsSync(dir)) return [];
	return readdirSync(dir).flatMap((entry) => {
		const full = join(dir, entry);
		return statSync(full).isDirectory() ? walk(full) : [full];
	});
}

const readAll = (files) =>
	files.map((f) => ({ file: relative(root, f), text: readFileSync(f, 'utf8') }));

/**
 * Follow `$lib/...` imports out of a set of files, a few levels deep.
 *
 * A product's own directory is not the whole story: Sleep and the chronicles
 * both wear the AL.KA house header, which lives under `products/alka`, and
 * that header is where their back link actually is. Chasing imports finds it
 * without the check having to know which products borrow from which.
 */
function withImports(files, depth = 3) {
	const seen = new Set(files.map((f) => f.file));
	let frontier = files;
	const out = [...files];

	for (let i = 0; i < depth; i++) {
		const next = [];
		for (const { text } of frontier) {
			for (const [, spec] of text.matchAll(/from\s+['"](\$lib\/[^'"]+)['"]/g)) {
				const base = join(root, 'src/lib', spec.slice('$lib/'.length));
				const candidate = [base, `${base}.ts`, `${base}.js`, `${base}/index.ts`].find(
					(c) => existsSync(c) && statSync(c).isFile()
				);
				if (!candidate) continue;
				const rel = relative(root, candidate);
				if (seen.has(rel)) continue;
				seen.add(rel);
				const entry = { file: rel, text: readFileSync(candidate, 'utf8') };
				next.push(entry);
				out.push(entry);
			}
		}
		if (!next.length) break;
		frontier = next;
	}
	return out;
}

for (const p of products) {
	const routeDir = join(root, 'src/routes', p.href);
	const libDir = join(root, 'src/lib/products', p.id);

	// 1. The registry entry points at a real page.
	if (!existsSync(join(routeDir, '+page.svelte'))) {
		fail(p.id, `registry href "${p.href}" has no src/routes${p.href}/+page.svelte`);
	}

	const routeFiles = readAll(walk(routeDir));
	const libFiles = readAll(walk(libDir));
	const all = [...routeFiles, ...libFiles];
	const source = withImports(all)
		.map((f) => f.text)
		.join('\n');

	// 2. The wrapper class the registry declares is the one the page renders.
	//    Everything that scopes this product's tokens hangs off it, so a typo
	//    here means an unstyled page rather than an error.
	if (!source.includes(p.rootClass) && !source.includes('rootClass')) {
		fail(p.id, `nothing under the route or lib renders the declared rootClass "${p.rootClass}"`);
	}

	// 3. The single shared piece of chrome: a way back to the menu. Products
	//    render it inside their own header, in their own design.
	if (!source.includes('BackToMain')) {
		fail(p.id, 'no BackToMain anywhere - the division would be a dead end');
	}

	// 4. Product tokens must never reach `:root` or bare html/body. Three
	//    palettes define conflicting --bg and --ink; whichever stylesheet
	//    loaded last would win globally and break the other two.
	for (const { file, text } of libFiles.filter((f) => f.file.endsWith('.css'))) {
		// tailwind.css holds @theme token definitions, which are inert until a
		// utility class actually uses one, so it cannot leak.
		if (file.endsWith('tailwind.css')) continue;
		if (/^\s*:root\s*[,{]/m.test(text)) fail(p.id, `${file} declares tokens on :root`);
		if (/^\s*(html|body)\s*[,{]/m.test(text)) fail(p.id, `${file} styles bare html/body`);
	}

	// 5. Stories are how a product stays reviewable in isolation as it grows.
	if (!all.some((f) => /\.stories\.(ts|svelte)$/.test(f.file))) {
		fail(p.id, 'no *.stories.ts - add one so the division is reviewable in Storybook');
	}
}

if (failures.length) {
	console.error('Product contract violations:\n');
	for (const f of failures) console.error(`  ✗ ${f}`);
	console.error(`\n${failures.length} problem(s). See docs/adding-a-product.md.`);
	process.exit(1);
}

console.log(`✅ product contract ok (${products.length} divisions)`);
