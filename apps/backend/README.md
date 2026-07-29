# Foxtheta — backend

FastAPI service implementing auth (JWT + refresh, RBAC) and the production
lead-capture pipeline that replaces the static site's `mailto:` contact form.

Scope note: this is **Phase 1**. Enterprise requests, security-download
capture, case studies, blog, newsletter, CRM webhooks, and the admin
dashboard are Phase 3/4 — deliberately not built yet, so Phase 1 ships
and gets used before more surface area is added. See
`app/api/v1/router.py` for the extension point.

## Running locally

```bash
cd apps/backend
cp .env.example .env          # fill in JWT_SECRET_KEY at minimum
poetry install
```

With Docker (recommended — brings up Postgres too):

```bash
docker compose -f ../../deployment/docker/docker-compose.dev.yml up --build
```

Without Docker (requires a local Postgres matching `.env`'s `DATABASE_URL`):

```bash
poetry run alembic upgrade head
SEED_ADMIN_PASSWORD=change-me poetry run python -m scripts.seed
poetry run uvicorn app.main:app --reload
```

API docs (non-production only): `http://localhost:8000/api/docs`

## Testing

```bash
poetry run pytest
```

## What's deliberately not here yet

- **Celery + Redis** — email is sent via FastAPI `BackgroundTasks`.
  Sufficient at current lead volume; swap in Celery when a single-process
  background task queue stops being enough (see architecture blueprint §19).
- **CRM webhook integrations** (HubSpot/Pipedrive/Salesforce) — `Lead.source`
  and `Lead.status` are modeled so this is additive, not a schema change,
  when it's built.
- **Admin dashboard endpoints** — `require_role()` and the `sessions` /
  `audit_logs` tables are already in place; the routes themselves are Phase 3.

## Key flows

- **Contact form:** `POST /api/v1/contact` — validates, checks Turnstile,
  rate-limits by IP, writes `Contact` + `Lead` + `AuditLog` rows in one
  transaction, queues confirmation + sales-notification emails, returns
  `202` with a reference id. See `app/services/lead_service.py`.
- **Auth:** `POST /api/v1/auth/login` issues a 15-minute access token plus
  an httpOnly refresh cookie backed by a revocable `sessions` row.
  `POST /api/v1/auth/refresh` rotates the refresh token on every use.
  See `app/services/auth_service.py`.
