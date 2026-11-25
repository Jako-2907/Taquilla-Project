import type { Metadata } from "next";
import { consultar } from "../../../services/api";
import type { Categoria, Evento, Listado } from "../../../types/api";
import { obtenerEvento } from "./evento";
import VistaDetalle from "../../../views/VistaDetalle";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const evento = await obtenerEvento((await params).slug).catch(() => null);
  return evento ? { title: evento.titulo, description: evento.descripcion } : {};
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
