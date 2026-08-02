import json


def build_story_prompt(story: dict) -> str:

    schema = {
        "chapter": 1,
        "title": "",
        "story": "",
        "choices": [
            {
                "id": 1,
                "text": ""
            },
            {
                "id": 2,
                "text": ""
            },
            {
                "id": 3,
                "text": ""
            },
            {
                "id": 4,
                "text": ""
            }
        ],
        "player": {
            "health": 100,
            "mana": 50,
            "gold": 20,
            "xp": 0
        },
        "inventory": [],
        "quest": {
            "title": "",
            "completed": False
        }
    }

    return f"""
You are an expert RPG game master.

Generate the FIRST chapter of an interactive RPG.

Story Title: {story['title']}
Genre: {story['genre']}
World: {story['world']}
Character Name: {story['character_name']}
Character Class: {story['character_class']}
Difficulty: {story['difficulty']}

Rules:

1. Return ONLY JSON.
2. Do NOT write markdown.
3. Do NOT use ```json.
4. Story should be 250-400 words.
5. Give exactly four choices.
6. Every choice should significantly change the story.
7. Keep player stats realistic.

Return exactly this JSON format:

{json.dumps(schema, indent=2)}
"""

import json


def build_continue_prompt(
    story: dict,
    chapter: dict,
    selected_choice: dict,
):

    schema = {
        "chapter": chapter["chapter"] + 1,
        "title": "",
        "story": "",
        "choices": [
            {
                "id": 1,
                "text": ""
            },
            {
                "id": 2,
                "text": ""
            },
            {
                "id": 3,
                "text": ""
            },
            {
                "id": 4,
                "text": ""
            }
        ],
        "player": {
            "health": chapter["player"]["health"],
            "mana": chapter["player"]["mana"],
            "gold": chapter["player"]["gold"],
            "xp": chapter["player"]["xp"]
        },
        "inventory": chapter["inventory"],
        "quest": chapter["quest"]
    }

    return f"""
You are an expert RPG Game Master.

You are CONTINUING an existing story.

Story Title:
{story["title"]}

Genre:
{story["genre"]}

World:
{story["world"]}

Previous Chapter:

{chapter["story"]}

The player selected:

{selected_choice["text"]}

Rules:

1. Continue the story naturally.
2. Continue from the previous chapter.
3. Return ONLY valid JSON.
4. Do NOT use markdown.
5. Do NOT use ```json.
6. Story length should be 250-400 words.
7. Give EXACTLY four choices.
8. Preserve inventory.
9. Preserve player stats unless something changes.
10. Preserve quest unless story changes it.

Return EXACTLY this JSON format:

{json.dumps(schema, indent=2)}
"""