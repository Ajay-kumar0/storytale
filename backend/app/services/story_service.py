from app.models.story import create_story_document
from app.models.chapter import create_chapter_document

from app.repositories.story_repository import StoryRepository
from app.repositories.chapter_repository import ChapterRepository

from app.services.ai_service import AIService
from app.services.player_service import PlayerService

from app.utils.serializer import serialize_doc, serialize_docs


class StoryService:

    @staticmethod
    async def create_story(
        user_id: str,
        title: str,
        genre: str,
        world: str,
        character_name: str,
        character_class: str,
        difficulty: str,
    ):

        story = create_story_document(
            user_id=user_id,
            title=title,
            genre=genre,
            world=world,
            character_name=character_name,
            character_class=character_class,
            difficulty=difficulty,
        )

        story_id = await StoryRepository.create(story)

        await PlayerService.initialize_player(story_id)

        return story_id

    @staticmethod
    async def generate_story(story_id: str, user_id: str):

        story = await StoryRepository.get_by_id(story_id)

        if story is None or story.get("user_id") != user_id:
            return None

        chapter = await AIService.generate_story(story)

        chapter_doc = create_chapter_document(
            story_id,
            chapter,
        )

        await ChapterRepository.create(chapter_doc)

        await PlayerService.update_health(
            story_id,
            chapter["player"]["health"],
        )

        player = await PlayerService.get_player(story_id)

        return {
            "chapter": chapter,
            "player": serialize_doc(player),
        }

    @staticmethod
    async def get_story(story_id: str, user_id: str):

        story = await StoryRepository.get_by_id(story_id)

        if story is None or story.get("user_id") != user_id:
            return None

        chapter = await ChapterRepository.get_latest_chapter(
            story_id
        )

        player = await PlayerService.get_player(
            story_id
        )

        return {
            "story": serialize_doc(story),
            "chapter": serialize_doc(chapter),
            "player": serialize_doc(player),
        }

    @staticmethod
    async def continue_story(
        story_id: str,
        choice_id: int,
        user_id: str,
    ):

        story = await StoryRepository.get_by_id(
            story_id
        )

        if story is None or story.get("user_id") != user_id:
            return None

        latest = await ChapterRepository.get_latest_chapter(
            story_id
        )

        if latest is None or latest.get("game_over", False):
            return None

        selected_choice = next(
            (
                c
                for c in latest["choices"]
                if c["id"] == choice_id
            ),
            None,
        )

        if selected_choice is None:
            return None

        new_chapter = await AIService.continue_story(
            story,
            latest,
            selected_choice,
        )

        chapter_doc = create_chapter_document(
            story_id,
            new_chapter,
        )

        await ChapterRepository.create(
            chapter_doc
        )

        await PlayerService.update_health(
            story_id,
            new_chapter["player"]["health"],
        )

        player = await PlayerService.get_player(
            story_id
        )

        return {
            "chapter": new_chapter,
            "player": serialize_doc(player),
        }

    @staticmethod
    async def get_user_stories(user_id: str):

        stories = await StoryRepository.get_all_by_user(
            user_id
        )

        return serialize_docs(stories)