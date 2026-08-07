import json
import re


def parse_story(text: str):

    text = text.strip()

    # Strip ```json ... ``` or plain ``` ... ``` fences, wherever the
    # model puts them, instead of only handling the exact expected case.
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"```\s*$", "", text)
    text = text.strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError as exc:
        raise ValueError(
            "The AI returned a response that wasn't valid JSON."
        ) from exc