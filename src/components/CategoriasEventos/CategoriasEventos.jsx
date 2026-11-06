import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import "./CategoriasEventos.css";

export default function CategoriasEventos({
  categorias,
  filtros,
  textos,
  filtrarCategoria,
}) {
  return (
    <nav className="categorias-eventos" aria-label={textos.etiqueta}>
      {categorias.map((categoria) => (
        <button
          key={categoria.id}
          aria-pressed={filtros?.categoria === categoria.id}
          onClick={() => filtrarCategoria(categoria.id)}
        >
          <span className="icono-categoria">
            <IconoEvento tipo={categoria.id} />
          </span>
          <span>
            {categoria.nombre}
            <small>
              {(categoria.eventos === 1 ? textos.uno : textos.otro).replace(
                "{cantidad}",
                categoria.eventos,
              )}
            </small>
          </span>
        </button>
      ))}
    </nav>
  );
}
