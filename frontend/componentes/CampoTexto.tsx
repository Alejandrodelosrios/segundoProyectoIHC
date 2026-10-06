"use client";

import { useState } from "react";

type Props = {
  id: string;
  etiqueta: string;
  valor: string;
  alCambiar: (valor: string) => void;
  tipo?: "text" | "email" | "password"|"date";
  error?: string;
  ayuda?: string;
  autoComplete?: string;
};

export default function CampoTexto({
  id,
  etiqueta,
  valor,
  alCambiar,
  tipo = "text",
  error,
  ayuda,
  autoComplete,
}: Props) {
  const [visible, setVisible] = useState(false);
  const esContrasena = tipo === "password";
  const tipoReal = esContrasena && visible ? "text" : tipo;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-medium">
        {etiqueta}
      </label>
      <div className="relative">
        <input
          id={id}
          type={tipoReal}
          value={valor}
          onChange={(evento) => alCambiar(evento.target.value)}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-lg border bg-white p-3 text-neutral-900 ${
            error ? "border-red-500" : "border-arena"
          } ${esContrasena ? "pr-20" : ""}`}
        />
        {esContrasena && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-sm font-medium text-menta-oscuro"
          >
            {visible ? "Ocultar" : "Mostrar"}
          </button>
        )}
      </div>
      {ayuda && !error && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{ayuda}</p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}