import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ErrorApi } from "../../../services/api";
import { obtenerTextos } from "../../../services/textos";
import ErrorEvento from "./error";
import { obtenerEvento } from "./evento";
import VistaDetalle from "../../../views/VistaDetalle";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const evento = await obtenerEvento((await params).slug).catch(() => undefined);
  if (evento === null) notFound();
  if (!evento) return {};

  const preferencias = await cookies();
  const idioma = preferencias.get("consentimiento")?.value === "aceptado" && preferencias.get("idioma")?.value === "en" ? "en" : "es";
  const textos = await obtenerTextos(idioma).catch(() => null);
  return {
    title: textos?.paginas.detalleEvento.seo.titulo.replace("{titulo}", () => evento.titulo) ?? evento.titulo,
    description: evento.descripcion,
  };
}

export default async function DetallePage({ params }: Props) {
  const { slug } = await params;
  try {
    const evento = await obtenerEvento(slug);
    if (!evento) notFound();
    return <VistaDetalle evento={evento} />;
  } catch (error) {
    if (error instanceof ErrorApi && error.status && error.status >= 500) return <ErrorEvento />;
    throw error;
  }
}
