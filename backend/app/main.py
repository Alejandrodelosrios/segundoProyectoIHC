from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app import models
from app.base_datos import Base, motor
from app.errores import ErrorDeNegocio
from app.routers import auth

Base.metadata.create_all(bind=motor)

app = FastAPI(title="Mascota al Dia")
app.include_router(auth.router)


@app.exception_handler(ErrorDeNegocio)
async def manejar_error_de_negocio(peticion: Request, error: ErrorDeNegocio):
    return JSONResponse(status_code=error.estado, content={"detail": error.mensaje})


@app.get("/")
def raiz():
    return {"mensaje": "Bienvenido a Mascota al Dia"}


@app.get("/salud")
def salud():
    return {"estado": "ok"}