import React, { useEffect, useState } from 'react';
import { ArrowRight, MapPin, Coffee, ShieldCheck } from 'lucide-react';
import { useReducedMotion } from 'motion/react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const reduceMotion = useReducedMotion();
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    let frameId = 0;
    const updateParallax = () => {
      frameId = window.requestAnimationFrame(() => {
        setParallaxOffset(Math.min(window.scrollY * 0.025, 16));
      });
    };

    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateParallax);
      window.cancelAnimationFrame(frameId);
    };
  }, [reduceMotion]);

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center bg-[#141312] overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full bg-[#141312]">
        <img
          src="/images-hotel/fachada.jpg"
          alt="Fachada del Hotel Ayapalleck Muchik en Chiclayo"
          className="w-full h-full object-cover object-[center_78%]"
          style={reduceMotion ? undefined : { transform: `translate3d(0, ${parallaxOffset}px, 0)` }}
          referrerPolicy="no-referrer"
        />
        {/* Darkened Gradient Mask for clean contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141312]/75 via-[#141312]/45 to-[#141312]/85" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center pt-14 pb-24">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-light tracking-wide leading-[1.14] mb-6 text-balance">
          Una estadía cálida en el centro de Chiclayo.
        </h1>

        <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-neutral-200 font-light leading-relaxed tracking-wide mb-10 text-balance">
          Un espacio para descansar, compartir y descubrir la ciudad a tu ritmo. El desayuno está
          incluido con tu estadía.
        </p>

        {/* Trust Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-300 font-light mb-10">
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-[#C5A059]" />
            <span>Desayuno incluido</span>
          </div>
          <span className="hidden sm:inline text-neutral-600">·</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>Frente a la comisaría</span>
          </div>
          <span className="hidden sm:inline text-neutral-600">·</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C5A059]" />
            <span>Centro de Chiclayo</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C5A059] hover:bg-[#9e7d38] text-[#141312] hover:text-white px-9 py-4 font-semibold text-xs uppercase tracking-[0.25em] shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            <span>Consultar disponibilidad</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#servicios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent hover:bg-white/10 text-white border border-white/40 backdrop-blur-sm px-8 py-4 font-light text-xs uppercase tracking-[0.22em] transition-all duration-300 hover:border-[#C5A059]"
          >
            <span>Conoce el hotel</span>
          </a>
        </div>
      </div>
    </section>
  );
};
