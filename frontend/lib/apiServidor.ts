import { cookies } from "next/headers";

import type { Usuario } from "@/lib/api";
import { nombreCookie, urlBackend } from "@/lib/constantes";

export async function obtenerUsuarioActual(): Promise<Usuario | null> {
  const almacen = await cookies();
  const cookieSesion = almacen.get(nombreCookie);
  if (!cookieSesion) return null;

  const respuesta = await fetch(`${urlBackend}/auth/yo`, {
    headers: { Cookie: `${nombreCookie}=${cookieSesion.value}` },
    cache: "no-store",
  });
  if (!respuesta.ok) return null;

  const datos = await respuesta.json();
  return { id: datos.id, nombreCompleto: datos.nombre_completo, correo: datos.correo };
}