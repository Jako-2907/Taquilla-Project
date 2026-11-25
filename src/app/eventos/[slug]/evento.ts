import { cache } from "react";
import { consultar, ErrorApi } from "../../../services/api";
import type { DetalleEvento } from "../../../types/api";

export const obtenerEvento = cache(async (slug: string) => {
  try {
    return await consultar<DetalleEvento>(`/eventos/${encodeURIComponent(slug)}`);
  } catch (error) {
    if (error instanceof ErrorApi && error.status === 404 && error.codigo === "no_encontrado") return null;
    throw error;
  }
});
