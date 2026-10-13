from datetime import date,timedelta
import pytest
from app.errores import ErrorDeNegocio
from app.repositories import mascota_repositorio as repo
from app.services import mascota_servicio as servicio
from app.models.usuario import Usuario

MENSAJE_REALIZADO = "Este cuidado ya fue realizado, por eso no se puede reprogramar"    
MENSAJE_FECHA_FALSA = "La nueva fecha no puede ser anterior a hoy"

def test_reprogramar_cuidado_exitoso(session, usuario,crear_mascota):
    mascota = crear_mascota()
    nueva_fecha = date.today()+ timedelta(days=5)
    resultado = servicio.reprogramar_cuidado(session,mascota.id,usuario.id,nueva_fecha)
    assert resultado.fecha_cuidado == nueva_fecha

def test_reprogramar_cuidado_realizado_no_cambia_la_fecha(session, usuario, crear_mascota):
    mascota = crear_mascota()
    fecha_original = mascota.fecha_cuidado
    servicio.marcar_realizado(session, mascota.id, usuario.id)
    with pytest.raises(ErrorDeNegocio):
        servicio.reprogramar_cuidado(
            session, mascota.id, usuario.id, date.today() + timedelta(days=4)
        )
    session.expire_all()
    assert repo.buscar_por_id(session, mascota.id).fecha_cuidado == fecha_original

def test_fecha_pasada_no_cambia_la_fecha_guardada(session, usuario, crear_mascota):
    mascota = crear_mascota()
    fecha_original = mascota.fecha_cuidado
    with pytest.raises(ErrorDeNegocio):
        servicio.reprogramar_cuidado(
            session, mascota.id, usuario.id, date.today() - timedelta(days=1)
        )
    session.expire_all()
    assert repo.buscar_por_id(session, mascota.id).fecha_cuidado == fecha_original    

def test_otro_usuario_no_cambia_la_fecha_original(session, usuario, otro_usuario, crear_mascota):
    mascota = crear_mascota()
    fecha_original = mascota.fecha_cuidado
    with pytest.raises(ErrorDeNegocio):
        servicio.reprogramar_cuidado(
            session, mascota.id, otro_usuario.id, date.today() + timedelta(days=10)
        )
    session.expire_all()
    assert repo.buscar_por_id(session, mascota.id).fecha_cuidado == fecha_original

def test_nueva_fecha_se_mantiene_al_recargar(session, usuario, crear_mascota):
    mascota = crear_mascota()
    mascota_id = mascota.id
    nueva_fecha = date.today() + timedelta(days=9)
    servicio.reprogramar_cuidado(session, mascota_id, usuario.id, nueva_fecha)
 
    session.expire_all()
    recargada = repo.buscar_por_id(session, mascota_id)
    assert recargada.fecha_cuidado == nueva_fecha