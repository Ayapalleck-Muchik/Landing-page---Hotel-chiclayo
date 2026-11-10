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
    title: 'Un buen comienzo para el día',
    subtitle: 'Desayuno incluido',
    description:
      'El desayuno está incluido con tu estadía para que empieces la mañana con calma antes de salir a recorrer Chiclayo.',
    category: 'desayuno',
    iconName: 'Coffee',
    badgeNote: 'Desayuno incluido',
  },
  {
    id: 'seguridad-premium',
    title: 'Una ubicación para moverte con facilidad',
    subtitle: 'Frente a la comisaría',
    description:
      'Estamos en el centro de Chiclayo, frente a la comisaría, para que tengas un punto claro de llegada durante tu visita.',
    category: 'seguridad',
    iconName: 'ShieldCheck',
    badgeNote: 'Frente a la Comisaría de Chiclayo',
  },
  {
    id: 'ideal-para-caminar',
    title: 'Chiclayo a tu ritmo',
    subtitle: 'Centro de la ciudad',
    description:
      'Un punto de partida céntrico para organizar tus días, encontrarte con la ciudad y volver a descansar.',
    category: 'peatonal',
    iconName: 'Footprints',
    badgeNote: 'Ubicación céntrica peatonal',
  },
  {
    id: 'conectividad-wifi',
    title: 'Conectividad durante tu estadía',
    subtitle: 'Wi-Fi disponible',
    description: 'Conexión Wi-Fi disponible durante tu estadía.',
    category: 'conectividad',
    iconName: 'Wifi',
    badgeNote: 'Wi-Fi disponible',
  },
];
