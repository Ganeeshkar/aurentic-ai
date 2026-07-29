# Foxtheta

Enterprise AI solutions website and lead-capture backend, organized as a
small monorepo: a Next.js marketing site (six industry-specific solution
pages, a technology/platform overview, insights, and a contact-to-lead
pipeline) backed by a FastAPI + PostgreSQL service.

**New here?** Start with [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for
the 5-minute overview, then [`docs/SETUP.md`](docs/SETUP.md) to get it
running locally. Everything below is a map of the full documentation set —
this file stays short on purpose; the real detail lives in `docs/`.

## What's in this repo

| Path | What it is |
|---|---|
| `apps/frontend/` | The website — Next.js (App Router), TypeScript, a hand-written CSS design system. See [`apps/frontend/README.md`](apps/frontend/README.md). |
| `apps/backend/` | The API — FastAPI + PostgreSQL. Handles the contact form (lead capture) and staff auth. See [`apps/backend/README.md`](apps/backend/README.md). |
| `deployment/docker/` | `docker-compose.dev.yml` — brings up Postgres (and optionally the backend) for local development. |
| `.github/workflows/ci.yml` | Runs backend tests + migration check, and frontend typecheck + build, on every PR and push to `main`. |
| `docs/` | Full project documentation — see the index below. |

## Quick start

```bash
# Frontend (renders every page with no backend needed)
cd apps/frontend && npm install && npm run dev      # → http://localhost:3000

# Backend (needed for the contact form to actually save a lead)
docker compose -f deployment/docker/docker-compose.dev.yml up -d postgres
cd apps/backend && cp .env.example .env              # fill in JWT_SECRET_KEY at minimum
poetry install && poetry run alembic upgrade head
poetry run uvicorn app.main:app --reload              # → http://localhost:8000
```

Full step-by-step instructions, including troubleshooting common failures:
[`docs/SETUP.md`](docs/SETUP.md).

## Documentation index

| Document | Read this for |
|---|---|
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | System overview, tech stack, folder structure, and the full request lifecycle of a contact-form submission from click to database row. |
| [`docs/SETUP.md`](docs/SETUP.md) | Step-by-step local setup for both apps, database setup, migrations, and a troubleshooting table for common failures. |
| [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md) | Every environment variable, whether it's required, where to obtain each credential, and dev-vs-production differences. |
| [`docs/BACKEND.md`](docs/BACKEND.md) | Full API reference, the authentication flow (JWT + rotating refresh cookie), database schema, background jobs, email flow, validation/spam-protection flow, and per-module use cases. |
| [`docs/FRONTEND.md`](docs/FRONTEND.md) | Routing structure, component architecture, state management, the theme/design-token system, SEO implementation, and reusable component reference. |
| [`docs/CONTENT.md`](docs/CONTENT.md) | The business reasoning behind every page — why each industry's content differs, why each service is included, the expected customer journey, and how to add a new industry page correctly. |
| [`docs/CONTENT_REVIEW.md`](docs/CONTENT_REVIEW.md) | A rated, page-by-page content quality review with specific weak spots and recommendations. |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Production deployment steps, SMTP/domain/SSL configuration, a production checklist, and security/monitoring/backup recommendations. |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Current limitations, technical debt (with what triggers paying each item off), and the prioritized improvement roadmap. |

## Testing

```bash
cd apps/backend && poetry run pytest        # 21 tests, in-memory SQLite, no Postgres needed
cd apps/frontend && npx tsc --noEmit && npm run build   # frontend has no test suite yet — see docs/ROADMAP.md
```

## Deployment

**There is currently no automated deploy step for either app** — `ci.yml`
only runs tests and build checks. See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)
for the full production deployment guide before pointing a real domain at
this.
