import "./SelectorIdioma.css";
import type { Idioma } from "../../types/api";
import type { Textos } from "../../types/textos";

export default function SelectorIdioma({ idioma, onCambiar, etiqueta, textos }: { idioma: Idioma; onCambiar: (idioma: Idioma) => void; etiqueta: string; textos: Textos["idioma"] }) {
  return (
    <div className="idiomas-home" role="group" aria-label={etiqueta}>
      {([{ codigo: "es", etiqueta: textos.es }, { codigo: "en", etiqueta: textos.en }] as const).map(({ codigo, etiqueta: nombre }) => (
        <button
          type="button"
          key={codigo}
          lang={codigo}
          aria-pressed={idioma === codigo}
          onClick={() => onCambiar(codigo)}
        >
          {codigo === "es" ? textos.codigoEs : textos.codigoEn}
          <span className="solo-lectores">{nombre}</span>
        </button>
      ))}
    </div>
  );
}
