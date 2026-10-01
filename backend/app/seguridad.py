import secrets
from datetime import datetime, timedelta

import bcrypt
import jwt 

from app.config import configuracion
from app.utilidades import ahora_utc

def _a_bytes(texto: str) -> bytes:
    return texto.encode("utf-8")[:72]

def hashear_contrasena(contrasena: str)-> str:
    return bcrypt.hashpw(_a_bytes(contrasena), bcrypt.gensalt()).decode("utf-8")

def verificar_contrasena(contrasena:str, hash_guardado : str)->bool:
    return bcrypt.checkpw(_a_bytes(contrasena),hash_guardado.encode("utf-8"))

def crear_token(usuario_id:int)->str:
    expira = ahora_utc() + timedelta(minutes=configuracion.minutos_sesion)
    datos = {"sub": str(usuario_id), "exp":expira}
    return jwt.encode(datos,configuracion.secreto_jwt,algorithm="HS256")

def leer_token(token :str)->int|None:
    try:
        datos = jwt.decode(token,configuracion.secreto_jwt,algorithms=["HS256"])
        return int(datos["sub"])
    except (jwt.PyJWTError, KeyError,ValueError):
        return None

def generar_codigo()-> str:
    return f"{secrets.randbelow(1_000_000):06d}"
