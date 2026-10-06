# Tarea 2: Nueva funcionalidad de estados y pruebas unitarias

## Nueva funcionalidad: marcar un cuidado como realizado

cada mascota tiene un cuidado programado y se pone en estado pendiente
por ejemplo:
 un dueño registra su mascota con su cuidado(una vacuna con su fecha) Se agregó un **estado** a ese cuidado para saber si ya se hizo o sigue pendiente.

 ### Estados y transición

| Estado | Significado |
|--------|-------------|
| `pendiente` | El cuidado aún no se ha hecho. Es el estado inicial de toda mascota nueva. |
| `realizado` | El cuidado ya se hizo. |

- **Acción:** "Marcar como realizado".
- **Transición válida:** `pendiente` → `realizado`.
- **Transición inválida:** marcar como realizado un cuidado que ya está `realizado`. El sistema la rechaza con un error de negocio y el mensaje "La mascota ya esta marcada como realizado".

El estado solo cambia con esta acción. Los formularios de crear y editar no envían el estado, así que editar una mascota no lo modifica.

### Cómo funciona

**Backend**

- `models/mascota.py`: nueva columna `estado`, con valor por defecto `pendiente`.
- `schemas/mascota.py`: `MascotaSalida` ahora incluye `estado`.
- `repositories/mascota_repositorio.py`: función `cambiar_estado`, que guarda el nuevo estado.
- `services/mascota_servicio.py`: función `marcar_realizado`, donde está la regla. Primero verifica que la mascota exista y sea del usuario, luego que siga `pendiente`, y recién entonces cambia el estado.
- `routers/mascota.py`: nueva ruta `PATCH /mascotas/{id}/realizar`.

**Frontend**

- `lib/api.ts`: función `marcarRealizado` que llama a la ruta anterior.
- `TarjetaMascota.tsx`: muestra una etiqueta "Pendiente" o "Realizado", y el botón "Marcar como realizado" solo aparece mientras el cuidado está pendiente.
- `PanelMascotas.tsx`: al pulsar el botón llama a la API y vuelve a cargar la lista.

### Persistencia

El estado se guarda en la base de datos (PostgreSQL en Neon), no en el navegador. Por eso, al recargar la página, el cambio se conserva.

## 2. Pruebas unitarias

Las pruebas están en `backend/tests/` y comprueban la regla de cambio de estado en la capa de servicios.

- `tests/test_estado_mascota.py`: las 4 pruebas.
- `tests/conftest.py`: prepara el entorno de pruebas. Usa una base de datos SQLite en memoria y variables de entorno falsas, así que las pruebas **nunca tocan la base de datos real**. Cada prueba arranca con una base vacía.
- `pytest.ini`: configuración de pytest.

### Qué hace cada prueba

| # | Prueba | Qué verifica |
|---|--------|--------------|
| 1 | `test_estado_inicial_es_pendiente` | Una mascota recién creada tiene el estado `pendiente`. |
| 2 | `test_marcar_realizado_cambia_el_estado` | Al ejecutar la acción, el estado pasa de `pendiente` a `realizado`. |
| 3 | `test_marcar_dos_veces_se_rechaza` | Marcar como realizado una mascota que ya lo está lanza `ErrorDeNegocio` (estado 400). |
| 4 | `test_demas_datos_se_conservan` | Después de la acción, el nombre, sexo, especie, cuidado, fecha y dueño siguen iguales. Solo cambia el estado. |

### Resultado de la ejecución
tests/test_estado_mascota.py::test_estado_inicial_es_pendiente PASSED                       [ 25%]
tests/test_estado_mascota.py::test_marcar_realizado_cambia_el_estado PASSED                 [ 50%]
tests/test_estado_mascota.py::test_marcar_dos_veces_se_rechaza PASSED                       [ 75%]
tests/test_estado_mascota.py::test_demas_datos_se_conservan PASSED                          [100%]

======================================= 4 passed in 3.08s ========================================

## 3. Cómo ejecutar las pruebas

Desde la raíz del proyecto:

1. Entrar a la carpeta `backend`.
2. Activar el entorno virtual `.venv`.
3. Instalar las dependencias (incluye `pytest`):

```bash
pip install -r requirements.txt
```

4. Ejecutar las pruebas:

```bash
pytest -v
```

No hace falta el archivo `.env` ni conexión a internet: las pruebas usan su propia base de datos en memoria.