# Architecture Overview

## What this project is

Foxtheta's marketing website and lead-capture backend: a Next.js site that
presents the company's industry solutions, and a FastAPI service that turns
contact-form submissions into tracked sales leads. There is no CMS — every
page's content lives directly in its `page.tsx` file as TypeScript data.

## System diagram

```
┌─────────────────────┐         POST /api/v1/contact          ┌──────────────────────┐
│   apps/frontend      │ ─────────────────────────────────────▶│   apps/backend        │
│   Next.js (App       │                                        │   FastAPI             │
│   Router), static-   │◀───────────────────────────────────── │                        │
│   rendered pages     │        202 { reference_id }            │                        │
└─────────────────────┘                                        └──────────┬────────────┘
                                                                            │
                                                          ┌─────────────────┼─────────────────┐
                                                          ▼                 ▼                 ▼
                                                  ┌───────────────┐ ┌──────────────┐ ┌────────────────┐
                                                  │  PostgreSQL    │ │ Background   │ │ Cloudflare      │
                                                  │  (leads,       │ │ email tasks  │ │ Turnstile       │
                                                  │  contacts,     │ │ (SMTP)       │ │ (spam check)    │
                                                  │  users, audit) │ │              │ │                 │
                                                  └───────────────┘ └──────────────┘ └────────────────┘
```

The frontend and backend are **deployed and scaled independently** — they
only ever talk to each other over HTTP, via `NEXT_PUBLIC_API_BASE`. Nothing
in the frontend imports backend code or vice versa.

## Frontend responsibilities

- Render every public page (home, 6 industry deep-pages, technology,
  platform/trust, case studies, about, process, insights, contact, legal)
  as static HTML at build time (`next build` → `○ Static` for all routes —
  there is no per-request server rendering or data fetching for content).
- Collect the contact form and submit it to the backend.
- Own all SEO metadata (titles, descriptions, OpenGraph, sitemap, robots).
- Own the entire visual design system (hand-written CSS, no component
  library) and its interactive widgets (ROI calculator, agent demo,
  scroll-reveal animation).

The frontend has **no database, no server-side data fetching, and no
authenticated area**. It is a static content site with one dynamic
integration point: the contact form.

## Backend responsibilities

- Validate and persist contact-form submissions (`Contact` + `Lead` +
  `AuditLog` rows, one transaction).
- Send the two transactional emails that follow a submission (internal
  sales notification, visitor confirmation).
- Rate-limit and spam-check submissions (in-memory limiter + optional
  Cloudflare Turnstile).
- Provide a small internal admin API (JWT + refresh-cookie auth, RBAC) for
  staff to view and triage leads — **not exposed anywhere in the public
  frontend today**; it's a plain REST API meant for an internal tool that
  doesn't exist yet (see [ROADMAP.md](ROADMAP.md)).

The backend has no knowledge of the frontend's page content, industries,
or copy — it only knows about `Lead`/`Contact`/`Company`/`User` records.

## Technology stack

