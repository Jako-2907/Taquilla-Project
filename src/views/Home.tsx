"use client";

import type { Categoria, Ciudad, Evento, Filtros, Listado, TipoCuenta } from "../types/api";
import { useEffect } from "react";
import LayoutPublico from "../components/LayoutPublico/LayoutPublico";
import HeroTaquilla from "../components/HeroTaquilla/HeroTaquilla";
import BuscadorEventos from "../components/BuscadorEventos/BuscadorEventos";
import CategoriasEventos from "../components/CategoriasEventos/CategoriasEventos";
import SeccionEventos from "../components/SeccionEventos/SeccionEventos";
import { usePreferencias } from "../context/PreferenciasContext";
import { useEventos } from "../hooks/useEventos";
import { useRecurso } from "../hooks/useRecurso";
import FiltrosExplorar from "../components/FiltrosExplorar/FiltrosExplorar";

export default function Home() {
  const { idioma, textos, errorTextos, cargandoTextos, reintentarTextos } = usePreferencias();
  const abrirCuenta = (tipo: TipoCuenta) => {
    window.location.assign(tipo === "registro" ? "/crear-cuenta" : "/iniciar-sesion");
  };
  const destacados = useRecurso<Listado<Evento>>(textos ? "/eventos/destacados" : null);
  const categorias = useRecurso<Listado<Categoria>>(textos ? "/categorias" : null);
  const ciudades = useRecurso<Listado<Ciudad>>(textos ? "/ciudades" : null);
  const ciudadPrincipal = ciudades.datos?.datos?.[0]?.nombre;
  const proximos = useRecurso<Listado<Evento>>(
    textos && ciudadPrincipal
      ? `/eventos?ciudad=${encodeURIComponent(ciudadPrincipal)}&pagina=1&porPagina=4&orden=fecha`
      : null,
  );
/*   const teatroManizales = useRecurso(
    textos
      ? (`/eventos?ciudad=${encodeURIComponent("Manizales")}&categoria=teatro&pagina=1&porPagina=3&orden=fecha`)
      : null,
  ); */
  const busqueda = useEventos();
  useEffect(() => {
    if (!textos) return;
    const esExplorar = busqueda.filtros !== null;
    document.title = esExplorar
      ? textos.paginas.explorar.seo.titulo
      : textos.paginas.inicio.seo.titulo;
  }, [textos, busqueda.filtros]);

  if (!textos) {
    if (errorTextos) {
      return (
        <main className="estado-inicial estado-inicial--error" role="alert">
          <div>
            <h1>No se pudo cargar Taquilla</h1>
            <p>{errorTextos.message}</p>
            <button type="button" onClick={reintentarTextos}>
              Reintentar
            </button>
          </div>
        </main>
      );
    }
    return (
      <main className="carga-inicial" role="status" aria-busy={cargandoTextos}>
        <span className="indicador-carga" aria-hidden="true" />
      </main>
    );
  }

  const pagina = textos.paginas.inicio;
  const paginaExplorar = textos.paginas.explorar;
  const esExplorar = busqueda.filtros !== null;
  const cargarRetry = (recurso: { recargar: () => void }) => recurso.recargar();
  const eventos = busqueda.filtros
    ? busqueda.resultados
    : (destacados.datos?.datos?.slice(0, 4) ?? []);
  const cargando = busqueda.filtros ? busqueda.cargando : destacados.cargando;
  const error = busqueda.filtros ? busqueda.error : destacados.error;
  const categoriasDatos = categorias.datos?.datos ?? [];
  const ciudadesDatos = ciudades.datos?.datos ?? [];
  const paginaTextos = {
    tarjeta: pagina.tarjeta,
    vacio: paginaExplorar.vacio,
    general: textos.general,
    estados: textos.estados,
    componentePaginacion: textos.componentes.paginacion,
  };

  function volverAExplorar() {
    busqueda.buscar({});
  }

  function abrirExplorar() {
    if (window.location.pathname !== "/explorar") {
      busqueda.buscar({});
    }
  }

  function aplicarBusqueda(valores: Filtros) {
    const { fecha, ...resto } = valores;
    busqueda.buscar({
      ...busqueda.filtros,
      ...resto,
      desde: fecha ?? "",
      hasta: fecha ?? "",
      fecha: undefined,
    });
  }

  return (
    <LayoutPublico destino="/explorar" onCuenta={abrirCuenta} onExplorar={abrirExplorar}>
      {!esExplorar && (
        <HeroTaquilla
          textos={pagina.hero}
          idioma={idioma}
          destacado={destacados.datos?.datos?.[0]}
        >
          <BuscadorEventos
            textos={pagina.hero.buscador}
            ciudades={ciudadesDatos}
            idioma={idioma}
            sugerencias={categoriasDatos.slice(0, 4)}
            onBuscar={aplicarBusqueda}
            filtrosAplicados={busqueda.filtros}
          />
          {ciudades.error && (
            <p role="alert">
              {textos.estados.error.texto}{" "}
              <button onClick={() => cargarRetry(ciudades)}>
                {textos.estados.error.botones.reintentar}
              </button>
            </p>
          )}
        </HeroTaquilla>
      )}
      {esExplorar && (
        <section className="explorar-cabecera ancho-home">
          <h1>{paginaExplorar.seo.titulo}</h1>
          <p role="status">
            {(busqueda.paginacion?.total === 1
              ? paginaExplorar.resultados.uno
              : paginaExplorar.resultados.otro
            ).replace("{cantidad}", String(busqueda.paginacion?.total ?? 0))}
          </p>
          <label className="orden-explorar">
            <span>{paginaExplorar.orden.etiqueta}</span>
            <select value={busqueda.filtros?.orden ?? "fecha"} onChange={(evento) => busqueda.buscar({ ...busqueda.filtros, orden: evento.target.value })}>
              {Object.entries(paginaExplorar.orden.opciones).map(([valor, etiqueta]) => <option key={valor} value={valor}>{etiqueta}</option>)}
            </select>
          </label>
        </section>
      )}
      <div className={`ancho-home ${esExplorar ? "explorar-resultados" : ""}`}>
        {!esExplorar && categorias.error ? (
          <p role="alert">
            {textos.estados.error.texto}{" "}
            <button onClick={() => cargarRetry(categorias)}>
              {textos.estados.error.botones.reintentar}
            </button>
          </p>
        ) : !esExplorar && (
          <CategoriasEventos
            categorias={categoriasDatos}
            filtros={busqueda.filtros}
            textos={{
              etiqueta: paginaExplorar.filtros.categoria,
              uno: pagina.categorias.eventos.uno,
              otro: pagina.categorias.eventos.otro,
            }}
            filtrarCategoria={busqueda.filtrarCategoria}
          />
        )}
        {esExplorar && (
          <FiltrosExplorar
            textos={paginaExplorar}
            general={textos.general}
            categorias={categoriasDatos}
            ciudades={ciudadesDatos}
            filtros={busqueda.filtros}
            eventos={busqueda.resultados}
            onCambiar={busqueda.buscar}
            onLimpiar={() => busqueda.buscar({})}
          />
        )}
        <SeccionEventos
          id="eventos"
          titulo={
            busqueda.filtros
              ? paginaExplorar.seo.titulo
              : pagina.destacados.titulo
          }
          descripcion={
            busqueda.filtros
              ? (busqueda.paginacion?.total === 1
                  ? paginaExplorar.resultados.uno
                  : paginaExplorar.resultados.otro
                ).replace("{cantidad}", String(busqueda.paginacion?.total ?? 0))
              : pagina.destacados.subtitulo
          }
          eventos={eventos}
          categorias={categoriasDatos}
          textos={paginaTextos}
          idioma={idioma}
          cargando={cargando}
          error={error}
          paginacion={busqueda.filtros ? busqueda.paginacion : null}
          onVerTodos={busqueda.filtros ? null : volverAExplorar}
          onLimpiar={busqueda.filtros ? () => busqueda.buscar({}) : null}
          onCambiarPagina={busqueda.cambiarPagina}
          onReintentar={() =>
            busqueda.filtros ? busqueda.recargar() : cargarRetry(destacados)
          }
          className={esExplorar ? "seccion-eventos--explorar" : ""}
        />
        {!busqueda.filtros && ciudadPrincipal && (
          <SeccionEventos
            id="eventos-ciudad"
            titulo={pagina.proximos.titulo.replace("{ciudad}", ciudadPrincipal)}
            descripcion={pagina.proximos.subtitulo.replace("{ciudad}", ciudadPrincipal)}
            eventos={proximos.datos?.datos ?? []}
            categorias={categoriasDatos}
            textos={paginaTextos}
            idioma={idioma}
            cargando={proximos.cargando}
            error={proximos.error}
            onVerTodos={() =>
              window.location.assign(
                `/explorar?ciudad=${encodeURIComponent(ciudadPrincipal)}&orden=fecha`,
              )
            }
            onReintentar={() => cargarRetry(proximos)}
          />
        )}
        {/* {!busqueda.filtros && (
          <SeccionEventos
            id="teatro-manizales"
            titulo="Teatro en Manizales"
            descripcion="Tres eventos de teatro en Manizales"
            eventos={teatroManizales.datos?.datos ?? []}
            categorias={categoriasDatos}
            textos={paginaTextos}
            idioma={idioma}
            cargando={teatroManizales.cargando}
            error={teatroManizales.error}
            onVerTodos={() =>
              window.location.assign(
                "/explorar?ciudad=Manizales&categoria=teatro&orden=fecha",
              )
            }
            onReintentar={() => cargarRetry(teatroManizales)}
          />
        )} */}
      </div>
    </LayoutPublico>
  );
}
