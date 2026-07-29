from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db_session
from app.emails.send import send_lead_confirmation, send_lead_notification
from app.middlewares.rate_limit import CONTACT_FORM_LIMIT, limiter
from app.schemas.contact import ContactFormRequest, ContactFormResponse
from app.services.lead_service import LeadService
from app.services.spam_protection import verify_turnstile_token

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=ContactFormResponse, status_code=status.HTTP_202_ACCEPTED)
@limiter.limit(CONTACT_FORM_LIMIT)
async def submit_contact_form(
    request: Request,
    payload: ContactFormRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db_session),
) -> ContactFormResponse:
    """Replaces the static site's mailto flow.

    Previously: the frontend built a mailto: link and hoped the visitor's
    OS had a mail client configured, then hoped they clicked Send. Now:
    the submission is stored the moment this returns 202 — nothing about
    the lead being captured depends on the visitor doing anything else.
    """
    client_ip = request.client.host if request.client else None

    turnstile_ok = await verify_turnstile_token(payload.turnstile_token, remote_ip=client_ip)
    if not turnstile_ok:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Spam verification failed"
        )

    lead = await LeadService(db).capture_from_contact_form(payload, ip_address=client_ip)

    # Queued, not awaited inline — a slow SMTP provider must never delay
    # the response the visitor is waiting on.
    background_tasks.add_task(send_lead_notification, lead)
    background_tasks.add_task(send_lead_confirmation, lead)

    return ContactFormResponse(reference_id=lead.id)
