from typing import Annotated

from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field, StringConstraints

CorreoNormalizado = Annotated[
    EmailStr,
    BeforeValidator(lambda v: v.strip().lower() if isinstance(v, str) else v),
]
NombreCompleto = Annotated[
    str, StringConstraints(strip_whitespace=True, min_length=2, max_length=120)
]
ContrasenaNueva = Annotated[str, Field(min_length=8, max_length=128)]


class RegistroEntrada(BaseModel):
    nombre_completo: NombreCompleto
    correo: CorreoNormalizado
    contrasena: ContrasenaNueva


class IngresoEntrada(BaseModel):
    correo: CorreoNormalizado
    contrasena: str = Field(min_length=1, max_length=128)


class RecuperarEntrada(BaseModel):
    correo: CorreoNormalizado


class CambioContrasenaEntrada(BaseModel):
    correo: CorreoNormalizado
    codigo: str = Field(min_length=6, max_length=6)
    contrasena_nueva: ContrasenaNueva


class UsuarioSalida(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nombre_completo: str
    correo: str


class MensajeSalida(BaseModel):
    mensaje: str


class RecuperarSalida(BaseModel):
    mensaje: str
    codigo: str | None = None