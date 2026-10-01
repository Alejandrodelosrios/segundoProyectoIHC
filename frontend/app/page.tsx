import Boton from "@/componentes/Boton";

const beneficios = [
  {
    titulo: "Vacunas y controles",
    texto: "Registra cada vacuna y visita al veterinario en un solo lugar.",
  },
  {
    titulo: "Cuidados del día a día",
    texto: "Anota baños, desparasitaciones y todo lo que tu mascota necesita.",
  },
  {
    titulo: "Próximas fechas",
    texto: "Mira qué cuidados se acercan para que nada se te pase.",
  },
];

export default function PaginaInicio() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 p-6 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold sm:text-5xl">Mascota al Día</h1>
        <p className="text-xl text-tinta">
          Que nunca se te olvide una vacuna.
        </p>
        <p className="mx-auto max-w-md text-tinta">
          Organiza los cuidados, controles y fechas importantes de tu mascota
          desde el celular o la computadora.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Boton texto="Crear cuenta" href="/registro" />
        <Boton texto="Ingresar" href="/ingresar" variante="secundario" />
      </div>

      <section className="grid w-full gap-4 sm:grid-cols-3">
        {beneficios.map((beneficio) => (
          <article
            key={beneficio.titulo}
            className="rounded-xl border border-arena bg-menta-claro/40 p-4 text-left"
          >
            <h2 className="mb-1 font-semibold">{beneficio.titulo}</h2>
            <p className="text-sm text-tinta">
              {beneficio.texto}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}