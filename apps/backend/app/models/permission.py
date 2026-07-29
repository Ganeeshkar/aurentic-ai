from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.session import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class Permission(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    """A single grantable capability, e.g. 'leads:read', 'leads:assign',
    'content:publish'. Kept fine-grained so roles compose from primitives
    instead of each role hard-coding a bespoke set of checks in code."""

    __tablename__ = "permissions"

    code: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(String(255), default="")

    roles: Mapped[list["Role"]] = relationship(  # noqa: F821
        secondary="role_permissions", back_populates="permissions"
    )
