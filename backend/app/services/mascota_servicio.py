from sqlalchemy.orm import Session
from app.errores import ErrorDeNegocio
from app.models.mascota import Mascota
from app.schemas.mascota import MascotaEntrada,MascotaActualizada
from app.repositories import mascota_repositorio as repo
from app.repositories import usuario_repositorio as repo_usuario

def obtener_propia(session:Session, mascota_id:int, usuario_id:int) -> Mascota:
    return _obtener_propia(session,mascota_id,usuario_id)

def _obtener_propia(session:Session, mascota_id:int, usuario_id:int) -> Mascota:
    mascota = repo.buscar_por_id(session, mascota_id)
    if mascota is None or mascota.usuario_id != usuario_id:
        raise ErrorDeNegocio("Error no se encontro la mascota",404)
    return mascota

def crear_mascota(session:Session, datos: MascotaEntrada, usuario_id: int):
    usuario = repo_usuario.buscar_por_id(session,usuario_id)
    if usuario is None:
        raise ErrorDeNegocio("Error no se encontro el usuario",404)
    mascota = repo.crear(session,datos.nombre,datos.sexo,datos.especie,datos.cuidado,datos.fecha_cuidado,usuario_id)
    return mascota

def listar_mascotas(session:Session, usuario_id: int):
    usuario = repo_usuario.buscar_por_id(session,usuario_id)
    if usuario is None:
        raise ErrorDeNegocio("Error no se encontro el usuario",404)
    return repo.buscar_por_usuario(session,usuario_id)

def actualizar_mascota(session:Session, mascota_id:int, datos: MascotaActualizada, usuario_id: int):
    mascota = _obtener_propia(session,mascota_id,usuario_id)
    mascota = repo.actualizar(session,mascota,datos.nombre,datos.sexo,datos.especie,datos.cuidado,datos.fecha_cuidado)
    return mascota

def eliminar_mascota(session:Session, mascota_id:int, usuario_id: int):
    mascota = _obtener_propia(session,mascota_id,usuario_id)
    repo.eliminar(session,mascota)

def marcar_realizado(session:Session,mascota_id:int, usuario_id:int):
    mascota =_obtener_propia(session,mascota_id,usuario_id)
    if mascota.estado == "realizado":
        raise ErrorDeNegocio("La mascota ya esta marcada como realizado",400)
    mascota = repo.cambiar_estado(session,mascota,"realizado")
    return mascota