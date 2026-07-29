"""Import every model here so Alembic's autogenerate can discover them
via a single `from app.models import *`-style import in alembic/env.py."""

from app.models.audit_log import AuditLog
from app.models.company import Company
from app.models.contact import Contact
from app.models.lead import Lead
from app.models.permission import Permission
from app.models.role import Role, RolePermission
from app.models.session import Session
from app.models.user import User

__all__ = [
    "AuditLog",
    "Company",
    "Contact",
    "Lead",
    "Permission",
    "Role",
    "RolePermission",
    "Session",
    "User",
]
