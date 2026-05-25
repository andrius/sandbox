# 🍕 Fake Pizza Hotline

> All of the ordering. None of the pizza.

A polished parody landing page and **simulated** checkout for the *Fake Pizza
Hotline* — "a perfect simulation of the pizza ordering experience. No pizza will
be made or sent to you." Inspired by the viral street flyer.

This is a joke/art project. It is **not** a real restaurant, it does **not**
process real payments, and it will **never** deliver real pizza. Please do not
enter real card details anywhere in the app.

## Features

- **Highly polished marketing landing** — hero, animated marquee, stats,
  features, "how it works", a full fake menu, the Guarantee™, testimonials,
  hours of operation, and an FAQ, all with scroll-reveal motion.
- **Bilingual (i18n): English 🇬🇧 / Russian 🇷🇺** — instant language toggle,
  persisted to `localStorage`, with a fully translated UI (every slogan, card,
  menu item, and message).
- **Simulated payments / checkout** — add fake pizzas to a cart, fill in a
  realistic checkout form (with `4242 4242 4242 4242` test-card autofill),
  watch a fake "processing" sequence, and land on a confirmation page with
  live **non-tracking** of an order that will never arrive. Total charged:
  `$0.00`.
- **A simulated phone call** — the "Call the hotline" button opens an in-page
  call experience instead of dialing the (iconic, possibly-real) flyer number.

## Tech stack

- [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5, runes) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- Static prerendering via `@sveltejs/adapter-static`
- Custom, store-based i18n (no runtime dependency)
- Hand-built SVG artwork (logo, favicon, social image) — no external assets

## Develop

```sh
npm install
npm run dev          # http://localhost:5173
```

## Build

```sh
npm run build        # static site in ./build
npm run preview      # preview the production build
npm run check        # type + Svelte diagnostics
```

## Project layout

```
src/
  app.css                     design tokens, components, animations
  lib/
    i18n/{index,en,ru}.ts     translator store + dictionaries
    data/menu.ts              menu items (prices/emoji; copy via i18n)
    cart.svelte.ts            cart state (runes + localStorage)
    ui.svelte.ts              shared UI state (call modal)
    hours.ts, format.ts       open-status + currency helpers
    components/               Header, Footer, CallModal, sections/*
  routes/
    +page.svelte              the landing page
    checkout/+page.svelte     the payment simulation
static/                       favicon.svg, og.svg, robots.txt
```

> A note on the Tailwind safelist in `app.css`: this project's Tailwind v4
> Oxide build intermittently dropped some valid utilities scanned from
> `.svelte` files, so the palette and layout-critical classes are pinned via
> `@source inline(...)`.
