from fastapi import APIRouter
from Backend.app.database import insert_user, get_users

router = APIRouter()

@router.post("/register")
async def register_user(name: str, email: str):
    await insert_user(name, email)
    return {"message": "Usuario registrado exitosamente"}

@router.get("/users")
async def list_users():
    return await get_users()
