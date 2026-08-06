# Wet Water 💧

> Water. But wet.

A satirical one-page landing for **Wet Water™** - the first water in Europe
with certified wetness, "responsibly sourced from clouds, rivers, and one very
generous tap." The joke: we make water wet, we don't sell it - our partners do.
Underneath the gag is a genuinely useful heatwave survival guide (the jokes are
jokes; the heat advice is not).

Trilingual: **EN / RU / NL**, each a real prerendered page with its own URL.

## Tech stack

- [Astro](https://astro.build) (static output) + Vite + TypeScript
- [Motion](https://motion.dev) for ambient animation (floating droplets, the
  overheat glow, the scroll-linked thermometer, the loading splash pulse)
- Plain global CSS with design tokens (no Tailwind, no UI kit)
- Reveal-on-scroll via `IntersectionObserver` + CSS transitions
- Google Fonts: **Inter**, **Space Grotesk**, **Space Mono**
- Deployed to **Cloudflare** as static assets behind a Worker (`wrangler`)

## Structure

```
src/
  i18n/content.ts          all copy for en/ru/nl, behind a typed Dict
  layouts/Layout.astro      <head>, fonts, splash, client-script entry
  pages/[...locale].astro   one page per locale: / (en), /ru/, /nl/
  components/*.astro         one file per section (Hero, Problem, Partners, …)
  scripts/client.ts          reveals, thermometer, FAQ, cookie, newsletter, Motion
  styles/global.css          tokens + every component class
```

Language switching is plain navigation between `/`, `/ru/`, `/nl/` - no runtime
i18n, fully cacheable, SEO-friendly (with `hreflang` alternates).

### Affiliate slots

The Partners cards carry `data-affiliate="replace-me"` and `href="#"`. Drop the
real partner/affiliate URLs there - that's the whole business model.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview    # serve the built site
npm run check      # astro type-check (0 errors)
```

## Deploy to Cloudflare

Same shape as [`alka-sites`](https://github.com/andrius/alka-sites): build, then `wrangler deploy` ships `dist/` as a
static-asset Worker named **wet-water**.

```bash
npm run deploy     # astro build && wrangler deploy
```

First time: `npx wrangler login` to authenticate against the Cloudflare account.

**Custom domain** `wet-water.c0.lt`: after the first deploy, attach it in the
Cloudflare dashboard (Workers & Pages → wet-water → Settings → Domains & Routes
→ Add custom domain), or via `wrangler`. The `c0.lt` zone must live in the same
account. No route is hard-coded in `wrangler.jsonc` (mirrors alka-sites).

## Accessibility / motion

All entrance and ambient motion respects `prefers-reduced-motion: reduce`:
content is shown immediately and the loops are skipped. With JavaScript disabled
the full page still renders (reveal-hidden states are gated behind a `js` class).
