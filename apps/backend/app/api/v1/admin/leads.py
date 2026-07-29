import uuid

from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import require_role
from app.database.session import get_db_session
from app.models.lead import LeadSource, LeadStatus
from app.models.user import User
from app.repositories.lead_repository import LeadRepository
from app.schemas.lead import LeadListResponse, LeadResponse, LeadStatusUpdateRequest
from app.services.lead_admin_service import LeadAdminService

router = APIRouter(prefix="/leads", tags=["admin:leads"])

# Sales works leads day to day; admin can see/do everything sales can.
# Marketing/editor/enterprise deliberately cannot — a lead's message may
# contain unrelated-department-sensitive detail.
LEADS_ROLES = ("admin", "sales")


@router.get("", response_model=LeadListResponse)
async def list_leads(
    status: LeadStatus | None = None,
    source: LeadSource | None = None,
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_db_session),
    _user: User = Depends(require_role(*LEADS_ROLES)),
) -> LeadListResponse:
    repo = LeadRepository(db)
    items = await repo.list_paginated(limit=limit, offset=offset, status=status, source=source)
    total = await repo.count(status=status, source=source)
    return LeadListResponse(
        items=[LeadResponse.model_validate(lead) for lead in items],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.get("/{lead_id}", response_model=LeadResponse)
async def get_lead(
    lead_id: uuid.UUID,
    db: AsyncSession = Depends(get_db_session),
    _user: User = Depends(require_role(*LEADS_ROLES)),
) -> LeadResponse:
    lead = await LeadAdminService(db).get_or_404(lead_id)
    return LeadResponse.model_validate(lead)


@router.patch("/{lead_id}", response_model=LeadResponse)
async def update_lead(
    lead_id: uuid.UUID,
    payload: LeadStatusUpdateRequest,
    request: Request,
    db: AsyncSession = Depends(get_db_session),
    user: User = Depends(require_role(*LEADS_ROLES)),
) -> LeadResponse:
    lead = await LeadAdminService(db).update(
        lead_id,
        payload,
        actor_user_id=user.id,
        ip_address=request.client.host if request.client else None,
    )
    return LeadResponse.model_validate(lead)
