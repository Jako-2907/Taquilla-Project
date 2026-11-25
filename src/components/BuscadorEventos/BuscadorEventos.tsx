import { useEffect, useState } from "react";
import IconoEvento from "../IconoEvento/IconoEvento";
import "./BuscadorEventos.css";

import type { Categoria, Ciudad, Filtros, Idioma } from "../../types/api";
import type { Textos } from "../../types/textos";

export default function BuscadorEventos({
  textos,
  ciudades,
  idioma,
  sugerencias = [],
  onBuscar,
  filtrosAplicados,
}: { textos: Textos["paginas"]["inicio"]["hero"]["buscador"]; ciudades: Ciudad[]; idioma: Idioma; sugerencias?: Categoria[]; onBuscar: (filtros: Filtros) => void; filtrosAplicados: Filtros | null }) {
  const [consulta, setConsulta] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [fecha, setFecha] = useState("");
  useEffect(() => {
    setConsulta(filtrosAplicados?.consulta ?? "");
    setCiudad(filtrosAplicados?.ciudad ?? "");
    setFecha(filtrosAplicados?.fecha ?? filtrosAplicados?.desde ?? "");
  }, [filtrosAplicados]);

  function buscar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    onBuscar({ consulta, ciudad, fecha });
  }

  function buscarCategoria(categoria: Categoria) {
    onBuscar({ consulta: "", ciudad, fecha, categoria: categoria.id });
  }

  const fechaPresentada = fecha
    ? new Intl.DateTimeFormat(idioma === "en" ? "en" : "es-CO", {
        dateStyle: "medium",
        timeZone: "UTC",
      }).format(new Date(`${fecha}T12:00:00Z`))
    : textos.placeholders.cuando;

  return (
    <>
      <form
        id="buscador-eventos"
        className="buscador-eventos"
        role="search"
        onSubmit={buscar}
        aria-label={textos.etiquetas.que}
      >
        <label>
          <IconoEvento tipo="buscar" />
          <span>
            <span>{textos.etiquetas.que}</span>
            <input type="search" value={consulta} onChange={(e) => setConsulta(e.target.value)} placeholder={textos.placeholders.que} />
          </span>
        </label>
        <label>
          <IconoEvento tipo="lugar" />
          <span>
            <span>{textos.etiquetas.donde}</span>
            <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
              <option value="">{textos.etiquetas.donde}</option>
              {ciudades.map((opcion) => <option key={opcion.nombre} value={opcion.nombre}>{opcion.nombre}</option>)}
            </select>
          </span>
        </label>
        <label>
          <IconoEvento tipo="fecha" />
          <span>
            <span>{textos.etiquetas.cuando}</span>
            <span className="fecha-buscador">
              <span aria-hidden="true">{fechaPresentada}</span>
              <input type="date" value={fecha} aria-label={`${textos.etiquetas.cuando}: ${fechaPresentada}`} onChange={(e) => setFecha(e.target.value)} />
            </span>
          </span>
        </label>
        <button className="boton-home primario" type="submit">{textos.botones.buscar}</button>
      </form>
      {sugerencias.length > 0 && (
        <nav className="sugerencias-busqueda" aria-label={textos.populares}>
          <span>{textos.populares}</span>
          {sugerencias.map((categoria) => (
            <button type="button" key={categoria.id} onClick={() => buscarCategoria(categoria)}>{categoria.nombre}</button>
          ))}
        </nav>
      )}
    </>
  );
}
