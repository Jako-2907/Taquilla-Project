import { proyecto } from "../config/proyecto.js";

export async function consultar(ruta, { signal } = {}) {
  const base = proyecto.api.replace(/\/+$/, "");
  const respuesta = await fetch(`${base}${ruta}`, {
    signal,
    headers: { Accept: "application/json" },
  });
  const tipo = respuesta.headers.get("content-type") || "";
  if (!tipo.includes("application/json")) {
    throw new Error("La API devolvió una respuesta que no es JSON.");
  }
  const datos = await respuesta.json();
  if (!respuesta.ok) {
    const error = new Error(datos?.error?.mensaje || `HTTP ${respuesta.status}`);
    error.codigo = datos.error?.codigo;
    error.campos = datos.error?.campos;
    throw error;
  }
  return datos;
}
