# Registro de apoyo con IA

En este archivo dejo constancia de los casos en que usé apoyo de IA durante el desarrollo. Describo los errores que detecté y las acciones que tomé para corregirlos.

## 2026-11-03 — La API parecía inaccesible

- **Conclusión inicial equivocada:** la herramienta web no abrió `/docs`, `/docs/contrato` ni Figma, así que concluí que tampoco podía consultar la documentación de la API.
- **Por qué me equivoqué:** el error pertenecía a la herramienta, no al servidor de Taquilla.
- **Cómo lo detecté:** hice una consulta de solo lectura al documento OpenAPI. El servidor respondió `200` y mostró las rutas y los parámetros disponibles.
- **Qué hice:** verifiqué `/textos`, `/eventos`, `/eventos/destacados`, `/categorias` y `/ciudades`. También consulté respuestas reales antes de adaptar los componentes. No pude acceder a Figma.

## 2026-11-03 — Ejecución del build en PowerShell

- **Error:** ejecuté `npm run build`, pero PowerShell bloqueó el wrapper `npm.ps1` por la política de scripts.
- **Cómo lo detecté:** el comando devolvió `PSSecurityException`. El problema no se originó en Vite ni en la aplicación.
- **Qué hice:** ejecuté `npm.cmd run build` y la compilación terminó correctamente.

## 2026-11-03 — Colores CSS fuera de los tokens

- **Hallazgo:** aunque el proyecto ya tenía `tokens.css`, encontré muchos colores escritos directamente en las hojas de estilo.
- **Cómo lo detecté:** busqué valores hexadecimales y funciones `rgb()` en `src/**/*.css`.
- **Qué hice:** centralicé esos colores en variables CSS y cambié las hojas para usar `var(--...)`. También reemplacé tamaños de fuente en píxeles por valores `rem` para que la escala accesible afecte el texto.

## 2026-11-25 — S2-01 · Tipos del detalle

- **Consulta:** migrar a TypeScript e implementar el detalle con el contrato real.
- **Propuesta:** reutilizar las tarjetas y tipar el detalle a partir de La casa de los relojes.
- **Resultado:** la respuesta confirmó que cada función referencia la localidad mediante `localidadId` y reporta su disponibilidad por separado.
- **Aprendizaje:** el precio sale de la localidad general y la disponibilidad de la función se resuelve por identificador.

## 2026-11-25 — S2-01 y S2-02 · Estado HTTP de un slug inexistente

- **Consulta:** usar `notFound()` y `loading.tsx` en App Router.
- **Propuesta inicial:** resolver el 404 desde la página dinámica dentro del límite de carga.
- **Error observado:** el servidor inició el streaming y devolvió HTTP `200` para un slug inexistente.
- **Corrección:** el layout del segmento valida el evento antes de enviar la respuesta. La página y los metadatos comparten la consulta en la misma petición.
- **Resultado:** la prueba local confirmó `404` para el slug inexistente y `200` para el evento válido.
- **Aprendizaje:** la posición del límite de carga afecta el estado HTTP emitido.

## 2026-11-25 — S2-04 y S2-05 · Pruebas de sesión

- **Consulta:** verificar ingreso, bloqueo y persistencia contra la API oficial.
- **Propuesta:** usar un Route Handler del mismo origen y comprobar la cookie sin imprimir su valor.
- **Resultado:** el ingreso devolvió `200`, la cookie tenía `HttpOnly` y el cuerpo omitió el token. La consulta con cookie devolvió `200`, el cierre devolvió `204` y la cookie anterior recibió `401`. El correo de prueba inventado recibió `429` con `Retry-After`.
- **Aprendizaje:** el navegador puede mantener la sesión mediante una cookie del mismo origen mientras el servidor aporta el token a la API.
