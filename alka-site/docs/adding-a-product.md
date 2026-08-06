# Adding a division

Four divisions live in this one app and look nothing like each other on
purpose. Nothing about their appearance is shared, so nothing here asks you to
make a new page match the others. What is shared is the plumbing, and this is
where it is.

Budget: one registry entry, one folder, one thin route, three lines of copy per
language. `npm run check` tells you if you missed a piece.

## 1. Register it

`src/lib/products/registry.ts` is the only place a division's structural facts
live. Add an entry:

```ts
{
	id: 'lawn',
	code: '05',                       // portfolio ordinal, printed in the menu
	href: '/lawn',
	rootClass: 'lawn-root',           // scopes every token this product declares
	fontHref: `${GOOGLE_FONTS}?family=...`,   // omit to use the AL.KA shell faces
	status: 'soon'                    // 'soon' = recessive in the menu, noindex
}
```

Add `'lawn'` to the `ProductId` union above it. TypeScript will now tell you
that the three locale files are missing its copy, which is step 3.

## 2. Build it

```
src/lib/products/lawn/
	components/
		Header.svelte     ← must render <BackToMain />; everything else is yours
		Hero.svelte
		Hero.stories.ts
	i18n/                 ← only if this product needs its own dictionary
	styles.css
```

Two rules bind the stylesheet, and only two:

- **Never declare tokens on `:root`, never style bare `html` or `body`.**
  Scope everything under `.lawn-root`. All three existing products originally
  did declare on `:root`, with conflicting values - `--bg` is cream on AL.KA
  and pale blue on Wet Water - so whichever stylesheet loaded last won
  globally and broke the other two. This is the rule that lets four palettes
  share one app.
- **The header carries a `<BackToMain />`.** It is the one component every
  division shares, and it paints almost nothing of its own: it draws in
  `currentColor` and inherits your header's font, so it reads as native chrome
  wherever it lands. Tune `--btm-accent` (the wordmark dot) and `--btm-hover`
  if you want.

Reuse whatever helps. `use:reveal` from `$lib/actions/reveal` is the shared
scroll-reveal action; pair it with your own CSS so the motion is yours.
`$lib/components/LanguageSwitcher.svelte` is host-neutral the same way
`BackToMain` is.

If your division wears the AL.KA house style (as Sleep does), point
`rootClass` at `alka-root`, import `$lib/products/alka/styles/tokens.css` and
use `$lib/products/alka/components/Header.svelte` instead of writing your own.

## 3. Write the copy

`src/lib/products/alka/i18n/{ru,nl,en}.ts`, in the `products` record:

```ts
lawn: {
	name: 'Lawn division',
	blurb: 'One sentence that earns the row.'
}
```

Only `name` and `blurb` live here. Ordinal, route and status are structural
and stay in the registry - they used to be duplicated into all three locale
files, which meant a route change had to be made in three places and agreed
with itself.

Dictionaries with their own voice (Pizza, Wet Water) live under the product,
derived off the one shared `locale` store in `$lib/i18n` so switching language
on one division carries to the next.

## 4. Route it

Keep the route thin - head, wrapper, composition. The page body belongs in
`lib` where Storybook can reach it:

```svelte
<script lang="ts">
	import '$lib/products/lawn/styles.css';
	import { product } from '$lib/products/registry';
	import ProductHead from '$lib/components/ProductHead.svelte';
	import Hero from '$lib/products/lawn/components/Hero.svelte';

	const lawn = product('lawn');
</script>

<ProductHead id="lawn" title="…" description="…" />

<main class={lawn.rootClass}>
	<Hero />
</main>
```

`ProductHead` emits the meta and og tags plus the faces and favicon the
registry declared. A division with several routes (as Pizza has) mounts
`<ProductHead id="…" />` once in its `+layout.svelte` so every page shares one
font request, and passes `title` / `description` per page.

## 5. Story it

One `*.stories.ts` next to each component. `parameters.product` is what tells
Storybook which division to dress the story in:

```ts
const meta = {
	title: 'Lawn/Hero',
	component: Hero,
	parameters: { product: 'lawn' }
} satisfies Meta<typeof Hero>;
```

The decorator reads the registry, so the wrapper class and typefaces arrive on
their own. Nothing in `.storybook/` needs to change for a new division.

Components taking props rather than reading stores want the `.stories.svelte`
form so the Locale toolbar still drives them - see the Wet Water stories,
which pass `t={$waterDict}` inside a `{#snippet template()}` block. Bare
children of `<Story>` are silently ignored by the addon; the snippet is
required.

## 6. Check it

```bash
npm run check          # types + the product contract
npm run storybook      # look at it
npm run build          # prerender
```

`npm run check:products` is the guardrail. It walks the registry and fails if
a division's route is missing, if the declared `rootClass` never appears, if
tokens reach `:root`, if a stylesheet styles bare `html`/`body`, if there are
no stories - or if nothing under the division renders a `BackToMain`, which is
the one that matters, because a division without it builds, deploys, and
strands every visitor who reaches it.
