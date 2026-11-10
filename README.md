# Taquilla

Desarrollé Taquilla como una aplicación frontend para descubrir eventos. Usé React y Vite. La interfaz consulta una API para obtener eventos, categorías, ciudades y textos en español e inglés.

## Requisitos

- Node.js 20.19 o superior, o Node.js 22.12 o superior.
- npm.

## Instalación

```sh
npm ci
```

La aplicación usa esta API por defecto. Si necesito otra dirección, creo `.env.local` en la raíz y defino `VITE_API_BASE_URL`:

```env
VITE_API_BASE_URL=https://yanethm-taquilla-api.fly.dev/api/v1
```

Vite expone al navegador las variables que empiezan con `VITE_`. No guardo credenciales en ellas.

## Comandos

```sh
npm run dev
npm run build
npm run preview
```

`npm run dev` inicia el servidor local. `npm run build` genera la versión de producción y `npm run preview` permite revisar esa versión.

## Despliegue en Vercel

`vercel.json` reescribe `/explorar` a la entrada de la aplicación. Así Vercel sirve la SPA cuando abro o recargo una URL como `/explorar?categoria=teatro`, y React conserva los parámetros para cargar los filtros.

## Estructura del proyecto

- `src/main.jsx`: carga los estilos globales, crea la raíz de React y envuelve la aplicación con `PreferenciasProvider`.
- `src/pages/Home.jsx`: arma la página principal y la vista `/explorar`. La vista depende de `window.location.pathname`; el proyecto no usa una librería de rutas.
- `src/components/`: guarda los componentes de interfaz. La mayoría tiene su hoja CSS en la misma carpeta.
- `src/context/PreferenciasContext.jsx`: comparte el idioma, los textos de interfaz, el consentimiento de cookies y las funciones para modificarlos.
- `src/hooks/useRecurso.js`: consulta un recurso y expone sus datos, el estado de carga, el error y la función para reintentar.
- `src/hooks/useEventos.js`: consulta eventos y administra los filtros, la paginación y la sincronización de la búsqueda con la URL.
- `src/services/api.js`: centraliza las llamadas con `fetch`, valida el tipo de respuesta y prepara los errores.
- `src/services/cookies.js`: lee, guarda y borra cookies.
- `src/config/proyecto.js`: define el nombre, el identificador y la dirección base de la API.
- `src/styles/`: contiene los estilos generales, los tokens visuales y la escala de texto.
- `public/assets/recursos-taquilla/`: contiene los iconos, logos y otros recursos gráficos.

## Flujo de datos

`main.jsx` monta `Home` dentro del contexto de preferencias. `Home` usa `useRecurso` para pedir destacados, categorías y ciudades, y usa `useEventos` para consultar y filtrar eventos. Ambos hooks llaman a `consultar`, que está en `services/api.js`. Luego `Home` pasa los datos y las funciones como props a componentes como `SeccionEventos`, `BuscadorEventos`, `FiltrosExplorar` y `TarjetaEvento`.

La portada consulta `/eventos/destacados`, `/categorias` y `/ciudades`. El contexto consulta `/textos?idioma=es` o `/textos?idioma=en`. La vista `/explorar` consulta `/eventos` con búsqueda, categoría, ciudad, orden y paginación.

## Idioma, cookies y accesibilidad

`PreferenciasContext` administra el idioma y los textos de la interfaz. `services/cookies.js` permite guardar el consentimiento y, cuando la persona acepta, conservar el idioma. El componente `Accesibilidad` ofrece controles de tamaño de texto, contraste, movimiento, subrayado de enlaces y espaciado de lectura.

Los nombres de categorías y ciudades se muestran como los devuelve la API. Los iconos y logos se sirven desde `public/assets/recursos-taquilla/`.
