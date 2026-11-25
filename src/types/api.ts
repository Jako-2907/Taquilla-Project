import type { Textos } from "./textos";

export interface NavegacionProps {
  nombre: string;
  tipo: string;
  destino: string;
  onCuenta: (tipo: TipoCuenta) => void;
  onExplorar?: () => void;
  textos: Textos;
}

export type Idioma = "es" | "en";
export type Consentimiento = "aceptado" | "rechazado" | null;
export type TipoCuenta = "registro" | "ingresar";

export interface Afiche {
  color1: string;
  color2: string;
  patron: string;
}

export interface Evento {
  id: string;
  slug: string;
  titulo: string;
  categoria: string;
  fecha: string;
  recinto: { nombre: string; direccion: string; ciudad: string };
  afiche: Afiche;
  precioDesde: number;
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  eventos: number;
}

export interface Ciudad {
  nombre: string;
  eventos: number;
}

export interface Paginacion {
  pagina: number;
  porPagina: number;
  total: number;
  paginas: number;
}

export interface Listado<T> {
  datos: T[];
}

export interface Filtros {
  consulta?: string;
  categoria?: string;
  ciudad?: string;
  orden?: string;
  fecha?: string;
  desde?: string;
  hasta?: string;
  fechaRapida?: string;
  precioMax?: string;
}
