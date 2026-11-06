import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import "./EventoDestacado.css";

const moneda = (valor) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);

export default function EventoDestacado({ evento, textos, idioma }) {
  if (!evento) return null;
  const tieneHora = typeof evento.fecha === "string" && /T\d{2}:\d{2}/.test(evento.fecha);
  const fecha = new Intl.DateTimeFormat(idioma === "en" ? "en" : "es-CO", {
    dateStyle: "medium",
    ...(tieneHora && { timeStyle: "short" }),
    timeZone: "America/Bogota",
  }).format(new Date(evento.fecha));
  return (
    <div className="destacado-taquilla">
      <AficheEvento afiche={evento.afiche} />
      <div className="ficha-destacado">
        <span className="etiqueta-evento">{textos.etiqueta}</span>
        <h2>{evento.titulo}</h2>
        <p>
          {fecha} {"\u00B7"} {evento.recinto.nombre}
        </p>
        <div>
          <strong>
            {textos.desde.replace("{precio}", moneda(evento.precioDesde))}
          </strong>
          <a
            className="boton-home primario"
            href={`/eventos/${evento.slug}`}
          >
            {textos.botones.verEvento}
          </a>
        </div>
      </div>
    </div>
  );
}
