import { consultar } from "./api";
import type { Idioma } from "../types/api";
import type { Textos } from "../types/textos";

type Carga = Textos["estados"]["cargando"];

export const cargaInicial: Record<Idioma, Carga> = {
  es: { titulo: "Cargando…", texto: "Esto puede tardar unos segundos.", indicador: "Cargando…" },
  en: { titulo: "Loading…", texto: "This may take a few seconds.", indicador: "Loading…" },
};

const catalogos = new Map<Idioma, Promise<Textos>>();
const estados = new Map<Idioma, Promise<Textos["estados"]>>();

function compartir<K, T>(cache: Map<K, Promise<T>>, clave: K, cargar: () => Promise<T>) {
  const actual = cache.get(clave);
  if (actual) return actual;
  const pendiente = cargar().catch((error: unknown) => {
    cache.delete(clave);
    throw error;
  });
  cache.set(clave, pendiente);
  return pendiente;
}

export const obtenerTextos = (idioma: Idioma) =>
  compartir(catalogos, idioma, async () => {
    const respuesta = await consultar<{ textos: Textos }>(`/textos?idioma=${idioma}`);
    if (!respuesta.textos || typeof respuesta.textos !== "object") throw new Error("textos");
    return respuesta.textos;
  });

export const obtenerEstados = (idioma: Idioma) =>
  compartir(estados, idioma, async () =>
    (await consultar<{ textos: Pick<Textos, "estados"> }>(`/textos?idioma=${idioma}&seccion=estados`)).textos.estados,
  );
