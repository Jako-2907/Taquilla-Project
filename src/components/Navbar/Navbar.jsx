import { useId, useRef, useState } from "react";
import Marca from "../Marca/Marca.jsx";
import MenuMovil from "../MenuMovil/MenuMovil.jsx";
import SelectorIdioma from "../SelectorIdioma/SelectorIdioma.jsx";
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import Accesibilidad from "../Accesibilidad/Accesibilidad.jsx";
import "./Navbar.css";
export default function Navbar({
  nombre,
  tipo,
  idioma,
  onCambiarIdioma,
  destino,
  onCuenta,
  textos,
}) {
  const [abierto, setAbierto] = useState(false);
  const boton = useRef(null);
  const id = useId();
  const t = textos;
  return (
    <header
      className="cabecera-home"
      onKeyDown={(evento) => {
        if (evento.key === "Escape" && abierto) {
          setAbierto(false);
          boton.current?.focus();
        }
      }}
    >
      <div className="ancho-home fila-cabecera">
        <Marca nombre={t.navbar.logo.texto} tipo={tipo} etiqueta={t.navbar.logo.aria} />
        <button className="ingreso-movil" onClick={() => onCuenta("ingresar")}>
          {t.navbar.botones.ingresar}
        </button>
        <MenuMovil
          abierto={abierto}
          onAlternar={() => setAbierto(!abierto)}
          menuId={id}
          botonRef={boton}
          textos={t.menuMovil}
        />
        <nav
          id={id}
          className={`menu-home ${abierto ? "abierto" : ""}`}
        >
          <a
            href="/"
            aria-current={window.location.pathname === "/" ? "page" : undefined}
            onClick={() => setAbierto(false)}
          >
            {t.navbar.enlaces.inicio}
          </a>
          <a
            href={destino}
            aria-current={window.location.pathname === "/explorar" ? "page" : undefined}
            onClick={() => setAbierto(false)}
          >
            {t.navbar.enlaces.explorar}
          </a>
          <div className="acciones-home">
            {tipo === "taquilla" && (
              <form className="buscador-cabecera" action="/explorar" method="get" role="search">
                <IconoEvento tipo="buscar" />
                <input
                  type="search"
                  name="q"
                  placeholder={t.navbar.buscador.placeholder}
                  aria-label={t.navbar.buscador.aria}
                />
              </form>
            )}
            <Accesibilidad textos={textos} />
            <SelectorIdioma
              idioma={idioma}
              onCambiar={onCambiarIdioma}
              etiqueta={t.navbar.aria.idioma}
              textos={t.idioma}
            />
            <button
              className="ingresar-home"
              onClick={() => onCuenta("ingresar")}
            >
              {t.navbar.botones.ingresar}
            </button>
            <button
              className="boton-home primario"
              onClick={() => onCuenta("registro")}
            >
              {t.navbar.botones.crearCuenta}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
