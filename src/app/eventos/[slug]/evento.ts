import { cache } from "react";
import { consultar } from "../../../services/api";
import type { DetalleEvento } from "../../../types/api";

export const obtenerEvento = cache((slug: string) =>
  consultar<DetalleEvento>(`/eventos/${encodeURIComponent(slug)}`),
);
