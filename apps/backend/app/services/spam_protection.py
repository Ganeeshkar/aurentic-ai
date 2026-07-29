import httpx

from app.core.config import settings

TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"


async def verify_turnstile_token(token: str, *, remote_ip: str | None) -> bool:
    """Verifies a Cloudflare Turnstile response token server-side.

    Client-side widgets can be scripted around — the only real check is
    this server-to-server call. In development (no secret key configured)
    this short-circuits to True so local work doesn't need live Turnstile
    credentials.
    """
    if not settings.turnstile_secret_key:
        return True

    async with httpx.AsyncClient(timeout=5.0) as client:
        response = await client.post(
            TURNSTILE_VERIFY_URL,
            data={
                "secret": settings.turnstile_secret_key,
                "response": token,
                "remoteip": remote_ip or "",
            },
        )
        result = response.json()
        return bool(result.get("success"))
