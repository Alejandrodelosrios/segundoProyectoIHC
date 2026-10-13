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
};

const claseCampo = "rounded-lg border border-arena bg-white px-3 py-2 text-neutral-900";

export default function FiltrosMascotas({ filtros, alCambiar, errorRango }: Props) {
  const activos = filtrosActivos(filtros);

  function cambiar<K extends keyof FiltrosPantalla>(campo: K, valor: FiltrosPantalla[K]) {
    alCambiar({ ...filtros, [campo]: valor });
  }

  return (
    <section
      aria-label="Buscar y filtrar cuidados"
      className="flex flex-col gap-3 rounded-xl border border-arena bg-white p-4 text-neutral-900"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="filtro-nombre" className="text-sm font-semibold">
            Buscar mascota
          </label>
          <input
            id="filtro-nombre"
            type="search"
            value={filtros.nombre}
            onChange={(e) => cambiar("nombre", e.target.value)}
            placeholder="Nombre de la mascota"
            className={claseCampo}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="filtro-estado" className="text-sm font-semibold">
            Estado
          </label>
          <select
            id="filtro-estado"
            value={filtros.estado}
            onChange={(e) => cambiar("estado", e.target.value as FiltrosPantalla["estado"])}
            className={claseCampo}
          >
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="realizado">Realizado</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="filtro-cuidado" className="text-sm font-semibold">
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
          <label htmlFor="filtro-fecha" className="text-sm font-semibold">
            Fecha del cuidado
          </label>
          <select
            id="filtro-fecha"
            value={filtros.periodo}
            onChange={(e) => cambiar("periodo", e.target.value as Periodo)}
            className={claseCampo}
          >
            <option value="todos">Todas</option>
            <option value="proximos7">Próximos 7 días</option>
            <option value="mes">Este mes</option>
            <option value="rango">Rango de fechas</option>
          </select>
        </div>
      </div>

      {filtros.periodo === "rango" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="filtro-desde" className="text-sm font-semibold">
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
            <label htmlFor="filtro-hasta" className="text-sm font-semibold">
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
        </div>
      )}

      <MensajeError mensaje={errorRango} />

      {activos.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold">Filtros activos:</span>
          <ul className="flex flex-wrap gap-2">
            {activos.map((filtro) => (
              <li key={filtro.clave}>
                <button
                  type="button"
                  onClick={() => alCambiar(quitarFiltro(filtros, filtro.clave))}
                  aria-label={`Quitar filtro ${filtro.texto}`}
                  className="flex items-center gap-2 rounded-full border border-arena bg-menta-claro px-3 py-1 text-sm font-medium text-tinta hover:bg-menta"
                >
                  {filtro.texto}
                  <span aria-hidden="true">✕</span>
                </button>
              </li>
            ))}
          </ul>
          <Boton variante="secundario" texto="Limpiar filtros" alClic={() => alCambiar(FILTROS_VACIOS)} />
        </div>
      )}
    </section>
  );
}