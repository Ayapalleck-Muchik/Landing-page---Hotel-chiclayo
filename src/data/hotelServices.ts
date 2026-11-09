import { RealHotelService } from '../types';

/**
 * ============================================================================
 * SERVICIOS DEL HOTEL AYAPALLECK MUCHIK (Boutique Urbano de Ciudad)
 * 
 * Enfoque en vender beneficios, valor y experiencia:
 * - Especialistas en mañanas con desayuno premium de cortesía.
 * - Ubicación y seguridad premium frente a la comisaría de Chiclayo.
 * - Punto de partida perfecto para caminar y disfrutar la ciudad.
 * - Conectividad Wi-Fi de alta velocidad en todas las áreas.
 * ============================================================================
 */
export const realHotelServices: RealHotelService[] = [
  {
    id: 'desayuno-excepcional',
    title: 'Especialistas en tus Mañanas',
    subtitle: 'Desayuno premium de cortesía',
    description:
      'Especialistas en tus mañanas. Dedicamos toda nuestra atención a prepararte un desayuno premium de cortesía. Para el resto del día, nuestra ubicación privilegiada te permitirá descubrir los restaurantes y picanterías más afamados del centro histórico a solo minutos caminando.',
    category: 'desayuno',
    iconName: 'Coffee',
    badgeNote: 'Desayuno premium incluido',
  },
  {
    id: 'seguridad-premium',
    title: 'Ubicación y Seguridad Premium',
    subtitle: 'Tranquilidad garantizada 24/7',
    description:
      'Estamos ubicados en el centro de Chiclayo, justo frente a la comisaría, garantizando a nuestros huéspedes tranquilidad absoluta y seguridad 24/7.',
    category: 'seguridad',
    iconName: 'ShieldCheck',
    badgeNote: 'Frente a la Comisaría de Chiclayo',
  },
  {
    id: 'ideal-para-caminar',
    title: 'Tu Punto de Partida Perfecto',
    subtitle: 'Corazón urbano & ruta histórica',
    description:
      'Tu punto de partida perfecto. Al estar ubicados en el corazón de Chiclayo, frente a la comisaría para tu total seguridad, disfrutarás de un acceso peatonal inmediato a rutas turísticas y la plaza principal. Todo a unos pasos.',
    category: 'peatonal',
    iconName: 'Footprints',
    badgeNote: 'Ubicación céntrica peatonal',
  },
  {
    id: 'conectividad-wifi',
    title: 'Conectividad de Alta Velocidad',
    subtitle: 'Fibra óptica en todo el hotel',
    description: 'Wi-Fi de alta velocidad gratuito en todas las instalaciones.',
    category: 'conectividad',
    iconName: 'Wifi',
    badgeNote: 'Wi-Fi libre de alta velocidad',
  },
];
