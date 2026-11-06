# Recursos de diseño de Taquilla

Lo que necesitas del diseño para construir la interfaz, sin abrir el archivo de Figma en modo edición.

- `tokens.css`: colores, espaciados, radios, sombras y familias como variables CSS, y los estilos de texto como clases.
- `tokens.json`: los mismos valores en JSON (por ejemplo, para llevarlos a la configuración de Tailwind).
- `iconos/`: 44 iconos en SVG con `currentColor`: toman el color del texto que los rodea.
- `logos/`: el logo en SVG.

## Tipografías

Todas son de Google Fonts. En Next.js se cargan con `next/font/google`:

- Instrument Sans

Búscalas en https://fonts.google.com/?query=Instrument+Sans

## Uso rápido

```css
@import './tokens.css';

.tarjeta {
  background: var(--fondo-superficie);
  border-radius: var(--radio-lg, 16px);
  box-shadow: var(--sombra-tarjeta, none);
}
```

Las medidas exactas de cada pantalla (márgenes, tamaños, alineaciones) se miran en Figma con el modo de inspección.
