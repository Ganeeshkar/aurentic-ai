from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.session import Base
from app.models.mixins import TimestampMixin, UUIDPrimaryKeyMixin


class Company(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    """Deduplicated by domain where possible, so the same organization
    submitting through multiple contacts doesn't fragment into duplicate
    company records."""

    __tablename__ = "companies"

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    domain: Mapped[str | None] = mapped_column(String(255), unique=True, index=True, nullable=True)
    industry: Mapped[str | None] = mapped_column(String(100), nullable=True)
    employee_range: Mapped[str | None] = mapped_column(String(50), nullable=True)

    contacts: Mapped[list["Contact"]] = relationship(back_populates="company")  # noqa: F821
