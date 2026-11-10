import { createContext, useContext, useEffect, useState } from "react";
import {
  leerCookie,
  guardarCookie,
  borrarCookie,
} from "../services/cookies.js";
import { consultar } from "../services/api.js";

const PreferenciasContext = createContext(null);

export function PreferenciasProvider({ children }) {
  const [consentimiento, setConsentimiento] = useState(() => {
    const valor = leerCookie("consentimiento");
    return ["aceptado", "rechazado"].includes(valor) ? valor : null;
  });
  const [idioma, setIdioma] = useState(() =>
    leerCookie("consentimiento") === "aceptado" && leerCookie("idioma") === "en"
      ? "en"
      : "es",
  );
  const [error, setError] = useState(false);
  const [textos, setTextos] = useState(null);
  const [errorTextos, setErrorTextos] = useState(null);
  const [cargandoTextos, setCargandoTextos] = useState(true);
  const [intentoTextos, setIntentoTextos] = useState(0);
  useEffect(() => {
    document.documentElement.lang = idioma;
    const controlador = new AbortController();
    setCargandoTextos(true);
    setErrorTextos(null);
    setTextos(null);
    consultar(`/textos?idioma=${idioma}`, { signal: controlador.signal })
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
  useEffect(() => {
    const titulo = textos?.paginas?.inicio?.seo?.titulo;
    if (titulo) document.title = titulo;
  }, [textos]);
  function cambiarIdioma(valor) {
    setIdioma(valor);
    try {
      if (consentimiento === "aceptado") guardarCookie("idioma", valor);
      setError(false);
    } catch {
      setError(true);
    }
  }
  function guardarConsentimiento(permitir) {
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
