import uuid

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.session import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin
from app.models.types import GUID


class Contact(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    """A real human who submitted a form. Separated from Company so the
    same person submitting twice doesn't duplicate company data, and the
    same company with multiple contacts doesn't duplicate person data."""

    __tablename__ = "contacts"

    company_id: Mapped[uuid.UUID | None] = mapped_column(
        GUID(), ForeignKey("companies.id"), nullable=True
    )
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    work_email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    role_title: Mapped[str | None] = mapped_column(String(150), nullable=True)

    company: Mapped["Company"] = relationship(back_populates="contacts")
    leads: Mapped[list["Lead"]] = relationship(back_populates="contact")  # noqa: F821

    @property
    def company_name(self) -> str | None:
        """Convenience for API schemas (ContactSummary) — requires
        `company` to already be eager-loaded (selectinload), same as
        every other cross-relationship read in this codebase."""
        return self.company.name if self.company else None
