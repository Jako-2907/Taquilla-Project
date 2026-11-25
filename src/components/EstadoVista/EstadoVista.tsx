"use client";

import { usePreferencias } from "../../context/PreferenciasContext";
import { cargaInicial } from "../../services/textos";
import "./EstadoVista.css";

export default function EstadoVista({ estado, onReintentar, error }: {
  estado: "cargando" | "error";
  onReintentar?: () => void;
  error?: Error | null;
}) {
  const { idioma, textos, estados } = usePreferencias();
  const catalogo = textos?.estados ?? estados;
  if (estado === "cargando") {
    const carga = catalogo?.cargando ?? cargaInicial[idioma];
    return (
      <div className="estado-vista" role="status">
        <span className="indicador-carga" role="img" aria-label={carga.indicador} />
        <p><strong>{carga.titulo}</strong></p>
        <p>{carga.texto}</p>
      </div>
    );
  }
  const contenido = error instanceof TypeError ? catalogo?.sinConexion : catalogo?.error;
  return (
    <div className="estado-vista" role="alert">
      {contenido && <><p><strong>{contenido.titulo}</strong></p><p>{contenido.texto}</p></>}
      {onReintentar && <button className="boton-home secundario" type="button" onClick={onReintentar} aria-label={catalogo?.error.botones.reintentar}>
        {catalogo?.error.botones.reintentar ?? <span aria-hidden="true">↻</span>}
      </button>}
    </div>
  );
}
