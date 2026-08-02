from datetime import datetime


def create_user_document(
    username: str,
    email: str,
    hashed_password: str
):
    return {
        "username": username,
        "email": email,
        "password": hashed_password,
        "created_at": datetime.utcnow()
    }