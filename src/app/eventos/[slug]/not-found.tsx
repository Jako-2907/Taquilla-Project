"use client";

import EstadoVista from "../../../components/EstadoVista/EstadoVista";
import { usePreferencias } from "../../../context/PreferenciasContext";
import LayoutPublico from "../../../components/LayoutPublico/LayoutPublico";

export default function EventoNoEncontrado() {
  const { textos: catalogo, errorTextos, reintentarTextos } = usePreferencias();
  const textos = catalogo?.paginas.detalleEvento.noEncontrado;
  if (!textos) return <EstadoVista estado={errorTextos ? "error" : "cargando"} error={errorTextos} onReintentar={reintentarTextos} />;
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
