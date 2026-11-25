"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  leerCookie,
  guardarCookie,
  borrarCookie,
} from "../services/cookies";
import { consultar } from "../services/api";

import type { ReactNode } from "react";
import type { Consentimiento, Idioma } from "../types/api";
import type { Textos } from "../types/textos";

interface Preferencias {
  idioma: Idioma;
  cambiarIdioma: (idioma: Idioma) => void;
  consentimiento: Consentimiento;
  guardarConsentimiento: (permitir: boolean) => boolean;
  error: boolean;
  textos: Textos | null;
  errorTextos: Error | null;
  cargandoTextos: boolean;
  reintentarTextos: () => void;
}

const PreferenciasContext = createContext<Preferencias | null>(null);

export function PreferenciasProvider({ children }: { children: ReactNode }) {
  const [consentimiento, setConsentimiento] = useState<Consentimiento>(() => {
    const valor = leerCookie("consentimiento");
    return (valor === "aceptado" || valor === "rechazado") ? valor : null;
  });
  const [idioma, setIdioma] = useState<Idioma>(() =>
    leerCookie("consentimiento") === "aceptado" && leerCookie("idioma") === "en"
      ? "en"
      : "es",
  );
  const [error, setError] = useState(false);
  const [textos, setTextos] = useState<Textos | null>(null);
  const [errorTextos, setErrorTextos] = useState<Error | null>(null);
  const [cargandoTextos, setCargandoTextos] = useState(true);
  const [intentoTextos, setIntentoTextos] = useState(0);
  useEffect(() => {
    document.documentElement.lang = idioma;
    const controlador = new AbortController();
    setCargandoTextos(true);
    setErrorTextos(null);
    setTextos(null);
    consultar<{ textos: Textos }>(`/textos?idioma=${idioma}`, { signal: controlador.signal })
      .then((respuesta) => {
        if (!respuesta?.textos || typeof respuesta.textos !== "object") {
          throw new Error("La API no devolvió los textos de interfaz esperados.");
        }
        setTextos(respuesta.textos);
      })
      .catch((errorSolicitud) => {
        if (errorSolicitud.name !== "AbortError") setErrorTextos(errorSolicitud);
      })
      .finally(() => {
        if (!controlador.signal.aborted) setCargandoTextos(false);
      });
    return () => controlador.abort();
  }, [idioma, intentoTextos]);
  function cambiarIdioma(valor: Idioma) {
    setIdioma(valor);
    try {
      if (consentimiento === "aceptado") guardarCookie("idioma", valor);
      setError(false);
    } catch {
      setError(true);
    }
  }
  function guardarConsentimiento(permitir: boolean) {
    try {
      const valor = permitir ? "aceptado" : "rechazado";
      guardarCookie("consentimiento", valor);
      if (permitir) guardarCookie("idioma", idioma);
      else borrarCookie("idioma");
      setConsentimiento(valor);
      setError(false);
      return true;
    } catch {
      setError(true);
      return false;
    }
  }
  return (
    <PreferenciasContext.Provider
      value={{
        idioma,
        cambiarIdioma,
        consentimiento,
        guardarConsentimiento,
        error,
        textos,
        errorTextos,
        cargandoTextos,
        reintentarTextos: () => setIntentoTextos((intento) => intento + 1),
      }}
    >
      {children}
    </PreferenciasContext.Provider>
  );
}

export function usePreferencias() {
  const valor = useContext(PreferenciasContext);
  if (!valor) throw new Error("PreferenciasProvider requerido");
  return valor;
}
