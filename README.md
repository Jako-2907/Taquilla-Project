# Taquilla

Desarrollé Taquilla como una aplicación frontend para descubrir eventos. Usé Next.js con App Router, React y TypeScript. La interfaz consulta una API para obtener eventos, categorías, ciudades y textos en español e inglés.

## Requisitos

- Node.js 20.19 o superior, o Node.js 22.12 o superior.
- npm.

## Instalación

```sh
npm ci
```

La aplicación usa esta API por defecto. Si necesito otra dirección, creo `.env.local` en la raíz y defino `NEXT_PUBLIC_API_BASE_URL`:

```env
NEXT_PUBLIC_API_BASE_URL=https://yanethm-taquilla-api.fly.dev/api/v1
```

Next.js expone al navegador las variables que empiezan con `NEXT_PUBLIC_`. No guardo credenciales en ellas.

## Comandos

```sh
npm run dev
npm run build
npm run start
npm run typecheck
```

`npm run dev` inicia el servidor local. `npm run build` genera la versión de producción y `npm run start` la sirve localmente.

## Despliegue en Vercel

Vercel detecta Next.js. App Router sirve directamente la ruta `/explorar` y conserva los parámetros de búsqueda al recargar.

## Estructura del proyecto

- `src/app/layout.tsx` carga los estilos globales y el proveedor de preferencias.
- `src/views/Home.tsx` contiene la interfaz que comparten las rutas de inicio y exploración.
- `src/components/`: guarda los componentes de interfaz. La mayoría tiene su hoja CSS en la misma carpeta.
- `src/context/PreferenciasContext.tsx`: comparte el idioma, los textos de interfaz, el consentimiento de cookies y las funciones para modificarlos.
- `src/hooks/useRecurso.ts`: consulta un recurso y expone sus datos, el estado de carga, el error y la función para reintentar.
- `src/hooks/useEventos.ts`: consulta eventos y administra los filtros, la paginación y la sincronización de la búsqueda con la URL.
- `src/services/api.ts`: centraliza las llamadas con `fetch`, valida el tipo de respuesta y prepara los errores.
- `src/services/cookies.ts`: lee, guarda y borra cookies.
- `src/config/proyecto.ts`: define el nombre, el identificador y la dirección base de la API.
- `src/styles/`: contiene los estilos generales, los tokens visuales y la escala de texto.
- `public/assets/recursos-taquilla/`: contiene los iconos, logos y otros recursos gráficos.

## Flujo de datos

App Router monta `Home` dentro del contexto de preferencias. `Home` usa `useRecurso` para pedir destacados, categorías y ciudades, y usa `useEventos` para consultar y filtrar eventos. Ambos hooks llaman a `consultar`, que está en `services/api.ts`. Luego `Home` pasa los datos y las funciones como props a componentes como `SeccionEventos`, `BuscadorEventos`, `FiltrosExplorar` y `TarjetaEvento`.

La portada consulta `/eventos/destacados`, `/categorias` y `/ciudades`. El contexto consulta `/textos?idioma=es` o `/textos?idioma=en`. La vista `/explorar` consulta `/eventos` con búsqueda, categoría, ciudad, orden y paginación.

## Idioma, cookies y accesibilidad

`PreferenciasContext` administra el idioma y los textos de la interfaz. `services/cookies.ts` permite guardar el consentimiento y, cuando la persona acepta, conservar el idioma. El componente `Accesibilidad` ofrece controles de tamaño de texto, contraste, movimiento, subrayado de enlaces y espaciado de lectura.

Los nombres de categorías y ciudades se muestran como los devuelve la API. Los iconos y logos se sirven desde `public/assets/recursos-taquilla/`.

## Sprint 2

- `/eventos/la-casa-de-los-relojes` abre un evento de referencia. El detalle usa metadatos de App Router e incluye afiche, funciones, localidades, mapa y hasta cuatro relacionados. Una URL con un slug inexistente responde `404`.
- `/explorar?q=zzzz` muestra la búsqueda vacía. Para probar latencia y error en la API oficial, envía `X-Simular-Latencia: 2000` o `X-Simular-Error: 503` desde un cliente de pruebas. La aplicación no envía estas cabeceras.
- `/iniciar-sesion` usa las cuentas de prueba descritas por la API. El servidor de Next.js guarda la sesión en una cookie `httpOnly` y el navegador recibe solo los datos de cuenta. El contrato indica una duración de 12 horas para la sesión. Si se desmarca la opción de mantenerla, la cookie dura lo que dure la sesión del navegador. [Contrato de la API](https://yanethm-taquilla-api.fly.dev/docs/contrato)
- `TAQUILLA_API_BASE_URL` es una variable opcional de servidor para cambiar la API usada por el Route Handler de sesión. La configuración pública se controla con `NEXT_PUBLIC_API_BASE_URL`.

En Vercel, usa el preset **Next.js** y el comando de compilación del repositorio. La sesión requiere el runtime de Next.js. [Repositorio en GitHub](https://github.com/Jako-2907/Taquilla-Project)

### Demostración de cinco minutos

1. **0:00–1:00** · Abre Inicio, cambia a inglés y entra a Explorar. Busca `zzzz` para mostrar el estado vacío.
2. **1:00–2:30** · Abre el evento de referencia y muestra metadatos, funciones, localidades, mapa y relacionados. Cambia a vista móvil y usa «Leer más». Abre un slug inexistente para mostrar el 404.
3. **2:30–4:00** · En ingreso, envía el formulario vacío, alterna la visibilidad de la clave y prueba las credenciales de la cuenta de clase. Usa un correo de prueba inventado para mostrar los intentos fallidos y el contador si corresponde.
4. **4:00–5:00** · Recarga tras iniciar sesión. Muestra el nombre y el menú en ambos tamaños, y cierra la sesión.

### Historial local

La migración precede a `feature/event-detail`, `feature/view-states`, `feature/login`, `feature/login-states` y `feature/session-management`. Cada rama se construyó sobre la anterior. Puedes revisar la diferencia de cada entrega con `git diff rama-anterior...rama-de-la-historia` y su commit con `git log rama-anterior..rama-de-la-historia --oneline`. Para publicar posteriormente, integra las ramas en ese orden y ajusta la base del PR según la rama que ya esté integrada. Los cambios del Sprint 2 están locales.
