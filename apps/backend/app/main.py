import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.api.v1.router import api_router
from app.core.config import settings
from app.middlewares.rate_limit import limiter

# Without this, app-level loggers (e.g. app.emails.send's "foxtheta.emails")
# inherit the root logger's default WARNING level and every logger.info()
# call — including the dev-mode "EMAIL (dev, not sent)..." fallback that's
# supposed to prove the send path ran without real SMTP creds — is silently
# dropped. Uvicorn configures its own access/error loggers but not this one.
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")


def create_app() -> FastAPI:
    """The only place the FastAPI app is assembled. Middleware order
    matters and is deliberate: security headers wrap everything, CORS is
    checked before routing, and the app never becomes reachable without
    both in place — see the architecture blueprint §11 for the full
    security-layer rationale."""

    app = FastAPI(
        title="Foxtheta API",
        version="1.0.0",
        docs_url="/api/docs" if not settings.is_production else None,
        redoc_url="/api/redoc" if not settings.is_production else None,
        openapi_url="/api/openapi.json",
    )

    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PATCH", "DELETE"],
        allow_headers=["Authorization", "Content-Type"],
    )

    @app.middleware("http")
    async def add_security_headers(request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        if settings.is_production:
            response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains"
        return response

    @app.get("/api/health", tags=["health"])
    async def health() -> JSONResponse:
        return JSONResponse({"status": "ok", "environment": settings.environment})

    app.include_router(api_router, prefix=settings.api_v1_prefix)

    return app


app = create_app()
