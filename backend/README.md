# StoryTale — Backend

FastAPI + MongoDB backend for an AI-generated, choice-based interactive story game.

## Stack

- FastAPI (async)
- MongoDB via Motor
- JWT auth (python-jose)
- LLM generation via OpenRouter (async OpenAI client)

## Setup

```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # then fill in your real values
uvicorn app.main:app --reload
```

The API docs are available at `/docs` once the server is running.

## Project layout

```
app/
  ai/            # prompt building, LLM client, JSON parsing/normalization
  api/           # route handlers (auth, stories, translate)
  core/          # settings, JWT helpers
  db/            # MongoDB connection
  dependencies/  # FastAPI dependencies (current-user auth)
  models/        # Mongo document shape builders
  repositories/  # DB access, one per collection
  schemas/       # Pydantic request/response models
  services/      # business logic, orchestrates repositories + AI
  utils/         # serialization, password hashing
```

## Notes

- All `/stories` and `/translate` endpoints require a Bearer token from `/auth/login`.
- `CORS_ORIGINS` in `.env` is a comma-separated list — add your deployed frontend URL there.
