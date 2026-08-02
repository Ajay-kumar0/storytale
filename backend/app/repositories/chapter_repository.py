from app.db.mongodb import get_database


class ChapterRepository:

    @staticmethod
    async def create(chapter: dict):

        db = get_database()

        result = await db["chapters"].insert_one(chapter)

        return str(result.inserted_id)

    @staticmethod
    async def get_story_chapters(story_id: str):

        db = get_database()

        return await db["chapters"].find(
            {
                "story_id": story_id
            }
        ).to_list(length=100)

    @staticmethod
    async def get_latest_chapter(story_id: str):

        db = get_database()

        chapter = await db["chapters"].find_one(
            {"story_id": story_id},
            sort=[("chapter", -1)]
        )

        return chapter