import pytest
from httpx import AsyncClient

pytestmark = pytest.mark.asyncio


VALID_PAYLOAD = {
    "full_name": "Jordan Lee",
    "work_email": "jordan@example.com",
    "company_name": "Example Logistics",
    "topic": "AI agents — take over a workflow",
    "message": "We spend 15 hours a week reconciling invoices manually.",
    "source": "discovery_call",
    "turnstile_token": "test-token",
}


async def test_contact_form_creates_lead_and_returns_reference_id(client: AsyncClient):
    response = await client.post("/api/v1/contact", json=VALID_PAYLOAD)

    assert response.status_code == 202
    body = response.json()
    assert "reference_id" in body
    assert body["message"]


async def test_contact_form_rejects_honeypot_fill(client: AsyncClient):
    payload = {**VALID_PAYLOAD, "website": "http://spambot.example"}
    response = await client.post("/api/v1/contact", json=payload)

    assert response.status_code == 422


async def test_contact_form_rejects_short_message(client: AsyncClient):
    payload = {**VALID_PAYLOAD, "message": "too short"}
    response = await client.post("/api/v1/contact", json=payload)

    assert response.status_code == 422


async def test_contact_form_rejects_invalid_email(client: AsyncClient):
    payload = {**VALID_PAYLOAD, "work_email": "not-an-email"}
    response = await client.post("/api/v1/contact", json=payload)

    assert response.status_code == 422


async def test_repeat_submission_from_same_email_reuses_contact(client: AsyncClient):
    first = await client.post("/api/v1/contact", json=VALID_PAYLOAD)
    second = await client.post("/api/v1/contact", json=VALID_PAYLOAD)

    assert first.status_code == 202
    assert second.status_code == 202
    assert first.json()["reference_id"] != second.json()["reference_id"]
