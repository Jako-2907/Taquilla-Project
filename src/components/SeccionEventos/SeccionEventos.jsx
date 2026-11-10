import Flecha from "../Flecha/Flecha.jsx";
import TarjetaEvento from "../TarjetaEvento/TarjetaEvento.jsx";
import "./SeccionEventos.css";

function crearPaginas(paginaActual, totalPaginas) {
  if (totalPaginas <= 5) {
    return Array.from({ length: totalPaginas }, (_, indice) => indice + 1);
  }

  const primeraVisible = paginaActual <= 2 ? 1 : Math.max(2, paginaActual - 1);
  const ultimaVisible =
    paginaActual <= 2
      ? Math.min(totalPaginas - 1, 3)
      : paginaActual >= totalPaginas - 1
        ? totalPaginas
        : Math.min(totalPaginas - 1, paginaActual + 1);
  const paginas = [1];

  if (primeraVisible > 2) paginas.push("ellipsis");
  for (
    let pagina = Math.max(2, primeraVisible);
    pagina <= Math.min(totalPaginas - 1, ultimaVisible);
    pagina += 1
  ) {
    paginas.push(pagina);
  }
  if (ultimaVisible < totalPaginas - 1) paginas.push("ellipsis");
  paginas.push(totalPaginas);

  return paginas;
}

export default function SeccionEventos({
  id,
  titulo,
  descripcion,
  eventos,
  categorias,
  textos,
  idioma,
  cargando,
  error,
  paginacion,
  onVerTodos,
  onLimpiar,
  onCambiarPagina,
  onReintentar,
  className = "",
}) {
  return (
    <section className={`seccion-eventos ${className}`} id={id} aria-labelledby={`${id}-titulo`}>
      <div className="titulo-seccion">
        <div>
          <h2 id={`${id}-titulo`}>{titulo}</h2>
          <p role="status">{descripcion}</p>
        </div>
        {onVerTodos && (
          <button className="enlace-home" onClick={onVerTodos}>
            {textos.general.acciones.verTodos}
            <Flecha />
          </button>
        )}
      </div>
      {cargando && (
        <p role="status" aria-live="polite">
          {textos.estados.cargando.texto}
        </p>
      )}
      {error && (
        <div role="alert">
          <p>{textos.estados.error.texto}</p>
          <button className="boton-home secundario" onClick={onReintentar}>
            {textos.estados.error.botones.reintentar}
          </button>
        </div>
      )}
      {!cargando && !error && eventos.length > 0 && (
        <div className="eventos-grid">
          {eventos.map((evento) => (
            <TarjetaEvento
              key={evento.id}
              evento={evento}
              categoria={categorias.find((item) => item.id === evento.categoria)?.nombre ?? evento.categoria}
              textos={textos.tarjeta}
              idioma={idioma}
            />
          ))}
        </div>
      )}
      {!cargando && !error && eventos.length === 0 && (
        <div className="sin-resultados">
          <h3>{textos.vacio.titulo}</h3>
          <p>{textos.vacio.texto}</p>
          {onLimpiar ? (
            <button className="boton-home primario" onClick={onLimpiar}>
              {textos.vacio.botones.limpiar}
            </button>
          ) : (
            onVerTodos && (
              <button className="boton-home primario" onClick={onVerTodos}>
                {textos.general.acciones.verTodos}
              </button>
            )
          )}
        </div>
      )}
      {!cargando && !error && paginacion && paginacion.paginas > 1 && (
        <nav className="paginacion-eventos" aria-label={textos.componentePaginacion.aria.etiqueta}>
          <button
            className="paginacion-eventos__boton"
            disabled={paginacion.pagina <= 1}
            onClick={() => onCambiarPagina(paginacion.pagina - 1)}
            aria-label={textos.componentePaginacion.aria.anterior}
          >
            <span className="icono-paginacion icono-paginacion--anterior" aria-hidden="true" />
          </button>
          {crearPaginas(paginacion.pagina, paginacion.paginas).map((pagina, indice) =>
            pagina === "ellipsis" ? (
              <span className="paginacion-eventos__ellipsis" aria-hidden="true" key={`ellipsis-${indice}`}>
                …
              </span>
            ) : (
              <button
                className={`paginacion-eventos__boton paginacion-eventos__pagina${
                  pagina === paginacion.pagina ? " paginacion-eventos__pagina--actual" : ""
                }`}
                type="button"
                key={pagina}
                aria-label={textos.componentePaginacion.aria.paginaActual.replace(
                  "{numero}",
                  pagina,
                )}
                aria-current={pagina === paginacion.pagina ? "page" : undefined}
                onClick={() => onCambiarPagina(pagina)}
              >
                {pagina}
              </button>
            ),
          )}
          <button
            className="paginacion-eventos__boton"
            disabled={paginacion.pagina >= paginacion.paginas}
            onClick={() => onCambiarPagina(paginacion.pagina + 1)}
            aria-label={textos.componentePaginacion.aria.siguiente}
          >
            <span className="icono-paginacion icono-paginacion--siguiente" aria-hidden="true" />
          </button>
        </nav>
      )}
    </section>
  );
}
