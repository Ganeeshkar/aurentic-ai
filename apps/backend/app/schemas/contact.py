import uuid

from pydantic import BaseModel, EmailStr, Field, field_validator

from app.models.lead import LeadSource


class ContactFormRequest(BaseModel):
    """Mirrors the existing contact.html form fields 1:1, plus the fields
    needed for spam protection and lead routing that mailto never had."""

    full_name: str = Field(min_length=2, max_length=255)
    work_email: EmailStr
    company_name: str | None = Field(default=None, max_length=255)
    topic: str = Field(max_length=255)
    message: str = Field(min_length=10, max_length=5000)

    # Which CTA the visitor used — "Schedule a Discovery Call" vs.
    # "Contact Enterprise Team" — routes to a different follow-up sequence.
    source: LeadSource = LeadSource.DISCOVERY_CALL

    # Spam protection: verified server-side against Cloudflare Turnstile.
    turnstile_token: str

    # Honeypot: a field real visitors never see or fill in (hidden via CSS
    # on the frontend). Any value here means the submission is a bot.
    website: str = Field(default="", max_length=0, description="Honeypot — must stay empty")

    utm_source: str | None = None
    utm_medium: str | None = None
    utm_campaign: str | None = None

    @field_validator("website")
    @classmethod
    def honeypot_must_be_empty(cls, value: str) -> str:
        if value:
            raise ValueError("spam detected")
        return value


class ContactFormResponse(BaseModel):
    reference_id: uuid.UUID
    message: str = "Thanks — we'll reply within one business day."
