import { proyecto } from "../config/proyecto";

export class ErrorApi extends Error {
  constructor(message: string, public codigo?: string, public campos?: unknown, public status?: number) {
    super(message);
  }
}

export async function consultar<T>(ruta: string, { signal, headers }: { signal?: AbortSignal; headers?: Record<string, string> } = {}): Promise<T> {
  const base = proyecto.api.replace(/\/+$/, "");
  const respuesta = await fetch(`${base}${ruta}`, {
    signal,
    headers: { Accept: "application/json", ...headers },
  });
  const tipo = respuesta.headers.get("content-type") || "";
  if (!tipo.includes("application/json")) {
    throw new Error("La API devolvió una respuesta que no es JSON.");
  }
  const datos = await respuesta.json();
  if (!respuesta.ok) {
    const error = new ErrorApi(datos?.error?.mensaje || `HTTP ${respuesta.status}`, datos?.error?.codigo, datos?.error?.campos, respuesta.status);
    throw error;
  }
  return datos;
}
