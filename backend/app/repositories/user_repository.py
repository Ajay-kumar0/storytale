from app.db.database import get_user_collection


class UserRepository:

    @staticmethod
    async def get_by_email(email: str):
        users = get_user_collection()
        return await users.find_one({"email": email})

    @staticmethod
    async def create(user: dict):
        users = get_user_collection()
        result = await users.insert_one(user)
        return result