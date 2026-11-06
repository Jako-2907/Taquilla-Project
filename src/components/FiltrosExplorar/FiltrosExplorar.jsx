import { useMemo, useState } from "react";
import "./FiltrosExplorar.css";

export default function FiltrosExplorar({ textos, general, categorias, ciudades, filtros, eventos, onCambiar, onLimpiar }) {
  const [abierto, setAbierto] = useState(true);
  const maximo = useMemo(() => (eventos ?? []).reduce((mayor, evento) => Math.max(mayor, Number(evento.precioDesde) || 0), 0), [eventos]);

  function cambiar(clave, valor) {
    onCambiar({ ...filtros, [clave]: valor });
  }

  return (
    <aside className="filtros-explorar">
      <details open={abierto} onToggle={(evento) => setAbierto(evento.currentTarget.open)}>
        <summary aria-label={textos.filtros.titulo}>{textos.filtros.titulo}</summary>
        <div className="filtros-explorar__contenido">
          <div className="filtros-explorar__titulo">
            <h2>{textos.filtros.titulo}</h2>
            <button type="button" onClick={onLimpiar}>{textos.filtros.botones.limpiar}</button>
          </div>
          <fieldset className="filtros-explorar__categorias">
            <legend>{textos.filtros.categoria}</legend>
            <label>
              <input type="radio" name="categoria" checked={!filtros?.categoria} onChange={() => cambiar("categoria", "")} />
              <span>{general.categorias.todas}</span>
            </label>
            {categorias.map((item) => (
              <label key={item.id}>
                <input type="radio" name="categoria" checked={filtros?.categoria === item.id} onChange={() => cambiar("categoria", item.id)} />
                <span>{item.nombre}</span><small>{item.eventos}</small>
              </label>
            ))}
          </fieldset>
          <fieldset className="filtros-explorar__fechas">
            <legend>{textos.filtros.fecha.titulo}</legend>
            <button type="button" aria-pressed={filtros?.fechaRapida === "hoy"} onClick={() => cambiar("fechaRapida", "hoy")}>{textos.filtros.fecha.hoy}</button>
            <button type="button" aria-pressed={filtros?.fechaRapida === "finDeSemana"} onClick={() => cambiar("fechaRapida", "finDeSemana")}>{textos.filtros.fecha.finDeSemana}</button>
            <button type="button" aria-pressed={filtros?.fechaRapida === "mes"} onClick={() => cambiar("fechaRapida", "mes")}>{textos.filtros.fecha.mes}</button>
            <label className="solo-lectores" htmlFor="filtro-fecha">{textos.filtros.fecha.elegir}</label>
            <input id="filtro-fecha" type="date" value={filtros?.desde ?? ""} onChange={(e) => onCambiar({ ...filtros, desde: e.target.value, hasta: e.target.value, fechaRapida: "" })} />
          </fieldset>
          <label className="filtros-explorar__campo">
            <span>{textos.filtros.ciudad}</span>
            <select value={filtros?.ciudad ?? ""} onChange={(e) => cambiar("ciudad", e.target.value)}>
              <option value="">{general.acciones.verTodos}</option>
              {ciudades.map((item) => <option value={item.nombre} key={item.nombre}>{item.nombre}</option>)}
            </select>
          </label>
          <label className="filtros-explorar__campo">
            <span>{textos.filtros.precio}</span>
            <input type="range" min="0" max={maximo} step={Math.max(1, Math.round(maximo / 20))} value={filtros?.precioMax || maximo} onChange={(e) => cambiar("precioMax", e.target.value)} disabled={!maximo} />
            <small>{new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(Number(filtros?.precioMax || maximo))}</small>
          </label>
        </div>
      </details>
    </aside>
  );
}
