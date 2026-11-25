"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  leerCookie,
  guardarCookie,
  borrarCookie,
} from "../services/cookies";
import { obtenerEstados, obtenerTextos } from "../services/textos";

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
  estados: Textos["estados"] | null;
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
  const [catalogo, setCatalogo] = useState<{ idioma: Idioma; textos: Textos } | null>(null);
  const [estados, setEstados] = useState<{ idioma: Idioma; textos: Textos["estados"] } | null>(null);
  const textos = catalogo?.idioma === idioma ? catalogo.textos : null;
  const [errorTextos, setErrorTextos] = useState<Error | null>(null);
  const [cargandoTextos, setCargandoTextos] = useState(true);
  const [intentoTextos, setIntentoTextos] = useState(0);
  useEffect(() => {
    document.documentElement.lang = idioma;
    let vigente = true;
    setCargandoTextos(true);
    setErrorTextos(null);
    obtenerEstados(idioma).then((textos) => {
      if (vigente) setEstados({ idioma, textos });
    }, () => undefined);
    obtenerTextos(idioma)
      .then((textos) => { if (vigente) setCatalogo({ idioma, textos }); })
      .catch((errorSolicitud) => {
        if (vigente) setErrorTextos(errorSolicitud);
      })
      .finally(() => {
        if (vigente) setCargandoTextos(false);
      });
    return () => { vigente = false; };
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
        estados: estados?.idioma === idioma ? estados.textos : null,
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
