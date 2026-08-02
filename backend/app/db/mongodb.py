from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client: AsyncIOMotorClient | None = None
db = None


async def connect_to_mongo():
    global client, db

    client = AsyncIOMotorClient(settings.MONGO_URL)

    await client.admin.command("ping")

    db = client[settings.DATABASE_NAME]

    print("MongoDB Connected Successfully!")


async def close_mongo_connection():
    global client

    if client:
        client.close()
        print("MongoDB Connection Closed!")


def get_database():
    return db