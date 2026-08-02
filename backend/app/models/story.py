from datetime import datetime


def create_story_document(
    user_id: str,
    title: str,
    genre: str,
    world: str,
    character_name: str,
    character_class: str,
    difficulty: str,
):
    return {
        "user_id": user_id,
        "title": title,
        "genre": genre,
        "world": world,
        "character_name": character_name,
        "character_class": character_class,
        "difficulty": difficulty,
        "current_chapter": 1,
        "status": "active",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }