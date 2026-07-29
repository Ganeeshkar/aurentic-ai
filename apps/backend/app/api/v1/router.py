from fastapi import APIRouter

from app.api.v1 import auth, contact
from app.api.v1.admin import leads as admin_leads
from app.api.v1.admin import users as admin_users

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(contact.router)
api_router.include_router(admin_leads.router, prefix="/admin")
api_router.include_router(admin_users.router, prefix="/admin")

# Phase 4 (per the roadmap): enterprise, security-download, case_studies,
# blog, newsletter, files, webhooks, dashboard, analytics — added here as
# their models/services are built, following the same route -> service ->
# repository shape as auth, contact, and admin/leads.
