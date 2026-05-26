# PRODUCT.md - AL.KA

## Register

**brand** - the design IS the product. A one-page parody annual report.
There is no app, no signup, no funnel. Every pixel is the message.

## Product purpose

A parody business website for AL.KA, a fictional "vertically integrated
nap solutions" holding company. The CEO is a real ten-year-old child.
The site mimics an institutional annual-report PDF / investor prospectus
(McKinsey deck energy) while the content is absurd, kid-friendly humor
about napping, sausages, pillows, and skipping Mondays.

The joke is the genre clash: rigorous corporate structure (§ section
numbers, ledger strips, hairline rules, mega-stat hero, board of
directors, press testimonials, disclaimer footer) wrapped around
content about a bear named Sir Mikhail Pillowin who is "specialized
in being hugged without complaint."

## Users

Two audiences:

- **The CEO's parents and family** - the primary recipients of the
  joke. They will read it in Russian. They know the kid.
- **Curious internet drift-bys** - design-minded folks who recognize
  the annual-report-but-not vibe and stay for the bit. Many will read
  it in Dutch (the secondary locale).

Nobody is buying anything. Nobody is signing up. The success metric is
a small involuntary laugh at the contrast.

## Tone

**Deadpan corporate.** Never wink. Never call out the joke. The visual
treatment must be more serious than a real annual report would be -
because the content is unhinged, the form has to over-compensate. If
the page looked playful, the joke would die.

The wordmark is the one allowed wink: `AL.Ka` with a dramatic italic
serif `Ka` where an annual report would have set sans-serif all-caps.
The italic gives away that something is off, but quietly.

## Strategic principles

1. **Form fights content.** The more corporate the surface, the louder
   the absurdity of the words.
2. **No tutorial mode.** No "fun fact" callouts, no emoji confetti, no
   "click here for a surprise." The page presents itself as a real
   document and lets the reader find the joke.
3. **Editorial restraint with motion.** Motion is allowed, but it must
   feel like a printed report you can turn the pages of - reveals on
   scroll, a count-up on the hero stat, hover affordances on rows -
   not a SaaS hero with WebGL particles.
4. **Localized correctly.** Russian uses comma decimal and thin-space
   thousands (`99,7%`, `4 380`). Dutch uses comma decimal and period
   thousands (`4.380`, `€ 4,50`). The numbers ARE the joke - if they
   were Americanized the comedy lands wrong.
5. **System fonts of intent.** The handoff originally specified system
   Helvetica. The brief overruled to Inter + Fraunces (italic) +
   JetBrains Mono - chosen on purpose to land the joke in webfonts,
   not pretend Helvetica is good enough.

## Anti-references

What this is NOT, what to actively avoid:

- **Not a SaaS landing page.** No "Hero. Three feature columns. CTA.
  Testimonial slider. Pricing." That layout is the disease this site
  is the antibody for.
- **Not a children's book site.** No Comic Sans, no cartoon clouds, no
  curved pastel buttons, no "Hi friends!" voice. The fact that a kid
  runs the company is in the content - never the chrome.
- **Not glassmorphism / dark-glass / startup-purple.** Generic Tailwind
  default vibes are the failure state.
- **Not a Bauhaus / Swiss-grid sterile redesign.** Editorial, not
  museum-poster. There is warmth in the cream + ink + orange palette
  that pure black-on-white would kill.

## Brand expression

- **Wordmark**: `AL` (Inter, near-black warm `#140a05`) + `.` (orange
  `#ff7a1a`) + `Ka` (Fraunces serif italic).
- **Palette**: warm cream `#f3e9d8` page, slightly darker cream
  `#ebdebf` alt panel, near-black warm ink `#140a05`, brand orange
  `#ff7a1a`, deeper orange `#cc4a08`.
- **Type**:
  - Sans: Inter (400, 500, 600, 700, 800, 900). Body, h1, statistics.
  - Serif: Fraunces italic. The `Ka` in the wordmark; the closing
    "spokoynoy nochi / welterusten" sign-off line.
  - Mono: JetBrains Mono (400, 500, 700). Register strips, section
    numbers, ledger ids, kicker labels.
- **Rules**: 1px hairlines in `--ink`. 2px section dividers at the
  cover bottom and the disclaimer top.
- **No shadows, no rounded corners on content blocks.** Flat editorial.

## Out of scope

- No nav. No CTA. No newsletter signup. No cookie banner.
- No images / photos. Inline SVG only.
- No Tailwind. Component-scoped styles.
- No backend. Fully static, prerendered to Cloudflare Workers.

## Domain

`https://alka-site.c0-lt.workers.dev` (live as of deploy).
`al.ka` is the Åland Islands ccTLD - acquisition optional, the
on-page `ceo@al.ka` email is part of the joke.
