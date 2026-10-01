import FormularioIngreso from "@/componentes/FormularioIngreso";

type Props = {
  searchParams: Promise<{ creada?: string }>;
};

export default async function PaginaIngreso({ searchParams }: Props) {
  const { creada } = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Ingresar</h1>
      <FormularioIngreso cuentaCreada={creada === "1"} />
    </main>
  );
}