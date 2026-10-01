from fastapi import Depends, Request
from sqlalchemy.orm import Session

from app.base_datos import obtener_sesion
from app.config import configuracion
from app.models.usuario import Usuario
from app.services import auth_servicio

def obtener_usuario_actual(peticion:Request,sesion:Session = Depends(obtener_sesion))->Usuario:
    token = peticion.cookies.get(configuracion.nombre_cookie)
    return auth_servicio.usuario_desde_token(sesion,token)