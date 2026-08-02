from openai import OpenAI

from app.core.config import settings

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY,
)


def generate_story(prompt: str):

    completion = client.chat.completions.create(
        model=settings.OPENROUTER_MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.8,
    )

    return completion.choices[0].message.content