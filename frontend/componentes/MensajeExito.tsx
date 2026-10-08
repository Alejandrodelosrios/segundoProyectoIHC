type Props = { mensaje?: string };

export default function MensajeExito({ mensaje }: Props) {
  if (!mensaje) return null;
  return (
    <p
      role="status"
      className="rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800"
    >
      {mensaje}
    </p>
  );
}