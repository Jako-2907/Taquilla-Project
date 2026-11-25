"use client";

import { usePreferencias } from "../../context/PreferenciasContext";
import { cargaInicial } from "../../services/textos";
import "./EstadoVista.css";

export default function EstadoVista({ estado, onReintentar, error, detalle = false }: {
  estado: "cargando" | "error";
  onReintentar?: () => void;
  error?: Error | null;
  detalle?: boolean;
}) {
  const { idioma, textos, estados } = usePreferencias();
  const catalogo = textos?.estados ?? estados;
  if (estado === "cargando") {
    const carga = catalogo?.cargando;
    if (detalle) {
      return (
        <div className="estado-vista estado-vista--detalle" role="status">
          {carga && <span className="solo-lectores">{carga.titulo} {carga.texto}</span>}
          <div className="estado-vista__esqueleto" aria-hidden="true">
            <span /><span /><span /><span /><span /><span />
          </div>
        </div>
      );
    }
    const mensaje = carga ?? cargaInicial[idioma];
    return (
      <div className="estado-vista" role="status">
        <span className="indicador-carga" role="img" aria-label={mensaje.indicador} />
        <p><strong>{mensaje.titulo}</strong></p>
        <p>{mensaje.texto}</p>
      </div>
    );
  }
  const contenido = (error instanceof TypeError || (typeof navigator !== "undefined" && !navigator.onLine)) ? catalogo?.sinConexion : catalogo?.error;
  return (
    <div className={detalle ? "estado-vista estado-vista--detalle" : "estado-vista"} role="alert">
      {detalle && (
        <svg className="estado-vista__advertencia" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 6v7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="12" cy="18" r="1.25" fill="currentColor" />
        </svg>
      )}
      {contenido && <><p><strong>{contenido.titulo}</strong></p><p>{contenido.texto}</p></>}
      {onReintentar && catalogo && <button className={`boton-home ${detalle ? "primario" : "secundario"}`} type="button" onClick={onReintentar}>
        {catalogo.error.botones.reintentar}
      </button>}
    </div>
  );
}
