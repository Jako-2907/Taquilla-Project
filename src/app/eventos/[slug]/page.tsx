import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ErrorApi } from "../../../services/api";
import ErrorEvento from "./error";
import { obtenerEvento } from "./evento";
import VistaDetalle from "../../../views/VistaDetalle";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const evento = await obtenerEvento((await params).slug).catch(() => null);
  return evento ? { title: evento.titulo, description: evento.descripcion } : {};
}

export default async function DetallePage({ params }: Props) {
  const { slug } = await params;
  try {
    const evento = await obtenerEvento(slug);
    return <VistaDetalle evento={evento} />;
  } catch (error) {
    if (error instanceof ErrorApi && error.status === 404 && error.codigo === "no_encontrado") notFound();
    if (error instanceof ErrorApi && error.status && error.status >= 500) return <ErrorEvento />;
    throw error;
  }
}
