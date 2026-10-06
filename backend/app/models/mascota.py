from datetime import date
from sqlalchemy import String,Date,ForeignKey
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.base_datos import Base

PENDIENTE = "pendiente"
REALIZADO = "realizado" 

class Mascota(Base):
    __tablename__ = "mascotas"
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(120))
    sexo: Mapped[str] = mapped_column(String(7))
    especie: Mapped[str] = mapped_column(String(50))
    cuidado: Mapped[str] = mapped_column(String(100))
    fecha_cuidado: Mapped[date] = mapped_column(Date)
    estado: Mapped[str] = mapped_column(String(20),default=PENDIENTE)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"))

    # relacion
    usuario = relationship("Usuario", back_populates="mascotas")