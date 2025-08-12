# routes/usuarios.py
from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel
from psycopg2.extras import RealDictCursor
from DB import get_db_connection

router = APIRouter(prefix="/usuarios", tags=["usuarios"])

class UsuarioOut(BaseModel):
    id: int
    nombre: str
    correo: str
    rol: str
    fecha_registro: str  # lo devolvemos como texto ISO

@router.get("/", response_model=List[UsuarioOut])
def listar_usuarios():
    """
    Devuelve una lista de usuarios (sin la contraseña).
    """
    try:
        with get_db_connection() as conn:
            # Usamos RealDictCursor para obtener filas como diccionarios {col: valor}
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # SELECCIONAMOS SOLO CAMPOS NO SENSIBLES (no traer contrasena)
                cur.execute("""
                    SELECT id, nombre, correo, rol, fecha_registro
                    FROM usuarios
                    ORDER BY id;
                """)
                filas = cur.fetchall()
                # filas ya es una lista de diccionarios; FastAPI la convertirá a JSON
                return filas
    except Exception as e:
        # Si algo falla devolvemos un error 500 con el mensaje (útil para depurar)
        raise HTTPException(status_code=500, detail=str(e))
