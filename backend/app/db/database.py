from app.db.mongodb import get_database


def get_user_collection():
    db = get_database()
    return db["users"]