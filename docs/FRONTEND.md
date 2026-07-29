# Frontend Documentation

Next.js (App Router) site in `apps/frontend`. See [ARCHITECTURE.md](ARCHITECTURE.md)
for how it fits the whole system.

## Routing structure

File-based routing under `app/`. Every route is statically rendered at
build time (`next build` → `○ Static` for all 25 routes) — there is no
per-request server rendering, no `getServerSideProps`-equivalent, and no
route reads from the database.

```
/                              app/page.tsx              Home
/industries                    app/industries/page.tsx    Industry index (6 cards)
/industries/banking            app/industries/banking/page.tsx
/industries/insurance          app/industries/insurance/page.tsx
/industries/healthcare         app/industries/healthcare/page.tsx
/industries/manufacturing      app/industries/manufacturing/page.tsx
/industries/retail             app/industries/retail/page.tsx
/industries/logistics          app/industries/logistics/page.tsx
/technology                    app/technology/page.tsx    The 6 engineering disciplines
/platform                      app/platform/page.tsx      Architecture / governance / security / LLMOps
/case-studies                  app/case-studies/page.tsx
/about                         app/about/page.tsx
/process                       app/process/page.tsx
/insights                      app/insights/page.tsx      Article index
/insights/hiring-agents        app/insights/hiring-agents/page.tsx
/insights/autonomy             app/insights/autonomy/page.tsx
/insights/shadow-mode          app/insights/shadow-mode/page.tsx
/insights/real-cost-of-an-ai-feature   app/insights/real-cost-of-an-ai-feature/page.tsx
/contact                       app/contact/page.tsx
/privacy, /terms               app/privacy/page.tsx, app/terms/page.tsx
/sitemap.xml, /robots.txt      app/sitemap.ts, app/robots.ts   (generated, not static files)
```

**Redirects** (`next.config.mjs`) preserve link equity from two earlier
information architectures this site went through: `/services` and
`/capabilities` → `/technology`; `/use-cases` and `/solutions` → `/industries`.
If you're wondering why these exist, that's why — they're not arbitrary.

**No dynamic segments** (no `[slug]` folders) — each industry and each
insight article is its own literal folder/file, even though five of the six
industry pages share one template component (see below). This was a
deliberate choice over `app/industries/[slug]/page.tsx` + a data map,
because each industry's content is substantial, hand-written, and
independently editable; a single dynamic route would mean one giant data
file instead of six reviewable, independently-diffable page files.

## Component architecture

```
components/shared/     Used by ≥2 pages: header, footer, hero banner, FAQ
                        accordion, step timeline, service-card grid, and
                        IndustryPageTemplate (see below).
sections/home/          Used by exactly 1 page (home) — kept separate from
                        components/shared specifically so "is this reused
                        anywhere?" is answerable by which folder a file is in.
features/               Self-contained interactive widgets, each independent
                        of the rest of the page tree:
                          agent-demo/       simulated multi-turn agent transcript
                          roi-calculator/   the ROI sliders + currency toggle
                          contact-form/     the /contact form + its submit logic
                          scroll-reveal/    the global fade-in-on-scroll behavior
```

### `IndustryPageTemplate` — the pattern worth understanding

All 6 industry pages (`app/industries/*/page.tsx`) render the same 8-section
structure — challenges, solutions, approach, features, ROI, technology, use
cases, FAQ — but with entirely different content. Rather than duplicate
~300 lines of JSX six times, each page file exports only a typed data
object (`IndustryPageData`, defined in `components/shared/IndustryPageTemplate.tsx`)
and renders `<IndustryPageTemplate data={DATA} />`. Adding a 7th industry
means writing a new data file, not new markup — see
[CONTENT.md](CONTENT.md) for how to actually write one.

## State management

There is no global state library (no Redux/Zustand/Context-based store).
State is local to whichever component needs it:

| State | Lives in | Why local is enough |
|---|---|---|
| ROI calculator inputs (team size, hours, cost, currency) | `RoiCalculator.tsx`, `useState` | Pure derived-value calculator, nothing else on the page depends on it. |
| Contact form field values + submit status | `ContactForm.tsx`, `useState` | Form is fully self-contained; result is just a status message, not shared app state. |
| Agent demo active tab + transcript playback | `AgentDemo.tsx`, `useState` + a `ref`-driven typewriter effect | Purely presentational, no persistence needed. |
| Mobile nav open/closed, header scrolled state | `SiteHeader.tsx`, `useState` | Local UI state, layout-scoped. |
| Scroll-reveal visibility | DOM `classList`, not React state at all | See Theme system below — deliberately outside React's render cycle for animation-timing reasons. |

## Data fetching

