import json


def parse_story(text: str):

    text = text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "")

    if text.endswith("```"):
        text = text[:-3]

    return json.loads(text)