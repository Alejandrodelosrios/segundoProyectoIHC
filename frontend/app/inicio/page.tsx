import { redirect } from "next/navigation";

import BotonSalir from "@/componentes/BotonSalir";
import { obtenerUsuarioActual } from "@/lib/apiServidor";

export default async function PaginaPrivada() {
  const usuario = await obtenerUsuarioActual();
  if (!usuario) redirect("/ingresar");

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-3xl font-bold">Hola, {usuario.nombreCompleto}</h1>
      <p className="text-tinta">
        Pronto aquí verás tus mascotas y sus próximos cuidados.
      </p>
      <BotonSalir />
    </main>
  );
}