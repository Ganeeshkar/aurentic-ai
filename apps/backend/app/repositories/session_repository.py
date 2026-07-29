import uuid
from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.session import Session as AuthSession


def _as_aware_utc(value: datetime) -> datetime:
    """SQLite (used in unit tests, and any lightweight dev setup) does not
    preserve tzinfo across a round trip even on a `DateTime(timezone=True)`
    column — it comes back naive. Treat a naive value as UTC rather than
    let it blow up the comparison below with a raised TypeError."""
    return value if value.tzinfo is not None else value.replace(tzinfo=timezone.utc)


class SessionRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(
        self,
        *,
        user_id: uuid.UUID,
        refresh_token_hash: str,
        expires_at: datetime,
        ip_address: str | None,
        user_agent: str | None,
    ) -> AuthSession:
        session = AuthSession(
            user_id=user_id,
            refresh_token_hash=refresh_token_hash,
            expires_at=expires_at,
            ip_address=ip_address,
            user_agent=user_agent,
        )
        self.db.add(session)
        await self.db.flush()
        return session

    async def get_active_by_token_hash(self, token_hash: str) -> AuthSession | None:
        stmt = select(AuthSession).where(AuthSession.refresh_token_hash == token_hash)
        result = await self.db.execute(stmt)
        session = result.scalar_one_or_none()
        if session is None:
            return None
        if session.revoked_at is not None:
            return None
        if _as_aware_utc(session.expires_at) < datetime.now(timezone.utc):
            return None
        return session

    async def revoke(self, session: AuthSession) -> None:
        session.revoked_at = datetime.now(timezone.utc)
        await self.db.flush()
