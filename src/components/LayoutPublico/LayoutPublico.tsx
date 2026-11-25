"use client";

import { useRouter } from "next/navigation";
import { usePreferencias } from "../../context/PreferenciasContext";
import { proyecto } from "../../config/proyecto";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import GestorCookies from "../GestorCookies/GestorCookies";
import SaltarContenido from "../SaltarContenido/SaltarContenido";
import "./LayoutPublico.css";

import type { NavegacionProps } from "../../types/api";

export default function LayoutPublico({ destino = "/explorar", onCuenta, onExplorar, children }: Partial<Pick<NavegacionProps, "destino" | "onCuenta" | "onExplorar">> & { children: React.ReactNode }) {
  const router = useRouter();
  const abrirCuenta: NavegacionProps["onCuenta"] = onCuenta ?? ((tipo) => router.push(tipo === "registro" ? "/crear-cuenta" : "/iniciar-sesion"));
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
        onCuenta={abrirCuenta}
        onExplorar={onExplorar}
        textos={textos}
      />
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <Footer
        nombre={proyecto.nombre}
        tipo={proyecto.id}
        destino={destino}
        onCuenta={abrirCuenta}
        onExplorar={onExplorar}
        textos={textos}
      />
      <GestorCookies />
    </div>
  );
}
