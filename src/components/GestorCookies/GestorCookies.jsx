import { useState } from "react";
import { usePreferencias } from "../../context/PreferenciasContext.jsx";
import BannerCookies from "../BannerCookies/BannerCookies.jsx";
import "./GestorCookies.css";

export default function GestorCookies() {
  const { consentimiento, guardarConsentimiento, textos, error } =
    usePreferencias();
  const [mensaje, setMensaje] = useState(false);
  if (!textos) return null;
  const cookies = textos.cookies.banner;

  function guardar(permitir) {
    if (guardarConsentimiento(permitir)) setMensaje(true);
  }

  return (
    <>
      {!consentimiento && (
        <BannerCookies
          textos={cookies}
          onAceptar={() => guardar(true)}
          onRechazar={() => guardar(false)}
        />
      )}
      {error && !consentimiento && (
        <p className="error-cookies" role="alert">
          {textos.estados.error.texto}
        </p>
      )}
      <span className="solo-lectores" role="status">
        {mensaje ? textos.cookies.preferencias.mensajes.guardada : ""}
      </span>
    </>
  );
}
