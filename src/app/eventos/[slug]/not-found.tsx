"use client";

import { usePreferencias } from "../../../context/PreferenciasContext";
import LayoutPublico from "../../../components/LayoutPublico/LayoutPublico";

export default function EventoNoEncontrado() {
  const textos = usePreferencias().textos?.paginas.detalleEvento.noEncontrado;
  if (!textos) return null;
  return (
    <LayoutPublico>
      <section className="ancho-home estado-inicial">
        <div>
          <h1>{textos.titulo}</h1>
          <p>{textos.texto}</p>
          <a className="boton-home primario" href="/explorar">{textos.botones.volver}</a>
        </div>
      </section>
    </LayoutPublico>
  );
}
