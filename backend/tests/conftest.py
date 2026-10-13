import os

os.environ["URL_BASE_DATOS"] ="sqlite://"
os.environ["SECRETO_JWT"] = "secreto-de-prueba"
os.environ["MINUTOS_SESION"] = "60"
os.environ["MINUTOS_CODIGO_RECUPERACION"] = "15"

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import models
from datetime import date, timedelta
from app.repositories import mascota_repositorio as repo
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

@pytest.fixture
def otro_usuario(session):
    otro = Usuario(nombre_completo="Juan Prueba", correo="juan@correo.com", contrasena_hash="x")
    session.add(otro)
    session.commit()
    session.refresh(otro)
    return otro

@pytest.fixture
def crear_mascota(session, usuario):
    def _crear(nombre="Luna", sexo="Hembra", especie="perro",
               cuidado="vacuna", fecha=None):
        fecha = fecha or date.today() + timedelta(days=3)
        return repo.crear(session, nombre, sexo, especie, cuidado, fecha, usuario.id)
    return _crear   
