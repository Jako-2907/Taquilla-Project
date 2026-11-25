import { useEffect, useId, useRef, useState } from "react";
import IconoEvento from "../IconoEvento/IconoEvento";
import "./Accesibilidad.css";

const CLAVE = "taquilla_accesibilidad";
const INICIAL = {
  escala: 1,
  altoContraste: false,
  reducirMovimiento: false,
  subrayarEnlaces: false,
  espaciadoLectura: false,
};

function leerPreferencias(): typeof INICIAL {
  try {
    return { ...INICIAL, ...JSON.parse(localStorage.getItem(CLAVE) || "{}") };
  } catch {
    return INICIAL;
  }
}

import type { Textos } from "../../types/textos";

export default function Accesibilidad({ textos, abierto, setAbierto }: {
  textos: Textos;
  abierto: boolean;
  setAbierto: (abierto: boolean) => void;
}) {
  const [preferencias, setPreferencias] = useState(leerPreferencias);
  const boton = useRef<HTMLButtonElement>(null);
  const cerrar = useRef<HTMLButtonElement>(null);
  const id = useId();
  const t = textos.accesibilidad;

  useEffect(() => {
    if (abierto) cerrar.current?.focus();
  }, [abierto]);

  useEffect(() => {
    const raiz = document.documentElement;
    raiz.style.setProperty("--escala-texto-accesible", String(preferencias.escala));
    for (const clave of (Object.keys(INICIAL) as (keyof typeof INICIAL)[]).filter((clave) => clave !== "escala")) {
      if (preferencias[clave]) raiz.dataset[clave] = "true";
      else delete raiz.dataset[clave];
    }
    try {
      localStorage.setItem(CLAVE, JSON.stringify(preferencias));
    } catch {
      // Las opciones siguen activas durante la sesión aunque el navegador no guarde datos.
    }
  }, [preferencias]);

  function actualizar(cambios: Partial<ReturnType<typeof leerPreferencias>>) {
    setPreferencias((actuales) => ({ ...actuales, ...cambios }));
  }

  function manejarTecla(evento: React.KeyboardEvent) {
    if (evento.key === "Escape") {
      evento.stopPropagation();
      setAbierto(false);
      boton.current?.focus();
    }
  }

  const opciones = [
    ["altoContraste", t.altoContraste],
    ["reducirMovimiento", t.reducirMovimiento],
    ["subrayarEnlaces", t.subrayarEnlaces],
    ["espaciadoLectura", t.espaciadoLectura],
  ] as const;

  return (
    <div className="accesibilidad">
      <button
        ref={boton}
        className="accesibilidad__boton"
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        aria-label={textos.navbar.aria.accesibilidad}
        onClick={() => setAbierto(!abierto)}
      >
        <IconoEvento tipo="persona" />
      </button>
      <section
        className="accesibilidad__panel"
        id={id}
        aria-label={t.titulo}
        hidden={!abierto}
        onKeyDown={manejarTecla}
      >
        <header className="accesibilidad__encabezado">
          <h2>{t.titulo}</h2>
          <button
            ref={cerrar}
            type="button"
            className="accesibilidad__cerrar"
            aria-label={textos.general.acciones.cerrar}
            onClick={() => setAbierto(false)}
          >
            {"\u00D7"}
          </button>
        </header>
        <fieldset className="accesibilidad__tamano">
          <legend>{t.tamanoTexto}</legend>
          <div className="accesibilidad__control-tamano">
            <button
              type="button"
              aria-label={t.aria.disminuirTexto}
              disabled={preferencias.escala <= 0.9}
              onClick={() => actualizar({ escala: Math.max(0.9, preferencias.escala - 0.1) })}
            >
              {"\u2212"}
            </button>
            <span aria-hidden="true">{t.muestraTamano}</span>
            <button
              type="button"
              aria-label={t.aria.aumentarTexto}
              disabled={preferencias.escala >= 1.3}
              onClick={() => actualizar({ escala: Math.min(1.3, preferencias.escala + 0.1) })}
            >
              +
            </button>
          </div>
        </fieldset>
        <div className="accesibilidad__opciones">
          {opciones.map(([clave, opcion]) => (
            <label className="accesibilidad__opcion" key={clave}>
              <span>
                <strong>{opcion.nombre}</strong>
                <small>{opcion.descripcion}</small>
              </span>
              <input
                type="checkbox"
                role="switch"
                checked={preferencias[clave]}
                onChange={(evento) => actualizar({ [clave]: evento.target.checked })}
              />
            </label>
          ))}
        </div>
        <p className="accesibilidad__nota">{t.nota}</p>
        <footer className="accesibilidad__pie">
          <span>{t.enlaces.declaracion}</span>
          <button
            className="accesibilidad__restablecer"
            type="button"
            onClick={() => actualizar(INICIAL)}
          >
            {t.botones.restablecer}
          </button>
        </footer>
      </section>
    </div>
  );
}
