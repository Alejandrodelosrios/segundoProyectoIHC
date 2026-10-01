import FormularioRegistro from "@/componentes/FormularioRegistro";

export default function PaginaRegistro(){
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
       <h1 className="text-3xl font-bold">Crear cuenta</h1>
       <FormularioRegistro />
      </main>  
    );
}
