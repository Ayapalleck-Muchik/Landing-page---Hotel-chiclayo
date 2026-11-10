import React from 'react';
import { ArrowRight, MapPin, Coffee, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center bg-[#141312] overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full bg-[#141312]">
        <img
          src="/images-hotel/fachada.jpg"
          alt="Fachada del Hotel Ayapalleck Muchik en Chiclayo"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Darkened Gradient Mask for clean contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141312]/85 via-[#141312]/55 to-[#141312]/95" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center pt-14 pb-24">
        {/* Boutique Urban Trust Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#C5A059]/40 bg-[#141312]/70 backdrop-blur-md mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="text-[#DFCA9D] text-[11px] font-medium tracking-[0.25em] uppercase">
            Hotel Boutique Urbano • Centro de Chiclayo
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
        </div>

        {/* Real Required Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-light tracking-wide leading-[1.14] mb-6 text-balance">
          Tu descanso perfecto en el centro de Chiclayo.
        </h1>

        {/* Real Required Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-neutral-200 font-light leading-relaxed tracking-wide mb-10 text-balance">
          Confort moderno, ubicación estratégica y el mejor desayuno para iniciar tu día. A un paso
          de la ruta histórica y religiosa de la ciudad.
        </p>

        {/* Trust Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-300 font-light mb-10">
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-[#C5A059]" />
            <span>Desayuno de Cortesía</span>
          </div>
          <span className="hidden sm:inline text-neutral-600">·</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>Frente a la Comisaría (Seguridad 24/7)</span>
          </div>
          <span className="hidden sm:inline text-neutral-600">·</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C5A059]" />
            <span>100% Peatonal &amp; Céntrico</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C5A059] hover:bg-[#9e7d38] text-[#141312] hover:text-white px-9 py-4 font-semibold text-xs uppercase tracking-[0.25em] shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            <span>Reservar Habitación</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#servicios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent hover:bg-white/10 text-white border border-white/40 backdrop-blur-sm px-8 py-4 font-light text-xs uppercase tracking-[0.22em] transition-all duration-300 hover:border-[#C5A059]"
          >
            <span>Conoce los Servicios</span>
          </a>
        </div>
      </div>
    </section>
  );
};
