# Local Setup

Both apps run independently. You can run the frontend alone (every page
renders without the backend — only the contact form needs it), or both
together for a full round trip.

## Prerequisites

| Tool | Version | Check |
|---|---|---|
| Node.js | 20+ | `node -v` |
| npm | comes with Node | `npm -v` |
| Python | 3.12 | `python3 --version` |
| Poetry | any recent | `poetry --version` — `pip install poetry` if missing |
| PostgreSQL | 16 | via Docker (recommended) or a local install |
| Docker | any recent (optional but recommended) | `docker --version` |

## 1. Frontend

```bash
cd apps/frontend
npm install
npm run dev
```

Open **http://localhost:3000**. That's the whole setup — no environment
variables are required to browse the site. The one optional variable:

```bash
# apps/frontend/.env.local
NEXT_PUBLIC_API_BASE=http://localhost:8000/api/v1   # default if unset
```

Without a reachable backend, every page still renders; only submitting the
contact form will fail (it falls back to opening a `mailto:` link — see
[ARCHITECTURE.md](ARCHITECTURE.md#request-lifecycle-a-contact-form-submission-start-to-finish)).

## 2. Database

The backend needs Postgres. Two options:

**Option A — Docker (recommended):**
```bash
docker compose -f deployment/docker/docker-compose.dev.yml up -d postgres
```
This starts Postgres on `localhost:5432` with user/password/db all set to
`foxtheta` (matching `.env.example`'s `DATABASE_URL`).

**Option B — your own Postgres instance:** create a database and user, then
point `DATABASE_URL` in `.env` at it (see [ENVIRONMENT.md](ENVIRONMENT.md)).

> **Port conflicts.** If port 5432 is already taken by something else on
> your machine, change the `ports:` mapping in `docker-compose.dev.yml`
> (e.g. `"5433:5432"`) and update `DATABASE_URL` in `.env` to match the new
> host port. This is a normal situation on a dev machine that already runs
> Postgres for another project — don't stop or reconfigure the other one to
> "fix" it.

## 3. Backend

```bash
cd apps/backend
cp .env.example .env
```

Open `.env` and set at minimum:
- `JWT_SECRET_KEY` — generate one: `python -c "import secrets; print(secrets.token_urlsafe(64))"`
- `DATABASE_URL` — matches whatever you set up in step 2

Then:

```bash
poetry install
poetry run alembic upgrade head
SEED_ADMIN_PASSWORD=change-me poetry run python -m scripts.seed
poetry run uvicorn app.main:app --reload
```

Open **http://localhost:8000/api/docs** — interactive OpenAPI docs (only
available when `ENVIRONMENT` is not `production`).

**Without Poetry** (matches what a from-scratch environment without
`python3.12` available looks like — this is a documented fallback, not the
canonical path):
```bash
python3 -m venv .venv
.venv/bin/pip install -e .    # or install packages individually from pyproject.toml
.venv/bin/alembic upgrade head
.venv/bin/uvicorn app.main:app --reload
```

## 4. Running both together

1. Start Postgres (step 2).
2. Start the backend (step 3) — confirm `curl http://localhost:8000/api/health` returns `{"status":"ok",...}`.
3. Start the frontend (step 1).
4. Go to `http://localhost:3000/contact`, submit the form, and confirm you
   see the success message. To verify the full round trip yourself:
   ```bash
   psql "$DATABASE_URL" -c "select full_name, work_email from contacts order by created_at desc limit 1;"
   ```

## Running the test suite

```bash
cd apps/backend
poetry run pytest          # 21 tests, run against an in-memory SQLite DB — no Postgres needed
```

The frontend has no test suite yet (see [ROADMAP.md](ROADMAP.md)). Before
committing a frontend change, run:
```bash
cd apps/frontend
npx tsc --noEmit
npm run build
```

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Backend won't start: `ValidationError: jwt_secret_key field required` | `.env` missing or `JWT_SECRET_KEY` unset | `cp .env.example .env` and fill it in — `Settings` fails loudly at startup by design, see [ENVIRONMENT.md](ENVIRONMENT.md). |
| `ConnectionRefusedError` on any DB call | Postgres isn't running, or `DATABASE_URL` points at the wrong host/port | Check `docker ps` / your local Postgres is actually up; confirm the port in `DATABASE_URL` matches what's actually listening. |
| Contact form always falls back to opening an email client | Frontend can't reach the backend | Confirm `NEXT_PUBLIC_API_BASE` matches where the backend is actually listening, and that `CORS_ORIGINS` in the backend's `.env` includes the frontend's origin. |
| `alembic upgrade head` fails with a type/enum error | Ran against SQLite instead of Postgres | The migration uses Postgres-native `ENUM`/`JSONB` types — it only runs against real Postgres. Tests use SQLite via a separate in-memory setup in `conftest.py`, not this migration. |
| Client-side page navigation shows stale/blank content | `ScrollReveal`'s effect not re-running per route (a real bug, since fixed — see the pathname dependency in `features/scroll-reveal/ScrollReveal.tsx`) | Confirm you're on a version of that file with `usePathname()` in the effect's dependency array. If you still see it, it's a regression — file it. |
| `npm run build` fails after pulling changes | Stale `.next` cache, or `node_modules` out of sync with `package-lock.json` | `rm -rf .next && npm install && npm run build`. |
| `poetry lock` fails: "Current Python version is not allowed" | Your active Python isn't 3.12 | `pyproject.toml` pins `python = "^3.12"`. Install 3.12 (e.g. via `pyenv`) and `poetry env use 3.12` before locking. |
