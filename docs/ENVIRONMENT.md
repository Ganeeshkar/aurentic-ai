# Environment Variables

## Backend (`apps/backend/.env`)

Copy `apps/backend/.env.example` to `apps/backend/.env` and fill it in. The
backend validates this at startup via a typed `Settings` class
(`app/core/config.py`) — **a missing required variable crashes the app
immediately on boot** with a clear error, rather than failing confusingly on
the first request that needs it.

### App

| Variable | Required | Default | Meaning |
|---|---|---|---|
| `ENVIRONMENT` | No | `development` | `development` or `production`. Controls whether `/api/docs` and `/api/redoc` are served (disabled in production) and whether cookies are marked `Secure`. |
| `DEBUG` | No | `false` | Enables verbose SQLAlchemy query echoing to the log. Leave off in production — it logs full SQL, which can include sensitive values. |
| `API_V1_PREFIX` | No | `/api/v1` | Path prefix every API route is mounted under. Change only if you're deliberately versioning the API differently. |

### Security

| Variable | Required | Default | Meaning |
|---|---|---|---|
| `JWT_SECRET_KEY` | **Yes** | — | Signs and verifies access tokens. Generate with `python -c "import secrets; print(secrets.token_urlsafe(64))"`. **Never reuse a dev value in production**, and never commit a real one — `.env` is gitignored for exactly this reason. |
| `JWT_ALGORITHM` | No | `HS256` | Symmetric signing algorithm for the JWT. Only change if you have a reason to move to an asymmetric scheme (e.g. `RS256`), which also requires code changes to use a keypair instead of a single secret. |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | `15` | How long an access token is valid. Short-lived by design — the refresh token (below) is what keeps a session alive. |
| `REFRESH_TOKEN_EXPIRE_DAYS` | No | `14` | How long an unused refresh token stays valid before a user must log in again. |

### CORS

| Variable | Required | Default | Meaning |
|---|---|---|---|
| `CORS_ORIGINS` | No | `http://localhost:3000` | Comma-separated list of origins allowed to call the API from a browser. **Must include your production frontend's exact origin** (e.g. `https://foxtheta.com`) once deployed — no wildcards in production, since credentialed requests (the refresh cookie) don't work with `*`. |

### Database

| Variable | Required | Default | Meaning |
|---|---|---|---|
| `DATABASE_URL` | **Yes** | — | Full async Postgres connection string: `postgresql+asyncpg://<user>:<password>@<host>:<port>/<db>`. The `+asyncpg` part matters — this is an async SQLAlchemy engine, not the sync driver. |

**Where to get it:** for local dev, this is whatever user/password/db you
set up in [SETUP.md](SETUP.md#2-database). For production, your hosting
provider's managed Postgres (RDS, Cloud SQL, Neon, Supabase, Render, etc.)
gives you this connection string directly in its dashboard.

### Rate limiting

| Variable | Required | Default | Meaning |
|---|---|---|---|
| `CONTACT_FORM_RATE_LIMIT` | No | `5/hour` | `slowapi` rate-limit expression, keyed by caller IP. Format is `<count>/<period>` (`second`, `minute`, `hour`, `day`). |

### Email (transactional notifications)

| Variable | Required | Default | Meaning |
|---|---|---|---|
| `SMTP_HOST` | No | *(empty)* | SMTP server hostname. **If left empty, no email is ever actually sent** — the backend logs `EMAIL (dev, not sent) ...` instead, which is the intended local-dev behavior (see [BACKEND.md](BACKEND.md#email-flow)). |
| `SMTP_PORT` | No | `587` | SMTP port. `587` (STARTTLS) is standard; `465` (implicit TLS) or `25` are alternatives depending on your provider. |
| `SMTP_USERNAME` | Only if `SMTP_HOST` set | *(empty)* | SMTP auth username. |
| `SMTP_PASSWORD` | Only if `SMTP_HOST` set | *(empty)* | SMTP auth password / app-specific password. **Never commit this.** |
| `EMAIL_FROM` | No | `hello@foxtheta.com` | The `From:` address on both transactional emails. Must be a domain you control and have authorized to send from (see [DEPLOYMENT.md](DEPLOYMENT.md#smtp-configuration) for SPF/DKIM). |
| `SALES_NOTIFICATION_EMAIL` | No | `hello@foxtheta.com` | Where the internal "new lead" notification is sent. Point this at whatever inbox your sales/founding team actually monitors. |

**Where to get SMTP credentials:** any transactional email provider —
Postmark, SendGrid, Amazon SES, Mailgun, Resend, or your own mail server.
Sign up, verify your sending domain, and the provider gives you an
SMTP host/port/username/password (often the API key doubles as the
password). See [DEPLOYMENT.md](DEPLOYMENT.md#smtp-configuration) for the
domain-verification steps (SPF/DKIM) needed for real deliverability.

### Spam protection

| Variable | Required | Default | Meaning |
|---|---|---|---|
| `TURNSTILE_SECRET_KEY` | No | *(empty)* | Cloudflare Turnstile server-side secret. **If left empty, Turnstile verification short-circuits to always-pass** — fine for local dev, not fine for production (see [DEPLOYMENT.md](DEPLOYMENT.md#security-recommendations)). |

**Where to get it:** [Cloudflare Turnstile dashboard](https://dash.cloudflare.com/)
(free) — create a widget for your domain, and it gives you a site key (goes
in the frontend, not documented here since the frontend doesn't currently
send a real token — see [ROADMAP.md](ROADMAP.md)) and a secret key (this
variable).

### Example `.env.example` (mirrors the real file)

```bash
# --- App ---
ENVIRONMENT=development
DEBUG=true
API_V1_PREFIX=/api/v1

# --- Security ---
JWT_SECRET_KEY=change-me-to-a-random-64-byte-value
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=14

# --- CORS ---
CORS_ORIGINS=http://localhost:3000

# --- Database ---
DATABASE_URL=postgresql+asyncpg://foxtheta:foxtheta@localhost:5432/foxtheta

# --- Rate limiting ---
CONTACT_FORM_RATE_LIMIT=5/hour

# --- Email (transactional notifications) ---
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USERNAME=
SMTP_PASSWORD=
EMAIL_FROM=hello@foxtheta.com
SALES_NOTIFICATION_EMAIL=hello@foxtheta.com

# --- Spam protection ---
TURNSTILE_SECRET_KEY=
```

### Development vs. production

| | Development | Production |
|---|---|---|
| `ENVIRONMENT` | `development` | `production` |
| `DEBUG` | `true` (optional, helpful) | `false` (always) |
| `JWT_SECRET_KEY` | any random value, can be regenerated freely | a real secret, generated once, stored in your host's secret manager — **never in a committed file** |
| `CORS_ORIGINS` | `http://localhost:3000` | your real frontend domain, exactly (scheme + host, no path) |
| `SMTP_HOST` | can be left empty (emails just log) | must be set — a production site that can't email leads is a broken lead pipeline |
| `TURNSTILE_SECRET_KEY` | can be left empty | should be set — see [DEPLOYMENT.md](DEPLOYMENT.md#security-recommendations) |

## Frontend (`apps/frontend/.env.local`)

| Variable | Required | Default | Meaning |
|---|---|---|---|
| `NEXT_PUBLIC_API_BASE` | No | `http://localhost:8000/api/v1` | Base URL the contact form posts to. **`NEXT_PUBLIC_` prefix means this is inlined into the browser bundle at build time** — never put a secret in a `NEXT_PUBLIC_` variable, it will be visible in the page source. In production, point this at your deployed backend's public URL. |

`apps/frontend/.env.local.example` documents this same variable — copy it
to `.env.local` to override the default. There are no secrets on the
frontend; this is the only variable it reads.
