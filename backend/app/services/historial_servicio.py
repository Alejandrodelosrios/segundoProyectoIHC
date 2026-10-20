from app.models.historial import Historial
from app.repositories import historial_repositorio as repositorio


def registrar(
    session,
    tipo_accion: str,
    descripcion: str,
    usuario_id: int,
    mascota_id: int,
) -> Historial:
    return repositorio.crear(session, tipo_accion, descripcion, usuario_id, mascota_id)


def listar_por_usuario(session, usuario_id: int) -> list[Historial]:
    return repositorio.buscar_por_usuario(session, usuario_id)
