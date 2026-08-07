from typing import Any, Dict, List, Optional

from pydantic import BaseModel, ConfigDict


class Choice(BaseModel):
    id: int
    text: str


class ChapterData(BaseModel):
    # extra="allow" so if a chapter document carries extra Mongo fields
    # (e.g. _id, story_id, created_at) they still pass through untouched
    # instead of being silently stripped by response validation.
    model_config = ConfigDict(extra="allow")

    chapter: int
    title: str
    story: str
    choices: List[Choice]
    player: Dict[str, Any]
    game_over: bool


class GenerateChapterResponse(BaseModel):
    chapter: ChapterData
    player: Dict[str, Any]


class StoryDetailResponse(BaseModel):
    story: Dict[str, Any]
    chapter: Optional[ChapterData] = None
    player: Dict[str, Any]
