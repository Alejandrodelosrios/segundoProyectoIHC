from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config import configuracion

motor = create_engine(configuracion.url_base_datos,pool_pre_ping=True)
sesionLocal = sessionmaker(bind=motor, autoflush=False)

class Base(DeclarativeBase):
    pass

def obtener_sesion():
    sesion =sesionLocal()
    try:
        yield sesion
    finally:
        sesion.close()