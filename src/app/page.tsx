import Link from "next/link";

export default function Page() {
  return (
    <>
      <p>Simulación</p>
      <Link href="/paracaidista">Paracaidista</Link>
      <br />
      <Link href="/generador-de-numeros">Generador de números</Link>
    </>
  );
}
