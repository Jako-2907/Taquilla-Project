import "./MenuMovil.css";
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
export default function MenuMovil({
  abierto,
  onAlternar,
  menuId,
  botonRef,
  textos,
}) {
  return (
    <button
      type="button"
      ref={botonRef}
      className="boton-menu"
      aria-label={abierto ? textos.cerrar : textos.abrir}
      aria-expanded={abierto}
      aria-controls={menuId}
      onClick={onAlternar}
    >
      <IconoEvento tipo={abierto ? "cerrar" : "menu"} />
    </button>
  );
}
