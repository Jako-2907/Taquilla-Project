import "./SelectorIdioma.css";
export default function SelectorIdioma({ idioma, onCambiar, etiqueta, textos }) {
  return (
    <div className="idiomas-home" role="group" aria-label={etiqueta}>
      {[{ codigo: "es", etiqueta: textos.es }, { codigo: "en", etiqueta: textos.en }].map(({ codigo, etiqueta: nombre }) => (
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
