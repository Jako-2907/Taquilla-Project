import type { ReactNode } from "react";
import { SesionProvider } from "../context/SesionContext";
import { PreferenciasProvider } from "../context/PreferenciasContext";
import "../styles/tokens.css";
import "../styles/base.css";

export const metadata = {
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body><PreferenciasProvider><SesionProvider>{children}</SesionProvider></PreferenciasProvider></body>
    </html>
  );
}
