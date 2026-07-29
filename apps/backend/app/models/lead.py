import enum
import uuid

from sqlalchemy import Enum, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.session import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin
from app.models.types import GUID


class LeadSource(str, enum.Enum):
    DISCOVERY_CALL = "discovery_call"
    ENTERPRISE_TEAM = "enterprise_team"
    SECURITY_DOWNLOAD = "security_download"
    NEWSLETTER = "newsletter"


class LeadStatus(str, enum.Enum):
    NEW = "new"
    QUALIFIED = "qualified"
    CONTACTED = "contacted"
    WON = "won"
    LOST = "lost"


class Lead(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    """The unit of work for sales. Every public conversion path (contact
    form, enterprise form, security-overview download) creates one of
    these — this is what replaces the mailto flow end to end."""

    __tablename__ = "leads"

    contact_id: Mapped[uuid.UUID] = mapped_column(
        GUID(), ForeignKey("contacts.id"), nullable=False
    )
    # values_callable is required here: SQLAlchemy's Enum type persists the
    # Python member NAME by default (e.g. "DISCOVERY_CALL"), not its value
    # ("discovery_call") — which would silently mismatch the lowercase
    # labels the Postgres migration actually creates for these enum types.
    source: Mapped[LeadSource] = mapped_column(
        Enum(LeadSource, name="lead_source", values_callable=lambda enum_cls: [e.value for e in enum_cls]),
        nullable=False,
    )
    topic: Mapped[str | None] = mapped_column(String(255), nullable=True)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[LeadStatus] = mapped_column(
        Enum(LeadStatus, name="lead_status", values_callable=lambda enum_cls: [e.value for e in enum_cls]),
        default=LeadStatus.NEW,
        nullable=False,
    )
    assigned_to_user_id: Mapped[uuid.UUID | None] = mapped_column(
        GUID(), ForeignKey("users.id"), nullable=True
    )
    score: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    utm_source: Mapped[str | None] = mapped_column(String(100), nullable=True)
    utm_medium: Mapped[str | None] = mapped_column(String(100), nullable=True)
    utm_campaign: Mapped[str | None] = mapped_column(String(100), nullable=True)

    contact: Mapped["Contact"] = relationship(back_populates="leads")
