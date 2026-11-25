import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ErrorApi } from "../../../services/api";
import { obtenerEvento } from "./evento";

export default async function EventoLayout({ children, params }: { children: ReactNode; params: Promise<{ slug: string }> }) {
  try {
    await obtenerEvento((await params).slug);
  } catch (error) {
    if (error instanceof ErrorApi && error.status === 404 && error.codigo === "no_encontrado") notFound();
    // La página vuelve a lanzar los demás errores dentro de su límite de recuperación.
  }
  return children;
}
