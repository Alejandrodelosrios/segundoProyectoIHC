import Link from "next/link";

type Props = {
  texto: string;
  textoCargando?: string;
  cargando?: boolean;
  href?: string;
  variante?: "primario" | "secundario";
  alClic?: () => void;
};

const estilos = {
  primario: "bg-menta-oscuro text-white hover:bg-menta-profundo",
  secundario: "border border-arena text-tinta hover:bg-menta-claro",
};

export default function Boton({
  texto,
  textoCargando,
  cargando = false,
  href,
  variante = "primario",
  alClic,
}: Props) {
  const clases = `rounded-lg px-6 py-3 text-center font-semibold disabled:cursor-not-allowed disabled:opacity-60 ${estilos[variante]}`;

  if (href) {
    return (
      <Link href={href} className={clases}>
        {texto}
      </Link>
    );
  }

  return (
    <button type={alClic ? "button":"submit"} onClick={alClic} disabled={cargando} className={clases}>
      {cargando ? (textoCargando ?? texto) : texto}
    </button>
  );
}