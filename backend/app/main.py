from fastapi import FastAPI

app = FastAPI(title="Mascota al Dia")

@app.get("/")
def raiz():
    return {"mensaje":"Bienvenido a Mascota al Dia"}

@app.get("/salud")
def salud():
    return {"estado": "ok"}