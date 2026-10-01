import Image from "next/image";

export default function PaginaInicio() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-4xl font-bold">Hola, Mascota al Dia</h1>
      <p className="max-w-md text-lg text-gray-600">
        Organiza las vacunas, controles y cuidados de tu mascotas en un solo lugar.
      </p>
    </main>
  );
}
