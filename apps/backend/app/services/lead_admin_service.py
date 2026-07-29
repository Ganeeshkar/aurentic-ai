import uuid

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.lead import Lead
from app.repositories.lead_repository import LeadRepository
from app.repositories.user_repository import UserRepository
from app.schemas.lead import LeadStatusUpdateRequest
from app.services.audit_service import AuditService


class LeadAdminService:
    """Everything a sales/admin user does to a lead after it's captured.
    Kept separate from LeadService (public form capture) because the two
    have entirely different authorization requirements and callers."""

    def __init__(self, db: AsyncSession):
        self.db = db
        self.leads = LeadRepository(db)
        self.users = UserRepository(db)
        self.audit = AuditService(db)

    async def get_or_404(self, lead_id: uuid.UUID) -> Lead:
        lead = await self.leads.get_by_id(lead_id)
        if lead is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")
        return lead

    async def update(
        self,
        lead_id: uuid.UUID,
        payload: LeadStatusUpdateRequest,
        *,
        actor_user_id: uuid.UUID,
        ip_address: str | None,
    ) -> Lead:
        lead = await self.get_or_404(lead_id)
        changed_fields = payload.model_dump(exclude_unset=True)

        if "assigned_to_user_id" in changed_fields and changed_fields["assigned_to_user_id"] is not None:
            assignee = await self.users.get_by_id(changed_fields["assigned_to_user_id"])
            if assignee is None or assignee.role.name not in ("admin", "sales"):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="assigned_to_user_id must be an active admin or sales user",
                )

        if not changed_fields:
            return lead

        diff = await self.leads.apply_updates(lead, changed_fields=changed_fields)
        await self.audit.record(
            action="lead.updated",
            entity_type="lead",
            entity_id=lead.id,
            actor_user_id=actor_user_id,
            before_state=diff["before"],
            after_state=diff["after"],
            ip_address=ip_address,
        )
        await self.db.commit()
        return await self.leads.get_by_id(lead.id)
