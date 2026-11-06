# Taquilla

Frontend para descubrir eventos. Este repositorio conserva su implementación existente con React y Vite; este Sprint conecta la página pública con la API oficial y consume desde ella los textos de interfaz en español e inglés.

## Requisitos

- Node.js 20.19+ o 22.12+.
- npm.

## Configuración

```sh
npm ci
```

Copia `.env.example` como `.env.local` y configura la dirección base de la API si necesitas usar otro entorno:

```env
VITE_API_BASE_URL=https://yanethm-taquilla-api.fly.dev/api/v1
```

Vite carga las variables `VITE_*` en el cliente. No guardes credenciales en este archivo.

## Desarrollo y producción

```sh
npm run dev
npm run build
npm run preview
```

## Integración

- `src/services/api.js`: cliente HTTP y errores del contrato.
- `src/context/PreferenciasContext.jsx`: idioma, textos de API y consentimiento.
- `src/hooks/useRecurso.js`: carga de recursos con cancelación y reintento.
- `src/hooks/useEventos.js`: filtros y paginación de `/eventos`, sincronizados con la URL.
- `src/pages/Home.jsx`: vistas `/` y `/explorar`.
- `src/styles/tokens.css`: tokens visuales y escala de texto accesible.

La portada consulta `/eventos/destacados`, `/categorias`, `/ciudades` y `/textos?idioma=es|en`. Explorar envía a `/eventos` únicamente los filtros definidos en el contrato: categoría, ciudad, búsqueda, orden y paginación. El diseño de referencia también muestra filtros por fecha y precio, pero esos parámetros no aparecen en el contrato vigente de la API.

Los textos de interfaz provienen de `/textos`; los nombres del catálogo se muestran como los devuelve la API. Las decisiones de cookies se guardan en `consentimiento` y, solo al aceptar, el idioma elegido se guarda en `idioma`.

Los tokens oficiales de Figma están en `src/styles/tokens.css`; los iconos y logos entregados para el proyecto se sirven desde `public/assets/recursos-taquilla/`. `vercel.json` reescribe `/explorar` a la entrada de la SPA para que la ruta directa funcione en Vercel.

El panel de accesibilidad permite cambiar el tamaño del texto, alto contraste, movimiento, subrayado de enlaces y espaciado de lectura. Las preferencias se guardan en este dispositivo.
