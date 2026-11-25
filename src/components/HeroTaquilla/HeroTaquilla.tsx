import EventoDestacado from "../EventoDestacado/EventoDestacado";
import "./HeroTaquilla.css";

import type { Evento, Idioma } from "../../types/api";
import type { Textos } from "../../types/textos";

export default function HeroTaquilla({ textos, idioma, children, destacado }: { textos: Textos["paginas"]["inicio"]["hero"]; idioma: Idioma; children: React.ReactNode; destacado?: Evento }) {
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
