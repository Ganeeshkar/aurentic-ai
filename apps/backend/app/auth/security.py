import secrets
import uuid
from datetime import datetime, timedelta, timezone
from hashlib import sha256

import jwt
from passlib.context import CryptContext

from app.core.config import settings

# Argon2 — never bcrypt/md5/sha for passwords. Argon2 is memory-hard,
# which is the property that matters against GPU-based cracking.
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def hash_password(plain_password: str) -> str:
    return pwd_context.hash(plain_password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(*, user_id: uuid.UUID, role: str) -> tuple[str, int]:
    expires_delta = timedelta(minutes=settings.access_token_expire_minutes)
    expire_at = datetime.now(timezone.utc) + expires_delta
    payload = {
        "sub": str(user_id),
        "role": role,
        "type": "access",
        "exp": expire_at,
        "iat": datetime.now(timezone.utc),
    }
    token = jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)
    return token, int(expires_delta.total_seconds())


def decode_access_token(token: str) -> dict:
    """Raises jwt.PyJWTError on invalid signature / expiry — callers must
    catch this and translate it into a 401, never let it bubble raw."""
    payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
    if payload.get("type") != "access":
        raise jwt.InvalidTokenError("not an access token")
    return payload


def generate_refresh_token() -> tuple[str, str, datetime]:
    """Returns (raw_token_for_the_client, hash_to_store, expires_at).

    The raw token is only ever sent to the client as an httpOnly cookie —
    the database stores only its hash, so a leaked database dump can't be
    replayed as a valid session, the same reason passwords are hashed.
    """
    raw_token = secrets.token_urlsafe(64)
    token_hash = sha256(raw_token.encode()).hexdigest()
    expires_at = datetime.now(timezone.utc) + timedelta(days=settings.refresh_token_expire_days)
    return raw_token, token_hash, expires_at


def hash_refresh_token(raw_token: str) -> str:
    return sha256(raw_token.encode()).hexdigest()
