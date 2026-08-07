from app.db.mongodb import get_database


class UserRepository:

    @staticmethod
    async def get_by_email(email: str):
        db = get_database()
        return await db["users"].find_one({"email": email})

    @staticmethod
    async def create(user: dict):
        db = get_database()
        result = await db["users"].insert_one(user)
        return result