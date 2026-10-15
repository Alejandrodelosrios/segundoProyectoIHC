## H4 — Consistencia y estándares

- **Estado:** Corregida
- **Pantalla o flujo:** `/registro`, campo nombre completo
- **Explicación:** antes, el formulario de registro exigía 3 letras en el nombre mientras su mensaje decía "mínimo 2 letras" (y el servidor acepta 2). Ahora la regla exige 2 y coincide con el mensaje y con el servidor.
- **Capturas:** `evidencias/h4-antes.png`, `evidencias/h4-despues.png`
- **Código:** `frontend/lib/validaciones.ts` (`validarNombre`)
- **Issue / commit:** #22

## H5 — Prevención de errores

- **Estado:** Corregida (dos hallazgos)
- **Hallazgo 1 — Marcar como realizado sin confirmación:** sub-issue #23
  - Explicación: antes, el botón marcaba el cuidado al instante y lo bloqueaba sin posibilidad de revertirlo. Ahora pide confirmación y avisa que ya no se podrá editar ni reprogramar.
  - Capturas: `evidencias/h5-antes.png`, `evidencias/h5-despues.png`
  - Código: `PanelMascota.tsx` (`realizar`)
- **Hallazgo 2 — Eliminar sin identificar el cuidado:** sub-issue #24 (pendiente)