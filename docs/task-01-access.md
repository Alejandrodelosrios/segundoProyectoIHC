# Tarea 1: Manejo de acceso

**Proyecto:** Mascota al Día

## Modalidad
Sin IA Todo el trabajo vive en un único repositorio y se registra con commits pequeños.

## Tecnologías

| Capa          | Tecnología                    | Uso                                     |
| ------------- | ----------------------------- | --------------------------------------- |
| Frontend      | Next.js 16, React, TypeScript | Interfaz y navegación                   |
| Estilos       | Tailwind CSS                  | Diseño visual                           |
| Backend       | FastAPI, Python 3.13          | API y lógica del sistema                |
| ORM           | SQLAlchemy                    | Acceso a PostgreSQL                     |
| Base de datos | PostgreSQL                    | Persistencia de usuarios y recuperación |
| Hosting BD    | Neon                          | Base de datos PostgreSQL alojada        |
| Seguridad     | bcrypt + JWT                  | Hash de contraseñas y sesión            |
| Diseño        | Figma                         | Diseño de las interfaces                |

## Arquitectura

**Backend, en 3 capas:**

- `routers/` (presentación): reciben la petición HTTP y devuelven la respuesta.
- `services/` (lógica): reglas como "el correo no se repite" o "verificar contraseña".
- `repositories/` (datos): hablan con la base de datos mediante SQLAlchemy.

**Frontend, por responsabilidad:**

- `app/` (pantallas): páginas y rutas.
- `componentes/`: formularios y piezas reutilizables.
- `lib/` (acceso a datos): llamadas al backend y validaciones.
- `proxy.ts`: primera puerta de las rutas privadas.

## Decisiones

1. **Separación entre frontend, backend y base de datos.**
Next.js se utiliza para la interfaz, FastAPI para la API y Neon para alojar PostgreSQL. Esta separación permite mantener responsabilidades independientes entre las diferentes partes del sistema.
2. **Arquitectura de 3 capas en el backend.** 
Separamos routers, servicios y repositorios para evitar concentrar las peticiones HTTP, la lógica de negocio y las consultas a la base de datos en los mismos archivos.
3. **Contraseñas con bcrypt. **
La contraseña no se almacena directamente, sino mediante un hash.
4. **Sesión mediante JWT en cookie httpOnly.**
El token se almacena en una cookie que no puede ser leída directamente por JavaScript del navegador.
5. **Doble protección de la ruta privada.**
proxy.ts comprueba inicialmente la sesión y /inicio verifica nuevamente con GET /auth/yo.
6. **Recuperación mediante código de 6 dígitos.**
Como la tarea no requiere envío de correo real, el código se muestra en pantalla y tiene una duración limitada.
7. **Validación en frontend y backend.**
El frontend proporciona retroalimentación inmediata al usuario, mientras que el backend vuelve a validar los datos antes de procesarlos.
8. **Mensajes de autenticación que no revelan información.**
El inicio de sesión utiliza un mensaje general para evitar indicar si un correo está registrado.

## Flujo completo

1. La persona abre `/` sin sesión y elige crear cuenta.
2. `/registro` envía los datos a `POST /auth/registro`. El backend guarda el usuario con la contraseña hasheada.
3. `/ingresar` envía el correo y la contraseña a `POST /auth/ingresar`. Si son correctos, el backend responde con la cookie `sesion`.
4. `/inicio` se carga en el servidor de Next, que reenvía la cookie a `GET /auth/yo` para obtener el nombre y mostrar "Hola, [nombre]".
5. Al recargar la página, la cookie sigue ahí y la sesión se conserva.
6. "Cerrar sesión" llama a `POST /auth/salir`, que borra la cookie, y redirige a `/ingresar`.

## Rutas

**Frontend**

| Ruta | Tipo |
|---|---|
| `/` | Pública |
| `/registro` | Pública |
| `/ingresar` | Pública |
| `/recuperar` | Pública |
| `/inicio` | Privada |

**Backend**

| Método y ruta | Función |
|---|---|
| `GET /` y `GET /salud` | Verificar que el servidor responde |
| `POST /auth/registro` | Crear cuenta |
| `POST /auth/ingresar` | Iniciar sesión y guardar la cookie |
| `GET /auth/yo` | Devolver el usuario de la sesión actual |
| `POST /auth/salir` | Cerrar sesión |
| `POST /auth/recuperar` | Generar código de recuperación |
| `POST /auth/cambiar-contrasena` | Cambiar contraseña con el código |

## Archivos principales

**Backend (`backend/app/`)**

- `main.py`: crea la aplicación, registra los routers y el manejo de errores.
- `config.py`: lee las variables del `.env`.
- `base_datos.py`: conexión a Neon y sesión de SQLAlchemy.
- `seguridad.py`: bcrypt, creación y lectura del JWT, generación del código.
- `models/usuario.py`: tabla `usuarios`.
- `schemas/usuario.py`: formatos y validaciones de entrada y salida.
- `repositories/usuario_repositorio.py`: consultas a la base de datos.
- `services/auth_servicio.py`: reglas de registro, ingreso y recuperación.
- `routers/auth.py`: rutas `/auth/*`.
- `dependencias.py`: obtiene el usuario actual desde la cookie.

**Frontend (`frontend/`)**

- `proxy.ts`: redirige a `/ingresar` si no hay cookie al entrar a `/inicio`.
- `next.config.ts`: proxy `/api/*` hacia el backend.
- `app/page.tsx`: landing page.
- `app/registro`, `app/ingresar`, `app/recuperar`: páginas de los formularios.
- `app/inicio/page.tsx`: ruta privada con el saludo.
- `componentes/`: formularios, campos, botones y mensajes.
- `lib/api.ts`: llamadas al backend desde el navegador.
- `lib/apiServidor.ts`: llamada al backend desde el servidor de Next.
- `lib/validaciones.ts`: reglas de los campos.