from pydantic_settings import BaseSettings,SettingsConfigDict

class Configuracion(BaseSettings):
    url_base_datos: str
    secreto_jwt: str
    minutos_sesion: int
    minutos_codigo_recuperacion: int
    nombre_cookie: str = "sesion"

    model_config = SettingsConfigDict(env_file=".env",extra="ignore")

configuracion = Configuracion()