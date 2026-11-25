import "./Marca.css";
export default function Marca({ nombre, tipo, etiqueta, inverso = false }: { nombre: string; tipo: string; etiqueta: string; inverso?: boolean }) {
  return (
    <a className="marca-home" href="/" aria-label={etiqueta}>
      <img
        className="marca-home__logo"
        src={`/assets/recursos-taquilla/logos/logo-${inverso ? "inverso" : "normal"}.svg`}
        alt=""
        aria-hidden="true"
      />
    </a>
  );
}
