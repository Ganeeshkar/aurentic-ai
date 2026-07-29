# Deployment Guide

> **Status check first:** as of this writing, **neither app has an
> automated deploy pipeline.** `.github/workflows/ci.yml` runs backend
> tests + migration check, and frontend typecheck + build, on every PR and
> push to `main` — but nothing in this repository deploys anywhere
> automatically. This guide documents the deployment *this project needs
> set up*, not a system that already exists. Don't read any step below as
> "already automated" unless it explicitly says so.

## Production deployment steps

### Frontend (Next.js)

Any platform that runs Next.js natively works — Vercel is the path of
least resistance (zero-config for the App Router), a container platform
(Fly.io, Render, a plain Docker host) works equally well if you'd rather
not depend on a Next-specific host.

1. Set `NEXT_PUBLIC_API_BASE` to the backend's real public URL (see
   [ENVIRONMENT.md](ENVIRONMENT.md)) in the platform's environment
   variable settings — **not** in a committed `.env` file.
2. Build command: `npm run build`. Start command (if not using Vercel's
   managed runtime): `npm run start`.
3. Confirm `npx tsc --noEmit && npm run build` succeeds locally first —
   this is exactly what CI already checks on every PR, so a green PR check
   should mean a clean deploy.

### Backend (FastAPI)

Any platform that runs a long-lived Python process works (Fly.io, Render,
Railway, a container on ECS/Cloud Run, or a plain VM behind a reverse
proxy). A `Dockerfile` already exists at `apps/backend/Dockerfile`.

