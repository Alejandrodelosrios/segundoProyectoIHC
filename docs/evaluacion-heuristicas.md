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