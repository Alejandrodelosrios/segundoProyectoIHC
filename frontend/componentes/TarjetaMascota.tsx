import type { Mascota } from "@/lib/api";

type Props = {
  mascota: Mascota;
  alEditar: (mascota: Mascota) => void;
  alEliminar: (mascota: Mascota) => void;
  alRealizar: (mascota:Mascota) => void;
};

function formatearFecha(fecha: string): string {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  return new Date(anio, mes - 1, dia).toLocaleDateString("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function TarjetaMascota({ mascota, alEditar, alEliminar, alRealizar }: Props) {
    const realizado = mascota.estado === "realizado";
  return (
    <article className="flex flex-col gap-2 rounded-xl border border-arena bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold">{mascota.nombre}</h3>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                realizado ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
            >
            {realizado ? "Realizado" : "Pendiente"}
            </span>
        </div>
      <p className="text-sm text-grisazulado">
        {mascota.especie} · {mascota.sexo}
      </p>
      <p>
      <span className="font-semibold">{mascota.cuidado}</span> el{" "}
      {formatearFecha(mascota.fechaCuidado)}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button type="button" onClick={()=> alEditar(mascota)} className="rounded-lg border border-arena px-4 py-2 font-semibold text-tinta hover:bg-menta-claro">Editar</button>
        <button type="button" onClick={()=> alEliminar(mascota)} className="rounded-lg border border-red-300 px-4 py-2 font-semibold text-red-700 hover:bg-red-50">Eliminar</button>
        {!realizado && (
  <button
    type="button"
    onClick={() => alRealizar(mascota)}
    className="rounded-lg bg-menta-oscuro px-4 py-2 font-semibold text-white hover:bg-menta-profundo"
  >
    Marcar como realizado
  </button>
)}
      </div>
    </article>
  );
}