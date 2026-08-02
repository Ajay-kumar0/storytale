from app.core.jwt import create_access_token
from app.models.user import create_user_document
from app.repositories.user_repository import UserRepository
from app.utils.security import hash_password, verify_password


class UserService:

    @staticmethod
    async def register_user(username: str, email: str, password: str):

        existing_user = await UserRepository.get_by_email(email)

        if existing_user:
            return None

        hashed_password = hash_password(password)

        user = create_user_document(
            username=username,
            email=email,
            hashed_password=hashed_password
        )

        result = await UserRepository.create(user)

        return result

    @staticmethod
    async def login_user(email: str, password: str):

        user = await UserRepository.get_by_email(email)

        if user is None:
            return None

        if not verify_password(password, user["password"]):
            return None

        access_token = create_access_token(
            {
                "sub": user["email"]
            }
        )

        return access_token