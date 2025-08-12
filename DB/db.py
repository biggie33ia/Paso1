import os
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv

# Cargar variables del .env
load_dotenv()

def create_connection():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        dbname=os.getenv("DB_NAME"),
        port=os.getenv("DB_PORT")
    )
    print(f"✅ Conectado a la base de datos {os.getenv('DB_NAME')} en {os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}")
    return conn

def create_table():
    conn = create_connection()
    cursor = conn.cursor()
    create_table_query = sql.SQL("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL
        )
    """)
    cursor.execute(create_table_query)
    conn.commit()
    cursor.close()
    conn.close()
    print("✅ Tabla 'users' creada o ya existente.")

def insert_user(name, email):
    conn = create_connection()
    cursor = conn.cursor()
    insert_query = sql.SQL("""
        INSERT INTO users (name, email)
        VALUES (%s, %s)
    """)
    cursor.execute(insert_query, (name, email))
    conn.commit()
    cursor.close()
    conn.close()
    print(f"✅ Usuario {name} insertado correctamente.")
def get_db_connection():
    """Obtiene una conexión a la base de datos para usar en el contexto de FastAPI."""
    return create_connection()