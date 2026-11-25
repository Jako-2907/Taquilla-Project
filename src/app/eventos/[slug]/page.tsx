import type { Metadata } from "next";
import { obtenerEvento } from "./evento";
import VistaDetalle from "../../../views/VistaDetalle";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const evento = await obtenerEvento((await params).slug).catch(() => null);
  return evento ? { title: evento.titulo, description: evento.descripcion } : {};
}

export default async function DetallePage({ params }: Props) {
  const evento = await obtenerEvento((await params).slug);
  return <VistaDetalle evento={evento} />;
}
