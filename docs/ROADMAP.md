# Project Improvement Roadmap

Honest accounting of what's incomplete, ranked by leverage where possible.
Cross-referenced with [CONTENT_REVIEW.md](CONTENT_REVIEW.md) for
content-specific gaps, which aren't repeated here.

## Current limitations (stated plainly)

- **No deploy pipeline** for either app — see [DEPLOYMENT.md](DEPLOYMENT.md).
  CI checks tests and builds; nothing ships anywhere automatically.
- **No admin UI.** The backend's `/api/v1/admin/*` routes (list/view/update
  leads, list assignable users) are built and tested, but no frontend
  screen calls them — leads currently have to be queried directly from the
  database or via `curl`/Postman against the API.
- **No frontend test suite.** Verification today is `tsc --noEmit` +
  `next build` + manual browser checks — real, but not automated regression
  coverage.
- **No real case studies or named leadership** — see
  [CONTENT_REVIEW.md](CONTENT_REVIEW.md)'s cross-cutting recommendations;
  this is the single highest-leverage gap on the site and it's a business
  decision (what can be shared, and when), not an engineering one.
- **Single-instance assumptions in two places** (see Technical debt below):
  the rate limiter and background email tasks both assume one backend
  process. Fine today; a real constraint the moment you scale horizontally.

## Technical debt

| Item | Where | Why it's debt, and when to pay it off |
|---|---|---|
| In-memory rate limiter | `app/middlewares/rate_limit.py` | Counters aren't shared across processes — running 2+ backend instances behind a load balancer effectively multiplies the real rate limit by the instance count. **Pay this off the moment you run more than one backend instance**: swap `slowapi`'s storage to a Redis URL (one-line config change, `slowapi` already supports it). |
| In-process background tasks | FastAPI `BackgroundTasks` in `app/api/v1/contact.py` | A crashed process between "request returned" and "email sent" silently loses that email — acceptable at current lead volume, not at scale, and doesn't survive a deploy that happens mid-flight. **Pay this off when**: lead volume or reliability requirements justify the operational overhead of Celery + Redis (or a simpler managed queue). |
| `python-multipart` dependency | `apps/backend/pyproject.toml` | Confirmed genuinely unused (no `Form`/`File`/`UploadFile`/`OAuth2PasswordRequestForm` anywhere in the codebase) but left in place because removing it requires `poetry lock` against Python 3.12, unavailable in the environment this was audited in. **Pay this off**: `poetry remove python-multipart` from a machine with Python 3.12 + Poetry installed, then commit the relocked `poetry.lock`. |
| Permission model defined but unused | `permissions`/`role_permissions` tables, `app/models/permission.py` | Every route today checks role *name* directly (`require_role("admin", "sales")|`), not fine-grained permission codes — the schema supports finer control than the code currently exercises. **Pay this off when**: role-name checks stop being granular enough (e.g. you need "sales can view leads but not reassign them"). |
| `mfa_enabled` column with no MFA implementation | `app/models/user.py` | Schema-ready, not built. **Pay this off**: before this admin API is exposed through a real UI to more than a couple of trusted staff accounts. |

## Recommended frontend improvements

1. **Add a real test suite.** At minimum: component smoke tests for
   `ContactForm` (validation, submit success/failure paths) and the ROI
   calculator (currency switching, math correctness) — these are the two
   pieces of interactive logic on the site with the most ways to silently
   break.
2. **Admin dashboard UI**, consuming the already-built `/api/v1/admin/*`
   routes. This is the largest missing *feature*, not just missing polish
   — right now the backend does more than the frontend lets anyone use.
3. **Generalize `IndustryPageTemplate` further** if a 7th+ industry is
   added — today it's proven at 6 instances; watch for any section that
   starts needing per-industry structural exceptions (not just data
   differences) as a sign the template needs a second look, not a special case.
4. **Turnstile widget on the frontend contact form.** The backend already
   verifies a `turnstile_token` server-side (see [BACKEND.md](BACKEND.md)),
   but the frontend doesn't currently render Cloudflare's challenge widget
   or obtain a real token — confirm this is wired end-to-end before
   flipping `TURNSTILE_SECRET_KEY` on in production, or every real
   submission will fail verification.

