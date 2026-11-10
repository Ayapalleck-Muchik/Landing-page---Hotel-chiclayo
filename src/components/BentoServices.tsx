import React from 'react';
import { Coffee, ShieldCheck, Footprints, Wifi, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { realHotelServices } from '../data/hotelServices';

interface BentoServicesProps {
  onOpenBreakfastDetails: () => void;
}

export const BentoServices: React.FC<BentoServicesProps> = ({ onOpenBreakfastDetails }) => {
  const reduceMotion = useReducedMotion();
  const breakfast = realHotelServices.find((s) => s.id === 'desayuno-excepcional')!;
  const security = realHotelServices.find((s) => s.id === 'seguridad-premium')!;
  const walkable = realHotelServices.find((s) => s.id === 'ideal-para-caminar')!;
  const wifi = realHotelServices.find((s) => s.id === 'conectividad-wifi')!;

  return (
    <section className="py-24 bg-[#FAF8F5] border-b border-[#E4DCD0]" id="servicios">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E4DCD0]">
          <div>
            <span className="text-[#C5A059] font-semibold tracking-[0.35em] uppercase text-[11px] block mb-2">
              Lo que acompaña tu estadía
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#141312] font-light">
              Lo esencial, con calidez
            </h2>
          </div>
          <p className="text-neutral-600 text-xs sm:text-sm font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            Desayuno incluido, una ubicación céntrica y espacios para que disfrutes Chiclayo a tu ritmo.
          </p>
        </div>

        {/* High-End Bento Box Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-12 gap-6"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}>
          {/* Bento Card 1: Desayunos Premium (7 Columns) */}
          <div className="md:col-span-7 bg-white border border-[#E4DCD0] hover:border-[#C5A059] p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#C5A059]/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded bg-[#FAF8F5] border border-[#E4DCD0] flex items-center justify-center text-[#C5A059] group-hover:border-[#C5A059] transition-colors">
                  <Coffee className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase px-3 py-1 bg-[#141312] text-[#DFCA9D]">
                  Desayuno incluido
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-[#141312] font-normal mb-3 group-hover:text-[#9e7d38] transition-colors">
                {breakfast.title}
              </h3>

              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-light mb-6">
                "{breakfast.description}"
              </p>

              {/* Positive Benefit Highlights */}
              <div className="bg-[#FAF8F5] border-l-2 border-[#C5A059] p-4 text-xs text-neutral-600 font-light space-y-1 mb-6">
                <p className="font-medium text-[#141312] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                  Una mañana para empezar sin prisa
                </p>
                <p>
                  Consulta con el hotel los detalles del servicio durante tu estadía.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E4DCD0]/70 flex items-center justify-between">
              <button
                onClick={onOpenBreakfastDetails}
                type="button"
                className="text-xs uppercase tracking-[0.2em] font-semibold text-[#141312] hover:text-[#C5A059] transition-colors cursor-pointer border-b border-[#141312] hover:border-[#C5A059] pb-0.5"
              >
                Ver qué incluye el desayuno →
              </button>
              <span className="text-[11px] text-neutral-400">Servido de 07:00 a 10:00</span>
            </div>
          </div>

          {/* Bento Card 2: Ubicación y Seguridad Premium (5 Columns) */}
          <div className="md:col-span-5 bg-[#141312] text-white border border-[#C5A059]/40 p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded bg-white/10 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#C5A059]">
                  Frente a la comisaría
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-white font-light mb-3">
                {security.title}
              </h3>

              <p className="text-neutral-300 text-sm leading-relaxed font-light mb-6">
                "{security.description}"
              </p>

              <div className="space-y-2.5 text-xs text-neutral-300 border-t border-neutral-800 pt-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full" />
                  <span>Ubicación directa frente a la comisaría local</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full" />
                  <span>Un punto de llegada claro durante tu visita</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059] rounded-full" />
                  <span>Un espacio para familias y viajeros</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-800 text-[10px] tracking-[0.25em] uppercase text-[#DFCA9D]">
              Centro de Chiclayo
            </div>
          </div>

          {/* Bento Card 3: Tu Punto de Partida Perfecto (6 Columns) */}
          <div className="md:col-span-6 bg-white border border-[#E4DCD0] hover:border-[#C5A059] p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded bg-[#FAF8F5] border border-[#E4DCD0] flex items-center justify-center text-[#C5A059] mb-6 group-hover:border-[#C5A059] transition-colors">
                <Footprints className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-serif text-[#141312] font-normal mb-3 group-hover:text-[#9e7d38] transition-colors">
                {walkable.title}
              </h3>

              <p className="text-neutral-700 text-sm leading-relaxed font-light mb-6">
                "{walkable.description}"
              </p>

              {/* Informative Positive Walkability Note */}
              <div className="bg-[#FAF8F5] border border-[#E4DCD0] p-4 text-xs text-neutral-600 font-light flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#9e7d38] shrink-0 mt-0.5" />
                <p>
                  Organiza tus recorridos desde un punto céntrico y vuelve a descansar al final del día.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E4DCD0]/70 flex items-center justify-between text-[11px] text-neutral-500 uppercase tracking-wider">
              <span>Centro de Chiclayo</span>
              <span>A tu ritmo</span>
            </div>
          </div>

          {/* Bento Card 4: Conectividad Wi-Fi (6 Columns) */}
          <div className="md:col-span-6 bg-white border border-[#E4DCD0] hover:border-[#C5A059] p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded bg-[#FAF8F5] border border-[#E4DCD0] flex items-center justify-center text-[#C5A059] mb-6 group-hover:border-[#C5A059] transition-colors">
                <Wifi className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-serif text-[#141312] font-normal mb-3 group-hover:text-[#9e7d38] transition-colors">
                {wifi.title}
              </h3>

              <p className="text-neutral-700 text-sm leading-relaxed font-light mb-6">
                "{wifi.description}"
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-neutral-600 font-light border-t border-[#E4DCD0] pt-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                  <span>Wi-Fi disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                  <span>Durante tu estadía</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                  <span>Para mantenerte conectado</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C5A059]" />
                  <span>Consulta disponibilidad al llegar</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E4DCD0]/70 text-[10px] tracking-[0.25em] uppercase text-neutral-500">
              Conexión disponible
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
