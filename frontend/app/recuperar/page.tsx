import FormularioRecuperar from "@/componentes/FormularioRecuperar";

export default function PaginaRecuperar() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Recuperar contraseña</h1>
      <FormularioRecuperar />
    </main>
  );
}