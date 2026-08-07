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

        db = get_database()

        return await db["stories"].find_one(
            {
                "_id": ObjectId(story_id)
            }
        )
    
    @staticmethod
    async def get_all_by_user(user_id: str):

        db = get_database()

        stories = await db["stories"].find(
            {
                "user_id": user_id
            }
        ).sort("created_at", -1).to_list(None)

        return stories