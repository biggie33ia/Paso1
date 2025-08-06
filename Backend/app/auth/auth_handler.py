from jose import JWTError, JWT
from datetime import datetime, timedelta

# Clave secreta (puedes poner una larga o generarla)
SECRET_KEY = "mipasswordsecreta123"
ALGORITHM = "HS256"
EXPIRE_MINUTES = 60  # El token durará 60 minutos

# Generar el token
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_JWT = JWT.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_JWT

# Verificar el token
def verify_token(token: str):
    try:
        payload = JWT.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
