export interface HotelScene {
  id: string;
  chapter: string;
  label: string;
  video: string;
  poster: string;
  scrollLength: string;
  objectPosition?: string;
}

/**
 * This is an editorial sequence, not a fabricated continuous walkthrough.
 * Each scene is a real hotel clip and is joined by a short visual dissolve.
 */
export const hotelScenes: HotelScene[] = [
  {
    id: 'recepcion',
    chapter: 'Bienvenida',
    label: 'Recepción',
    video: '/videos-hotel/recepcion-scroll.mp4',
    poster: '/images-hotel/recepcion.jpg',
    scrollLength: 'min-h-[70svh] sm:min-h-[75svh]',
  },
  {
    id: 'king',
    chapter: 'Descanso',
    label: 'Habitación King',
    video: '/videos-hotel/king-scroll.mp4',
    poster: '/images-hotel/KING.jpg',
    scrollLength: 'min-h-[62svh] sm:min-h-[68svh]',
  },
  {
    id: 'matrimonial',
    chapter: 'Descanso',
    label: 'Habitación Matrimonial',
    video: '/videos-hotel/matrimonial-scroll.mp4',
    poster: '/images-hotel/MATRIMONIAL.jpg',
    scrollLength: 'min-h-[62svh] sm:min-h-[68svh]',
  },
  {
    id: 'desayuno',
    chapter: 'Experiencia',
    label: 'Desayuno',
    video: '/videos-hotel/desayuno-scroll.mp4',
    poster: '/images-hotel/desayuno.jpg',
    scrollLength: 'min-h-[60svh] sm:min-h-[66svh]',
  },
  {
    id: 'azotea',
    chapter: 'Experiencia',
    label: 'Azotea',
    video: '/videos-hotel/azotea-scroll.mp4',
    poster: '/images-hotel/azotea.jpg',
    scrollLength: 'min-h-[64svh] sm:min-h-[70svh]',
    objectPosition: 'center center',
  },
];
