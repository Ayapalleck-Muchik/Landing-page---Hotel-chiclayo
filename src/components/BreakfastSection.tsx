import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

interface BreakfastSectionProps {
  onOpenBooking: () => void;
}

export const BreakfastSection: React.FC<BreakfastSectionProps> = ({ onOpenBooking }) => {
  const reduceMotion = useReducedMotion();
  return (
    <section className="py-24 bg-white border-b border-[#E4DCD0]" id="desayuno">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photo & Badge */}
          <div className="lg:col-span-6 relative">
            <div className="border border-[#E4DCD0] p-2 bg-[#FAF8F5] shadow-lg">
              <motion.div
                className="h-80 overflow-hidden sm:h-96"
                initial={reduceMotion ? false : { clipPath: 'inset(0 0 14% 0)', opacity: 0.65 }}
                whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
              >
                <img
                  src="/images-hotel/desayuno.jpg"
                  alt="Desayuno incluido en Hotel Ayapalleck Muchik"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 bg-[#141312] text-white p-5 border border-[#C5A059]/40 max-w-xs shadow-2xl">
              <span className="text-[10px] font-semibold text-[#DFCA9D] uppercase tracking-[0.25em] block mb-1">
                Incluido en tu estadía
              </span>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                El desayuno está incluido con tu estadía. Consulta los detalles directamente con el hotel.
              </p>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6">
            <span className="text-[#C5A059] font-semibold tracking-[0.35em] uppercase text-[11px] block mb-2">
              Las mañanas empiezan aquí
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#141312] font-light leading-tight mb-6">
              Desayuno incluido con tu estadía
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base font-light leading-relaxed mb-8">
              Una pausa incluida antes de salir a conocer Chiclayo. Para conocer los detalles del
              servicio durante tu visita, el equipo del hotel podrá orientarte directamente.
            </p>

            <button
              onClick={onOpenBooking}
              type="button"
              className="inline-flex items-center gap-3 bg-[#141312] hover:bg-[#C5A059] hover:text-[#141312] text-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-md cursor-pointer active:scale-95"
            >
              <span>Consultar habitación</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