## Recommended backend improvements

1. **Move the rate limiter and background tasks to Redis/Celery** — see
   Technical debt above; do this together since both are "single-instance
   assumption" fixes.
2. **Wire the `permissions` table into actual authorization checks**, or
   remove it if role-name checks are judged sufficient long-term — an
   unused-but-present permission system is worse than neither, since it
   implies a granularity the code doesn't actually enforce.
3. **Add a login-specific rate limit** — see
   [DEPLOYMENT.md](DEPLOYMENT.md#security-recommendations).
4. **Expand `LeadSource`** usage — `enterprise_team`, `security_download`,
   and `newsletter` are modeled in the schema but nothing produces them yet
   (only `discovery_call`, from the one live contact form). Build the
   corresponding frontend entry points (an enterprise-specific contact
   path, a gated download, a newsletter signup) as those pages/features are
   built, per [CONTENT_REVIEW.md](CONTENT_REVIEW.md)'s content roadmap.
5. **MFA for admin accounts**, before the admin API is exposed to more than
   a couple of trusted people through a real UI.

## Performance optimizations

- **Frontend**: every page is already statically rendered — the main lever
  left is image optimization (`next/image` isn't used anywhere currently;
  the OG image and icons are hand-authored SVG/PNG, which is fine at
  current scale, but revisit if real photography is ever added).
- **Backend**: no performance work has been necessary at current volume —
  the two things worth watching as lead volume grows are (a) the
  `contacts`/`companies` find-or-create queries in `LeadService`, which do
  a read-then-write per submission and could race under concurrent
  duplicate submissions (rare in practice, but a unique constraint +
  upsert would close it), and (b) whatever replaces the in-memory rate
  limiter (see Technical debt).

## SEO improvements

- **Write more `/insights` content** — the single fastest lever available;
  see [CONTENT_REVIEW.md](CONTENT_REVIEW.md).
- **Structured data (JSON-LD)** isn't currently emitted anywhere —
  `Organization`, `FAQPage` (industry pages already have FAQ content
  perfectly shaped for this), and `Article` (for `/insights/*`) schema
  markup would all be straightforward additions given the content already
  exists in a structured form (`IndustryPageData.faqItems`, etc.).
- **Internal linking between industry pages** could be denser — see the
  Retail/Logistics overlap note in [CONTENT_REVIEW.md](CONTENT_REVIEW.md)
  as a concrete example of where a cross-link would help both SEO and UX.

## Security improvements

See [DEPLOYMENT.md](DEPLOYMENT.md#security-recommendations) for the
production-readiness list (Turnstile, CORS, secret rotation, DB credential
scoping). Beyond that:
- **No dependency-vulnerability scanning is automated beyond `npm audit`
  in CI** (frontend only) — add an equivalent for the Python side (e.g.
  `pip-audit` or GitHub's Dependabot alerts) once this is a real production
  service handling PII at scale.
- **No Content-Security-Policy header** is set on the frontend — worth
  adding once the asset/script surface area is stable enough that a CSP
  won't need constant adjustment.

## Scalability recommendations

Everything in Technical debt above (rate limiter, background tasks) is the
scalability list — this system is correctly built for "one backend
instance, moderate lead volume" and every noted debt item is precisely
"what breaks first if that assumption stops holding," in the order it would
likely be hit.

## Future feature roadmap

Roughly in the order suggested by the leverage notes above, not a committed
timeline:

1. Real case studies + named leadership (content, not code — see
   [CONTENT_REVIEW.md](CONTENT_REVIEW.md))
2. Admin dashboard UI for lead management
3. A 7th+ industry page (Education was mentioned as a candidate — see
   [CONTENT.md](CONTENT.md#adding-a-7th-industry-or-any-new-page) for the
   process; do not template existing content into it)
4. Enterprise-specific contact path + security-download gated asset
   (activating the `enterprise_team`/`security_download` lead sources
   already modeled in the schema)
5. A deploy pipeline (see [DEPLOYMENT.md](DEPLOYMENT.md))
6. Redis-backed rate limiting + Celery-based background email, once volume
   justifies it
7. MFA for admin accounts
8. Structured data (JSON-LD) across industry and insights pages
