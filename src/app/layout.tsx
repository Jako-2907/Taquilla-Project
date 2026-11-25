import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { SesionProvider } from "../context/SesionContext";
import { PreferenciasProvider } from "../context/PreferenciasContext";
import type { Consentimiento, Idioma } from "../types/api";
import "../styles/tokens.css";
import "../styles/base.css";

export const metadata = {
  icons: { icon: "/favicon.svg" },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const preferencias = await cookies();
  const valor = preferencias.get("consentimiento")?.value;
  const consentimiento: Consentimiento = valor === "aceptado" || valor === "rechazado" ? valor : null;
  const idioma: Idioma = consentimiento === "aceptado" && preferencias.get("idioma")?.value === "en" ? "en" : "es";

  return (
    <html lang={idioma}>
      <body>
        <PreferenciasProvider idiomaInicial={idioma} consentimientoInicial={consentimiento}>
          <SesionProvider>{children}</SesionProvider>
        </PreferenciasProvider>
      </body>
    </html>
  );
}
