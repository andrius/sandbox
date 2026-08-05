# Port Fake Pizza Hotline into alka-site as the `/pizza` division

## Context

`alka-site` is becoming a single SvelteKit app hosting four AL.KA divisions.
Fake Pizza Hotline is already SvelteKit, so this is mostly a **relocation**, not
a rewrite - but it brings Tailwind v4, a cart, a checkout simulation and a call
modal into an app that also hosts two non-Tailwind designs.

**Keep the unique UI exactly as it is.** The owner explicitly asked for each
site to keep its own look: near-black `void-950` page, tomato red, cheese gold,
Unbounded display + Manrope body, the radial background gradients, the neon
glow. If the ported page does not look like the original, the task has failed.

Read-only reference source (do NOT modify anything under it):
`/home/ak/code/andrius/sandbox/main/fake-pizza-hotline/`

- `src/routes/+page.svelte` - 11 landing sections in order
- `src/routes/+layout.svelte` - header/footer/call-modal shell, konami hook
- `src/routes/checkout/+page.svelte` - 436 lines, the payment simulation
- `src/lib/components/**`, `src/lib/{cart,ui}.svelte.ts`, `hours.ts`,
  `format.ts`, `constants.ts`, `easter.ts`, `data/menu.ts`
- `src/app.css` - Tailwind theme + component classes + animations

## Scope

**In scope** (you own these paths exclusively):

- `alka-site/src/routes/pizza/**` (including `pizza/checkout/`)
- `alka-site/src/lib/pizza/**`
- `alka-site/src/lib/i18n/pizza/**`

**Out of scope - do NOT touch** (another worker owns them; edits here are a
review failure):

- `alka-site/src/routes/+page.svelte`, `routes/sleep/**`, `routes/chronicles/**`,
  `routes/water/**`
- `alka-site/src/lib/components/**`, `alka-site/src/lib/water/**`,
  `alka-site/src/lib/i18n/{alka,water}/**`
- `alka-site/src/app.html`, `src/routes/+layout.svelte`, `package.json`,
  `vite.config.ts`, `svelte.config.js`
- `alka-site/src/app.css` - **one exception**: nothing. It already imports
  `./lib/pizza/tailwind.css`, which IS yours. Edit that file, never app.css.
- Anything outside `alka-site/`

`alka-site/src/lib/i18n/pizza/{en,ru}.ts` are ALREADY copied in. Do not retype
that copy.

## Hard constraints

1. **Tailwind runs WITHOUT Preflight.** `src/app.css` deliberately imports only
   `tailwindcss/theme.css` + `tailwindcss/utilities.css`. Preflight is a global
   reset - enabling it would strip heading margins and list styling from the
   AL.KA and Wet Water routes. Do not re-add `@import 'tailwindcss'`.
   Consequence: **the base styles Preflight used to provide are now yours to
   supply**, scoped under `.pizza-root` - `body`-level background/color/font,
   heading font-family/weight/tracking, `::selection`, `:focus-visible`,
   scrollbar styling. Port them from the original `@layer base` block into
   `lib/pizza/styles.css` under `.pizza-root`, NOT into an `@layer base`.
2. **`lib/pizza/tailwind.css` already holds the `@theme` palette and the
   `@source inline(...)` safelist.** That safelist is load-bearing: the
   original project documented that its Oxide extractor intermittently dropped
   `bg-tomato-*`, `grid-cols-4` etc. scanned from `.svelte` files. If pizza
   utilities go missing at build time but look fine in dev, extend that
   safelist. Never delete entries.
3. **Never declare tokens on `:root`; never style bare `html`/`body`.** AL.KA
   and Wet Water declare conflicting `--bg`/`--ink`. Everything scopes under
   `.pizza-root`.
4. **Locale comes from the shared store.** Import `locale` from `$lib/i18n`
   (values `'ru' | 'nl' | 'en'`). The original was `en|ru` only with its own
   `fph_lang` key - drop that store and that key.
5. **Dutch is required.** Write `lib/i18n/pizza/nl.ts` covering every key in
   `en.ts`. Match the original's deadpan register; keep `{{param}}`
   placeholders and structure identical. Dutch pizza/delivery vocabulary,
   informal "je" register, not literal English word order.
6. **Money formatting** in `format.ts` maps locale to an `Intl` tag - extend it
   for `nl` (`nl-NL`). Keep USD as the currency (part of the joke).
7. **Fonts load per route** via `<svelte:head>` in `routes/pizza/+page.svelte`
   and the checkout page: Unbounded + Manrope. NOT in `src/app.html`.
8. **The checkout must stay a simulation.** It never contacts a network, the
   total charged stays `$0.00`, and the `4242 4242 4242 4242` test-card
   autofill stays. Do not add real payment anything.
