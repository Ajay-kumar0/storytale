from datetime import datetime


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
        "inventory": chapter_data["inventory"],
        "quest": chapter_data["quest"],
        "created_at": datetime.utcnow()
    }