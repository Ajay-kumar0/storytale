from app.db.mongodb import get_database


class PlayerRepository:

    @staticmethod
    async def create(player_state: dict):
        db = get_database()

        result = await db["player_states"].insert_one(
            player_state
        )

        return str(result.inserted_id)

    @staticmethod
    async def get_by_story(story_id: str):
        db = get_database()

        return await db["player_states"].find_one(
            {
                "story_id": story_id
            }
        )

    @staticmethod
    async def update(story_id: str, data: dict):
        db = get_database()

        await db["player_states"].update_one(
            {
                "story_id": story_id
            },
            {
                "$set": data
            }
        )