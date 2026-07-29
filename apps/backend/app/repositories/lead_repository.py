import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.contact import Contact
from app.models.lead import Lead, LeadSource, LeadStatus


class LeadRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(
        self, *, contact_id: uuid.UUID, source: LeadSource, topic: str | None, message: str,
        utm_source: str | None, utm_medium: str | None, utm_campaign: str | None,
    ) -> Lead:
        lead = Lead(
            contact_id=contact_id,
            source=source,
            topic=topic,
            message=message,
            utm_source=utm_source,
            utm_medium=utm_medium,
            utm_campaign=utm_campaign,
        )
        self.db.add(lead)
        await self.db.flush()
        return lead

    async def get_by_id(self, lead_id: uuid.UUID) -> Lead | None:
        stmt = (
            select(Lead)
            .options(selectinload(Lead.contact).selectinload(Contact.company))
            .where(Lead.id == lead_id)
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    def _filtered_query(self, *, status: LeadStatus | None, source: LeadSource | None):
        stmt = select(Lead).options(selectinload(Lead.contact).selectinload(Contact.company))
        if status is not None:
            stmt = stmt.where(Lead.status == status)
        if source is not None:
            stmt = stmt.where(Lead.source == source)
        return stmt

    async def list_paginated(
        self,
        *,
        limit: int = 50,
        offset: int = 0,
        status: LeadStatus | None = None,
        source: LeadSource | None = None,
    ) -> list[Lead]:
        stmt = (
            self._filtered_query(status=status, source=source)
            .order_by(Lead.created_at.desc())
            .limit(limit)
            .offset(offset)
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def count(self, *, status: LeadStatus | None = None, source: LeadSource | None = None) -> int:
        stmt = select(func.count()).select_from(
            self._filtered_query(status=status, source=source).subquery()
        )
        result = await self.db.execute(stmt)
        return int(result.scalar_one())

    async def apply_updates(self, lead: Lead, *, changed_fields: dict) -> dict:
        """`changed_fields` should only contain keys the caller actually
        sent (see the route handler's `model_dump(exclude_unset=True)`) —
        that's what lets "assign to nobody" (assigned_to_user_id=None,
        sent explicitly) behave differently from "field omitted"."""

        def _snapshot() -> dict:
            return {
                "status": lead.status.value,
                "assigned_to_user_id": str(lead.assigned_to_user_id) if lead.assigned_to_user_id else None,
            }

        before = _snapshot()
        if "status" in changed_fields:
            lead.status = changed_fields["status"]
        if "assigned_to_user_id" in changed_fields:
            lead.assigned_to_user_id = changed_fields["assigned_to_user_id"]

        await self.db.flush()
        return {"before": before, "after": _snapshot()}
