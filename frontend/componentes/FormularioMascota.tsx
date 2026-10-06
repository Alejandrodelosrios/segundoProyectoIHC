"use client";

import { useState, type FormEvent } from "react";

import { actualizarMascota, crearMascota, ErrorApi, type Mascota } from "@/lib/api";
import {
  validarCuidado,
  validarEspecie,
  validarFecha,
  validarNombreMascota,
} from "@/lib/validaciones";
import Boton from "./Boton";
import CampoTexto from "./CampoTexto";
import MensajeError from "./MensajeError";

type Props = {
  mascotaEditar: Mascota | null;
  alGuardar: () => void;
  alCancelar: () => void;
};

type Errores = {
  nombre?: string;
  especie?: string;
  cuidado?: string;
  fecha?: string;
};

export default function FormularioMascota({ mascotaEditar, alGuardar, alCancelar }: Props) {
  // Si estamos editando, cada campo arranca con los datos de la mascota.
  // Si es nueva, arranca vacío ("??" significa "si no hay valor, usa este").
  const [nombre, setNombre] = useState(mascotaEditar?.nombre ?? "");
  const [sexo, setSexo] = useState(mascotaEditar?.sexo ?? "Macho");
  const [especie, setEspecie] = useState(mascotaEditar?.especie ?? "");
  const [cuidado, setCuidado] = useState(mascotaEditar?.cuidado ?? "");
  const [fecha, setFecha] = useState(mascotaEditar?.fechaCuidado ?? "");
  const [errores, setErrores] = useState<Errores>({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [cargando, setCargando] = useState(false);

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErrorGeneral("");

    const nuevosErrores: Errores = {
      nombre: validarNombreMascota(nombre),
      especie: validarEspecie(especie),
      cuidado: validarCuidado(cuidado),
      fecha: validarFecha(fecha),
    };
    setErrores(nuevosErrores);
    if (Object.values(nuevosErrores).some(Boolean)) return;

    const datos = {
      nombre: nombre.trim(),
      sexo,
      especie: especie.trim(),
      cuidado: cuidado.trim(),
      fechaCuidado: fecha,
    };

    setCargando(true);
    try {
      if (mascotaEditar) {
        await actualizarMascota(mascotaEditar.id, datos);
      } else {
        await crearMascota(datos);
      }
      alGuardar(); // le avisa al Panel que ya terminó
    } catch (error) {
      setErrorGeneral(error instanceof ErrorApi ? error.message : "Ocurrió un error inesperado");
      setCargando(false);
    }
  }

  return (
    <form
      onSubmit={enviar}
      noValidate
      className="flex flex-col gap-4 rounded-xl border border-arena bg-white p-4 text-neutral-900"
    >
      <h3 className="text-xl font-bold">
        {mascotaEditar ? "Editar mascota" : "Nueva mascota"}
      </h3>
      <MensajeError mensaje={errorGeneral} />

      <CampoTexto id="nombre" etiqueta="Nombre" valor={nombre} alCambiar={setNombre} error={errores.nombre} />

      <div className="flex flex-col gap-1">
        <label htmlFor="sexo" className="font-medium">Sexo</label>
        <select
          id="sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          className="w-full rounded-lg border border-arena bg-white p-3 text-neutral-900"
        >
          <option value="Macho">Macho</option>
          <option value="Hembra">Hembra</option>
        </select>
      </div>

      <CampoTexto id="especie" etiqueta="Especie" valor={especie} alCambiar={setEspecie} error={errores.especie} ayuda="Por ejemplo: perro, gato" />
      <CampoTexto id="cuidado" etiqueta="Cuidado" valor={cuidado} alCambiar={setCuidado} error={errores.cuidado} ayuda="Por ejemplo: vacuna" />
      <CampoTexto id="fecha" etiqueta="Fecha del cuidado" tipo="date" valor={fecha} alCambiar={setFecha} error={errores.fecha} />

      <div className="flex gap-2">
        <Boton
          texto={mascotaEditar ? "Guardar cambios" : "Crear mascota"}
          textoCargando="Guardando..."
          cargando={cargando}
        />
        <button
          type="button"
          onClick={alCancelar}
          className="rounded-lg border border-arena px-6 py-3 font-semibold text-tinta hover:bg-menta-claro"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}