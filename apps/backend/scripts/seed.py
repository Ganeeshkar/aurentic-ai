"""Seeds the roles every RBAC check depends on, plus one admin user for
first login. Run once after migrations: `python -m scripts.seed`.

Per the architecture blueprint's risk log, only admin/editor are expected
to be actually assigned at launch — marketing/sales/enterprise exist in
the schema now so adding a team member later is a role assignment, not a
migration.
"""
import asyncio
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import select  # noqa: E402

from app.auth.security import hash_password  # noqa: E402
from app.database.session import AsyncSessionLocal  # noqa: E402
from app.models.role import Role  # noqa: E402
from app.models.user import User  # noqa: E402

ROLES = ["admin", "editor", "marketing", "sales", "enterprise"]


async def seed() -> None:
    async with AsyncSessionLocal() as db:
        role_by_name: dict[str, Role] = {}
        for name in ROLES:
            existing = await db.execute(select(Role).where(Role.name == name))
            role = existing.scalar_one_or_none()
            if role is None:
                role = Role(name=name, description=f"{name} role")
                db.add(role)
                await db.flush()
            role_by_name[name] = role

        admin_email = os.environ.get("SEED_ADMIN_EMAIL", "admin@foxtheta.com")
        admin_password = os.environ.get("SEED_ADMIN_PASSWORD")
        if not admin_password:
            raise SystemExit("Set SEED_ADMIN_PASSWORD before seeding an admin account.")

        existing_admin = await db.execute(select(User).where(User.email == admin_email))
        if existing_admin.scalar_one_or_none() is None:
            db.add(
                User(
                    email=admin_email,
                    hashed_password=hash_password(admin_password),
                    full_name="Foxtheta Admin",
                    role_id=role_by_name["admin"].id,
                )
            )

        await db.commit()
        print(f"Seeded roles: {', '.join(ROLES)}")
        print(f"Admin account ready: {admin_email}")


if __name__ == "__main__":
    asyncio.run(seed())
