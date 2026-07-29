# Backend Documentation

FastAPI service in `apps/backend`. See [ARCHITECTURE.md](ARCHITECTURE.md)
for how this fits into the whole system and [ENVIRONMENT.md](ENVIRONMENT.md)
for every configuration variable.

## Layering

```
app/api/v1/*.py        Route handlers — parse the request, call a service, shape the response.
                        No business logic lives here.
app/services/*.py       Business logic. Framework-agnostic (no FastAPI imports) — testable
                        without spinning up the app.
app/repositories/*.py   Database queries. One repository per aggregate (User, Lead, Contact,
                        Session). Services call repositories; routes never touch the DB directly.
app/models/*.py         SQLAlchemy ORM models — the schema, expressed in code.
app/schemas/*.py        Pydantic request/response shapes — never the same class as a model.
```

Every request follows the same shape: **route → service → repository →
database**, and back up. This is why `AuthService`, `LeadService`, and
`LeadAdminService` can each be unit-tested by instantiating them directly
with a database session, with no HTTP layer involved.

## API overview

Base path: `{API_V1_PREFIX}` (default `/api/v1`). Interactive docs at
`/api/docs` (non-production only).

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `POST` | `/auth/login` | none | Exchange email + password for an access token; sets a refresh-token cookie. |
| `POST` | `/auth/refresh` | refresh cookie | Rotate the refresh token, issue a new access token. |
| `POST` | `/auth/logout` | refresh cookie | Revoke the current session. |
| `GET` | `/auth/me` | access token | Return the authenticated user's profile. |
| `POST` | `/contact` | none (rate-limited + spam-checked) | Public contact form submission → creates a `Lead`. |
| `GET` | `/admin/leads` | access token, role `admin`/`sales` | Paginated, filterable lead list. |
| `GET` | `/admin/leads/{lead_id}` | access token, role `admin`/`sales` | Single lead detail. |
| `PATCH` | `/admin/leads/{lead_id}` | access token, role `admin`/`sales` | Update a lead's status and/or assignee. |
| `GET` | `/admin/users/assignable` | access token, role `admin`/`sales` | Users a lead can be assigned to. |
| `GET` | `/health` | none | Liveness check (`/api/health`, outside the versioned prefix). |

There is currently no frontend UI for the `/admin/*` routes — see
[ROADMAP.md](ROADMAP.md).

## Endpoint documentation

### `POST /auth/login`

```
Request:  { "email": "...", "password": "..." }
Response: 200 { "access_token": "...", "token_type": "bearer", "expires_in": 900 }
          + Set-Cookie: foxtheta_refresh_token=...; HttpOnly; SameSite=Strict; Path=/api/v1/auth
Errors:   401 Invalid email or password (also returned for "no such user" — see Authentication flow)
          403 Account disabled (user.is_active is False)
```

### `POST /auth/refresh`

```
Request:  (no body — reads the refresh cookie)
Response: 200 { "access_token": "...", "expires_in": 900 } + a NEW rotated refresh cookie
Errors:   401 No session (cookie missing)
          401 Session expired or revoked
```

### `POST /auth/logout`

```
Request:  (no body — reads the refresh cookie)
Response: 204 No Content, cookie cleared
```
Idempotent — calling it with no cookie, or an already-revoked one, still
returns `204`.

### `GET /auth/me`

```
Headers:  Authorization: Bearer <access_token>
Response: 200 { "id": "...", "email": "...", "full_name": "...", "role": "admin" }
Errors:   401 Could not validate credentials
```

### `POST /contact`

