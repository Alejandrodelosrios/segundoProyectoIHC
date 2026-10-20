from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.base_datos import obtener_sesion
from app.dependencias import obtener_usuario_actual
from app.models.usuario import Usuario
from app.schemas.historial import HistorialResponse
from app.services import historial_servicio

router = APIRouter(prefix="/historial", tags=["Historial"])


@router.get("", response_model=list[HistorialResponse])
def listar(
    sesion: Session = Depends(obtener_sesion),
    usuario: Usuario = Depends(obtener_usuario_actual),
):
    return historial_servicio.listar_por_usuario(sesion, usuario.id)
