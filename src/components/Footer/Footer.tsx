import Marca from "../Marca/Marca";
import "./Footer.css";

import type { NavegacionProps } from "../../types/api";

export default function Footer({ tipo, destino, onCuenta, onExplorar, textos, onAccesibilidad }: NavegacionProps & { onAccesibilidad: () => void }) {
  return (
    <footer className="pie-home">
      <div className="ancho-home">
        <div className="columnas-pie">
          <div>
            <Marca nombre={textos.navbar.logo.texto} tipo={tipo} etiqueta={textos.navbar.logo.aria} inverso />
            <p>{textos.footer.lema}</p>
          </div>
          <div>
            <h3>{textos.footer.columnas.explora.titulo}</h3>
            <a href="/">{textos.footer.columnas.explora.enlaces.inicio}</a>
            <a
              href={destino}
              onClick={(evento) => {
                if (
                  !onExplorar ||
                  evento.button !== 0 ||
                  evento.metaKey ||
                  evento.ctrlKey ||
                  evento.shiftKey ||
                  evento.altKey
                ) return;
                evento.preventDefault();
                onExplorar();
              }}
            >
              {textos.footer.columnas.explora.enlaces.explorar}
            </a>
          </div>
          <div>
            <h3>{textos.footer.columnas.cuenta.titulo}</h3>
            <button onClick={() => onCuenta("ingresar")}>
              {textos.footer.columnas.cuenta.enlaces.ingresar}
            </button>
            <button onClick={() => onCuenta("registro")}>
              {textos.footer.columnas.cuenta.enlaces.crearCuenta}
            </button>
          </div>
          <div>
            <h3>{textos.footer.columnas.legal.titulo}</h3>
            <span className="pie-terminos">{textos.footer.columnas.legal.enlaces.terminos}</span>
            <button type="button" onClick={onAccesibilidad}>{textos.footer.columnas.legal.enlaces.accesibilidad}</button>
          </div>
        </div>
        <div className="pie-creditos">
          <span>
            {textos.footer.legal.derechos.replace(
              "{anio}",
              String(new Date().getFullYear()),
            )}
          </span>
          <span>{textos.footer.legal.nota}</span>
        </div>
      </div>
    </footer>
  );
}
