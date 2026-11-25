import "./BannerCookies.css";

import type { Textos } from "../../types/textos";

export default function BannerCookies({ textos, onAceptar, onRechazar }: { textos: Textos["cookies"]["banner"]; onAceptar: () => void; onRechazar: () => void }) {
  return (
    <aside className="banner-cookies" aria-label={textos.titulo}>
      <h2>{textos.titulo}</h2>
      <p>{textos.texto}</p>
      <div className="grupo-botones">
        <button className="boton-home secundario" onClick={onRechazar}>
          {textos.botones.rechazar}
        </button>
        <button className="boton-home primario" onClick={onAceptar}>
          {textos.botones.aceptar}
        </button>
      </div>
    </aside>
  );
}
