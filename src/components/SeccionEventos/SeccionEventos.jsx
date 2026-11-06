import Flecha from "../Flecha/Flecha.jsx";
import TarjetaEvento from "../TarjetaEvento/TarjetaEvento.jsx";
import "./SeccionEventos.css";

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
            className="boton-home secundario"
            disabled={paginacion.pagina <= 1}
            onClick={() => onCambiarPagina(paginacion.pagina - 1)}
            aria-label={textos.componentePaginacion.aria.anterior}
          >
            {textos.componentePaginacion.aria.anterior}
          </button>
          <span aria-live="polite">
            {textos.componentePaginacion.aria.paginaActual.replace("{numero}", paginacion.pagina)}
          </span>
          <button
            className="boton-home secundario"
            disabled={paginacion.pagina >= paginacion.paginas}
            onClick={() => onCambiarPagina(paginacion.pagina + 1)}
            aria-label={textos.componentePaginacion.aria.siguiente}
          >
            {textos.componentePaginacion.aria.siguiente}
          </button>
        </nav>
      )}
    </section>
  );
}
