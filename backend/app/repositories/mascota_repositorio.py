from datetime import date
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.mascota import Mascota

def buscar_por_id(session:Session, mascota_id:int) -> Mascota|None:
    return session.get(Mascota,mascota_id)

def buscar_por_usuario(session:Session, usuario_id:int)-> list[Mascota]:
    return session.scalars(select(Mascota).where(Mascota.usuario_id==usuario_id)).all()

def crear(session:Session, nombre:str,sexo:str,especie:str,cuidado:str,fecha_cuidado:date,usuario_id:int)->Mascota:
    mascota = Mascota(
        nombre = nombre,
        sexo = sexo,
        especie = especie,
        cuidado = cuidado,
        fecha_cuidado = fecha_cuidado,
        usuario_id = usuario_id,
    )
    session.add(mascota)
    session.commit()
    session.refresh(mascota)
    return mascota

def actualizar(session:Session,mascota:Mascota,nombre:str,sexo:str,especie:str,cuidado:str,fecha_cuidado:date)->Mascota:
    mascota.nombre = nombre
    mascota.sexo = sexo
    mascota.especie = especie
    mascota.cuidado = cuidado
    mascota.fecha_cuidado = fecha_cuidado
    session.commit()
    session.refresh(mascota)
    return mascota

def eliminar(session:Session,mascota:Mascota)->None:
    session.delete(mascota)
    session.commit()

def cambiar_estado(session:Session,mascota:Mascota,estado:str)->Mascota:
    mascota.estado = estado
    session.commit()
    session.refresh(mascota)
    return mascota