"use client";

import { useEffect, useState } from "react";

import { ErrorApi, eliminarMascota, listarMascotas,marcarRealizado, type Mascota } from "@/lib/api";
import Boton from "./Boton";
import FormularioMascota from "./FormularioMascota";
import MensajeError from "./MensajeError";
import TarjetaMascota from "./TarjetaMascota";

export default function PanelMascotas() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [mascotaEditar, setMascotaEditar] = useState<Mascota | null>(null);

  async function cargar() {
    try {
      setMascotas(await listarMascotas());
    } catch (e) {
      setError(e instanceof ErrorApi ? e.message : "Ocurrió un error inesperado");
    } finally {
      setCargando(false);
    }
  }

  // Se ejecuta una sola vez, al aparecer la pantalla
  useEffect(() => {
    cargar();
  }, []);

  function abrirNueva() {
    setMascotaEditar(null); // null = no editamos ninguna, es nueva
    setFormularioAbierto(true);
  }

  function abrirEdicion(mascota: Mascota) {
    setMascotaEditar(mascota);
    setFormularioAbierto(true);
  }

  async function borrar(mascota: Mascota) {
    if (!confirm(`¿Eliminar a ${mascota.nombre}?`)) return;
    setError("");
    try {
      await eliminarMascota(mascota.id);
      await cargar();
    } catch (e) {
      setError(e instanceof ErrorApi ? e.message : "Ocurrió un error inesperado");
    }
  }

  async function realizar(mascota: Mascota) {
  setError("");
  try {
    await marcarRealizado(mascota.id);
    await cargar();
  } catch (e) {
    setError(e instanceof ErrorApi ? e.message : "Ocurrió un error inesperado");
  }
}

  function alGuardar() {
    setFormularioAbierto(false);
    cargar();
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Mis mascotas</h2>
        <Boton texto="Agregar mascota" alClic={abrirNueva} />
      </div>

      <MensajeError mensaje={error} />

      {formularioAbierto && (
        <FormularioMascota
          key={mascotaEditar?.id ?? "nueva"}
          mascotaEditar={mascotaEditar}
          alGuardar={alGuardar}
          alCancelar={() => setFormularioAbierto(false)}
        />
      )}

      {cargando ? (
        <p>Cargando...</p>
      ) : mascotas.length === 0 ? (
        <p>Aún no tienes mascotas. ¡Agrega la primera!</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {mascotas.map((mascota) => (
            <TarjetaMascota
              key={mascota.id}
              mascota={mascota}
              alEditar={abrirEdicion}
              alEliminar={borrar}
              alRealizar={realizar}
            />
          ))}
        </div>
      )}
    </section>
  );
}