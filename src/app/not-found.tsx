"use client";

import LayoutPublico from "../components/LayoutPublico/LayoutPublico";
import EstadoVista from "../components/EstadoVista/EstadoVista";
import { usePreferencias } from "../context/PreferenciasContext";

export default function PaginaNoEncontrada() {
  const { textos, errorTextos, reintentarTextos } = usePreferencias();
  if (!textos) return <EstadoVista estado={errorTextos ? "error" : "cargando"} error={errorTextos} onReintentar={reintentarTextos} />;
  const t = textos.paginas.noEncontrado.contenido;
  return <LayoutPublico><section className="ancho-home estado-inicial"><div><h1>{t.titulo}</h1><p>{t.texto}</p><a href="/">{t.botones.volverInicio}</a></div></section></LayoutPublico>;
}
