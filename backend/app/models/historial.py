from datetime import datetime, timezone
from sqlalchemy import String,DateTime,ForeignKey,Text
from sqlalchemy.orm import Mapped, mapped_column,relationship
from app.base_datos import Base


class Historial(Base):
    __tablename__ = "historial"
    id: Mapped[int] = mapped_column(primary_key=True)
    tipo_accion: Mapped[str] = mapped_column(String(50),nullable=False)
    descripcion: Mapped[str] = mapped_column(Text,nullable=False)
    fecha_registro: Mapped[datetime] = mapped_column(DateTime(timezone=True),default=lambda: datetime.now(timezone.utc),nullable=False,)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"))
    mascota_id: Mapped[int] = mapped_column(ForeignKey("mascotas.id"))

    # relacion
    usuario = relationship("Usuario", back_populates="historial")
    mascota = relationship("Mascota", back_populates="historial")