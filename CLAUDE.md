# Elizabeth Tran — Portfolio Website

Personal portfolio site. Next.js 14+ App Router, TypeScript, Tailwind CSS, shadcn/ui.

## Commands

- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Production build
- `npm run lint` — ESLint check

## Architecture

- `/app` — Next.js App Router pages and layouts
- `/app/page.tsx` — Single-page portfolio (all sections)
- `/app/globals.css` — Tailwind + custom CSS animations
- `/components/ui` — shadcn components + custom UI (background-paths, spotlight-card, hero-futuristic)
- `/components/sections` — Page sections (hero, about, experience, projects, skills, education, contact)
- `/components/nav.tsx` — Sticky top navigation
- `/lib/utils.ts` — cn() helper for shadcn
- `/public/headshot.jpg` — Elizabeth's headshot photo
- `/public/resume.pdf` — Downloadable resume

## Three Custom UI Components (DO NOT modify core logic)

1. `background-paths.tsx` — Animated SVG hero background. Uses framer-motion. Dark mode supported.
2. `spotlight-card.tsx` — GlowCard with cursor-tracking spotlight effect. Pure React + CSS. Props: `glowColor`, `customSize`, `width`, `height`.
3. `hero-futuristic.tsx` — WebGPU 3D hero with scan effect. Uses three.js + R3F. MUST have a fallback for browsers without WebGPU.

## Code Style

- TypeScript strict, no `any`
- Use named exports
- Tailwind utility classes only — no custom CSS files (except globals.css for animations)
- All components are functional with hooks
- Use `next/image` for all images
- Use lucide-react for icons — no other icon libraries

## Design Rules

- Dark mode is DEFAULT. Light mode toggle available.
- Font: Use a distinctive display font from Google Fonts — NOT Inter, Roboto, or Arial
- Color palette: Deep blacks/slates + one electric accent color (cyan, violet, or coral)
- All sections must have smooth scroll navigation via anchor IDs
- GlowCards use different `glowColor` per card (blue, purple, green, orange)
- Stats strip in About section: numbers only, NO company attribution (e.g., "60+ Businesses Consulted" not "60+ Businesses Consulted at G1000 Program")

## Content Rules — CRITICAL

- Identity pillars: AI Agent Builder, Claude Code/n8n Automation, Entrepreneurship & Leadership
- Product Management is in her background but is NOT the headline identity
- Tagline: "I build AI that works for people."
- Subtitle: "AI Agent Builder • Automation Expert • Entrepreneur"
- DrinkDock must be labeled "DrinkDock (Babson FME Venture)" — never just "DrinkDock Startup"
- Small Business Bootcamp must include "(G1000 Program)"
- DO NOT include the hostess/server role at Old Street Hotpot anywhere
- GPA (3.75) appears ONLY in the Education section — never in hero or stats strip
- Voice: Confident, specific, action-oriented. Use numbers and outcomes. No "passionate about technology."

## Responsive Behavior

- Mobile-first
- GlowCards stack to single column on mobile
- Simplify/lazy-load 3D hero on mobile
- Nav collapses to hamburger on mobile

## Reference

- Full project spec: see `Elizabeth_Tran_Portfolio_Megaprompt.md` in project root

## Design Context

### Users
Recruiters, startup founders, technical leads, and potential collaborators — browsing on desktop or mobile, quickly scanning to decide if Elizabeth is someone they want to work with. They're technically literate enough to notice design quality but their primary question is: can she build things that matter? They view in work contexts, often in the evening on a monitor.

### Brand Personality
**Warm, capable, human.** AI that works for people — felt in the design itself, not just stated in copy. The interface should feel like it was made by someone who thinks carefully and ships things, not someone proving how technical they are.

Voice: confident, specific, action-oriented. Numbers and outcomes over adjectives. No "passionate about technology."

### Aesthetic Direction
**Kinetic / alive** — purposeful motion that reveals content and communicates state. Staggered scroll reveals, entrance animations with intention. NOT scroll-jacked, NOT loading screens, NOT particle systems.

**Anti-references:**
- No overdesigned showoff: no WebGL heroes, no shader effects, no cinematic loading
- No corporate LinkedIn PDF: not safe, not beige, not over-structured

**Theme:** Dark. Elizabeth's audience views in work contexts; dark feels considered, not lazy.

**Accent:** Electric violet — ambitious and inventive, sits between creative and technical. Used as rare punctuation, not wallpaper.

### Typography
- **Display: Bricolage Grotesque** (variable, Google Fonts)
- **Body: Albert Sans** (Google Fonts)

### Design Principles
1. **Motion earns its place** — every animation communicates state or reveals content; nothing moves to show off
2. **Warmth in precision** — spacing and type feel considered, not clinical
3. **The work is the hero** — design creates context, then steps back
4. **Human over technical** — resist signals that read "developer portfolio"
5. **Violet as rare punctuation** — accent appears sparingly; overuse kills its power