| Layer | Choice | Why |
|---|---|---|
| Frontend framework | Next.js 16 (App Router), React 19, TypeScript | File-based routing matches one-page-per-industry content model; static rendering needs no server for content pages. |
| Frontend styling | Hand-written CSS (`app/globals.css`), no Tailwind/CSS-in-JS | See [FRONTEND.md](FRONTEND.md#theme-system) — a from-scratch design system, not a component-library skin. |
| Backend framework | FastAPI (async), Python 3.12 | Async end to end (asyncpg, SQLAlchemy async, aiosmtplib) so one process handles concurrent form submissions and background email sends without blocking. |
| Database | PostgreSQL 16, SQLAlchemy 2.0 (async ORM), Alembic migrations | Relational integrity for the lead pipeline (contacts ↔ companies ↔ leads ↔ audit log); Postgres-native `ENUM`/`JSONB` types used directly in the schema. |
| Auth | JWT access tokens (15 min) + httpOnly rotating refresh-token cookie | Standard short-lived-access / long-lived-refresh pattern; refresh tokens are stored hashed, never in plaintext, and rotate on every use. |
| Background jobs | FastAPI `BackgroundTasks` (in-process) | Sufficient at current volume; **not** Celery/Redis — see [ROADMAP.md](ROADMAP.md) for when to change this. |
| Email | `aiosmtplib` against any SMTP provider | No vendor lock-in to a specific transactional-email API. |
| Spam protection | Cloudflare Turnstile (server-verified) + honeypot field + IP rate limit | Layered: a bot has to defeat all three, not just one. |

## Folder structure

```
apps/
  frontend/                  Next.js site — see FRONTEND.md
    app/                     Routes (App Router) — one folder per URL segment
      industries/[slug]/     6 industry deep-pages, all rendered through
                              IndustryPageTemplate with per-industry data
      insights/[slug]/       Blog-style articles
    components/shared/       Components reused across ≥2 pages
    sections/home/           Home-page-only section components
    features/                Self-contained interactive widgets
    lib/                     Site-wide config and the shared metadata helper

  backend/                   FastAPI service — see BACKEND.md
    app/
      api/v1/                Route handlers only — parse request, call a service, return
      services/              Business logic (framework-agnostic, unit-testable)
      repositories/          Database queries (one per aggregate: User, Lead, Contact, Session)
      models/                SQLAlchemy ORM models = the schema, in code
      schemas/                Pydantic request/response shapes
      auth/                  Password hashing, JWT encode/decode
      emails/                Transactional email sending
      middlewares/           Rate limiting
    alembic/                 Database migrations
    scripts/seed.py          One-time role + admin-user bootstrap
    tests/                   pytest suite (runs against in-memory SQLite)

deployment/docker/           docker-compose.dev.yml — local Postgres (+ optional backend container)
.github/workflows/ci.yml     Runs backend tests + migration check, frontend typecheck + build
docs/                        You are here
```

## Request lifecycle: a contact-form submission, start to finish

This is the one full round trip through both halves of the system — see
[BACKEND.md](BACKEND.md#endpoint-documentation) for the backend-internal
detail on each step, and [FRONTEND.md](FRONTEND.md#reusable-components-reference)
for the form component itself.

1. Visitor fills out `/contact` and submits. `ContactForm.tsx` client-side
   validates required fields, then `fetch`es `POST {NEXT_PUBLIC_API_BASE}/contact`.
2. FastAPI's rate limiter checks the caller's IP against `CONTACT_FORM_RATE_LIMIT`
   (default 5/hour) — over the limit gets a `429` before anything else runs.
3. Pydantic validates the JSON body against `ContactFormRequest` — a
   malformed payload gets a `422` with field-level errors.
4. The honeypot field (`website`) is checked — a bot that fills every field
   gets rejected as spam.
5. `verify_turnstile_token()` calls Cloudflare's `siteverify` endpoint (or
   short-circuits to `True` in dev, when no `TURNSTILE_SECRET_KEY` is set).
6. `LeadService.capture_from_contact_form()` runs one transaction: find-or-create
   `Company` (by name), find-or-create `Contact` (by work email), insert
   `Lead`, insert `AuditLog`, commit.
7. The response returns `202 { reference_id }` **before** any email is sent —
   `BackgroundTasks` queues the two email sends so the visitor's request
   never waits on SMTP latency.
8. Two emails fire: an internal notification to `SALES_NOTIFICATION_EMAIL`,
   and a confirmation to the visitor's own address.
9. Frontend shows the success message from the response body. If the fetch
   itself fails (backend unreachable), `ContactForm.tsx` falls back to
   opening a pre-filled `mailto:` link so the enquiry isn't silently lost.

## What this project is *not*

Documenting scope honestly matters as much as documenting what exists:

- **No CMS.** Editing content means editing a `.tsx` file and redeploying.
- **No admin frontend.** The backend's `/api/v1/admin/*` routes exist and
  are tested, but nothing in `apps/frontend` calls them — there is no
  internal dashboard UI yet.
- **No CI/CD deploy step.** `.github/workflows/ci.yml` runs tests and build
  checks only. Nothing auto-deploys anywhere — see [DEPLOYMENT.md](DEPLOYMENT.md).
- **No analytics, no tracking.** Confirmed and documented in the site's own
  [Privacy Policy](../apps/frontend/app/privacy/page.tsx).
