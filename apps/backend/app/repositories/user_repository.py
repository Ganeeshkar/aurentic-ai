import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.role import Role
from app.models.user import User


class UserRepository:
    """Only this class writes SQLAlchemy queries for User — services never
    do, so the query shape can change (e.g., add caching) in one place."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, user_id: uuid.UUID) -> User | None:
        stmt = select(User).options(selectinload(User.role)).where(User.id == user_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> User | None:
        stmt = select(User).options(selectinload(User.role)).where(User.email == email.lower())
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def update_last_login(self, user: User) -> None:
        from datetime import datetime, timezone

        user.last_login_at = datetime.now(timezone.utc)
        await self.db.flush()

    async def list_assignable(self) -> list[User]:
        """Staff who can be handed a lead — i.e. anyone with lead-facing
        responsibility, not every authenticated role (an 'enterprise' or
        'editor' account shouldn't show up in an assignment dropdown)."""
        stmt = (
            select(User)
            .join(Role)
            .options(selectinload(User.role))
            .where(Role.name.in_(["admin", "sales"]), User.is_active.is_(True))
            .order_by(User.full_name)
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())
