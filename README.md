# MASCOTA AL DÍA

Organiza las vacunas, controles y cuidados de tus mascotas en un solo lugar.

## TECNOLOGÍAS

* **Next.js** — Frontend
* **FastAPI** — Backend
* **Neon (PostgreSQL)** — Base de datos

## VERSIONES UTILIZADAS DURANTE EL DESARROLLO:

* **Node.js:** v22.14.0
* **Python:** v3.13.3

## INSTALACIÓN Y COMANDOS

### Backend

Desde la raíz del proyecto:

1. Entrar a la carpeta `backend`.
2. Crear y activar el entorno virtual `.venv`.
3. Instalar las dependencias:

```bash
pip install -r requirements.txt
```

4. Copiar el archivo `.env-example` como `.env` y configurar las variables de entorno.
5. Iniciar el servidor:

```bash
fastapi dev app/main.py
```

El backend estará disponible en:

`http://127.0.0.1:8000`

### Frontend

En otra terminal:

1. Entrar a la carpeta `frontend`.
2. Instalar las dependencias:

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

El frontend estará disponible en:

`http://localhost:3000`

## VARIABLES DE ENTORNO DEL BACKEND

El backend utiliza las siguientes variables de entorno:

* `URL_BASE_DATOS`
* `SECRETO_JWT`
* `MINUTOS_SESION`

Estas variables deben configurarse en el archivo `.env`, tomando como referencia el archivo `.env-example`.

## VARIABLES DE ENTORNO DEL FRONTEND

El frontend utiliza la siguiente variable de entorno:

* `URL_BASE`

Esta variable debe configurarse en el archivo `.env`, tomando como referencia el archivo `.env-example`.