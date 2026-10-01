type Props = { mensaje?: string };

export default function MensajeError({ mensaje }: Props) {
  if (!mensaje) return null;
  return (
    <p
      role="alert"
      className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700"
    >
      {mensaje}
    </p>
  );
}