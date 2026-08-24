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
- `/components/ui` — shadcn components + custom UI (background-paths, section-header, reveal)
- `/components/sections` — Page sections (about, metrics, projects, testimonials, skills, education, contact)
- `/components/nav.tsx` — Sticky top navigation
- `/hooks` — `use-reveal` (IntersectionObserver), `use-count-up` (rAF number tween)
- `/lib/utils.ts` — cn() helper for shadcn
- `/public/headshot.png` — Elizabeth's headshot photo
- `/public/testimonials/` — Testimonial avatars + the Daily Cash Bot screenshot

## Page order

Hero → **Metrics strip** → About → Projects → Testimonials → Skills → Education → Contact.

The metrics strip (`metrics.tsx`, `#impact`) is a **band, not a numbered section**:
no `SectionHeader`, no serif heading, hairline top and bottom. It sits directly
under the hero because the numbers are a core part of the pitch and must land
before the prose. Section numbering therefore runs 01 About → 02 Projects →
03 Testimonials → 04 Skills → 05 Education → 06 Contact.

All four metrics render through one `Stat` component at identical size, weight,
and colour. **Never emphasise one metric over the others**, and never restate a
metric as styled inline text elsewhere. **All four** carry a source link, shown
as quiet mono metadata *below* the label so it never changes the weight of the
number.

Current values and sources:
- **2M+** TikTok Views → her TikTok
- **$100K** Solutions Supported → AI Technology Partners (aitp.ai)
- **3,000+** Students Reached → ProDream site + ProDream TikTok
- **80+** Businesses Consulted → The Generator AI Innovators Bootcamp

Two corrections that must not regress: TikTok views is **2M+**, not 5M+. And the
$100K is **"Solutions Supported"** — she made client training materials while
interning at AI Technology Partners; she did **not** build those solutions.
Never relabel this as "Solutions Built".

There is **no Experience section**. It was removed; its two orphaned facts (two
paying clients / $3,000+ revenue, and the DrinkDock COO run to breakeven) now
live in the About blurb. Do not reintroduce a resume-style role list.

## Custom UI Components

1. `background-paths.tsx` — Hero. **Two-column editorial composition**: name,
   tagline, eyebrow, and two CTAs on the left; portrait on the right inside a
   hairline frame offset by 12px. Not centred, and **not `min-h-screen`** — it is
   `lg:min-h-[min(86vh,900px)]` so the portrait clears the fold without wasting
   a viewport. The SVG paths **draw in once on load via CSS and then hold
   still**; they are a quiet backdrop (`strokeOpacity` ramps to ~0.48, not to
   opaque). In light mode the whole `<svg>` drops to `opacity-[0.35]`: the
   near-black strokes ran behind the hero name and fought the violet ink. Dark
   mode stays at full strength. Do not reintroduce an idle loop. Each `<path>`
   needs `pathLength={1}` for `.hero-path`'s normalized `stroke-dasharray` to
   work.
2. `section-header.tsx` — The single section-header pattern. Every section uses
   it. Renders a numbered mono eyebrow, a serif heading, and an optional
   description as one revealing unit.
3. `reveal.tsx` — Scroll-reveal wrapper around `use-reveal`.

`spotlight-card.tsx` was deleted (unused; its glow conflicted with these rules).
Do not reintroduce it.

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
- Display ink is `--heading`, a violet-tinted ink used for the hero name,
  tagline, role line, the four metric numbers, and every display heading
  (`h2` and `h3` alike: project titles, skill categories, Babson College). Light
  mode is a deep violet (`265 62% 30%`), dark mode a lifted violet
  (`265 60% 80%`) since a dark purple would vanish on the charcoal ground. Body
  copy stays `--foreground` / `--muted-foreground` so the contrast between
  display and prose is what carries the hierarchy.
- Color: charcoal ground (`#0E0E11`), warm off-white ink (`#F3F0EA`), and three
  distinct lifted surfaces (`--card` / `--secondary` / `--muted` — keep them
  different; they were once all the same value). A static ~2.5% grain sits on
  `body::before`.
