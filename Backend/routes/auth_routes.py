from fastapi import APIRouter
from Backend.app.database import insert_user, get_users

router = APIRouter()

# Ruta para registrar un usuario
@router.post("/register")
async def register_user(name: str, email: str):
    await insert_user(name, email)
    return {"message": "Usuario registrado exitosamente"}

# Ruta para listar todos los usuarios
@router.get("/users")
async def list_users():
    users = await get_users()
    return users

# Ruta de prueba para saber si la API está viva
@router.get("/health")
async def health_check():
    return {"status": "ok"}

# Ruta de prueba para postman
@router.get("/db-test")
async def db_test():
    users = await get_users()
    return {"total_users": len(users), "users": users}

@router.post("/db-test")
async def db_test_insert(name: str, email: str):
    await insert_user(name, email)
    return {"message": f"Usuario {name} agregado correctamente"}
