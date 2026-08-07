from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client: AsyncIOMotorClient | None = None
db = None


async def connect_to_mongo():
    global client, db

    client = AsyncIOMotorClient(settings.MONGO_URL)

    await client.admin.command("ping")

    db = client[settings.DATABASE_NAME]

    await create_indexes()

    print("MongoDB Connected Successfully!")


async def create_indexes():
    # Unique index closes a race condition: without it, two concurrent
    # registration requests with the same email could both pass the
    # app-level "already registered" check and create duplicate users.
    await db["users"].create_index("email", unique=True)

    # These fields are queried on every request but were unindexed,
    # meaning a full collection scan each time.
    await db["stories"].create_index("user_id")
    await db["chapters"].create_index("story_id")
    await db["player_states"].create_index("story_id", unique=True)


async def close_mongo_connection():
    global client

    if client:
        client.close()
        print("MongoDB Connection Closed!")


def get_database():
    return db