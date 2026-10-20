
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.historial import Historial


def crear(session: Session,tipo_accion: str,descripcion: str,usuario_id: int,mascota_id: int) -> Historial:
    historial = Historial(
        tipo_accion=tipo_accion,
        descripcion=descripcion,
        usuario_id=usuario_id,
        mascota_id=mascota_id,
    )

    session.add(historial)
    session.commit()
    session.refresh(historial)

    return historial


def buscar_por_usuario(session: Session,usuario_id: int) -> list[Historial]:
    consulta = (
        select(Historial)
        .where(Historial.usuario_id == usuario_id)
        .order_by(Historial.fecha_registro.desc(),Historial.id.desc())
    )

    return session.scalars(consulta).all()
