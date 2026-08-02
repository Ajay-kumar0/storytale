from fastapi import APIRouter, Depends, HTTPException
from app.dependencies.auth import get_current_user

from app.schemas.user import (
    UserCreate,
    UserLogin,
    RegisterResponse,
    TokenResponse,
)
from app.services.user_service import UserService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.get("/")
def auth_home():
    return {
        "message": "Authentication API Working"
    }


@router.post(
    "/register",
    response_model=RegisterResponse,
    status_code=201
)
async def register(user: UserCreate):

    result = await UserService.register_user(
        username=user.username,
        email=user.email,
        password=user.password
    )

    if result is None:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    return {
        "message": "User registered successfully"
    }


@router.post(
    "/login",
    response_model=TokenResponse
)
async def login(user: UserLogin):

    token = await UserService.login_user(
        email=user.email,
        password=user.password
    )

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/me")
async def get_me(current_user=Depends(get_current_user)):
    return {
        "username": current_user["username"],
        "email": current_user["email"],
    }