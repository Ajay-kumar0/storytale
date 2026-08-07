from app.ai.json_parser import parse_story
from app.ai.llm_client import generate_story
from app.ai.prompt_builder import (
    build_story_prompt,
    build_continue_prompt,
)


def normalize_chapter(chapter: dict):

    # Ensure player exists
    if "player" not in chapter:
        chapter["player"] = {}

    # Ensure health exists
    health = chapter["player"].get("health", 100)

    # Keep health between 0 and 100
    health = max(0, min(100, health))

    chapter["player"]["health"] = health

    # Game over logic
    if health == 0:

        chapter["game_over"] = True
        chapter["choices"] = []

    else:

        chapter["game_over"] = False

    return chapter


async def generate_first_chapter(story: dict):

    prompt = build_story_prompt(story)

    response = await generate_story(prompt)

    chapter = parse_story(response)

    return normalize_chapter(chapter)


async def generate_next_chapter(
    story: dict,
    chapter: dict,
    selected_choice: dict,
):

    prompt = build_continue_prompt(
        story,
        chapter,
        selected_choice,
    )

    response = await generate_story(prompt)

    new_chapter = parse_story(response)

    return normalize_chapter(new_chapter)