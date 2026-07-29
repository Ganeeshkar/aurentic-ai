import uuid
from datetime import datetime

from sqlalchemy import JSON, DateTime, ForeignKey, String, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.database.session import Base
from app.models.mixins import UUIDPrimaryKeyMixin
from app.models.types import GUID

# JSON in general, JSONB specifically on Postgres — keeps the production
# column type optimal while staying testable against SQLite.
PortableJSON = JSON().with_variant(JSONB(), "postgresql")


class AuditLog(Base, UUIDPrimaryKeyMixin):
    """Append-only. Never updated, never deleted by application code.

    This table intentionally has no `updated_at` — a mutable audit log
    is not an audit log. Anything privileged (lead status changes, user
    management, publishing) writes one row here.
    """

    __tablename__ = "audit_logs"

    actor_user_id: Mapped[uuid.UUID | None] = mapped_column(
        GUID(), ForeignKey("users.id"), nullable=True
    )
    action: Mapped[str] = mapped_column(String(100), nullable=False)
    entity_type: Mapped[str] = mapped_column(String(100), nullable=False)
    entity_id: Mapped[str] = mapped_column(String(100), nullable=False)
    before_state: Mapped[dict | None] = mapped_column(PortableJSON, nullable=True)
    after_state: Mapped[dict | None] = mapped_column(PortableJSON, nullable=True)
    ip_address: Mapped[str | None] = mapped_column(String(64), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
