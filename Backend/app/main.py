from fastapi import FastAPI
from Backend.routes.auth_routes import router as auth_router
from dotenv import load_dotenv
import os
import psycopg2

load_dotenv()
app = FastAPI()

# CORRECCIÓN 1: include_router (no include_routes)
app.include_router(auth_router)

def create_connection():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),  # CORRECCIÓN 2: database (no dbname)
        port=os.getenv("DB_PORT")
    )
    return conn

@app.get("/")
def root():
    return {"message": "API funcionando"}