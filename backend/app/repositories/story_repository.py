from app.db.mongodb import get_database
from bson.objectid import ObjectId

class StoryRepository:

    @staticmethod
    async def create(story: dict):
        db = get_database()

        result = await db["stories"].insert_one(story)

        return str(result.inserted_id)

    @staticmethod
    async def get_by_id(story_id: str):

        from bson import ObjectId

        db = get_database()

        return await db["stories"].find_one(
            {
                "_id": ObjectId(story_id)
            }
        )