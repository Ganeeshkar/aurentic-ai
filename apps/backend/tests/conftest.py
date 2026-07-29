import os

os.environ.setdefault("JWT_SECRET_KEY", "test-secret-key-not-for-production")
os.environ.setdefault("DATABASE_URL", "sqlite+aiosqlite:///:memory:")
os.environ.setdefault("ENVIRONMENT", "test")

import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.pool import StaticPool

from app.auth.security import hash_password
from app.database.session import Base, get_db_session
from app.main import app
from app.middlewares.rate_limit import limiter
from app.models.role import Role
from app.models.user import User

# StaticPool keeps a single SQLite connection alive for the whole test
# session — a plain in-memory SQLite DB otherwise resets on every new
# connection, which would make each repository call see an empty schema.
test_engine = create_async_engine(
    "sqlite+aiosqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestSessionLocal = async_sessionmaker(bind=test_engine, expire_on_commit=False)

# Rate limiting is real infrastructure behavior, not business logic under
# test here — disabled so repeated test requests don't 429 each other.
limiter.enabled = False


async def _override_get_db_session():
    async with TestSessionLocal() as session:
        yield session


app.dependency_overrides[get_db_session] = _override_get_db_session


@pytest_asyncio.fixture(autouse=True)
async def _reset_database():
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest_asyncio.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


TEST_PASSWORD = "correct-horse-battery-staple"


async def _create_user(*, email: str, full_name: str, role_name: str) -> dict:
    async with TestSessionLocal() as db:
        result = await db.execute(select(Role).where(Role.name == role_name))
        role = result.scalar_one_or_none()
        if role is None:
            role = Role(name=role_name, description=role_name)
            db.add(role)
            await db.flush()
        user = User(
            email=email,
            hashed_password=hash_password(TEST_PASSWORD),
            full_name=full_name,
            role_id=role.id,
        )
        db.add(user)
        await db.commit()
        return {"email": email, "password": TEST_PASSWORD, "role": role_name, "id": str(user.id)}


@pytest_asyncio.fixture
async def admin_user():
    return await _create_user(email="admin@foxtheta.com", full_name="Test Admin", role_name="admin")


@pytest_asyncio.fixture
async def sales_user():
    return await _create_user(email="sales@foxtheta.com", full_name="Test Sales", role_name="sales")


@pytest_asyncio.fixture
async def editor_user():
    """A real, authenticated staff account — but not one of the roles
    allowed to see or touch leads. Used to prove RBAC actually excludes
    someone, not just that anonymous requests are rejected."""
    return await _create_user(email="editor@foxtheta.com", full_name="Test Editor", role_name="editor")


async def login(client: AsyncClient, credentials: dict) -> str:
    response = await client.post(
        "/api/v1/auth/login",
        json={"email": credentials["email"], "password": credentials["password"]},
    )
    assert response.status_code == 200, response.text
    return response.json()["access_token"]
