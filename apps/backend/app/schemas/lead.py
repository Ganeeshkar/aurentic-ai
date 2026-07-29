import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr

from app.models.lead import LeadSource, LeadStatus


class ContactSummary(BaseModel):
    id: uuid.UUID
    full_name: str
    work_email: EmailStr
    company_name: str | None = None

    model_config = {"from_attributes": True}


class LeadResponse(BaseModel):
    id: uuid.UUID
    contact: ContactSummary
    source: LeadSource
    topic: str | None
    message: str
    status: LeadStatus
    assigned_to_user_id: uuid.UUID | None
    score: int
    created_at: datetime

    model_config = {"from_attributes": True}


class LeadStatusUpdateRequest(BaseModel):
    status: LeadStatus | None = None
    assigned_to_user_id: uuid.UUID | None = None


class LeadListResponse(BaseModel):
    items: list[LeadResponse]
    total: int
    limit: int
    offset: int


class AssignableUserResponse(BaseModel):
    id: uuid.UUID
    full_name: str
    role_name: str

    model_config = {"from_attributes": True}
