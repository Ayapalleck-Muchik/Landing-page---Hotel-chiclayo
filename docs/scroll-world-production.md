# Integración audiovisual: fachada

## Alcance de esta entrega

La fotografía de fachada sigue siendo la imagen principal de la portada. El único video disponible,
`imagenes-hotel/tmpparxd9xw.mp4`, se trata como un detalle cinematográfico de escritorio y no como
una recreación arquitectónica ni como un fondo de pantalla completa.

## Material y decisión editorial

- Fotografía original de fachada: `imagenes-hotel/fachada.jpg` (1536 × 2752 px).
- Video fuente recibido: H.264, 832 × 480 px, 16 fps, 3.5625 s y sin audio.
- Evaluación: el encuadre se acerca a la entrada, pero no conserva el letrero completo durante toda
  la toma. Por su resolución y duración, no es apto para sustituir la fotografía de portada ni para
  presentarse como video 1080p.
- Decisión: se conserva íntegro el video fuente y se publica una versión optimizada a tamaño nativo
  en una ventana 16:9 de escritorio. La fotografía real queda visible detrás y conserva la fachada,
  entrada y señalización completa.

## Entregables web

- `public/videos-hotel/fachada-scroll.mp4`: H.264, 832 × 480 px, yuv420p, 16 fps, 3.5625 s, sin
  audio, con `faststart` y keyframes cada 6 fotogramas.
- `public/images-hotel/fachada-scroll-poster.webp`: póster WebP derivado del primer fotograma.
- `src/components/CinematicHeroMedia.tsx`: carga opcional y sincronización de tiempo con scroll.

No se escaló el clip ni se usó generación, interpolación o outpainting.

## Comportamiento de scroll y rendimiento

El video se descarga únicamente cuando su contenedor está próximo al viewport y solo a partir del
breakpoint de escritorio (`1024 px`). Se obtiene como `Blob` para evitar búsquedas HTTP parciales
inestables. Un listener pasivo de scroll agrupa cálculos en `requestAnimationFrame` y escribe
`currentTime` únicamente cuando no hay una búsqueda activa. El mismo flujo admite avance y
retroceso; no reproduce el video automáticamente ni captura el scroll.

El póster permanece visible hasta que el navegador pueda presentar un fotograma. Ante fallo de
red o decodificación, la imagen de portada se mantiene como alternativa sin pantalla negra.

## Accesibilidad y alternativas

El detalle de video se oculta en móvil, con `prefers-reduced-motion` y con Save-Data. La foto
principal, el contenido, la navegación, los modales y las acciones de reserva no cambian ni quedan
interceptados por la capa audiovisual.

## Siguiente material necesario para una secuencia continua

Para una experiencia Scroll World de pantalla completa se necesita rodaje real, no generación:

1. Toma horizontal estabilizada de fachada, aproximación lenta, 1920 × 1080 o superior, 24–30 fps.
2. Toma final de fachada e inicio de recepción con punto de corte visualmente compatible.
3. Tomas auténticas de recepción, habitaciones, desayuno y azotea, con encuadres inicial/final
   acordados antes de grabar.
4. Versiones verticales dedicadas para móvil cuando el proyecto las justifique.

Hasta disponer de esas tomas, no se debe afirmar continuidad física entre espacios distintos.
