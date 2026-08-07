from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.ai.llm_client import generate_story
from app.dependencies.auth import get_current_user

router = APIRouter(
    prefix="/translate",
    tags=["Translate"],
)


class TranslateRequest(BaseModel):
    text: str
    language: str


@router.post("")
async def translate(
    request: TranslateRequest,
    current_user=Depends(get_current_user),
):

    prompt = f"""
Translate the following story into {request.language}.

Rules:

- Keep the exact meaning.
- Preserve paragraphs.
- Preserve dialogue.
- Do NOT summarize.
- Return ONLY the translated text.

Story:

{request.text}
"""

    translated = await generate_story(prompt)

    return {
        "translated_text": translated.strip()
    }