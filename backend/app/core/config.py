from dotenv import load_dotenv
import os

load_dotenv()


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

settings = Settings()