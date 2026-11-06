import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import "./TarjetaEvento.css";

const moneda = (valor) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);

export default function TarjetaEvento({ evento, categoria, textos, idioma }) {
  const fecha = new Date(evento.fecha);
  const tieneHora = typeof evento.fecha === "string" && /T\d{2}:\d{2}/.test(evento.fecha);
  const fechaTexto = new Intl.DateTimeFormat(idioma === "en" ? "en" : "es-CO", {
    weekday: "short",
    month: "short",
    day: "numeric",
    ...(tieneHora && { hour: "numeric", minute: "2-digit" }),
    timeZone: "America/Bogota",
  }).format(fecha);
  return (
    <article className="tarjeta-evento">
      <AficheEvento afiche={evento.afiche} />
      <div className="contenido-evento">
        <span className="etiqueta-evento">{categoria}</span>
        <h3>{evento.titulo}</h3>
        <p>
          <IconoEvento tipo="fecha" />
          {fechaTexto}
        </p>
        <p>
          <IconoEvento tipo="lugar" />
          {evento.recinto.nombre}, {evento.recinto.ciudad}
        </p>
        <div className="precio-evento">
          <div>
            <small>{textos.desde}</small>
            <strong>{moneda(evento.precioDesde)}</strong>
          </div>
          <a
            className="boton-home secundario"
            href={`/eventos/${evento.slug}`}
            aria-label={`${textos.botones.verEvento}: ${evento.titulo}`}
          >
            {textos.botones.verEvento}
          </a>
        </div>
      </div>
    </article>
  );
}
