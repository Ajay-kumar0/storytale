from app.ai.json_parser import parse_story
from app.ai.llm_client import generate_story
from app.ai.prompt_builder import build_story_prompt
from app.ai.prompt_builder import build_continue_prompt


def generate_first_chapter(story: dict):

    prompt = build_story_prompt(story)

    response = generate_story(prompt)

    chapter = parse_story(response)

    return chapter

def generate_next_chapter(
    story: dict,
    chapter: dict,
    selected_choice: dict,
):
    prompt = build_continue_prompt(
        story,
        chapter,
        selected_choice,
    )

    response = generate_story(prompt)

    return parse_story(response)