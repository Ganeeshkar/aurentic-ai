# Foxtheta — frontend

Next.js (App Router) + TypeScript marketing site. Styling is a hand-written
CSS design system in `app/globals.css` (not a component library) — pages use
plain class names like `.svc-grid`, `.ind-card`, `.cta-final`.

## Running locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Set `NEXT_PUBLIC_API_BASE` in `.env.local` to point the contact form at a
running backend (see `apps/backend/README.md`); it defaults to
`http://localhost:8000/api/v1`.

## Structure

| Path | What it is |
|---|---|
| `app/` | Routes (App Router). Each `page.tsx` owns its own content/data — there's no CMS. |
| `app/industries/[slug]/page.tsx` | Industry deep-pages all render through `components/shared/IndustryPageTemplate.tsx`, supplying data via `IndustryPageData`. |
| `sections/home/` | Home-page-only section components, composed in `app/page.tsx`. |
| `components/shared/` | Reused across multiple pages (header, footer, hero, cards, forms). |
| `features/` | Self-contained interactive widgets (agent demo, ROI calculator, contact form, scroll-reveal). |
| `lib/site-config.ts` | Single source of truth for the site URL, name, and the route list used to generate `sitemap.xml`. |
| `lib/metadata.ts` | Shared helper every page uses to build consistent title/description/OpenGraph metadata. |

## Testing / verification

No test suite yet. Before shipping a change:

```bash
npx tsc --noEmit
npm run build
```
