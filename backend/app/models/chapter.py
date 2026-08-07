from datetime import datetime, timezone


def create_chapter_document(
    story_id: str,
    chapter_data: dict
):
    return {
        "story_id": story_id,
        "chapter": chapter_data["chapter"],
        "title": chapter_data["title"],
        "story": chapter_data["story"],
        "choices": chapter_data["choices"],
        "player": chapter_data["player"],
        "game_over": chapter_data.get("game_over", False),
        "created_at": datetime.now(timezone.utc)
    }