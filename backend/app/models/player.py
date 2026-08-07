from datetime import datetime, timezone


def create_player_state(story_id: str):
    return {
        "story_id": story_id,
        "health": 100,
        "max_health": 100,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }