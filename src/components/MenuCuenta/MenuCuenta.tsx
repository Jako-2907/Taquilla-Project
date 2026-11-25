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
  const iniciales = usuario.nombre.trim().split(/\s+/).slice(0, 2)
    .map((parte) => Array.from(parte)[0] ?? "").join("").toLocaleUpperCase();

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
        <span className="menu-cuenta__avatar" aria-hidden="true">{iniciales}</span>
      </summary>
      <div className="menu-cuenta__contenido">
        <div className="menu-cuenta__perfil">
          <span className="menu-cuenta__avatar" aria-hidden="true">{iniciales}</span>
          <div>
            <strong>{usuario.nombre}</strong>
            <small>{usuario.correo}</small>
          </div>
        </div>
        <button type="button" disabled={cerrando} onClick={salir}>
          <span className="menu-cuenta__salir"><IconoEvento tipo="flecha" /></span>
          {t.cerrarSesion}
        </button>
        {error && <p role="alert">{textos.errores.generico}</p>}
      </div>
    </details>
  );
}
