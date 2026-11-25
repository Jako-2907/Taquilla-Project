import "./Marca.css";
import Link from "next/link";

export default function Marca({ nombre, tipo, etiqueta, inverso = false }: { nombre: string; tipo: string; etiqueta: string; inverso?: boolean }) {
  return (
    <Link className="marca-home" href="/" aria-label={etiqueta}>
      <img
        className="marca-home__logo"
        src={`/assets/recursos-taquilla/logos/logo-${inverso ? "inverso" : "normal"}.svg`}
        alt=""
        aria-hidden="true"
      />
    </Link>
  );
}