- **Two accents, tightly scoped.** Violet `--primary` owns links, hover, the nav
  underline, and live status dots. Muted blue `--accent-cool` (`#8BB8D9`) is
  bounded to exactly two uses: the `Impact →` label on project cards and the
  `CLIENT FEEDBACK` / `STUDENT FEEDBACK` eyebrows on testimonial cards — both
  tie a claim to its proof. **Never put both accents on one element**, and do not
  widen `--accent-cool` beyond those two uses without asking.
- Status is a small dot plus lowercase mono text. **No colored pill backgrounds.**
- One radius token (`--radius`, 5px). One border color (`--border`).
- Icons appear on the single featured project card only — never on every card.
- **Five** projects, each a mini case study: mono kicker, serif title, Problem
  line, Build line, `Impact →` line, then tags. Tags are **always visible** —
  do not hide them behind hover again. ProDream AI Growth and Toyota Research
  were removed.
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
- Hero load sequence: name → tagline → CTA → portrait, 660ms total.
- Project cards: one hover state (border → accent). Tags no longer fade in on
  hover; they are always visible. `:focus-visible` mirrors hover and adds a ring.
- Nav: one shared underline element slides via `translateX`/`scaleX`. The nav
  ground is a separate layer whose **opacity** transitions once past the hero.
- `prefers-reduced-motion: reduce` must resolve every animation to its **final**
  state, never to a hidden one.
- Banned: parallax, cursor followers, magnetic buttons, text scramble, scroll
  progress bars, marquees, tilt-on-hover, page wipes, anything animating while
  idle.

## Craft details (keep these)

- `section[id]` and `:target` carry `scroll-margin-top: 5rem` so nav anchors
  clear the fixed 4rem nav. Without it, headings land underneath the bar.
- `.skip-link` in `layout.tsx` targets `#main`; it is the first focusable
  element and only appears on `:focus-visible`.
- `::selection` uses `--primary` at 28%.
- Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.
- `app/icon.svg` is the favicon (ET monogram). `viewport.themeColor` sets the
  mobile browser chrome per scheme. `themeColor` belongs on the `viewport`
  export in Next 14, never on `metadata`.
- The testimonial lightbox returns focus to the thumbnail that opened it.

## Content Rules — CRITICAL

- Identity pillars: AI Agent Builder, Claude Code/n8n Automation, Entrepreneurship & Leadership
- Product Management is in her background but is NOT the headline identity
- Tagline: "I build AI that works for people."
- Hero subtitle: "Agent Automation Builder • Growth Expert" (two items, not three)
- DrinkDock must be labeled "DrinkDock (Babson FME Venture)" — never just "DrinkDock Startup"
- Small Business Bootcamp must include "(G1000 Program)"
- DO NOT include the hostess/server role at Old Street Hotpot anywhere
- The Daily Cash Bot aggregates **six bank accounts** for David. It was NOT built
  for a fuels company — do not reintroduce that attribution.
- GPA (3.75) appears ONLY in the Education section — never in hero or stats strip
- Testimonial quotes are **verbatim**. Do not fix grammar, shorten, or add new
  testimonials. Brandon's "venture too" and missing terminal period are intentional.
- Voice: Confident, specific, action-oriented. Use numbers and outcomes. No "passionate about technology."
- **Avoid em dashes in body copy.** They read as machine-written here. Use
  commas, parentheses, or a second sentence.

## Responsive Behavior

- Mobile-first
- Testimonial cards stack to a single column. David's card is a single column at
  every width: a **cropped landscape band** of the report screenshot
  (`w-[250px] aspect-[739/560]`, `object-cover`, `objectPosition: 50% 13%`) sits
  above the quote. The full 739×1600 image stays in the lightbox. Do not let the
  screenshot dominate the card.
- In both testimonial cards only `<figcaption>` carries `mt-auto`. Content flows
  from the top so the slack that equalises the two cards collects in one place
  above the identity row, rather than opening a hole under the quote.
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
