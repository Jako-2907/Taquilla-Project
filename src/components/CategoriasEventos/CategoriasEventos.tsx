import IconoEvento from "../IconoEvento/IconoEvento";
import "./CategoriasEventos.css";

import type { Categoria, Filtros } from "../../types/api";

export default function CategoriasEventos({
  categorias,
  filtros,
  textos,
  filtrarCategoria,
}: { categorias: Categoria[]; filtros: Filtros | null; textos: { etiqueta: string; uno: string; otro: string }; filtrarCategoria: (categoria: string) => void }) {
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
                String(categoria.eventos),
              )}
            </small>
          </span>
        </button>
      ))}
    </nav>
  );
}
