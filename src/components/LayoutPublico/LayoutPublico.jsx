import { usePreferencias } from "../../context/PreferenciasContext.jsx";
import { proyecto } from "../../config/proyecto.js";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import GestorCookies from "../GestorCookies/GestorCookies.jsx";
import SaltarContenido from "../SaltarContenido/SaltarContenido.jsx";
import "./LayoutPublico.css";

export default function LayoutPublico({ destino, onCuenta, children }) {
  const { idioma, cambiarIdioma, textos } = usePreferencias();
  if (!textos) return null;

  return (
    <div className={`landing ${proyecto.id}`}>
      <SaltarContenido texto={textos.general.aria.saltarAlContenido} />
      <Navbar
        nombre={proyecto.nombre}
        tipo={proyecto.id}
        idioma={idioma}
        onCambiarIdioma={cambiarIdioma}
        destino={destino}
        onCuenta={onCuenta}
        textos={textos}
      />
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <Footer
        nombre={proyecto.nombre}
        tipo={proyecto.id}
        idioma={idioma}
        destino={destino}
        onCuenta={onCuenta}
        textos={textos}
      />
      <GestorCookies />
    </div>
  );
}
