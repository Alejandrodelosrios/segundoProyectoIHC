import os

os.environ["URL_BASE_DATOS"] ="sqlite://"
os.environ["SECRETO_JWT"] = "secreto-de-prueba"
os.environ["MINUTOS_SESION"] = "60"
os.environ["MINUTOS_CODIGO_RECUPERACION"] = "15"

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import models
from app.base_datos import Base
from app.models.usuario import Usuario


@pytest.fixture
def session():
    motor = create_engine(os.environ["URL_BASE_DATOS"])
    Base.metadata.create_all(motor)
    sesion = sessionmaker(bind=motor)()
    yield sesion
    sesion.close()

@pytest.fixture
def usuario(session):
    nuevo_usuario = Usuario(nombre_completo="Ana Prueba", correo="ana@correo.com", contrasena_hash="x")
    session.add(nuevo_usuario)
    session.commit()
    session.refresh(nuevo_usuario)
    return nuevo_usuario

   
