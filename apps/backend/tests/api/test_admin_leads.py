import pytest
from httpx import AsyncClient

from tests.conftest import login

pytestmark = pytest.mark.asyncio

CONTACT_PAYLOAD = {
    "full_name": "Jordan Lee",
    "work_email": "jordan@example.com",
    "company_name": "Example Logistics",
    "topic": "AI agents — take over a workflow",
    "message": "We spend 15 hours a week reconciling invoices manually.",
    "source": "discovery_call",
    "turnstile_token": "test-token",
}


async def _create_lead(client: AsyncClient) -> str:
    response = await client.post("/api/v1/contact", json=CONTACT_PAYLOAD)
    assert response.status_code == 202
    return response.json()["reference_id"]


async def test_sales_can_list_leads(client: AsyncClient, sales_user: dict):
    await _create_lead(client)
    token = await login(client, sales_user)

    response = await client.get(
        "/api/v1/admin/leads", headers={"Authorization": f"Bearer {token}"}
    )

    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 1
    assert body["items"][0]["contact"]["full_name"] == "Jordan Lee"
    assert body["items"][0]["contact"]["company_name"] == "Example Logistics"


async def test_editor_cannot_list_leads(client: AsyncClient, editor_user: dict):
    """A real, authenticated staff account — just not one of the roles
    allowed near lead data. Proves RBAC actually discriminates by role,
    not just by "logged in or not"."""
    token = await login(client, editor_user)

    response = await client.get(
        "/api/v1/admin/leads", headers={"Authorization": f"Bearer {token}"}
    )

    assert response.status_code == 403


async def test_anonymous_cannot_list_leads(client: AsyncClient):
    response = await client.get("/api/v1/admin/leads")

    assert response.status_code == 401


async def test_list_leads_filters_by_status(client: AsyncClient, admin_user: dict):
    await _create_lead(client)
    token = await login(client, admin_user)
    headers = {"Authorization": f"Bearer {token}"}

    all_new = await client.get("/api/v1/admin/leads?status=new", headers=headers)
    assert all_new.json()["total"] == 1

    all_won = await client.get("/api/v1/admin/leads?status=won", headers=headers)
    assert all_won.json()["total"] == 0


async def test_admin_can_get_and_update_lead_status(client: AsyncClient, admin_user: dict):
    reference_id = await _create_lead(client)
    token = await login(client, admin_user)
    headers = {"Authorization": f"Bearer {token}"}

    detail = await client.get(f"/api/v1/admin/leads/{reference_id}", headers=headers)
    assert detail.status_code == 200
    assert detail.json()["status"] == "new"

    updated = await client.patch(
        f"/api/v1/admin/leads/{reference_id}", json={"status": "qualified"}, headers=headers
    )
    assert updated.status_code == 200
    assert updated.json()["status"] == "qualified"


async def test_assigning_to_a_non_sales_user_is_rejected(
    client: AsyncClient, admin_user: dict, editor_user: dict
):
    reference_id = await _create_lead(client)
    token = await login(client, admin_user)
    headers = {"Authorization": f"Bearer {token}"}

    response = await client.patch(
        f"/api/v1/admin/leads/{reference_id}",
        json={"assigned_to_user_id": editor_user["id"]},
        headers=headers,
    )

    assert response.status_code == 400


async def test_assigning_to_a_sales_user_succeeds(
    client: AsyncClient, admin_user: dict, sales_user: dict
):
    reference_id = await _create_lead(client)
    token = await login(client, admin_user)
    headers = {"Authorization": f"Bearer {token}"}

    response = await client.patch(
        f"/api/v1/admin/leads/{reference_id}",
        json={"assigned_to_user_id": sales_user["id"]},
        headers=headers,
    )

    assert response.status_code == 200
    assert response.json()["assigned_to_user_id"] == sales_user["id"]


async def test_get_unknown_lead_returns_404(client: AsyncClient, admin_user: dict):
    token = await login(client, admin_user)
    response = await client.get(
        "/api/v1/admin/leads/00000000-0000-0000-0000-000000000000",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 404


async def test_assignable_users_lists_only_admin_and_sales(
    client: AsyncClient, admin_user: dict, sales_user: dict, editor_user: dict
):
    token = await login(client, admin_user)
    response = await client.get(
        "/api/v1/admin/users/assignable", headers={"Authorization": f"Bearer {token}"}
    )

    assert response.status_code == 200
    names = {u["full_name"] for u in response.json()}
    assert names == {"Test Admin", "Test Sales"}
