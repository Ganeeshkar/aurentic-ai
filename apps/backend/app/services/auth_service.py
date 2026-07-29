from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.security import (
    create_access_token,
    generate_refresh_token,
    hash_refresh_token,
    verify_password,
)
from app.models.user import User
from app.repositories.session_repository import SessionRepository
from app.repositories.user_repository import UserRepository


class AuthService:
    """Framework-agnostic login/refresh/logout logic. Route handlers only
    parse the request and call these methods — nothing here imports
    FastAPI's Request, so it's testable without spinning up the app."""

    def __init__(self, db: AsyncSession):
        self.db = db
        self.users = UserRepository(db)
        self.sessions = SessionRepository(db)

    async def authenticate(
        self, *, email: str, password: str, ip_address: str | None, user_agent: str | None
    ) -> tuple[User, str, str, int]:
        """Returns (user, access_token, raw_refresh_token, expires_in_seconds)."""
        user = await self.users.get_by_email(email)
        if user is None or not verify_password(password, user.hashed_password):
            # Deliberately identical error for "no such user" and "wrong
            # password" — distinguishing them lets an attacker enumerate
            # valid emails.
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password"
            )
        if not user.is_active:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account disabled")

        access_token, expires_in = create_access_token(user_id=user.id, role=user.role.name)
        raw_refresh, refresh_hash, expires_at = generate_refresh_token()
        await self.sessions.create(
            user_id=user.id,
            refresh_token_hash=refresh_hash,
            expires_at=expires_at,
            ip_address=ip_address,
            user_agent=user_agent,
        )
        await self.users.update_last_login(user)
        return user, access_token, raw_refresh, expires_in

    async def refresh(
        self, *, raw_refresh_token: str, ip_address: str | None, user_agent: str | None
    ) -> tuple[str, str, int]:
        """Validates and ROTATES the refresh token — the old one is revoked
        the moment a new one is issued, so a stolen-but-unused old token
        can't be replayed after a legitimate refresh happens."""
        token_hash = hash_refresh_token(raw_refresh_token)
        session = await self.sessions.get_active_by_token_hash(token_hash)
        if session is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Session expired or revoked"
            )

        user = await self.users.get_by_id(session.user_id)
        if user is None or not user.is_active:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid session")

        await self.sessions.revoke(session)

        access_token, expires_in = create_access_token(user_id=user.id, role=user.role.name)
        new_raw_refresh, new_hash, new_expires_at = generate_refresh_token()
        await self.sessions.create(
            user_id=user.id,
            refresh_token_hash=new_hash,
            expires_at=new_expires_at,
            ip_address=ip_address,
            user_agent=user_agent,
        )
        return access_token, new_raw_refresh, expires_in

    async def logout(self, *, raw_refresh_token: str) -> None:
        token_hash = hash_refresh_token(raw_refresh_token)
        session = await self.sessions.get_active_by_token_hash(token_hash)
        if session is not None:
            await self.sessions.revoke(session)
