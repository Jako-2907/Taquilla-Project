"use client";

import { useRouter } from "next/navigation";
import EstadoVista from "../../../components/EstadoVista/EstadoVista";
import LayoutPublico from "../../../components/LayoutPublico/LayoutPublico";
import { usePreferencias } from "../../../context/PreferenciasContext";

export default function ErrorEvento({ error, retry }: { error?: Error; retry?: () => void }) {
  const router = useRouter();
  const { textos } = usePreferencias();
  const estado = <EstadoVista estado="error" detalle error={error} onReintentar={retry ?? (() => router.refresh())} />;
  return textos ? <LayoutPublico>{estado}</LayoutPublico> : estado;
}
