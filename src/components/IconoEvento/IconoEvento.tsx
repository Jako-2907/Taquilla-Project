import "./IconoEvento.css";

const iconos = {
  buscar: "search",
  lugar: "pin",
  fecha: "calendar",
  hora: "clock",
  compartir: "share",
  chevron: "chevr",
  chevronAtras: "chevl",
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

export default function IconoEvento({ tipo, className = "" }: { tipo: string; className?: string }) {
  const nombre = iconos[tipo as keyof typeof iconos] || "calendar";
  return (
    <span
      className={`icono-evento ${className}`}
      style={{ "--icono-evento": `url('/assets/recursos-taquilla/iconos/${nombre}.svg')` } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}
