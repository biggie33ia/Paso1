from DB import create_table, insert_user, create_connection

if __name__ == "__main__":
    # 1. Crear la tabla
    create_table()

    # 2. Insertar un usuario
    insert_user("Juan Pérez", "juan@example.com")

    # 3. Crear conexión y usarla
    conn = create_connection()
    if conn:
        print("Conexión creada con éxito.")
        conn.close()
