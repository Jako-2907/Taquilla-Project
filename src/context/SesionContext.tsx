"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { Usuario } from "../types/api";

type ValorSesion = {
  usuario: Usuario | null;
  verificando: boolean;
  iniciarSesion: (usuario: Usuario) => void;
  cerrarSesion: () => Promise<boolean>;
};

const SesionContext = createContext<ValorSesion | null>(null);

export function SesionProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [verificando, setVerificando] = useState(true);
  const version = useRef(0);
  const router = useRouter();

  useEffect(() => {
    const controlador = new AbortController();
    const activa = ++version.current;
    fetch("/api/sesion", { signal: controlador.signal })
      .then(async (respuesta) => {
        if (!respuesta.ok) return null;
        const datos: { usuario: Usuario } = await respuesta.json();
        return datos.usuario;
      })
      .then((cuenta) => {
        if (activa === version.current && !controlador.signal.aborted) setUsuario(cuenta);
      }, () => undefined)
      .finally(() => {
        if (activa === version.current && !controlador.signal.aborted) setVerificando(false);
      });
    return () => controlador.abort();
  }, []);

  function iniciarSesion(cuenta: Usuario) {
    version.current++;
    setUsuario(cuenta);
    setVerificando(false);
  }

  async function cerrarSesion() {
    try {
      const respuesta = await fetch("/api/sesion", { method: "DELETE" });
      if (!respuesta.ok) return false;
      version.current++;
      setVerificando(false);
      setUsuario(null);
      router.push("/");
      return true;
    } catch {
      return false;
    }
  }

  useEffect(() => {
    if (!usuario) return;
    const controlador = new AbortController();
    let consultando = false;

    async function verificarAlVolver() {
      if (consultando) return;
      consultando = true;
      const activa = version.current;
      try {
        const respuesta = await fetch("/api/sesion", { signal: controlador.signal });
        if (respuesta.status === 401 && activa === version.current && !controlador.signal.aborted) {
          version.current++;
          setUsuario(null);
          router.replace("/iniciar-sesion");
        }
      } catch {
        // La ausencia de red no prueba que la sesión haya vencido.
      } finally {
        consultando = false;
      }
    }

    window.addEventListener("focus", verificarAlVolver);
    return () => {
      controlador.abort();
      window.removeEventListener("focus", verificarAlVolver);
    };
  }, [usuario, router]);

  return <SesionContext.Provider value={{ usuario, verificando, iniciarSesion, cerrarSesion }}>{children}</SesionContext.Provider>;
}

export function useSesion() {
  const sesion = useContext(SesionContext);
  if (!sesion) throw new Error("SesionProvider requerido");
  return sesion;
}
