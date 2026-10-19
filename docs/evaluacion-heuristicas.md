## H4 — Consistencia

- **Estado:** Corregida
- **Pantalla o flujo:** `/registro`, campo nombre completo
- **Explicación:** antes, el formulario de registro exigía 3 letras en el nombre mientras su mensaje decía "mínimo 2 letras" (y el servidor acepta 2). Ahora la regla exige 2 y coincide con el mensaje y con el servidor.
- **Capturas:** `evidencias/h4-antes.png`, `evidencias/h4-despues.png`
- **Código:** `frontend/lib/validaciones.ts` (`validarNombre`)
- **Issue / commit:** #22

## H5 — Prevención

- **Estado:** Corregida (dos hallazgos)
- **Hallazgo 1 — Marcar como realizado sin confirmación:** sub-issue #23
  - Explicación: antes, el botón marcaba el cuidado al instante y lo bloqueaba sin posibilidad de revertirlo. Ahora pide confirmación y avisa que ya no se podrá editar ni reprogramar.
  - Capturas: `evidencias/h5-antes.png`, `evidencias/h5-despues.png`
  - Código: `PanelMascota.tsx` (`realizar`)
- **Hallazgo 2 — Eliminar sin identificar el cuidado:** 
- Explicación: antes, el cuadro decía "¿Eliminar a [Nombre]?" sin indicar qué cuidado ni que era definitivo. Ahora muestra el cuidado, la mascota y la fecha, y avisa que no se puede deshacer.
  - Capturas: `evidencias/h5-antes_eliminar.png`, `evidencias/h5-despues_eliminar.png`
  - Código: `PanelMascota.tsx` (`borrar`), `TarjetaMascota.tsx` (`formatearFecha` exportada)

sub-issue #24 (pendiente)

## H8 — minimalismo

- **Estado:** Corregida
- **Pantalla o flujo:** `/inicio`, tarjeta de un cuidado realizado
- **Explicación:** antes, la tarjeta de un cuidado realizado mostraba tres botones deshabilitados (Reprogramar, Editar, Marcar como realizado) más un texto que explicaba lo mismo, mezclados con la única acción posible (Eliminar). Ahora solo se muestran las acciones disponibles y el texto explicativo.
- **Capturas:** `evidencias/h8-antes.png`, `evidencias/h8-despues.png`
- **Código:** `frontend/componentes/TarjetaMascota.tsx`
- **Issue / commit:** #25

## H1 — Visibilidad

- **Estado:** Corregida
- **Pantalla o flujo:** `/inicio`, lista de  cuidados
- **Explicación:** antes, un cuidado pendiente con fecha pasada se veía igual que uno con fecha futura (ambos decían "Pendiente"). Ahora el vencido muestra "Atrasado: reprograma o márcalo como realizado" en texto rojo y con borde rojo.
- **Capturas:** `evidencias/h1-antes.png`, `evidencias/h1-despues.png`
- **Código:** `frontend/componentes/TarjetaMascota.tsx (variable atrasado)`
- **Issue / commit:** #20

## H2 — Mundo real

- **Estado:** Corregida
- **Pantalla o flujo:** `/inicio`, formulario de Reprogramar y chips del filtro por fechas
- **Explicación:** antes, esos textos mostraban la fecha como "2026-10-14" mientras la tarjeta la mostraba como "14 de octubre de 2026". Ahora todos usan el mismo formato legible.
- **Capturas:** `evidencias/h2-antes.png`, `evidencias/h2-despues.png`
- **Código:** `frontend/componentes/PanelMascota.tsx, frontend/lib/filtros.ts (textoFecha), frontend/componentes/TarjetaMascota.tsx (formatearFecha)`
- **Issue / commit:** #21

## H3 — Control y libertad del usuario
 
- **Estado:** Corregida
- **Pantalla o flujo:** `/recuperar`, segundo paso
- **Explicación:** antes, el segundo paso (código y contraseña nueva) no ofrecía forma de volver, cambiar el correo ni ir a ingresar, y no mostraba qué correo se había escrito. Ahora muestra el correo, permite cambiarlo y tiene el enlace "Volver a ingresar".
- **Capturas:** ![h3 antes](evidencias/h3-antes.png) ![h3 después](evidencias/h3-despues.png)
- **Código:** `frontend/componentes/FormularioRecuperar.tsx`
- **Issue / commit:** #27
- **Comprobación:** en el paso 2 se ve el correo; "Cambiar correo" vuelve al paso 1 con el correo escrito; "Volver a ingresar" lleva a `/ingresar`; el flujo normal sigue funcionando.
- **Lo que ya funcionaba:** los formularios de agregar, editar y reprogramar tienen "Cancelar", que cierra sin guardar.