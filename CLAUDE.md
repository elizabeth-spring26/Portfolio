# Elizabeth Tran — Portfolio Website

Product manager portfolio. Next.js 14 App Router, TypeScript, Tailwind CSS,
Framer Motion. Deployed on Vercel from `main`
(elizabeth-tran-portfolio-one.vercel.app).

## Commands

- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Production build
- `npm run lint` — ESLint check

## Goal

A PM recruiter should understand in 10 seconds that she defines problems, talks
to users, makes tradeoffs, and ships, then be able to read case studies that
prove it.

## Architecture

- `/app/page.tsx` — Home. Order: **Hero → Proof bar → Selected work →
  Testimonials → About → Contact**. Testimonials sit directly under the work on
  purpose (she asked for them near the top). Do not move them down.
- `/app/work/[slug]/page.tsx` — Case study pages, statically generated from
  `content/projects.ts`
- `/app/template.tsx` — 300ms route fade + `MotionConfig reducedMotion="user"`.
  The first paint is never faded (server HTML must not ship at opacity 0).
- `/app/globals.css` — Colour channels, hero keyframes, marquee, reduced motion
- `/content/projects.ts` — **All project copy lives here.** Case study pages
  render only the sections that have content
- `/content/site.ts` — Email, LinkedIn, resume path, availability line, nav links
- `/components/hero.tsx` — 100dvh hero (scrolling name, portrait, meta grid)
- `/components/nav.tsx` — Fixed `mix-blend-difference` nav + mobile drawer
- `/components/sections/` — `proof`, `work`, `testimonials`, `about`, `contact`
- `/components/ui/editorial.tsx` — `Emph`, `Eyebrow`, `SectionHeading`, `StatusPill`
- `/components/ui/fade-up.tsx` — Framer Motion scroll reveal (y 30→0, 0.8s, once)
- `/public/headshot.jpg` — Hero portrait (9:16 source)
- `/public/projects/buildathon.png` — Hackathon photo
- `/public/testimonials/` — Avatars + the Daily Cash Agent screenshot
- `/pic_example/` — Raw source photos

## Design system

- Colours (`:root` as RGB channels, mapped in Tailwind): `ink` #0c0c0c page,
  `surface` #141414 panels, `cream` #efeee9 text/rules/buttons, `muted` cream at
  55%, `stroke` cream at 12%. `accent` #c8553d (burnt red) is used **only** for
  the primary CTA hover, the availability dot, and link hovers. Nothing else.
- **No purple**, no gradient text, no glowing cards.
- Fonts: body/UI is `"Helvetica Neue", Helvetica, Arial` (`font-sans`); Instrument
  Serif italic (`font-display`) for **one word per heading** via `<Emph>`;
  JetBrains Mono (`font-mono`, `.label` = uppercase, `tracking-[0.2em]`, 11px)
  for eyebrows, labels and metric labels. Never Inter or Roboto.
- Hairline dividers (`border-stroke`) instead of cards. Status is an outlined
  pill (`StatusPill`), never filled.
- Section eyebrow: `01 / Work` with a `w-8` hairline before it.
- Width `max-w-content` (1200px), padding `px-6 md:px-10 lg:px-16` (`.shell`).
- Link hover: `opacity-60` or `text-accent`, `duration-300`.

## Hero

- One `h-[100dvh]` composition, layered: vignette → scrolling name
  (`Elizabeth — Tran`, 40s linear marquee) → portrait → bottom scrim → cream rule
  → meta grid + footer strip.
- The portrait is a rectangular photo, so it is cropped to 3:4 and feathered
  into the ground with a radial `mask-image`. On mobile it sits above the rule
  (`bottom-[9rem]`) so the meta grid never covers her face. When
  `/public/headshot-cutout.png` exists, swap it in and drop the mask.
- Meta grid: Product-minded *builder* / What I do / Recently / Toolkit (the last
  two only at `lg`).
- Entrance: CSS `anim-*` classes with a `--d` delay variable. All collapse under
  `prefers-reduced-motion`, and the marquees and pulse dot stop.

## Work rows

- Full-width hairline rows, not a card grid: index / title + tags + status /
  labelled lines. The whole row links to `/work/[slug]`.
- Desktop: a 320×240 preview trails the cursor on rows that have an image
  (position written in rAF, never React state). Mobile: the image sits under
  the text.

## Content Rules — CRITICAL

- **Verified facts only.** Do not invent metrics, insights, decisions, results,
  attendance numbers, or case study sections. Empty is better than made up.
  Projects pending her details: Roots AI, the law firm lead-screening workflow,
  Moonshot, the Lexi healthcare research. Add them only with real content.
- She studies **Business with a concentration in Technology Entrepreneurship**
  (Babson '28). Her client work is **not** "a business" and not "a consulting
  practice". Say she built AI workflows for two paying clients.
- She is **Partnerships Lead** at The Generator (Babson's AI lab) and Student
  Lead for the AI & Small Business Bootcamp. That bootcamp must always include
  "(G1000 Program)".
- Protected numbers (never change, never drop): **2M+** TikTok views (not 5M+),
  **$100K Solutions Supported** at AI Technology Partners (she made client
  training materials; never "Solutions Built"), **3,000+** students reached,
  **80+** businesses consulted, **$3,000+** revenue from two paying clients,
  **6 different bank accounts** on the Daily Cash Agent (never "6 accounts
  unified"), **3 sponsors** (Anthropic, GitHub, Cursor).
- The Daily Cash Agent was not built for a fuels company. David's own title
  ("Co-founder, Metal Fuels") stays on his testimonial attribution only.
- Testimonial quotes are **verbatim**. Do not fix grammar, shorten, or add new
  ones. Brandon's "venture too" and missing terminal period are intentional.
- No "Thinking" section until a real article exists. No resume links until
  `site.resume` points at a real `/public/resume.pdf`.
- Do not include the hostess/server role at Old Street Hotpot anywhere.
  DrinkDock is always "DrinkDock (Babson FME Venture)".
- **Avoid em dashes in body copy.** Use commas, parentheses, or a second
  sentence. (The hero name marquee and page titles are display, not body copy.)
- Never copy another person's site content, branding, video, or awards.

## Craft details

- `section[id]` and `:target` carry `scroll-margin-top: 6rem` for the fixed nav.
- `.skip-link` targets `#main`.
- The mobile drawer sits under the header (`z-[45]` vs `z-50`) so the X stays
  visible. It locks body scroll, closes on Escape/backdrop/link, and is `inert`
  when closed.
- The testimonial lightbox returns focus to the thumbnail that opened it.
- Proof bar count-up: server HTML ships the real numbers; the client zeroes them
  while off screen and tweens once on view.
- `themeColor` belongs on the `viewport` export, never on `metadata`.
- Verify 375px → 1920px; no horizontal scroll.
