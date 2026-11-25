import { NextRequest, NextResponse } from "next/server";
import { apiServidor } from "../../../config/proyecto";
import type { Usuario } from "../../../types/api";

const sinCache = { "Cache-Control": "no-store" };
const DURACION_SESION = 12 * 60 * 60;

export function publicacionSegura(request: NextRequest) {
  const origen = request.headers.get("origin");
  return request.headers.get("sec-fetch-site") !== "cross-site" && (!origen || origen === request.nextUrl.origin);
}

export async function POST(request: NextRequest) {
  if (!publicacionSegura(request)) return new NextResponse(null, { status: 403, headers: sinCache });
  const entrada: unknown = await request.json().catch(() => null);
  if (!entrada || typeof entrada !== "object" || !("correo" in entrada) || !("clave" in entrada) ||
      typeof entrada.correo !== "string" || typeof entrada.clave !== "string") {
    return NextResponse.json({ error: { codigo: "peticion_invalida" } }, { status: 400, headers: sinCache });
  }

  let respuesta: Response;
  try {
    respuesta = await fetch(`${apiServidor()}/sesion`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ correo: entrada.correo, clave: entrada.clave }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ error: { codigo: "red_no_disponible" } }, { status: 502, headers: sinCache });
  }
  if (!respuesta.ok) {
    const error: unknown = await respuesta.json().catch(() => ({}));
    const espera = respuesta.headers.get("Retry-After");
    return NextResponse.json(error, {
      status: respuesta.status,
      headers: espera ? { ...sinCache, "Retry-After": espera } : sinCache,
    });
  }

  const datos: { usuario: Usuario; token: string } = await respuesta.json();
  const salida = NextResponse.json({ usuario: datos.usuario }, { headers: sinCache });
  salida.cookies.set("sesion", datos.token, {
    httpOnly: true, secure: request.nextUrl.protocol === "https:", sameSite: "lax", path: "/",
    ...( "mantener" in entrada && entrada.mantener === true ? { maxAge: DURACION_SESION } : {}),
  });
  return salida;
}
