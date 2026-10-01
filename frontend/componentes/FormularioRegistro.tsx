"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { registrar, ErrorApi } from "@/lib/api";
import {
  validarConfirmacion,
  validarContrasena,
  validarCorreo,
  validarNombre,
} from "@/lib/validaciones";
import Boton from "./Boton";
import CampoTexto from "./CampoTexto";
import MensajeError from "./MensajeError";

type Errores = {
  nombre?: string;
  correo?: string;
  contrasena?: string;
  confirmacion?: string;
};

export default function FormularioRegistro() {
  const router = useRouter();
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmacion, setConfirmacion] = useState("");
  const [errores, setErrores] = useState<Errores>({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [cargando, setCargando] = useState(false);

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErrorGeneral("");

    const nuevosErrores: Errores = {
      nombre: validarNombre(nombreCompleto),
      correo: validarCorreo(correo),
      contrasena: validarContrasena(contrasena),
      confirmacion: validarConfirmacion(contrasena, confirmacion),
    };
    setErrores(nuevosErrores);
    if (Object.values(nuevosErrores).some(Boolean)) return;

    setCargando(true);
    try {
      await registrar(nombreCompleto.trim(), correo.trim(), contrasena);
      router.push("/ingresar?creada=1");
    } catch (error) {
      setErrorGeneral(error instanceof ErrorApi ? error.message : "Ocurrió un error inesperado");
      setCargando(false);
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="flex w-full flex-col gap-4">
      <MensajeError mensaje={errorGeneral} />
      <CampoTexto
        id="nombre"
        etiqueta="Nombre completo"
        valor={nombreCompleto}
        alCambiar={setNombreCompleto}
        error={errores.nombre}
        autoComplete="name"
      />
      <CampoTexto
        id="correo"
        etiqueta="Correo"
        tipo="email"
        valor={correo}
        alCambiar={setCorreo}
        error={errores.correo}
        autoComplete="email"
      />
      <CampoTexto
        id="contrasena"
        etiqueta="Contraseña"
        tipo="password"
        valor={contrasena}
        alCambiar={setContrasena}
        error={errores.contrasena}
        ayuda="Mínimo 8 caracteres"
        autoComplete="new-password"
      />
      <CampoTexto
        id="confirmacion"
        etiqueta="Confirmar contraseña"
        tipo="password"
        valor={confirmacion}
        alCambiar={setConfirmacion}
        error={errores.confirmacion}
        autoComplete="new-password"
      />
      <Boton texto="Crear cuenta" textoCargando="Creando cuenta..." cargando={cargando} />
      <p className="text-center text-sm">
        ¿Ya tienes cuenta?{" "}
        <Link href="/ingresar" className="font-semibold text-menta-oscuro underline">
          Ingresar
        </Link>
      </p>
    </form>
  );
}