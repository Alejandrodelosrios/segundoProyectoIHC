import { redirect } from "next/navigation";

import BotonSalir from "@/componentes/BotonSalir";
import Boton from "@/componentes/Boton";
import PanelHistorial from "@/componentes/PanelHistorial";
import { obtenerUsuarioActual } from "@/lib/apiServidor";

export default async function PaginaHistorial() {
  const usuario = await obtenerUsuarioActual();
  if (!usuario) redirect("/ingresar");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-6 p-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-grisazulado">Hola, {usuario.nombreCompleto}</p>
          <h1 className="text-3xl font-bold text-tinta">Historial</h1>
        </div>
        <BotonSalir />
      </header>
      <PanelHistorial />
      <Boton texto="Volver a mis mascotas" href="/inicio" variante="secundario" />
    </main>
  );
}
