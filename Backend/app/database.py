import os
from databases import Database
from dotenv import load_dotenv
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(dotenv_path=os.path.join(BASE_DIR, ".env"))
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
database = Database(DATABASE_URL)

async def connect_to_db():
    await database.connect()

async def disconnect_from_db():
    await database.disconnect()

async def insert_user(name: str, email: str):
    query = "INSERT INTO usuario (nombre, correo) VALUES (:name, :email)"
    await database.execute(query=query, values={"name": name, "email": email})

async def get_users():
    query = "SELECT * FROM usuario"
    return await database.fetch_all(query=query)