1. Provision production Postgres (see [Database migration process](#database-migration-process)).
2. Set every required environment variable on the host — see
   [ENVIRONMENT.md](ENVIRONMENT.md) for the full list and the
   dev-vs-production column specifically. At minimum: `JWT_SECRET_KEY`
   (a real, unique secret — never the dev placeholder),
   `DATABASE_URL`, `CORS_ORIGINS` (the frontend's real origin),
   `ENVIRONMENT=production`.
3. Run `alembic upgrade head` **once**, before the app starts serving
   traffic (see below).
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
   (no `--reload` in production — that flag is for local dev only).
5. Run `scripts/seed.py` once, to create the first admin account:
   `SEED_ADMIN_PASSWORD=<real-password> python -m scripts.seed`. Do this
   from a one-off shell on the host, not as part of every deploy — it's
   idempotent (safe to re-run) but only meaningfully does anything once.

## Environment configuration

Full variable-by-variable reference: [ENVIRONMENT.md](ENVIRONMENT.md).
Production-specific summary:

- Never commit a populated `.env` — every secret comes from your host's
  environment-variable / secrets-manager UI.
- `ENVIRONMENT=production` disables `/api/docs` and `/api/redoc`, and
  makes the refresh-token cookie require HTTPS (`Secure` flag). **If you
  set this before HTTPS is actually in place, login will silently fail**
  (the browser won't send a `Secure` cookie over plain HTTP) — sequence
  SSL setup before flipping this.
- `CORS_ORIGINS` must be the frontend's exact production origin, no
  wildcard — the refresh cookie is a credentialed request, which the
  browser blocks entirely against a wildcard CORS origin.

## Database migration process

```bash
# Once, against the production database, before the new backend version
# starts receiving traffic:
alembic upgrade head
```

- Run this from a deploy step or a one-off admin shell, **not** from
  application startup code — a migration should be a deliberate, logged,
  singular action, not something that happens implicitly every time a
  process boots (which is also unsafe if you ever run multiple backend
  instances — you don't want N processes racing to migrate simultaneously).
- Before adding a new migration: `alembic revision --autogenerate -m "..."`
  generates a draft by diffing your models against the last-known schema —
  **always read the generated file before applying it.** Autogenerate
  reliably catches new tables/columns; it does not reliably catch
  data-migration needs (e.g. backfilling a new non-nullable column).
- Rolling back: `alembic downgrade -1` (one step) or `alembic downgrade base`
  (everything). CI's `backend-migration-check` job already verifies every
  migration's `downgrade()` actually works against a real Postgres — trust
  that check; don't skip writing a working `downgrade()` "because it'll
  never be needed."

## SMTP configuration

Set `SMTP_HOST`/`SMTP_PORT`/`SMTP_USERNAME`/`SMTP_PASSWORD` (see
[ENVIRONMENT.md](ENVIRONMENT.md)) to a real transactional email provider
(Postmark, SES, SendGrid, Mailgun, Resend, etc.). Beyond the credentials,
**deliverability requires domain authentication**, independent of anything
in this codebase:

1. **SPF record** on your sending domain's DNS, authorizing your provider's
   servers to send as you.
2. **DKIM** — your provider gives you a DNS TXT record to add; this signs
   outgoing mail cryptographically so receiving servers can verify it
   wasn't spoofed.
3. **DMARC** (recommended) — a policy record telling receiving servers what
   to do with mail that fails SPF/DKIM.

Without these three, real production email will land in spam folders even
with fully correct SMTP credentials — this is a DNS/deliverability problem,
not a code problem, and no amount of backend debugging fixes it.

**Verify it's actually working**, not just configured: submit the real
contact form against production and confirm both emails (`New lead: ...`
and `We received your message — Foxtheta`) actually arrive, not just that
the API returned `202`. A `202` only means the lead was saved and the email
was *queued* — see [BACKEND.md](BACKEND.md#email-flow) for what happens if
`SMTP_HOST` is misconfigured (it fails silently into the "not sent" log
path in some failure modes, so don't treat "no error in the response" as
proof email is working).

## Domain configuration

1. Point your domain's DNS at whichever platform hosts the frontend (an
   `A`/`CNAME` record per that platform's instructions).
2. If the backend is on a different host, give it its own subdomain (e.g.
   `api.foxtheta.com`) and point `NEXT_PUBLIC_API_BASE` at it.
3. Update `SITE_URL` in `apps/frontend/lib/site-config.ts` to the real
   domain — this drives every canonical URL, the sitemap, and OpenGraph
   tags. **This is a code change, not an environment variable** — it's
   deliberately a single hardcoded constant so there's one unambiguous
   source of truth (see [FRONTEND.md](FRONTEND.md#seo-implementation)).

## SSL setup

Vercel and most modern PaaS platforms (Render, Fly.io, Railway) provision
and renew TLS certificates automatically for any domain you attach — no
manual certificate management needed. If self-hosting on a bare VM, use
Caddy or `certbot` (Let's Encrypt) in front of both services; either way,
**confirm HTTPS is live before setting `ENVIRONMENT=production`** on the
backend (see the CORS/cookie note above).

## Production checklist

- [ ] `JWT_SECRET_KEY` is a real, unique, randomly generated secret — not the dev placeholder
- [ ] `DATABASE_URL` points at production Postgres, with credentials scoped to only what this app needs
- [ ] `alembic upgrade head` has been run against production
- [ ] `scripts/seed.py` has been run once, with a real (not default) admin password
- [ ] `CORS_ORIGINS` is the exact production frontend origin, no wildcard
- [ ] `ENVIRONMENT=production` is set **only after** HTTPS is confirmed live
- [ ] SMTP is configured **and** SPF/DKIM/DMARC are set up **and** a real test submission's emails were confirmed to arrive (not just that the API returned 202)
- [ ] `TURNSTILE_SECRET_KEY` is set (see [Security recommendations](#security-recommendations) — currently unset means Turnstile silently always passes)
- [ ] `NEXT_PUBLIC_API_BASE` (frontend) points at the real production backend URL
- [ ] `SITE_URL` in `lib/site-config.ts` matches the real domain
- [ ] `npx tsc --noEmit && npm run build` (frontend) and `poetry run pytest` (backend) both pass on the exact commit being deployed
- [ ] A real end-to-end contact-form submission was tested against production: lead appears in the database, both emails actually arrive

## Monitoring and logging

**Nothing is set up today** — this section is what to add, not what exists.

- The backend already logs structured `INFO`-level lines (see
  `logging.basicConfig` in `app/main.py`) including every email send
  attempt and SQLAlchemy queries when `DEBUG=true`. In production, ship
  these logs somewhere durable (your host's log aggregation, or a service
  like Better Stack / Datadog / Axiom) — do not rely on `docker logs` or an
  ephemeral container's stdout as your only record.
- No error-tracking service (Sentry or similar) is wired in on either app.
  Given the backend already fails loudly on startup misconfiguration (see
  [BACKEND.md](BACKEND.md)) and returns structured HTTP error codes, adding
  Sentry is mostly a matter of wrapping the FastAPI app and the Next.js
  config — not a schema or architecture change.
- No uptime/health-check monitoring is configured. `GET /api/health`
  already exists specifically to be polled by one (UptimeRobot,
  Better Stack, your platform's built-in health check, etc.) — point
  something at it.

## Security recommendations

- **Set `TURNSTILE_SECRET_KEY` in production.** Left unset, spam
  verification silently always passes — fine for local dev, a real gap in
  production (see [BACKEND.md](BACKEND.md#validation-flow)).
- **Rotate `JWT_SECRET_KEY` if it's ever exposed** (committed by accident,
  logged, etc.) — every issued access token becomes forgeable until you do.
  Rotating it also immediately invalidates every currently-logged-in
  session, so treat it as an incident-response action, not routine hygiene.
- **The admin API has no rate limiting today** — `CONTACT_FORM_RATE_LIMIT`
  only applies to `/contact`. `/auth/login` is a common brute-force target;
  add a login-specific rate limit before this is internet-facing with real
  accounts behind it.
- **`CORS_ORIGINS` must never be `*` in production** — beyond the
  cookie-blocking issue noted above, a wildcard origin on an API that
  returns lead PII is a real data-exposure risk.
- **Database credentials should be scoped**, not a shared superuser — the
  backend only needs DML on its own tables plus DDL access for migrations;
  a hosting provider's managed Postgres typically lets you create a
  dedicated role for this.

## Backup strategy

**Not currently configured** — whatever managed Postgres provider you use
for production almost certainly offers automated daily backups with
point-in-time recovery (RDS, Cloud SQL, Neon, Supabase, and Render's
managed Postgres all do this out of the box) — enable it. At minimum,
confirm:
- Backup frequency and retention window meet your actual tolerance for
  data loss (the `leads` table is the one genuinely irreplaceable data in
  this system — everything else is either static site content or
  regeneratable via `scripts/seed.py`).
- You've actually tested a restore at least once, not just confirmed
  backups exist. An untested backup is a hypothesis, not a safety net.

## CI/CD workflow

**What exists today** (`.github/workflows/ci.yml`), on every PR and push to
`main`:
- `backend-tests` — `poetry run pytest` against in-memory SQLite
- `backend-migration-check` — `alembic upgrade head` then `downgrade base`
  against a real ephemeral Postgres container, catching Postgres-specific
  migration bugs the SQLite test run can't
- `frontend-build` — `npm ci`, `npm audit --audit-level=high`,
  `npx tsc --noEmit`, `npm run build`

**What doesn't exist and would need adding:** an actual deploy job. The
natural extension of the existing workflow is a `deploy` job that runs
after the above three succeed on `main`, triggering your chosen platform's
deploy (a Vercel/Render/Fly deploy hook, or a `docker build && docker push`
step) — but that integration doesn't exist in this repo today and needs a
deliberate decision about which platform to target before it's built.
