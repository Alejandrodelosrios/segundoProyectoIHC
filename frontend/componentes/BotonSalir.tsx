"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { salir } from "@/lib/api";

export default function BotonSalir() {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);

  async function cerrarSesion() {
    setCargando(true);
    try {
      await salir();
    } finally {
      router.replace("/ingresar");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={cerrarSesion}
      disabled={cargando}
      className="rounded-lg border border-arena px-4 py-2 font-semibold hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-600 dark:hover:bg-neutral-800"
    >
      {cargando ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  );
}