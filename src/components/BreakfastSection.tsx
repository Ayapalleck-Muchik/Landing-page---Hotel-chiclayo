import React from 'react';
import { Coffee, Croissant, Apple, Sparkles, ArrowRight } from 'lucide-react';

interface BreakfastSectionProps {
  onOpenBooking: () => void;
}

export const BreakfastSection: React.FC<BreakfastSectionProps> = ({ onOpenBooking }) => {
  const breakfastItems = [
    {
      title: 'Panes & Horneados Artesanales',
      desc: 'Selección fresca de panaderías tradicionales norteñas servidas recién horneadas.',
      icon: Croissant,
    },
    {
      title: 'Café de Altura Peruano & Infusiones',
      desc: 'Café tostado selecto del norte del Perú, leche fresca, té orgánico e infusiones naturales.',
      icon: Coffee,
    },
    {
      title: 'Frutas Estacionales & Jugos Naturales',
      desc: 'Variedad de jugos recién exprimidos, papaya, piña y ensaladas de fruta fresca.',
      icon: Apple,
    },
    {
      title: 'Huevos al Gusto & Proteína',
      desc: 'Huevos revueltos, pasados o fritos preparados al instante con jamón y quesos regionales.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-[#E4DCD0]" id="desayuno">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photo & Badge */}
          <div className="lg:col-span-6 relative">
            <div className="border border-[#E4DCD0] p-2 bg-[#FAF8F5] shadow-lg">
              <img
                src="/images-hotel/desayuno.jpg"
                alt="Desayuno de cortesía en Hotel Ayapalleck Muchik"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 bg-[#141312] text-white p-5 border border-[#C5A059]/40 max-w-xs shadow-2xl">
              <span className="text-[10px] font-semibold text-[#DFCA9D] uppercase tracking-[0.25em] block mb-1">
                Siempre de Cortesía
              </span>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                Cada reserva incluye nuestro servicio de desayuno matutino completo para recargar
                energías antes de tu recorrido por Chiclayo.
              </p>
            </div>
          </div>

          {/* Copy and Pillars */}
          <div className="lg:col-span-6">
            <span className="text-[#C5A059] font-semibold tracking-[0.35em] uppercase text-[11px] block mb-2">
              Especialistas en tus Mañanas
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#141312] font-light leading-tight mb-6">
              Desayunos Preparados para Darte la Mejor Energía
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base font-light leading-relaxed mb-8">
              Especialistas en tus mañanas. Dedicamos toda nuestra atención a prepararte un desayuno
              premium de cortesía. Para el resto del día, nuestra ubicación privilegiada te permitirá
              descubrir los restaurantes y picanterías más afamados del centro histórico a solo
              minutos caminando.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {breakfastItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 bg-[#FAF8F5] border border-[#E4DCD0] flex items-start gap-3"
                  >
                    <IconComponent className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#141312] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-600 font-light leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={onOpenBooking}
              type="button"
              className="inline-flex items-center gap-3 bg-[#141312] hover:bg-[#C5A059] hover:text-[#141312] text-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-md cursor-pointer active:scale-95"
            >
              <span>Asegurar Habitación con Desayuno</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
