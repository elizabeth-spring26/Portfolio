# Elizabeth Tran — Portfolio Website

Personal portfolio site. Next.js 14+ App Router, TypeScript, Tailwind CSS, shadcn/ui.

## Commands

- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Production build
- `npm run lint` — ESLint check

## Architecture

- `/app` — Next.js App Router pages and layouts
- `/app/page.tsx` — Single-page portfolio (all sections)
- `/app/globals.css` — Design tokens, spacing scale, motion scale, keyframes
- `/components/ui` — shadcn components + custom UI (background-paths, spotlight-card, section-header, reveal)
- `/components/sections` — Page sections (about, projects, testimonials, skills, education, contact)
- `/components/nav.tsx` — Sticky top navigation
- `/hooks` — `use-reveal` (IntersectionObserver), `use-count-up` (rAF number tween)
- `/lib/utils.ts` — cn() helper for shadcn
- `/public/headshot.png` — Elizabeth's headshot photo
- `/public/testimonials/` — Testimonial avatars + the Daily Cash Bot screenshot
- `/public/resume.pdf` — Downloadable resume

## Page order

Hero → About → Projects → Testimonials → Skills → Education → Contact.

There is **no Experience section**. It was removed; its two orphaned facts (two
paying clients / $3,000+ revenue, and the DrinkDock COO run to breakeven) now
live in the About blurb. Do not reintroduce a resume-style role list.

## Custom UI Components

1. `background-paths.tsx` — Hero with an animated SVG background. The paths
   **draw in once on load via CSS and then hold still**. Do not reintroduce an
   idle loop.
2. `spotlight-card.tsx` — GlowCard with cursor-tracking spotlight. **Currently
   unused** — the redesign moved to flat bordered cards. Do not reintroduce it
   without asking; its glow conflicts with the current design rules.
3. `section-header.tsx` — The single section-header pattern. Every section uses
   it. Renders a numbered mono eyebrow, a serif heading, and an optional
   description as one revealing unit.
4. `reveal.tsx` — Scroll-reveal wrapper around `use-reveal`.

## Code Style

- TypeScript strict, no `any`
- Use named exports
- Tailwind utility classes only — no custom CSS files (except globals.css)
- All components are functional with hooks
- Use `next/image` for all images
- Use lucide-react for icons — no other icon libraries

## Design Rules

- Dark mode is DEFAULT. Light mode toggle available. Light mode uses a warm
  off-white ground (not pure white) with secondary text dark enough to pass AA.
- **Fonts:** Instrument Serif (display), Instrument Sans (body), JetBrains Mono
  (eyebrows, labels, tags, numbers). Not Inter, Roboto, or Arial.
- Section headings are **left-aligned, no trailing period**, set in the display
  serif. Hierarchy comes from the mono eyebrow, not from heading size.
- Color: off-black ground with a lifted card surface. **One** accent (violet
  `--primary`), used only for links, hover, the nav underline, and live status
  dots. Never on icons, tags, and badges simultaneously.
- Status is a small dot plus lowercase mono text. **No colored pill backgrounds.**
- One radius token (`--radius`, 5px). One border color (`--border`).
- Icons appear on the single featured project card only — never on every card.
- The projects grid is deliberately asymmetric (uneven 12-column spans).
- Banned: gradient text, glassmorphism, glow shadows, animated gradient meshes,
  `hover:scale-*` on cards.

## Spacing scale

Defined in `globals.css` and used everywhere instead of one-off values:

- `--space-section` — 96px desktop / 64px mobile. This is the gap **between**
  sections; `.section-padding` applies half per side so adjacent sections sum
  to it. Never stack two full values.
- `--space-block` — 48px / 40px. Intro block to content grid.
- `--space-tight` — 8px. Eyebrow to heading; ×2 for heading to subheading.

Content width is `max-w-content` (60rem) with `px-6 sm:px-8 lg:px-12`.

## Motion

**CSS transitions and transforms only. framer-motion has been removed — do not
reinstall it, GSAP, or any animation library.**

Scale (in `globals.css`):
`--ease-out`, `--ease-in-out`, `--dur-fast` 150ms, `--dur-base` 250ms,
`--dur-slow` 400ms. Never `linear`, never the browser default ease.

Rules:
- Animate **only** `transform` and `opacity`. To expand, use `scale` or
  `grid-template-rows: 0fr → 1fr`. Never animate height, width, top, left, or
  box-shadow.
- Scroll reveal applies to **section-level blocks only** — opacity 0→1 plus
  `translateY(12px)`, fired once then unobserved. 60ms stagger exists only in
  the projects grid and the stats row. Nothing above the fold reveals.
- `.reveal` is scoped under `.js` so content is never invisible without JS.
- Hero load sequence: name → tagline → CTA, 540ms total.
- Project cards: one hover state (border → accent, mono metadata fades in).
  `:focus-visible` mirrors hover exactly and adds a ring.
- Nav: one shared underline element slides via `translateX`/`scaleX`. The nav
  ground is a separate layer whose **opacity** transitions once past the hero.
- `prefers-reduced-motion: reduce` must resolve every animation to its **final**
  state, never to a hidden one.
- Banned: parallax, cursor followers, magnetic buttons, text scramble, scroll
  progress bars, marquees, tilt-on-hover, page wipes, anything animating while
  idle.

## Content Rules — CRITICAL

- Identity pillars: AI Agent Builder, Claude Code/n8n Automation, Entrepreneurship & Leadership
- Product Management is in her background but is NOT the headline identity
- Tagline: "I build AI that works for people."
- Subtitle: "AI Agent Builder • Automation Expert • Entrepreneur"
- DrinkDock must be labeled "DrinkDock (Babson FME Venture)" — never just "DrinkDock Startup"
- Small Business Bootcamp must include "(G1000 Program)"
- DO NOT include the hostess/server role at Old Street Hotpot anywhere
- GPA (3.75) appears ONLY in the Education section — never in hero or stats strip
- Testimonial quotes are **verbatim**. Do not fix grammar, shorten, or add new
  testimonials. Brandon's "venture too" and missing terminal period are intentional.
- Voice: Confident, specific, action-oriented. Use numbers and outcomes. No "passionate about technology."

## Responsive Behavior

- Mobile-first
- Testimonial cards stack to a single column; David's card goes two-column at
  `min-[700px]`, screenshot beside text
- Nav collapses to hamburger on mobile
- Verify 375px → 1920px; no horizontal scroll

## Reference

- Full project spec: see `Elizabeth_Tran_Portfolio_Megaprompt.md` in project root

## Design Context

### Users
Recruiters, startup founders, technical leads, and potential collaborators — browsing on desktop or mobile, quickly scanning to decide if Elizabeth is someone they want to work with. They're technically literate enough to notice design quality but their primary question is: can she build things that matter?

### Brand Personality
**Warm, capable, human.** AI that works for people — felt in the design itself, not just stated in copy. The interface should feel like it was made by someone who thinks carefully and ships things, not someone proving how technical they are.

### Aesthetic Direction
Clean, minimalist, technical — a well-made developer tool's landing page. Restrained, confident, generous negative space, precise alignment. Motion should read as engineered, not animated: if a visitor consciously notices an animation, it is too much.

### Design Principles
1. **Motion earns its place** — every animation communicates state or reveals content
2. **Hierarchy over uniformity** — not every item deserves the same visual weight
3. **Hairlines over boxes** — thin dividers and whitespace before heavy cards
4. **Typographic contrast does the work** — one display, one body, one mono
5. **Accent as rare punctuation** — overuse kills its power