9. Keep the konami easter egg, the call modal (with its focus trap), the cart
   in `localStorage`, and every `prefers-reduced-motion` path.

## Steps

1. **Scaffold + base styles.** `routes/pizza/+page.svelte` renders
   `<main class="pizza-root">`; create `lib/pizza/styles.css` with the
   ex-Preflight base rules scoped under `.pizza-root`, plus the `.btn`,
   `.card`, `.field`, `.chip`, grid and animation classes from the original
   `@layer components`. Verify: `(cd alka-site && npm run check)` is clean.
2. **lib port.** Move `cart.svelte.ts`, `ui.svelte.ts`, `hours.ts`, `format.ts`,
   `constants.ts`, `easter.ts`, `data/menu.ts`, `actions/{reveal,trapFocus}.ts`
   into `lib/pizza/`. Retarget the cart storage key to `alka:pizza-cart`.
3. **i18n.** `lib/i18n/pizza/index.ts` exporting a `pizzaT` dot-path translator
   derived off the shared `locale`, falling back to `en` for missing keys. Then
   write `nl.ts` in full.
4. **Sections.** Port all 11 landing sections + Header, Footer, CallModal,
   Logo, VoidPizza into `lib/pizza/components/`. Header and Footer become part
   of the `/pizza` route, not the app layout.
5. **Checkout.** Port `checkout/+page.svelte` to `routes/pizza/checkout/`.
   Every internal link changes `/checkout` -> `/pizza/checkout` and `/` ->
   `/pizza`. Confirm the fake processing sequence and confirmation screen work.
6. **Back to main.** Render `$lib/components/BackToMain.svelte` in the pizza
   header, left of its own logo. Set `--btm-accent` to the cheese gold.
7. **Compare against the original** side by side and fix visual drift.

After each step append `<step N>: <PASS/FAIL> + <one-line evidence>` to
`/tmp/oc-workers/pizza-port.status`.

## STOP conditions

- Tailwind utilities render in dev but vanish in `npm run build` and extending
  the safelist does not fix it.
- A constraint above cannot be met without editing an out-of-scope file.
- The port would need `package.json` or `vite.config.ts` changes.

## Boundaries

You do NOT merge, do NOT push, do NOT deploy. Commits use
`git commit --no-gpg-sign`. Never print secret values - grep KEY NAMES only.
Report: STATUS / STEPS / FILES CHANGED / NOTES.

## Done criteria

- [ ] `/pizza` is visually indistinguishable from the standalone site
- [ ] `/pizza/checkout` completes its simulated flow, charging $0.00
- [ ] Dutch is complete and idiomatic across every key
- [ ] Cart, call modal, konami, reduced-motion all work

```verify
[typecheck] cd alka-site && npm run check
[build] cd alka-site && npm run build
[no-preflight] cd alka-site && ! grep -rn "@import ['\"]tailwindcss['\"]" src
[safelist-intact] cd alka-site && grep -q "source inline" src/lib/pizza/tailwind.css
[no-root-tokens] cd alka-site && ! grep -rn "^\s*:root" src/lib/pizza src/routes/pizza
[no-bare-body] cd alka-site && ! grep -rEn "^\s*(html|body)[\s,]*\{" src/lib/pizza src/routes/pizza
[scoped-wrapper] cd alka-site && grep -rq "pizza-root" src/routes/pizza
[back-to-main] cd alka-site && grep -rq "BackToMain" src/routes/pizza src/lib/pizza
[dutch-exists] cd alka-site && test -f src/lib/i18n/pizza/nl.ts
[dutch-complete] cd alka-site && node -e "const a=require('fs').readFileSync('src/lib/i18n/pizza/en.ts','utf8').match(/^\t\w+:/gm)||[];const b=require('fs').readFileSync('src/lib/i18n/pizza/nl.ts','utf8');const m=a.filter(k=>!b.includes(k));if(m.length){console.error('missing in nl:',m.join(' '));process.exit(1)}"
[shared-locale] cd alka-site && grep -rq "from '\$lib/i18n'" src/lib/i18n/pizza
[no-old-lang-key] cd alka-site && ! grep -rn "fph_lang" src
[checkout-route] cd alka-site && test -f src/routes/pizza/checkout/+page.svelte
[no-network-in-checkout] cd alka-site && ! grep -rnE "fetch\(|XMLHttpRequest" src/routes/pizza/checkout
[fonts-scoped] ! grep -qE 'href="https://fonts\.googleapis\.com[^"]*Unbounded' alka-site/src/app.html
[prerendered] cd alka-site && ls .svelte-kit/cloudflare | grep -q pizza
[committed] test -z "$(git status --porcelain alka-site)"
```
