"use client";

import Boton from "./Boton";
import MensajeError from "./MensajeError";
import {
  filtrosActivos,
  FILTROS_VACIOS,
  quitarFiltro,
  type FiltrosPantalla,
  type Periodo,
} from "@/lib/filtros";

type Props = {
  filtros: FiltrosPantalla;
  alCambiar: (filtros: FiltrosPantalla) => void;
  errorRango?: string;
  mostrarFiltros: boolean;
  alAlternarFiltros: () => void;
};

const claseCampo = "min-h-11 rounded-lg border border-arena bg-white px-3 py-2 text-neutral-900";

const OPCIONES_ESTADO: { valor: FiltrosPantalla["estado"]; texto: string }[] = [
  { valor: "", texto: "Todos" },
  { valor: "pendiente", texto: "Pendientes" },
  { valor: "realizado", texto: "Realizados" },
];

export default function FiltrosMascotas({ filtros, alCambiar, errorRango, mostrarFiltros, alAlternarFiltros }: Props) {
  const activos = filtrosActivos(filtros);

  const filtrosAvanzados = activos.filter((filtro)=> filtro.clave === "tipoCuidado" || filtro.clave === "fecha");

  function cambiar<K extends keyof FiltrosPantalla>(campo: K, valor: FiltrosPantalla[K]) {
    alCambiar({ ...filtros, [campo]: valor });
  }

  return (
    <section
      aria-label="Buscar y filtrar cuidados"
      className="flex flex-col gap-3 text-neutral-900"
    >
     <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <label
          htmlFor="filtro-nombre"
          className="text-sm font-semibold"
          >
          Buscar mascota
          </label>

        <input
          id="filtro-nombre"
          type="search"
          value={filtros.nombre}
          onChange={(e) => cambiar("nombre", e.target.value)}
          placeholder="Buscar por nombre de mascota..."
          className={claseCampo}
        />
      </div>

      <button
        type="button"
        aria-expanded={mostrarFiltros}
        aria-controls="panel-filtros-mascotas"
        onClick={alAlternarFiltros}
        className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-arena bg-white px-4 py-2 font-semibold text-tinta hover:bg-menta-claro"
      >
        Filtros
        {filtrosAvanzados.length > 0 && (
          <span>({filtrosAvanzados.length})</span>
        )}
        <span aria-hidden="true">
          {mostrarFiltros ? "▲" : "▼"}
        </span>
      </button>
    </div>

    <div className="flex flex-col gap-1">
      <span id="etiqueta-estado" className="text-sm font-semibold">
        Estado
      </span>

      <div
        role="group"
        aria-labelledby="etiqueta-estado"
        className="flex flex-wrap gap-2"
      >
        {OPCIONES_ESTADO.map((opcion) => {
          const seleccionada = filtros.estado === opcion.valor;

          return (
            <button
               key={opcion.valor || "todos"}
                type="button"
                aria-pressed={seleccionada}
                onClick={() => cambiar("estado", opcion.valor)}
                className={`min-h-11 rounded-lg border px-4 py-2 font-semibold ${
                seleccionada
                  ? "border-menta-oscuro bg-menta-oscuro text-white"
                  : "border-arena bg-white text-tinta hover:bg-menta-claro"
              }`}
             >
              {opcion.texto}
            </button>
            );
           })}
          </div>
        </div>
      </div>
      {mostrarFiltros && (
        <div
          id="panel-filtros-mascotas"
          className="grid gap-4 rounded-xl border border-arena bg-white p-4 sm:grid-cols-2"
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="filtro-cuidado"
              className="text-sm font-semibold"
            >
              Tipo de cuidado
            </label>

            <input
              id="filtro-cuidado"
              type="text"
              list="sugerencias-cuidado"
              value={filtros.tipoCuidado}
              onChange={(e) => cambiar("tipoCuidado", e.target.value)}
              placeholder="Vacuna, medicamento, control..."
              className={claseCampo}
            />

            <datalist id="sugerencias-cuidado">
              <option value="vacuna" />
              <option value="medicamento" />
              <option value="control" />
            </datalist>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="filtro-fecha"
              className="text-sm font-semibold"
            >
              Fecha del cuidado
            </label>

            <select
              id="filtro-fecha"
              value={filtros.periodo}
              onChange={(e) =>
                cambiar("periodo", e.target.value as Periodo)
              }
              className={claseCampo}
            >
              <option value="todos">Todas</option>
              <option value="proximos7">Próximos 7 días</option>
              <option value="mes">Este mes</option>
              <option value="rango">Rango de fechas</option>
            </select>
          </div>

          {filtros.periodo === "rango" && (
            <>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="filtro-desde"
                  className="text-sm font-semibold"
                >
                  Desde
                </label>

                <input
                  id="filtro-desde"
                  type="date"
                  value={filtros.desde}
                  onChange={(e) => cambiar("desde", e.target.value)}
                  className={claseCampo}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="filtro-hasta"
                  className="text-sm font-semibold"
                >
                  Hasta
                </label>

                <input
                  id="filtro-hasta"
                  type="date"
                  value={filtros.hasta}
                  onChange={(e) => cambiar("hasta", e.target.value)}
                  className={claseCampo}
                />
              </div>
            </>
          )}

          <div className="sm:col-span-2">
            <MensajeError mensaje={errorRango} />
          </div>

          {filtrosAvanzados.length > 0 && (
            <div className="flex flex-col gap-3 sm:col-span-2">
              <span className="text-sm font-semibold">
                Filtros avanzados activos
              </span>

              <ul className="flex flex-wrap gap-2">
                {filtrosAvanzados.map((filtro) => (
                  <li key={filtro.clave}>
                    <button
                      type="button"
                      onClick={() =>
                        alCambiar(quitarFiltro(filtros, filtro.clave))
                      }
                      aria-label={`Quitar filtro ${filtro.texto}`}
                      className="flex min-h-11 items-center gap-2 rounded-full border border-arena bg-menta-claro px-4 py-2 text-sm font-medium text-tinta hover:bg-menta"
                    >
                      {filtro.texto}
                      <span aria-hidden="true">✕</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div>
                <Boton
                  variante="secundario"
                  texto="Limpiar filtros avanzados"
                  alClic={() => {
                    alCambiar({
                      ...filtros,
                      tipoCuidado: FILTROS_VACIOS.tipoCuidado,
                      periodo: FILTROS_VACIOS.periodo,
                      desde: FILTROS_VACIOS.desde,
                      hasta: FILTROS_VACIOS.hasta,
                    });
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}