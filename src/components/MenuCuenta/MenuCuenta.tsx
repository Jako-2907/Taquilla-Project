import { useRef, useState } from "react";
import { useSesion } from "../../context/SesionContext";
import { usePreferencias } from "../../context/PreferenciasContext";
import IconoEvento from "../IconoEvento/IconoEvento";
import "./MenuCuenta.css";

export default function MenuCuenta() {
  const { usuario, cerrarSesion } = useSesion();
  const { textos } = usePreferencias();
  const [cerrando, setCerrando] = useState(false);
  const [error, setError] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);
  const control = useRef<HTMLElement>(null);
  if (!usuario || !textos) return null;
  const t = textos.navbar.usuario;

  async function salir() {
    setCerrando(true);
    setError(false);
    setError(!(await cerrarSesion()));
    setCerrando(false);
  }

  return (
    <details ref={menu} className="menu-cuenta" onKeyDown={(event) => {
      if (event.key !== "Escape" || !menu.current?.open) return;
      event.stopPropagation();
      menu.current.open = false;
      control.current?.focus();
    }}>
      <summary ref={control} aria-label={t.menu.replace("{nombre}", usuario.nombre)}>
        <IconoEvento tipo="usuario" /> <span>{usuario.nombre}</span>
      </summary>
      <div className="menu-cuenta__contenido">
        <button type="button" disabled={cerrando} onClick={salir}>{t.cerrarSesion}</button>
        {error && <p role="alert">{textos.errores.generico}</p>}
      </div>
    </details>
  );
}
