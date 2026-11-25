import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { consultar, ErrorApi } from "../../../services/api";
import type { Categoria, DetalleEvento, Evento, Listado } from "../../../types/api";
import VistaDetalle from "../../../views/VistaDetalle";

type Props = { params: Promise<{ slug: string }> };

const obtenerEvento = cache(async (slug: string) => {
  try {
    return await consultar<DetalleEvento>(`/eventos/${encodeURIComponent(slug)}`);
  } catch (error) {
    if (error instanceof ErrorApi && error.status === 404 && error.codigo === "no_encontrado") notFound();
    throw error;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const evento = await obtenerEvento((await params).slug);
  return { title: evento.titulo, description: evento.descripcion };
}

export default async function DetallePage({ params }: Props) {
  const { slug } = await params;
  const ruta = `/eventos/${encodeURIComponent(slug)}`;
  const relacionados = consultar<Listado<Evento>>(`${ruta}/relacionados`).then(
    (resultado) => resultado.datos.slice(0, 4),
    () => null,
  );
  const categorias = consultar<Listado<Categoria>>("/categorias").then(
    (resultado) => resultado.datos,
    () => [],
  );
  const [evento, tarjetas, nombres] = await Promise.all([obtenerEvento(slug), relacionados, categorias]);
  return <VistaDetalle evento={evento} relacionados={tarjetas} categorias={nombres} />;
}
