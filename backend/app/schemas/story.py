from pydantic import BaseModel, Field

class ContinueStoryRequest(BaseModel):
    choice_id: int

class StoryCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    genre: str
    world: str
    character_name: str
    character_class: str
    difficulty: str


class StoryResponse(BaseModel):
    message: str
    story_id: str