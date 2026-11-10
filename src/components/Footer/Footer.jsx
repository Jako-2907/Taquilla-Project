import Marca from "../Marca/Marca.jsx";
import "./Footer.css";

export default function Footer({ nombre, tipo, destino, onCuenta, textos }) {
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
            <a href={destino}>{textos.footer.columnas.explora.enlaces.explorar}</a>
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