**There is none**, for content. Every page's content is a literal
TypeScript object/JSX tree in its own `page.tsx`, resolved at build time.
The **only** network call anywhere in the frontend is `ContactForm.tsx`'s
`fetch(...)` to `POST {NEXT_PUBLIC_API_BASE}/contact` on form submit — see
[ARCHITECTURE.md](ARCHITECTURE.md#request-lifecycle-a-contact-form-submission-start-to-finish)
for that full round trip, including the `mailto:` fallback if the backend
is unreachable.

## Theme system

Hand-written CSS in `app/globals.css` — **not** Tailwind, not CSS-in-JS, not
a component library. (Tailwind was previously wired in but confirmed to
have zero actual usage anywhere in the codebase and was removed — see the
project's cleanup history if you're wondering why there's no
`tailwind.config.ts`.) Every visual primitive is a plain class name:
`.svc-grid`, `.ind-card`, `.cta-final`, `.klabel`, and so on.

**Design tokens** are CSS custom properties defined once in `:root`:
```css
--bg, --bg-alt, --bg-deep      /* white / off-white / near-black surfaces */
--ink, --ink-dim, --faint      /* text colors, high → low emphasis */
--fire, --fire-deep            /* primary accent — terracotta */
--amber                        /* secondary accent — labels, small marks */
--navy                         /* contrast band background (footer, CTA, principle quote) */
--display, --body, --mono      /* the three typefaces in use */
```
Change a color/spacing/type choice site-wide by editing the token, not by
hunting down every usage.

**Dark vs. light is not a toggle** — this site deliberately commits to one
visual identity (a warm white body with a near-black footer/CTA band for
contrast), not a user-switchable theme.

**Scroll-reveal animation**: `.reveal` / `.reveal-stagger` classes start at
`opacity: 0` in CSS; `features/scroll-reveal/ScrollReveal.tsx` (mounted once
in the root layout) uses an `IntersectionObserver` to add `.is-visible` as
elements enter the viewport. This lives **outside** React state deliberately
— it mutates `classList` directly via the DOM API rather than triggering a
re-render, because the whole point is a one-way, one-time transition per
element, not something that needs to sync back into component state.
**Important implementation detail**: this effect is keyed on `usePathname()`
so it re-scans the DOM on every client-side navigation — without that, a
`<Link>` navigation's new page content would stay invisible until a full
refresh (this was a real bug, since fixed; if you ever add a new global
layout-level effect, ask whether it needs the same treatment).

## SEO implementation

Every page builds its metadata through one shared helper,
`lib/metadata.ts`'s `pageMetadata()`, rather than a bare Next.js `metadata`
object literal — this exists because Next.js does **not** deep-merge a
page's `openGraph`/`twitter` fields with the root layout's; a page that only
sets `title`/`description` would silently lose all social-preview data
without this helper filling both in every time.

```ts
export const metadata = pageMetadata({
  title: "...",
  description: "...",
  path: "/industries/banking",   // → canonical URL + OpenGraph url
  image: "/assets/au-og.png",    // optional, defaults to the sitewide OG image
});
```

- **`lib/site-config.ts`** is the single source of truth for `SITE_URL`,
  `SITE_NAME`, and `PUBLIC_ROUTES` — the last of which is what
  `app/sitemap.ts` iterates to generate `sitemap.xml`. **Adding a new page
  means adding it to `PUBLIC_ROUTES`, or it's built but never listed in the
  sitemap.**
- **`app/robots.ts`** allows all crawlers and points at the generated
  sitemap.
- **OG image**: `public/assets/au-og.png`, a static 1200×630 image
  (generated via a one-off Sharp/SVG script, not regenerated automatically —
  regenerate it manually if the brand mark or hero copy changes).

## Reusable components reference

| Component | Used by | Purpose |
|---|---|---|
| `PageHero.tsx` | Every interior page | The breadcrumb + eyebrow + H1 + lede block at the top of every non-home page. |
| `IndustryPageTemplate.tsx` | All 6 industry pages | See above. |
| `ServiceGrid.tsx` | Technology, Capabilities-style sections | Icon + title + body + bullet-list card grid. |
| `StepsGrid.tsx` | Process, industry "Implementation approach" sections | Numbered 4-step process cards. |
| `Faq.tsx` | Every industry page, Technology | `<details>/<summary>` accordion, no JS state needed. |
| `ArticleLayout.tsx` | Every `/insights/*` article | Breadcrumb + kicker + title + date wrapper for long-form content. |
| `SplitHeading.tsx` | Home hero | Word-by-word reveal animation for the H1 specifically (separate from the generic scroll-reveal system). |
| `IndustryIcons.tsx` | Industries index, home industry teaser, footer | The 6 hand-authored SVG icons (one per industry) — no icon library dependency. |

## Use cases, by page/feature

See [CONTENT.md](CONTENT.md) for the full business reasoning behind each
page's specific content. This table is the functional "what does this page
do," not the "why does it say this."

| Page/feature | Use case |
|---|---|
| Home (`app/page.tsx`) | Establish the positioning ("AI solutions built for the way your industry runs"), prove the claim with a live interactive demo, and route the visitor to their industry. |
| `/industries` | Let a visitor self-select their sector before reading anything industry-specific. |
| `/industries/*` (×6) | The actual sales page for a given sector — challenges → solutions → proof → CTA. This is where a qualified visitor is expected to convert. |
| `/technology` | For a technical evaluator (not a business buyer) who wants to know *how* systems are built, independent of industry. |
| `/platform` | For a security/compliance reviewer specifically — architecture, governance, and audit posture, written to be forwarded to that person. |
| `/case-studies` | Proof-of-work, honestly labeled as representative patterns rather than fabricated named clients (see [CONTENT.md](CONTENT.md) for why). |
| `/about` | Company credibility and operating philosophy, for a buyer doing vendor diligence. |
| `/process` | Answers "what does working with you actually look like" — the fixed-price, shadow-mode-validated engagement model. |
| `/insights` | Thought-leadership content for organic search and to demonstrate practitioner depth. |
| `/contact` | The conversion endpoint every other page's CTA points at. |
| ROI calculator (home) | Turn an abstract "we save you time" claim into a visitor-specific number, without pretending it's a quote. |
| Agent demo (home) | Show, not tell — a simulated but labeled-as-simulated transcript of an agent working with a human approval gate. |

## Testing / verification

No automated test suite for the frontend yet (see [ROADMAP.md](ROADMAP.md)).
Before shipping any change:
```bash
npx tsc --noEmit   # typecheck
npm run build      # full production build, catches most real issues
```
For anything touching navigation, animation, or the contact form, manually
verify in a browser — a clean build does not guarantee correct client-side
behavior (the scroll-reveal bug above is the concrete example of a bug a
build/typecheck could never have caught).
