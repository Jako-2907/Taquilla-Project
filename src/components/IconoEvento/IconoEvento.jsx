import "./IconoEvento.css";

const iconos = {
  buscar: "search",
  lugar: "pin",
  fecha: "calendar",
  conciertos: "music",
  teatro: "star",
  deportes: "trophy",
  festivales: "flag",
  comedia: "smile",
  familiares: "users",
  menu: "menu",
  cerrar: "x",
  persona: "person",
  flecha: "arrowr",
  flechaAtras: "arrowl",
};

export default function IconoEvento({ tipo, className = "" }) {
  const nombre = iconos[tipo] || "calendar";
  return (
    <span
      className={`icono-evento ${className}`}
      style={{ "--icono-evento": `url('/assets/recursos-taquilla/iconos/${nombre}.svg')` }}
      aria-hidden="true"
    />
  );
}