```
Request:  {
            "full_name": "...", "work_email": "...", "company_name": "..." | null,
            "topic": "...", "message": "...", "source": "discovery_call",
            "turnstile_token": "...", "website": "",
            "utm_source": "..." | null, "utm_medium": "..." | null, "utm_campaign": "..." | null
          }
Response: 202 { "reference_id": "<uuid>", "message": "Thanks — we'll reply within one business day." }
Errors:   400 Spam verification failed (Turnstile rejected the token)
          422 (Pydantic validation — e.g. message under 10 chars, invalid email, honeypot filled)
          429 (rate limit exceeded — default 5/hour per IP)
```
See [Validation flow](#validation-flow) and [Email flow](#email-flow) below
for what happens inside this call.

### `GET /admin/leads`

```
Query:    ?status=new&source=discovery_call&limit=50&offset=0
Response: 200 { "items": [ {Lead...} ], "total": 137, "limit": 50, "offset": 0 }
Errors:   401 / 403 (not authenticated, or role not admin/sales)
```

### `GET /admin/leads/{lead_id}`
```
Response: 200 { Lead detail, contact nested inline }
Errors:   404 Lead not found
```

### `PATCH /admin/leads/{lead_id}`
```
Request:  { "status": "qualified" }  — any subset of {status, assigned_to_user_id}
Response: 200 { updated Lead }
Errors:   400 assigned_to_user_id must be an active admin or sales user
          404 Lead not found
```
Every successful update writes an `AuditLog` row with the before/after diff
— see [Background jobs & side effects](#background-jobs--side-effects).

### `GET /admin/users/assignable`
```
Response: 200 [ { "id": "...", "full_name": "...", "role_name": "sales" }, ... ]
```
Returns only `admin`/`sales` users — the only roles a lead can be assigned to.

## Authentication flow

JWT access token (short-lived, sent in the `Authorization` header) +
rotating refresh token (long-lived, stored server-side hashed, sent as an
httpOnly cookie). This is the standard pattern for balancing "don't hit the
DB on every request" (the access token is self-contained) against "must be
revocable" (the refresh token is a real database row that can be deleted).

```
1. POST /auth/login  { email, password }
      │
      ├─ AuthService.authenticate()
      │     ├─ UserRepository.get_by_email(email)
      │     ├─ verify_password(plain, user.hashed_password)   [Argon2]
      │     │     └─ same error for "no user" and "wrong password" — prevents
      │     │        email enumeration via error-message timing/content
      │     ├─ create_access_token(user_id, role) → JWT, 15 min expiry
      │     ├─ generate_refresh_token() → (raw token, sha256 hash, expiry)
      │     ├─ SessionRepository.create(user_id, hash, ip, user_agent)
      │     │     └─ the RAW token is never stored — only its hash. A leaked
      │     │        DB dump can't be replayed as a session, same reasoning
      │     │        as password hashing.
      │     └─ UserRepository.update_last_login(user)
      │
      └─ Response: access_token in body, raw refresh token in an httpOnly,
                   SameSite=Strict cookie scoped to /api/v1/auth only

2. Every authenticated request:
      Authorization: Bearer <access_token>
      → get_current_user() decodes + verifies the JWT signature/expiry,
        loads the User row (checks is_active), no database write

3. Access token expires (15 min) → frontend calls POST /auth/refresh
      │
      ├─ AuthService.refresh()
      │     ├─ hash the incoming raw refresh cookie, look up the Session by hash
      │     ├─ if missing/expired/revoked → 401, user must log in again
      │     ├─ REVOKE the old session immediately (sets revoked_at)
      │     ├─ issue a new access token AND a new refresh token/session
      │     └─ (this is rotation: a stolen-but-unused old refresh token
      │        becomes worthless the instant a legitimate refresh happens)
      │
      └─ Response: new access_token + new rotated refresh cookie

4. POST /auth/logout → revoke the current session, clear the cookie
```

**Role-based access control (RBAC):** `require_role("admin", "sales")` is a
FastAPI dependency factory — it wraps `get_current_user` and additionally
checks `user.role.name` against an allow-list, raising `403` otherwise. The
`roles`/`permissions`/`role_permissions` tables exist for fine-grained
permission codes (e.g. `leads:read`), but no route currently checks
individual permissions — every route today checks role name directly. See
[ROADMAP.md](ROADMAP.md) for finishing that out.

## Database schema

All tables use a UUID primary key (`UUIDPrimaryKeyMixin`) and
`created_at`/`updated_at` timestamps (`TimestampMixin`), except `audit_logs`
(append-only, no `updated_at` by design).

```
roles ──┬───< role_permissions >───┬── permissions
        │                          
        └───< users >───< sessions

companies ───< contacts ───< leads >─── users (assigned_to_user_id, nullable)

users ───< audit_logs (actor_user_id, nullable)
```

| Table | Purpose | Key columns beyond id/timestamps |
|---|---|---|
| `roles` | RBAC roles: `admin`, `editor`, `marketing`, `sales`, `enterprise` (seeded — see [scripts/seed.py](../apps/backend/scripts/seed.py)). `visitor` is conceptual only, never stored. | `name` (unique), `description` |
| `permissions` | Fine-grained capability codes (e.g. `leads:read`). Defined but not yet enforced per-route — see [ROADMAP.md](ROADMAP.md). | `code` (unique) |
| `role_permissions` | Many-to-many join, roles ↔ permissions. | composite PK |
| `users` | Staff accounts only — **visitors/leads are never Users.** Keeping these separate means lead data is never reachable through an authentication-shaped table. | `email` (unique, indexed), `hashed_password`, `role_id`, `is_active`, `mfa_enabled` (schema-ready, not implemented), `last_login_at` |
| `sessions` | One row per active/past refresh token. Deleting/revoking a row is what makes logout actually work. | `user_id`, `refresh_token_hash` (unique), `expires_at`, `revoked_at` (null = active) |
| `companies` | Deduplicated by `domain` where available, so the same org submitting via multiple people doesn't fragment into duplicate rows. | `name`, `domain` (unique, indexed), `industry`, `employee_range` |
| `contacts` | A real human who submitted a form — separated from `Company` and from `User` (a contact never logs in). | `company_id` (nullable FK), `full_name`, `work_email` (indexed), `phone`, `role_title` |
| `leads` | The sales-facing unit of work. Every conversion path (today: the contact form) creates one. | `contact_id`, `source` (enum), `topic`, `message`, `status` (enum, default `new`), `assigned_to_user_id` (nullable FK to `users`), `score`, `utm_*` |
| `audit_logs` | Append-only record of privileged actions. Never updated or deleted by application code. | `actor_user_id` (nullable — system actions have no actor), `action`, `entity_type`, `entity_id`, `before_state`/`after_state` (JSONB) |

**Enums** (Postgres-native, not application-level strings):
- `lead_source`: `discovery_call`, `enterprise_team`, `security_download`, `newsletter` — only `discovery_call` is currently produced (by the one live form); the others are modeled ahead of the pages/forms that will use them (see [ROADMAP.md](ROADMAP.md)).
- `lead_status`: `new`, `qualified`, `contacted`, `won`, `lost`.

Migrations live in `apps/backend/alembic/`. There is currently exactly one:
`0001_initial_schema.py`, which creates every table above. Run new ones
with `alembic revision --autogenerate -m "description"` after changing a
model, then review the generated migration before applying it — autogenerate
is a draft, not ground truth.

## Background jobs & side effects

There is no job queue (no Celery, no Redis) — background work runs via
FastAPI's `BackgroundTasks`, which executes after the HTTP response has
already been sent, in the same process. Two things use this:

1. **Email sending** (see below) — queued at the end of `POST /contact` so
   SMTP latency never delays the visitor's response.
2. Nothing else, currently. This is a deliberate, documented limitation —
   see [ROADMAP.md](ROADMAP.md) for when to introduce a real queue (the
   answer: the moment more than one backend process/instance is running,
   since in-process background tasks and the in-memory rate limiter both
   stop working correctly across multiple instances).

## Email flow

```
POST /contact succeeds
      │
      ├─ background_tasks.add_task(send_lead_notification, lead)
      │      → email to SALES_NOTIFICATION_EMAIL
      │        subject: "New lead: <name> (<source>)"
      │        body: source, topic, name, email, company, message
      │
      └─ background_tasks.add_task(send_lead_confirmation, lead)
             → email to the visitor's own work_email
               subject: "We received your message — Foxtheta"
               body: a short, plain acknowledgment
```

Both go through `app/emails/send.py`'s `_send()`, which:
- **If `SMTP_HOST` is unset** (the local-dev default): logs
  `EMAIL (dev, not sent) to=... subject=...` via the `foxtheta.emails`
  logger and returns — the flow is fully exercisable with zero email
  infrastructure.
- **If `SMTP_HOST` is set**: sends for real via `aiosmtplib`, STARTTLS.

**Note on visibility:** `app/main.py` calls `logging.basicConfig(level=logging.INFO)`
at import time specifically so the dev-mode email log line is actually
visible — without it, Python's default root logger level (`WARNING`) would
silently swallow it, defeating the whole point of that fallback. If you
ever stop seeing these log lines in dev, check that line hasn't been
removed.

## Validation flow

Every request body is a Pydantic model (`app/schemas/`) — FastAPI validates
it before your route function ever runs, returning `422` with a field-level
error list on failure. Beyond basic type/length checks, `POST /contact`
layers three independent anti-spam checks, in order:

1. **Honeypot** (`website` field) — a `field_validator` on `ContactFormRequest`
   rejects any non-empty value with `422`. Real visitors never see this
   field (hidden via CSS on the frontend); a bot that fills every field
   blind fills this one too.
2. **Turnstile** (`verify_turnstile_token()`) — a server-to-server call to
   Cloudflare confirming the browser solved a challenge. Short-circuits to
   `True` when `TURNSTILE_SECRET_KEY` is unset (dev only — see
   [DEPLOYMENT.md](DEPLOYMENT.md) for why this must be set in production).
3. **Rate limit** (`slowapi`, keyed by IP) — enforced by FastAPI middleware
   before the route body even runs; returns `429`.

## Use cases, by module

| Module | Use case |
|---|---|
| `services/auth_service.py` | Everything a staff member does to authenticate: log in, silently refresh a session in the background, log out. |
| `services/lead_service.py` | Turn a public form submission into tracked CRM-shaped data (`Contact` + `Company` + `Lead`), exactly once, in one transaction. |
| `services/lead_admin_service.py` | Everything a sales/admin user does to a lead *after* capture: view it, change its status, reassign it — each change audited. |
| `services/audit_service.py` | The single writer of the append-only compliance/audit trail. Every other service calls into this rather than writing `AuditLog` rows itself, so "what counts as an audited action" is defined in one place. |
| `services/spam_protection.py` | Server-side Turnstile verification — the only check that can't be bypassed by a script that skips the browser widget. |
| `repositories/*.py` | All raw SQLAlchemy queries, isolated from business logic — a schema change or query optimization touches one file, not every service that happens to need that data. |
| `auth/security.py` | Pure functions: hash/verify passwords (Argon2), encode/decode JWTs, generate/hash refresh tokens. No I/O, no framework dependency — the easiest layer in the codebase to unit test in isolation. |
| `auth/dependencies.py` | The FastAPI-specific glue: turn a bearer token into a `User`, and build role-gated route dependencies. |
| `emails/send.py` | The only place that talks to SMTP. |
| `middlewares/rate_limit.py` | The only place the rate-limit policy is defined — routes just declare `@limiter.limit(CONTACT_FORM_LIMIT)`. |

## Testing

`apps/backend/tests/` — 21 tests, run with `poetry run pytest`, against an
**in-memory SQLite** database (`tests/conftest.py` overrides `DATABASE_URL`
before the app is imported). This means:
- Tests are fast and need no Postgres.
- Tests **cannot** catch a Postgres-specific bug (native `ENUM`, `JSONB`
  behavior differences). That's what `ci.yml`'s separate
  `backend-migration-check` job is for — it runs `alembic upgrade head` /
  `downgrade base` against a real Postgres container.
