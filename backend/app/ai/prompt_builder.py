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
            "health": 100
        }
    }

    return f"""
You are an expert interactive story writer.

Write the FIRST chapter of an adventure game.

Story Details

Title: {story['title']}
Genre: {story['genre']}
World: {story['world']}
Character Name: {story['character_name']}
Character Class: {story['character_class']}
Difficulty: {story['difficulty']}

Writing Rules

- Write in simple English.
- Use short sentences.
- Avoid difficult words.
- Keep paragraphs short (2-4 lines).
- Write like an adventure game, not a novel.
- Make the story exciting and easy to understand.
- Show actions and dialogue instead of long descriptions.
- Write about 180 words.
- If an action scene is happening, you may write up to 250 words.
- End with exactly 4 meaningful choices.
- Every choice should lead to a different situation.

Story Structure

1. Start with a small action or interesting event.
2. Describe what the player sees.
3. Add one challenge, mystery, or danger.
4. End with suspense.
5. Give exactly four meaningful choices.

Choice Rules

- Every choice should feel unique.
- One choice should be safe.
- One choice should be risky.
- One choice should explore something new.
- One choice should interact with a person or object.

Health Rules

- The player starts with 100 health.
- Do NOT change health in the first chapter.
- Never make health above 100.
- Never make health below 0.
- Set "game_over" to false.

Response Rules

- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT use ```json.
- Do NOT write any explanation.

Return exactly this JSON:

{json.dumps(schema, indent=2)}
"""


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
            "health": chapter["player"]["health"]
        }
    }

    return f"""
You are an expert interactive story writer.

Continue the adventure naturally.

Story Information

Title: {story["title"]}
Genre: {story["genre"]}
World: {story["world"]}

Previous Chapter

{chapter["story"]}

Player's Choice

{selected_choice["text"]}

Writing Rules

- Continue from the previous chapter.
- Write in simple English.
- Use short sentences.
- Keep paragraphs short (2-4 lines).
- Focus on actions and dialogue.
- Keep the story exciting.
- Write about 180 words.
- If an action scene is happening, you may write up to 250 words.
- End with exactly 4 new choices.

Story Structure

1. Start with a small action or interesting event.
2. Describe what the player sees.
3. Add one challenge, mystery, or danger.
4. End with suspense.
5. Give exactly four meaningful choices.

Choice Rules

- Every choice should feel unique.
- One choice should be safe.
- One choice should be risky.
- One choice should explore something new.
- One choice should interact with a person or object.

Health Rules

- Safe choices usually do not reduce health.
- Dangerous situations reduce health by 5-30.
- Serious battles may reduce health by 20-40.
- Resting, healing, medicine, or friendly help may recover 5-20 health.
- Never make health above 100.
- Never make health below 0.

Game Over Rules

- If health becomes 0:
    - End the story immediately.
    - Do NOT generate choices.
    - Set:
      "game_over": true

- Otherwise:
    - Generate four choices.
    - Set:
      "game_over": false

Response Rules

- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT use ```json.
- Do NOT write any explanation.

Return exactly this JSON:

{json.dumps(schema, indent=2)}
"""