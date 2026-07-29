import logging
from email.message import EmailMessage

import aiosmtplib

from app.core.config import settings
from app.models.lead import Lead

logger = logging.getLogger("foxtheta.emails")


async def _send(*, to: str, subject: str, body: str) -> None:
    if not settings.smtp_host:
        # Development fallback: log instead of sending, so the flow is
        # exercisable without real SMTP credentials configured.
        logger.info("EMAIL (dev, not sent) to=%s subject=%s\n%s", to, subject, body)
        return

    message = EmailMessage()
    message["From"] = settings.email_from
    message["To"] = to
    message["Subject"] = subject
    message.set_content(body)

    await aiosmtplib.send(
        message,
        hostname=settings.smtp_host,
        port=settings.smtp_port,
        username=settings.smtp_username or None,
        password=settings.smtp_password or None,
        start_tls=True,
    )


async def send_lead_notification(lead: Lead) -> None:
    """Notifies the sales inbox that a new lead exists. Intended to be
    scheduled via FastAPI's BackgroundTasks so it never blocks the API
    response the visitor is waiting on."""
    contact = lead.contact
    company_name = contact.company.name if contact.company else "—"
    subject = f"New lead: {contact.full_name} ({lead.source.value})"
    body = (
        f"Source: {lead.source.value}\n"
        f"Topic: {lead.topic or '—'}\n"
        f"Name: {contact.full_name}\n"
        f"Email: {contact.work_email}\n"
        f"Company: {company_name}\n\n"
        f"Message:\n{lead.message}\n"
    )
    await _send(to=settings.sales_notification_email, subject=subject, body=body)


async def send_lead_confirmation(lead: Lead) -> None:
    """Confirms receipt to the visitor — this is the email a mailto flow
    could never guarantee, because it depended on the visitor's own
    mail client actually sending something."""
    contact = lead.contact
    subject = "We received your message — Foxtheta"
    body = (
        f"Hi {contact.full_name.split(' ')[0]},\n\n"
        "Thanks for reaching out. We reply within one business day.\n\n"
        "— Foxtheta"
    )
    await _send(to=contact.work_email, subject=subject, body=body)
