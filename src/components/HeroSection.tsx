import React from 'react';
import { ArrowDown, ArrowRight, Coffee, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenPapalAnnouncement: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenPapalAnnouncement,
}) => {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 52]);

  return (
    <section className="relative flex min-h-[88svh] items-center justify-center overflow-hidden bg-[#141312] sm:min-h-[90svh]">
      <div className="absolute inset-0 overflow-hidden bg-[#141312]" aria-hidden="true">
        <motion.div className="absolute -inset-x-4 -inset-y-12" style={reduceMotion ? undefined : { y: imageY }}>
          <motion.div
            className="h-full w-full"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.055, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/images-hotel/fachada.jpg"
              alt=""
              className="h-full w-full object-cover object-[center_78%]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#141312]/65 via-[#141312]/28 to-[#141312]/78" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#141312]/75" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6 pb-28 pt-28 text-center sm:px-8 sm:pt-32"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mx-auto mb-5 inline-flex items-center gap-2 border border-[#DFCA9D]/60 bg-[#141312]/45 px-4 py-2 text-xs font-medium tracking-[0.12em] text-[#F4EFE7] backdrop-blur-sm sm:text-sm">
          <MapPin className="h-4 w-4 text-[#DFCA9D]" aria-hidden="true" />
          A 2 cuadras de la Plaza de Armas
        </p>

        <h1 className="mx-auto max-w-5xl text-balance font-serif text-[clamp(2.75rem,7.4vw,6rem)] font-normal leading-[0.99] tracking-[-0.03em] text-white [text-shadow:0_2px_18px_rgb(0_0_0_/_0.42)]">
          Más cerca de Chiclayo. Más cerca de sentirte en casa.
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-balance text-[clamp(1rem,2vw,1.3rem)] font-normal leading-relaxed text-[#F4EFE7] [text-shadow:0_1px_10px_rgb(0_0_0_/_0.45)]">
          A dos cuadras de la Plaza de Armas, encuentra un lugar para descansar, compartir y
          descubrir la ciudad a tu ritmo.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-normal text-[#F4EFE7] sm:text-base">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4 text-[#DFCA9D]" aria-hidden="true" />
            <span>Desayuno incluido</span>
          </div>
          <span className="hidden text-[#DFCA9D]/80 sm:inline" aria-hidden="true">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#DFCA9D]" aria-hidden="true" />
            <span>Frente a la comisaría</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={onOpenBooking}
            type="button"
            className="inline-flex min-h-14 w-full items-center justify-center gap-3 bg-[#C5A059] px-8 py-4 text-sm font-semibold tracking-[0.08em] text-[#141312] shadow-xl transition-colors duration-300 hover:bg-[#DFCA9D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#141312] sm:w-auto"
          >
            <span>Consultar disponibilidad</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <a
            href="#servicios"
            className="inline-flex min-h-14 w-full items-center justify-center gap-3 border border-white/55 bg-[#141312]/20 px-8 py-4 text-sm font-medium tracking-[0.06em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-[#DFCA9D] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFCA9D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141312] sm:w-auto"
          >
            Conoce el hotel
          </a>
        </div>

        <button
          type="button"
          onClick={onOpenPapalAnnouncement}
          className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#F4EFE7] underline decoration-[#DFCA9D]/70 underline-offset-4 transition-colors hover:text-[#DFCA9D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFCA9D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#141312]"
        >
          <Sparkles className="h-4 w-4 text-[#DFCA9D]" aria-hidden="true" />
          Conoce la información sobre la visita papal
        </button>
      </motion.div>

      <motion.a
        href="#servicios"
        aria-label="Explorar el hotel"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium tracking-[0.12em] text-white/90 transition-colors hover:text-[#DFCA9D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFCA9D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#141312]"
        animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
        transition={reduceMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>Explorar</span>
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </motion.a>
    </section>
  );
};
