from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.company import Company
from app.models.contact import Contact


class ContactRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_or_create_company(self, name: str | None) -> Company | None:
        if not name:
            return None
        domain = None
        stmt = select(Company).where(Company.name == name)
        result = await self.db.execute(stmt)
        company = result.scalar_one_or_none()
        if company:
            return company
        company = Company(name=name, domain=domain)
        self.db.add(company)
        await self.db.flush()
        return company

    async def get_or_create_contact(
        self, *, full_name: str, work_email: str, company: Company | None
    ) -> Contact:
        stmt = select(Contact).where(Contact.work_email == work_email.lower())
        result = await self.db.execute(stmt)
        contact = result.scalar_one_or_none()
        if contact:
            # Keep the most recent name/company on file without losing history.
            contact.full_name = full_name
            if company is not None:
                contact.company_id = company.id
            await self.db.flush()
            return contact

        contact = Contact(
            full_name=full_name,
            work_email=work_email.lower(),
            company_id=company.id if company else None,
        )
        self.db.add(contact)
        await self.db.flush()
        return contact
