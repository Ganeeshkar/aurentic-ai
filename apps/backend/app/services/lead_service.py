from sqlalchemy.ext.asyncio import AsyncSession

from app.models.lead import Lead
from app.repositories.contact_repository import ContactRepository
from app.repositories.lead_repository import LeadRepository
from app.schemas.contact import ContactFormRequest
from app.services.audit_service import AuditService


class LeadService:
    """The single place a form submission turns into database rows.
    Both /contact and (later) /enterprise and /security/download call
    into this, so 'what counts as a lead' is defined once."""

    def __init__(self, db: AsyncSession):
        self.db = db
        self.contacts = ContactRepository(db)
        self.leads = LeadRepository(db)
        self.audit = AuditService(db)

    async def capture_from_contact_form(
        self, payload: ContactFormRequest, *, ip_address: str | None
    ) -> Lead:
        company = await self.contacts.get_or_create_company(payload.company_name)
        contact = await self.contacts.get_or_create_contact(
            full_name=payload.full_name, work_email=payload.work_email, company=company
        )
        lead = await self.leads.create(
            contact_id=contact.id,
            source=payload.source,
            topic=payload.topic,
            message=payload.message,
            utm_source=payload.utm_source,
            utm_medium=payload.utm_medium,
            utm_campaign=payload.utm_campaign,
        )
        await self.audit.record(
            action="lead.created",
            entity_type="lead",
            entity_id=lead.id,
            after_state={"source": lead.source.value, "topic": lead.topic},
            ip_address=ip_address,
        )
        await self.db.commit()

        # Re-fetch with relationships loaded so the caller (and the queued
        # notification email) can read contact/company without a second
        # round trip or a lazy-load-on-async-session error.
        return await self.leads.get_by_id(lead.id)
