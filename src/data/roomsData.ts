import { Room } from '../types';

export const hotelRooms: Room[] = [
  {
    id: 'habitacion-king',
    refCode: 'Ref. K-01',
    title: 'Habitación King',
    category: 'king',
    categoryLabel: '01 • King',
    bedType: '1 Cama King',
    badge: '01 • King',
    tagline: 'Un espacio amplio para descansar al final del día',
    description:
      'Una habitación amplia para hacer una pausa, descansar y disfrutar tu estadía en Chiclayo.',
    pricePerNightPen: 150,
    surfaceM2: 52,
    image: '/images-hotel/KING.jpg',
    gallery: [
      '/images-hotel/KING.jpg',
      '/images-hotel/azotea.jpg',
    ],
    features: [
      { label: 'Cama King' },
      { label: 'Desayuno incluido' },
    ],
    amenities: [
      'Delicioso desayuno de cortesía cada mañana',
      'Baño privado con ducha de alta presión y agua caliente 24h',
      'Aire acondicionado split silencioso con control remoto',
      'Smart TV 65" UHD con streaming',
      'Mesa y espacio de trabajo ergonómico',
      'Caja de seguridad digital',
    ],
  },
  {
    id: 'habitacion-matrimonial',
    refCode: 'Ref. M-02',
    title: 'Habitación Matrimonial',
    category: 'matrimonial',
    categoryLabel: '02 • Matrimonial',
    bedType: '1 Cama Matrimonial',
    badge: '02 • Matrimonial',
    tagline: 'Una pausa cómoda en el centro de Chiclayo',
    description:
      'Un ambiente pensado para descansar después de un día de trabajo, visitas o recorridos por la ciudad.',
    pricePerNightPen: 100,
    surfaceM2: 36,
    image: '/images-hotel/MATRIMONIAL.jpg',
    gallery: [
      '/images-hotel/MATRIMONIAL.jpg',
      '/images-hotel/desayuno.jpg',
    ],
    features: [
      { label: 'Cama matrimonial' },
      { label: 'Desayuno incluido' },
    ],
    amenities: [
      'Desayuno diario incluido para recargar energías',
      'Escritorio amplio con conexiones de energía y Wi-Fi fibra óptica',
      'Aire acondicionado ecológico silencioso',
      'Ropa de cama suave de alta densidad',
      'Set de toallas y amenidades de aseo personal',
    ],
  },
  {
    id: 'habitacion-doble',
    refCode: 'Ref. D-03',
    title: 'Habitación Doble',
    category: 'doble',
    categoryLabel: '03 • Doble',
    bedType: '2 Camas Twin o 1 Matrimonial',
    badge: '03 • Doble',
    tagline: 'Una opción flexible para compartir la estadía',
    description:
      'Una alternativa práctica para quienes viajan en pareja, con familia o acompañados.',
    pricePerNightPen: 120,
    surfaceM2: 32,
    image: '/images-hotel/DOBLES.jpg',
    gallery: [
      '/images-hotel/DOBLES.jpg',
      '/images-hotel/recepcion.jpg',
    ],
    features: [
      { label: 'Dos camas o una matrimonial' },
      { label: 'Desayuno incluido' },
    ],
    amenities: [
      'Desayuno de cortesía recién preparado',
      'Agua caliente 24 horas con presión regulada',
      'Televisor LED con canales por cable',
      'Caja de seguridad personal',
    ],
  },
];
