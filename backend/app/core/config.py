from dotenv import load_dotenv
import os

load_dotenv()

REQUIRED_VARS = (
    "MONGO_URL",
    "DATABASE_NAME",
    "JWT_SECRET",
    "JWT_ALGORITHM",
    "OPENROUTER_API_KEY",
)


class Settings:
    MONGO_URL = os.getenv("MONGO_URL")

    DATABASE_NAME = os.getenv("DATABASE_NAME")

    JWT_SECRET = os.getenv("JWT_SECRET")

    JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")

    ACCESS_TOKEN_EXPIRE_MINUTES = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60)
    )

    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

    OPENROUTER_MODEL = os.getenv(
        "OPENROUTER_MODEL",
        "deepseek/deepseek-chat-v3.1:free"
    )

    # Comma-separated list in the env, e.g.
    # CORS_ORIGINS=http://localhost:5173,https://your-frontend.com
    CORS_ORIGINS = [
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
        if origin.strip()
    ]

    def validate(self):
        missing = [name for name in REQUIRED_VARS if not getattr(self, name)]
        if missing:
            raise RuntimeError(
                f"Missing required environment variable(s): {', '.join(missing)}. "
                "Check your .env file against .env.example."
            )


settings = Settings()
settings.validate()