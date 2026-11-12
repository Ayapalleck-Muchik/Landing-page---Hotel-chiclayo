# Producción audiovisual y Scroll World

## Decisión editorial

La portada conserva `imagenes-hotel/fachada.jpg` como imagen principal. El único clip exterior
disponible, `recepcion-video.mp4`, altera de forma visible las letras del letrero durante el
movimiento; por fidelidad arquitectónica se rechaza como escena de llegada. El recorrido que sigue
la portada es una secuencia editorial de ambientes reales, no una simulación de un paseo físico
continuo entre habitaciones.

Cada cambio de ambiente se comunica mediante una disolvencia breve. No se pretende que la fachada,
la recepción, las habitaciones y la azotea sean partes de una misma toma de cámara.

## Auditoría de materiales

| Fuente | Resolución y duración | Estado | Uso |
| --- | --- | --- | --- |
| `recepcion-video.mp4` | 832 × 480, 16 fps, 3.5625 s | Rechazado | Deforma el letrero exterior. No se publica. |
| `video-recepcion.mp4` | 832 × 480, 16 fps, 3.5625 s | Usable con limitaciones | Recepción. Conserva de forma más fiel el mobiliario y personal. |
| `king-video.mp4` | 832 × 480, 16 fps, 3.5625 s | Usable con limitaciones | Escena de Habitación King. |
| `matrimonial-video.mp4` | 832 × 480, 16 fps, 3.5625 s | Usable con limitaciones | Escena de Habitación Matrimonial. |
| `desayuno-video.mp4` | 832 × 480, 16 fps, 3.5625 s | Usable con limitaciones | Escena de desayuno. |
| `azotea-video.mp4` | 832 × 624, 16 fps, 3.5625 s | Usable con limitaciones | Escena de azotea; su proporción es 4:3. |
| `tmpparxd9xw.mp4` | 832 × 480, 16 fps, 3.5625 s | Rechazado | Clip inicial de fachada, con la misma limitación de señalización. |

Todos los clips carecen de pista de audio. La resolución disponible es inferior al estándar de
entrega recomendado para un vídeo fullscreen. Por eso cada escena mantiene una fotografía original
de alta resolución como póster, fallback de red, alternativa móvil y alternativa de movimiento
reducido. No se escala ningún clip para presentarlo como 1080p.

## Activos web

Los archivos de `public/videos-hotel/` están codificados en H.264, yuv420p, sin audio, con
`faststart` y GOP de 6 fotogramas. Conservan resolución y duración nativas. Los pósters WebP se
guardan en `public/images-hotel/` y se extraen del primer fotograma de cada clip.

Las versiones web publicadas son:

- `recepcion-scroll.mp4`
- `king-scroll.mp4`
- `matrimonial-scroll.mp4`
- `desayuno-scroll.mp4`
- `azotea-scroll.mp4`

Los originales en `imagenes-hotel/` no se alteran ni se incluyen en el commit.

## Motor de escenas

`ImmersiveHotelWorld` usa marcadores de scroll dentro de una superficie sticky a pantalla completa.
El motor agrupa el cálculo de scroll en `requestAnimationFrame`; los cambios de escena actualizan
React solo al cruzar de ambiente. Cada `ScrollScrubVideo` recibe una fracción de progreso y actualiza
`currentTime` con seeks coalescidos, manteniendo siempre el vídeo pausado.

Los recursos se solicitan con `fetch` y `Blob` solo cuando el recorrido se aproxima al viewport. Se
mantiene la escena activa y una vecina en memoria; las escenas alejadas liberan su URL temporal.
Antes de pintar el primer fotograma y ante cualquier error, el póster queda visible.

En móvil, Save Data o `prefers-reduced-motion`, no se descarga ni reproduce video: se muestran las
fotografías reales sin recorte destructivo. No hay versiones verticales nativas, por lo que este
fallback es deliberado y no pretende sustituir una producción móvil dedicada.

## Producción pendiente para calidad de entrega

Para sustituir los fallbacks por vídeo fullscreen de calidad final se necesita rodaje real a
1920 × 1080 o superior, 24 a 30 fps, con tomas horizontales y verticales dedicadas. Cada ambiente
debería rodarse con encuadres iniciales y finales previstos, respetando materiales, señalización y
personas reales. Solo con tomas compatibles se debe evaluar una continuidad física entre espacios.
