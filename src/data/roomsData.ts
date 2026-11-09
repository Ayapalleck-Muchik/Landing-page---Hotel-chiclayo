import { Room } from '../types';

export const hotelRooms: Room[] = [
  {
    id: 'suite-master-urbana',
    refCode: 'Ref. SM-01',
    title: 'Suite Master Boutique',
    category: 'master',
    categoryLabel: 'Suite Insignia',
    bedType: 'Cama King Size Extra Plush',
    badge: 'Suite Insignia',
    tagline: 'Máximo confort y amplitud en el centro de Chiclayo',
    description:
      'Nuestra suite más espaciosa y distinguida. Diseñada con acabados cálidos, sala de estar integrada, amplio ventanal con aislamiento acústico superior y baño privado con finos detalles de relajación.',
    pricePerNightUsd: 140,
    surfaceM2: 52,
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1UNtPdpmfEw-AJSsmUBqG9HbRadTA9DmZ8EQwxGzL_VusfzRYnQklGNCa2bISNzM7fxbMXYZ84Np9khspJjdtgIpbCkFIdWZyDumDVZekZ2vyvemuUdDogW00ghs1psBilVrgjiMNRaD-y0ahNbRJTRCm43yTfDOQCsG4qeXCB9lik3we9rdEWmYb1IMBAZWHWzS9ec9fI1Hl-p7n-gj9MlEB1bmnKkVoz4eL1Yx-5DMqErXwvqskitZoA',
    gallery: [
      'https://lh3.googleusercontent.com/aida/AEtjO1UNtPdpmfEw-AJSsmUBqG9HbRadTA9DmZ8EQwxGzL_VusfzRYnQklGNCa2bISNzM7fxbMXYZ84Np9khspJjdtgIpbCkFIdWZyDumDVZekZ2vyvemuUdDogW00ghs1psBilVrgjiMNRaD-y0ahNbRJTRCm43yTfDOQCsG4qeXCB9lik3we9rdEWmYb1IMBAZWHWzS9ec9fI1Hl-p7n-gj9MlEB1bmnKkVoz4eL1Yx-5DMqErXwvqskitZoA',
      'https://lh3.googleusercontent.com/aida/AEtjO1VZpLxYGkbZj6wS7ZOSVdIwHprBAnJLN51JtQFiM1mBcqpCZIz-vEx4ETV85Kkb7f8HmgOsKutEn2Nu6JujNQowlZ4aZkWRv50uuGmGNSY0Veji69AYPSrlmAMdwVGJ6IZbpHrTOT3XksMJpnYKbrc6W4I87sav6WMCb6PyWJQDEK54nKEXJSuNB4tf4O0X2GiI2Z-QBSE93S-oZQDW_5zTlGoiAzExvJ0kh5giXYd3-fkLo4BQbsURL1fc',
    ],
    features: [
      { label: 'Cama King Size Extra Plush' },
      { label: 'Desayuno de Cortesía Incluido' },
      { label: 'Aislamiento Termoacústico' },
      { label: 'Wi-Fi de Alta Velocidad Libre' },
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
    id: 'habitacion-ejecutiva-superior',
    refCode: 'Ref. EX-02',
    title: 'Habitación Ejecutiva Superior',
    category: 'executive',
    categoryLabel: '02 • Ejecutiva',
    bedType: '1 Cama Queen Plush',
    badge: '02 • Ejecutiva',
    tagline: 'Ideal para profesionales y visitantes de la ruta histórica',
    description:
      'Equipada para quienes buscan descansar con total serenidad en pleno centro urbano. Cuenta con escritorio funcional, iluminación cálida de autor y conectividad de alta velocidad ininterrumpida.',
    pricePerNightUsd: 95,
    surfaceM2: 36,
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1VZpLxYGkbZj6wS7ZOSVdIwHprBAnJLN51JtQFiM1mBcqpCZIz-vEx4ETV85Kkb7f8HmgOsKutEn2Nu6JujNQowlZ4aZkWRv50uuGmGNSY0Veji69AYPSrlmAMdwVGJ6IZbpHrTOT3XksMJpnYKbrc6W4I87sav6WMCb6PyWJQDEK54nKEXJSuNB4tf4O0X2GiI2Z-QBSE93S-oZQDW_5zTlGoiAzExvJ0kh5giXYd3-fkLo4BQbsURL1fc',
    gallery: [
      'https://lh3.googleusercontent.com/aida/AEtjO1VZpLxYGkbZj6wS7ZOSVdIwHprBAnJLN51JtQFiM1mBcqpCZIz-vEx4ETV85Kkb7f8HmgOsKutEn2Nu6JujNQowlZ4aZkWRv50uuGmGNSY0Veji69AYPSrlmAMdwVGJ6IZbpHrTOT3XksMJpnYKbrc6W4I87sav6WMCb6PyWJQDEK54nKEXJSuNB4tf4O0X2GiI2Z-QBSE93S-oZQDW_5zTlGoiAzExvJ0kh5giXYd3-fkLo4BQbsURL1fc',
    ],
    features: [
      { label: '1 Cama Queen Plush' },
      { label: 'Escritorio de Trabajo' },
      { label: 'Climatizador Silencioso' },
      { label: 'Desayuno de Cortesía' },
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
    id: 'habitacion-doble-confort',
    refCode: 'Ref. DC-03',
    title: 'Habitación Doble Confort',
    category: 'standard',
    categoryLabel: '03 • Doble o Matrimonial',
    bedType: '2 Camas Twin o 1 Matrimonial',
    badge: '03 • Doble Confort',
    tagline: 'Versatilidad, silencio y comodidad para tu visita a Chiclayo',
    description:
      'Configuración flexible para dos viajeros, parejas o peregrinos que visitan Chiclayo. Silenciosa, ventilada y con acceso directo a los corredores interiores del hotel.',
    pricePerNightUsd: 80,
    surfaceM2: 32,
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1XlHz84cwQUAuzBs1mvk9dGcp-FwwsaRY6vbeCr-RCV4gvfREOt7Ya8MrMX2pintcq-6x3TPWB0MGA1CW3NnT-REp28jkXuCcDxN_sqvEV2FxgviP_RRTgrVUfFrpNoq535OXqwqZh7p3o6Kf2-gwkrWQZWzg7WAG8nzPBrAL1gXj4mTJc3gGxeUUs0ENTlZ-BPuh34yLD8LhBbAnZekQquWdo72ynt_M7UenHwRjJ6Y6wYM4gy7orsA5FG',
    gallery: [
      'https://lh3.googleusercontent.com/aida/AEtjO1XlHz84cwQUAuzBs1mvk9dGcp-FwwsaRY6vbeCr-RCV4gvfREOt7Ya8MrMX2pintcq-6x3TPWB0MGA1CW3NnT-REp28jkXuCcDxN_sqvEV2FxgviP_RRTgrVUfFrpNoq535OXqwqZh7p3o6Kf2-gwkrWQZWzg7WAG8nzPBrAL1gXj4mTJc3gGxeUUs0ENTlZ-BPuh34yLD8LhBbAnZekQquWdo72ynt_M7UenHwRjJ6Y6wYM4gy7orsA5FG',
    ],
    features: [
      { label: '2 Twin o 1 Cama Matrimonial' },
      { label: 'Desayuno de Cortesía' },
      { label: 'Wi-Fi Rápido Incluido' },
      { label: 'Baño Privado Completo' },
    ],
    amenities: [
      'Desayuno de cortesía recién preparado',
      'Agua caliente 24 horas con presión regulada',
      'Televisor LED con canales por cable',
      'Caja de seguridad personal',
    ],
  },
];
