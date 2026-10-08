from datetime import date

import pytest
from app.errores import ErrorDeNegocio
from app.repositories import mascota_repositorio as repo
from app.services import mascota_servicio as servicio
from app.schemas.mascota import MascotaActualizada
from app.models.usuario import Usuario

def crear_de_prueba(session, usuario):
    return repo.crear(session,"Luna","Hembra","perro","vacuna",date(2026,10,15),usuario.id)

def test_estado_inicial_es_pendiente(session: repo.Session,usuario: Usuario):
    mascota = crear_de_prueba(session,usuario)
    assert mascota.estado == "pendiente"

def test_marcar_realizado_cambia_el_estado(session: repo.Session,usuario: Usuario):
    mascota = crear_de_prueba(session,usuario)
    mascota_realizado = servicio.marcar_realizado(session,mascota.id,usuario.id)
    assert mascota_realizado.estado == "realizado"

def test_marcar_dos_veces_se_rechaza(session: repo.Session,usuario: Usuario):
    mascota = crear_de_prueba(session,usuario)
    servicio.marcar_realizado(session,mascota.id,usuario.id)
    with pytest.raises(ErrorDeNegocio)as error:
        servicio.marcar_realizado(session,mascota.id,usuario.id)
    assert error.value.estado == 400

def test_demas_datos_se_conservan(session: repo.Session,usuario: Usuario):
    mascota = crear_de_prueba(session,usuario)
    antes = (mascota.nombre,mascota.sexo,mascota.especie,
            mascota.cuidado,mascota.fecha_cuidado,mascota.usuario_id)
    despues = servicio.marcar_realizado(session,mascota.id,usuario.id)
    assert (despues.nombre,despues.sexo,despues.especie,
            despues.cuidado,despues.fecha_cuidado,despues.usuario_id) == antes

def test_editar_no_cambia_el_estado(session: repo.Session,usuario: Usuario):
    mascota = crear_de_prueba(session,usuario)
    servicio.marcar_realizado(session,mascota.id,usuario.id)
    datos =MascotaActualizada(
        nombre="Perla",
        sexo="Hembra",
        especie="perro",
        cuidado="vacuna",
        fecha_cuidado=date(2026,10,22),
        )
    mascota_editada= servicio.actualizar_mascota(session,mascota.id,datos,usuario.id)
    assert mascota_editada.nombre == "Perla"
    assert mascota_editada.estado == "realizado"   