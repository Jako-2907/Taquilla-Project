import "./MenuMovil.css";
import IconoEvento from "../IconoEvento/IconoEvento";
import type { Textos } from "../../types/textos";

export default function MenuMovil({
  abierto,
  onAlternar,
  menuId,
  botonRef,
  textos,
}: { abierto: boolean; onAlternar: () => void; menuId: string; botonRef: React.Ref<HTMLButtonElement>; textos: Textos["menuMovil"] }) {
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
