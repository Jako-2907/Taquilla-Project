"use client";

import EstadoVista from "../../../components/EstadoVista/EstadoVista";
import LayoutPublico from "../../../components/LayoutPublico/LayoutPublico";
import { usePreferencias } from "../../../context/PreferenciasContext";

export default function ErrorEvento({ error, reset }: { error: Error; reset: () => void }) {
  const { textos } = usePreferencias();
  const estado = <EstadoVista estado="error" error={error} onReintentar={reset} />;
  return textos ? <LayoutPublico>{estado}</LayoutPublico> : estado;
}
