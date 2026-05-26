# AL.KA

> Вертикально-интегрированные решения в области тихого часа.
> *(Verticaal geïntegreerde dutje-oplossingen.)*

A one-page parody annual report for AL.KA - a "vertically integrated nap
solutions" company run by a ten-year-old. The site is a SvelteKit landing
page in **Russian** with a **Dutch** language toggle, deployed to Cloudflare.

The design is a McKinsey/BCG-style prospectus on the surface - Inter
Grotesk, JetBrains Mono ledger strips, hairline rules, numbered sections.
The wordmark gives the joke away: `AL.Ka` with a dramatic Fraunces italic
where the chief sausage officer's hand-set serif should be.

## Tech stack

- [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5, runes) + TypeScript
- Component-scoped `<style>` blocks (no Tailwind - editorial design)
- Google Fonts: **Onest**, **Fraunces** (italic), **JetBrains Mono**
- Custom store-based i18n (no runtime dependency), persisted to
  `localStorage` under `alka:loc`
- Hand-built inline SVG cartoon portraits (no images, no icon library)
- Fully prerendered, deployed to **Cloudflare** via
  `@sveltejs/adapter-cloudflare`

## Motion

The handoff said *no animations*. The brief overruled that with *various
motion effects*. The vocabulary stays editorial:

- Cover wordmark plays a staggered character drop-in
- Section content fades + slides on scroll via `IntersectionObserver`
- The featured `4 380` number counts up from 0 once visible, formatted
  per-locale (RU: thin-space thousands, NL: period thousands)
- A pair of ambient italic `z`s drift through the dark Numbers section
- Team cards lift and rotate their portrait on hover
- Service rows shift the orange `→` arrow rightward on hover
- Press cards thicken their orange left border on hover
- All animation respects `prefers-reduced-motion: reduce`

## Develop

```sh
npm install
npm run dev          # http://localhost:5173
```

## Build

```sh
npm run build        # output in ./.svelte-kit/cloudflare
npm run preview      # serve the production build locally
npm run check        # type + Svelte diagnostics
```

## Deploy to Cloudflare

Configured via `@sveltejs/adapter-cloudflare` + `wrangler.jsonc`.

**Option A - Wrangler CLI (Workers):**

```sh
npx wrangler login          # one-time browser auth
npm run deploy              # build + wrangler deploy
```

In CI, set `CLOUDFLARE_API_TOKEN` instead of `wrangler login`.

**Option B - Git integration (push-to-deploy):**

In the Cloudflare dashboard → *Workers & Pages* → *Create* → connect the
GitHub repo, then set:

- **Root directory:** `alka-site`
- **Build command:** `npm run build`
- **Build output / deploy directory:** `.svelte-kit/cloudflare`
- **Compatibility flags:** `nodejs_als`

## Project layout

```
src/
  app.html                       webfont preload, lang=ru default
  routes/
    +layout.svelte               root layout, mounts LanguageSwitcher
    +layout.ts                   prerender on
    +page.svelte                 assembles the 8 sections in order
  lib/
    styles/tokens.css            colour, type scale, spacing, motion
    i18n/
      types.ts                   Dict + sub-types
      ru.ts / nl.ts              the dictionaries (port of content.jsx)
      index.ts                   store, setLocale, initLocale
    actions/
      reveal.ts                  IntersectionObserver -> .is-visible
      countUp.ts                 rAF count-up, locale-aware formatting
    components/
      LanguageSwitcher.svelte    fixed top-right RU/NL pill
      Wordmark.svelte            AL.Ka with staggered char-in
      Portrait.svelte            5 inline-SVG cartoon portraits
      SectionHead.svelte         shared §NN + kicker + h1 header
      sections/
        Cover.svelte             marquee strip, wordmark, tagline, HQ
        Letter.svelte            founder's letter
        Numbers.svelte           dark section, mega stat + 5 sub-stats
        Services.svelte          6 service rows with hover arrow
        Team.svelte              5 portrait cards
        Press.svelte             4 testimonial cards
        Contact.svelte           4-cell ledger
        Disclaimer.svelte        footer with goodnight sign-off
static/
  favicon.svg                    AL[.] mini wordmark
  robots.txt                     allow everything
```

## Notes

- The CEO is a real ten-year-old; his name is intentionally left as
  initials `A. K.` in `src/lib/i18n/ru.ts` and `nl.ts`. Swap when ready.
- The email `ceo@al.ka` is part of the joke. `.ka` is a real ccTLD
  (Åland Islands); it does not need to resolve.
- All copy lives in `src/lib/i18n/{ru,nl}.ts`. Edits there flow
  everywhere via the `dict` store.
