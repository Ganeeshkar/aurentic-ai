from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import require_role
from app.database.session import get_db_session
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.lead import AssignableUserResponse

router = APIRouter(prefix="/users", tags=["admin:users"])


@router.get("/assignable", response_model=list[AssignableUserResponse])
async def list_assignable_users(
    db: AsyncSession = Depends(get_db_session),
    _user: User = Depends(require_role("admin", "sales")),
) -> list[AssignableUserResponse]:
    users = await UserRepository(db).list_assignable()
    return [AssignableUserResponse.model_validate(u) for u in users]
