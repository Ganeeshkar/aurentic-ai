import pytest
from httpx import AsyncClient

pytestmark = pytest.mark.asyncio


async def test_login_with_correct_credentials_returns_access_token(
    client: AsyncClient, admin_user: dict
):
    response = await client.post("/api/v1/auth/login", json=admin_user)

    assert response.status_code == 200
    body = response.json()
    assert body["access_token"]
    assert body["token_type"] == "bearer"
    assert "foxtheta_refresh_token" in response.cookies


async def test_login_with_wrong_password_returns_401(client: AsyncClient, admin_user: dict):
    response = await client.post(
        "/api/v1/auth/login", json={"email": admin_user["email"], "password": "wrong-password"}
    )

    assert response.status_code == 401


async def test_login_with_unknown_email_returns_401(client: AsyncClient):
    response = await client.post(
        "/api/v1/auth/login", json={"email": "nobody@example.com", "password": "whatever"}
    )

    assert response.status_code == 401


async def test_me_requires_a_valid_token(client: AsyncClient):
    response = await client.get("/api/v1/auth/me")

    assert response.status_code == 401


async def test_me_returns_current_user_with_valid_token(
    client: AsyncClient, admin_user: dict
):
    login_response = await client.post("/api/v1/auth/login", json=admin_user)
    access_token = login_response.json()["access_token"]

    response = await client.get(
        "/api/v1/auth/me", headers={"Authorization": f"Bearer {access_token}"}
    )

    assert response.status_code == 200
    body = response.json()
    assert body["email"] == admin_user["email"]
    assert body["role"] == "admin"


async def test_refresh_rotates_the_refresh_token(client: AsyncClient, admin_user: dict):
    login_response = await client.post("/api/v1/auth/login", json=admin_user)
    old_refresh_cookie = login_response.cookies.get("foxtheta_refresh_token")

    refresh_response = await client.post("/api/v1/auth/refresh")

    assert refresh_response.status_code == 200
    new_refresh_cookie = refresh_response.cookies.get("foxtheta_refresh_token")
    assert new_refresh_cookie != old_refresh_cookie


async def test_logout_revokes_the_session(client: AsyncClient, admin_user: dict):
    await client.post("/api/v1/auth/login", json=admin_user)

    logout_response = await client.post("/api/v1/auth/logout")
    assert logout_response.status_code == 204

    refresh_after_logout = await client.post("/api/v1/auth/refresh")
    assert refresh_after_logout.status_code == 401
