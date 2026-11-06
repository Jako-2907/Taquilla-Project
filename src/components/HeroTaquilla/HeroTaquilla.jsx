import EventoDestacado from "../EventoDestacado/EventoDestacado.jsx";
import "./HeroTaquilla.css";

export default function HeroTaquilla({ textos, idioma, children, destacado }) {
  return (
    <section className="hero-taquilla">
      <div className="ancho-home interior-taquilla">
        <div>
          <span className="etiqueta-evento">{textos.etiquetas.temporada}</span>
          <h1>{textos.titulo}</h1>
          <p>{textos.subtitulo}</p>
          {children}
        </div>
        <EventoDestacado
          evento={destacado}
          textos={textos.destacado}
          idioma={idioma}
        />
      </div>
    </section>
  );
}
