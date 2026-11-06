import { useEffect, useMemo, useState } from "react";
import { consultar } from "../services/api.js";

export function useEventos() {
  const [filtros, setFiltros] = useState(() => {
    if (window.location.pathname !== "/explorar") return null;
    const params = new URLSearchParams(window.location.search);
    return {
      consulta: params.get("q") ?? "",
      categoria: params.get("categoria") ?? "",
      ciudad: params.get("ciudad") ?? "",
      orden: params.get("orden") ?? "fecha",
    };
  });
  const [pagina, setPagina] = useState(() =>
    Math.max(1, Number(new URLSearchParams(window.location.search).get("pagina")) || 1),
  );
  const [resultado, setResultado] = useState({ datos: [], paginacion: null });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);
  const consulta = useMemo(() => {
    if (!filtros) return null;
    const parametros = new URLSearchParams({ pagina: String(pagina), porPagina: "12" });
    if (filtros.consulta) parametros.set("q", filtros.consulta);
    if (filtros.categoria) parametros.set("categoria", filtros.categoria);
    if (filtros.ciudad) parametros.set("ciudad", filtros.ciudad);
    if (filtros.orden) parametros.set("orden", filtros.orden);
    return `/eventos?${parametros.toString()}`;
  }, [filtros, pagina]);

  useEffect(() => {
    if (!filtros) return;
    const params = new URLSearchParams(consulta.split("?")[1] ?? "");
    const siguiente = `/explorar?${params.toString()}`;
    if (`${window.location.pathname}${window.location.search}` !== siguiente) {
      window.history.replaceState({}, "", siguiente);
    }
  }, [consulta, filtros]);

  useEffect(() => {
    function sincronizarDesdeUrl() {
      if (window.location.pathname !== "/explorar") {
        setFiltros(null);
        return;
      }
      const params = new URLSearchParams(window.location.search);
      setPagina(Math.max(1, Number(params.get("pagina")) || 1));
      setFiltros({
        consulta: params.get("q") ?? "",
        categoria: params.get("categoria") ?? "",
        ciudad: params.get("ciudad") ?? "",
        orden: params.get("orden") ?? "fecha",
      });
    }
    window.addEventListener("popstate", sincronizarDesdeUrl);
    return () => window.removeEventListener("popstate", sincronizarDesdeUrl);
  }, []);

  useEffect(() => {
    if (!consulta) return;
    const controlador = new AbortController();
    setCargando(true);
    setError(null);
    consultar(consulta, { signal: controlador.signal })
      .then((respuesta) => {
        if (!Array.isArray(respuesta?.datos)) {
          throw new Error("La API no devolvió la lista de eventos esperada.");
        }
        setResultado(respuesta);
      })
      .catch((errorSolicitud) => {
        if (errorSolicitud.name !== "AbortError") setError(errorSolicitud);
      })
      .finally(() => {
        if (!controlador.signal.aborted) setCargando(false);
      });
    return () => controlador.abort();
  }, [consulta, intento]);

  function buscar(valores) {
    window.history.pushState({}, "", "/explorar");
    setPagina(1);
    setFiltros({ ...valores });
    document.getElementById("eventos")?.scrollIntoView({ block: "start" });
  }

  return {
    filtros,
    resultados: resultado.datos,
    paginacion: resultado.paginacion,
    cargando,
    error,
    buscar,
    setFiltros: buscar,
    cambiarPagina: setPagina,
    recargar: () => setIntento((valor) => valor + 1),
    filtrarCategoria: (categoria) => buscar({ ...filtros, categoria }),
  };
}
