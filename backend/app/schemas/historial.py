
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class HistorialBase(BaseModel):
    tipo_accion: str
    descripcion: str
    mascota_id: int


class HistorialCreate(HistorialBase):
    pass


class HistorialResponse(HistorialBase):
    id: int
    usuario_id: int
    fecha_registro: datetime

    model_config = ConfigDict(from_attributes=True)
