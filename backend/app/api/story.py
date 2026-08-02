from fastapi import APIRouter, Depends, HTTPException

from app.dependencies.auth import get_current_user
from app.schemas.story import StoryCreate, StoryResponse
from app.services.story_service import StoryService
from fastapi import HTTPException
from app.schemas.story import ContinueStoryRequest


router = APIRouter(
    prefix="/stories",
    tags=["Stories"]
)


@router.post(
    "",
    response_model=StoryResponse,
    status_code=201
)
async def create_story(
    story: StoryCreate,
    current_user=Depends(get_current_user),
):

    story_id = await StoryService.create_story(
        user_id=str(current_user["_id"]),
        title=story.title,
        genre=story.genre,
        world=story.world,
        character_name=story.character_name,
        character_class=story.character_class,
        difficulty=story.difficulty,
    )

    return {
        "message": "Story created successfully",
        "story_id": story_id,
    }


# ---------- ADD THIS BELOW ----------

@router.post("/{story_id}/generate")
async def generate_story(
    story_id: str,
    current_user=Depends(get_current_user),
):

    chapter = await StoryService.generate_story(story_id)

    if chapter is None:
        raise HTTPException(
            status_code=404,
            detail="Story not found"
        )

    return chapter

@router.get("/")
async def get_all_stories(
    current_user=Depends(get_current_user),
):

    stories = await StoryService.get_user_stories(
        str(current_user["_id"])
    )

    return stories


@router.get("/{story_id}")
async def get_story(
    story_id: str,
    current_user=Depends(get_current_user),
):

    story = await StoryService.get_story(story_id)

    if story is None:
        raise HTTPException(
            status_code=404,
            detail="Story not found"
        )

    return story


@router.post("/{story_id}/continue")
async def continue_story(
    story_id: str,
    request: ContinueStoryRequest,
    current_user=Depends(get_current_user),
):

    chapter = await StoryService.continue_story(
        story_id,
        request.choice_id,
    )

    if chapter is None:
        raise HTTPException(
            status_code=404,
            detail="Story or choice not found",
        )

    return chapter

