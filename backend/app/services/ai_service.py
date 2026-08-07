from app.ai.story_generator import (
    generate_first_chapter,
    generate_next_chapter,
)

class AIService:

    @staticmethod
    async def generate_story(story: dict):

        return await generate_first_chapter(story)

    @staticmethod
    async def continue_story(
        story: dict,
        chapter: dict,
        selected_choice: dict,
    ):
        return await generate_next_chapter(
            story,
            chapter,
            selected_choice,
        )