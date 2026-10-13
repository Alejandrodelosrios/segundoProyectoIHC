"use client";

import { useEffect, useState, type FormEvent } from "react";

import { ErrorApi, eliminarMascota, listarMascotas,marcarRealizado, reprogramarCuidado, type Mascota } from "@/lib/api";
import { fechaHoy, validarNuevaFecha} from "@/lib/validaciones";
import Boton from "./Boton";
import FormularioMascota from "./FormularioMascota";
import MensajeError from "./MensajeError";
import TarjetaMascota from "./TarjetaMascota";
import MensajeExito from "./MensajeExito";

export default function PanelMascotas() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [mascotaEditar, setMascotaEditar] = useState<Mascota | null>(null);
  const [exito, setExito] = useState("");
  const [mascotaReprogramar, setMascotaReprogramar] = useState<Mascota | null>(null);
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [guardandoReprogramacion, setGuardandoReprogramacion] = useState(false);
  const [ errorReprogramacion, setErrorReprogramacion] = useState("")

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


  useEffect(() => {
    if(!exito) return;
    const temporizador = setTimeout(() => setExito(""), 4000);
    return () => clearTimeout(temporizador);
  },[exito]);

  function abrirNueva() {
    setMascotaEditar(null);
    setMascotaReprogramar(null); 
    setFormularioAbierto(true);
  }

  function abrirEdicion(mascota: Mascota) {
    setMascotaEditar(mascota);
    setMascotaReprogramar(null);
    setFormularioAbierto(true);
  }

  function abrirReprogramacion(mascota: Mascota){
    setFormularioAbierto(false);
    setMascotaReprogramar(mascota);
    setNuevaFecha(mascota.fechaCuidado);
    setErrorReprogramacion("");
    setError("");
    setExito("");
  }

  function cerrarReprogramacion(){
    setMascotaReprogramar(null);
    setNuevaFecha("");
    setErrorReprogramacion("");
  }

  async function borrar(mascota: Mascota) {
    if (!confirm(`¿Eliminar a ${mascota.nombre}?`)) return;
    setError("");
    setExito("");
    try {
      await eliminarMascota(mascota.id);
      await cargar();
      setExito(`${mascota.nombre} fue eliminada con éxito`);
    } catch (e) {
      setError(e instanceof ErrorApi ? e.message : "Ocurrió un error inesperado");
    }
  }

  async function realizar(mascota: Mascota) {
  setError("");
  setExito("");
  try {
    await marcarRealizado(mascota.id);
    await cargar();
     setExito(`El cuidado de ${mascota.nombre} se marcó como realizado`);
  } catch (e) {
    setError(e instanceof ErrorApi ? e.message : "Ocurrió un error inesperado");
  }
}

  function alGuardar(mensaje:string) {
    setFormularioAbierto(false);
    setError("");
    setExito(mensaje);
    cargar();
  }

  async function guardarReprogramacion(evento: FormEvent<HTMLFormElement>){
    evento.preventDefault();
    if(!mascotaReprogramar) return;

    const mensajeFecha = validarNuevaFecha(nuevaFecha);
    if(mensajeFecha){
      setErrorReprogramacion(mensajeFecha);
      return;
    }

    setErrorReprogramacion("");
    setGuardandoReprogramacion(true);
    try{
      await reprogramarCuidado(mascotaReprogramar.id,nuevaFecha);
      const nombre = mascotaReprogramar.nombre;
      cerrarReprogramacion();
      await cargar();
      setExito(`El cuidado de ${nombre} se reprogramó con éxito`);
    }catch(e){
      setErrorReprogramacion(e instanceof ErrorApi ? e.message : "Ocurrió un error inesperado"); 
    }finally{
      setGuardandoReprogramacion(false);
    }
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Mis mascotas</h2>
        <Boton texto="Agregar mascota" alClic={abrirNueva} />
      </div>

      <MensajeError mensaje={error} />
      <MensajeExito mensaje={exito} />

      {mascotaReprogramar && (
        <form
          onSubmit={guardarReprogramacion}
          noValidate
          className="flex flex-col gap-3 rounded-xl border border-arena bg-white p-4"
          >
           <h3 className="text-xl font-bold">
             Reprogramar cuidado de {mascotaReprogramar.nombre}
            </h3>  

            <p className="text-sm text-grisazulado">
              Cuidado: {mascotaReprogramar.cuidado}
            </p>

            <p className="text-sm text-grisazulado">
      Fecha actual: {mascotaReprogramar.fechaCuidado}
    </p>

    <MensajeError mensaje={errorReprogramacion} />

    <input
      id="nuevaFecha"
      type="date"
      value={nuevaFecha}
      min={fechaHoy()}
      onChange={(e) => setNuevaFecha(e.target.value)}
      aria-invalid={errorReprogramacion ? true : undefined}
      className="rounded-lg border border-arena px-3 py-2"
    />

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={guardandoReprogramacion}
          className="rounded-lg bg-menta-oscuro px-4 py-2 font-semibold text-white disabled:opacity-50"
        >
          {guardandoReprogramacion ? "Guardando..." : "Guardar fecha"}
        </button>

          <button
            type="button"
            onClick={() => {
              setMascotaReprogramar(null);
              setNuevaFecha("");
              }}
              disabled={guardandoReprogramacion}
              className="rounded-lg border border-arena px-4 py-2 font-semibold"
              >
                Cancelar
              </button>
             </div>
        </form>            
      )}

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
              alReprogramar={abrirReprogramacion}
            />
          ))}
        </div>
      )}
    </section>
  );
}