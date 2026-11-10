import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Footprints } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

export const LocationContactSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section className="py-24 bg-white border-t border-[#E4DCD0]" id="ubicacion">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6" id="contacto">
            <h2 className="mb-6 font-serif text-[clamp(2.25rem,4.5vw,4.5rem)] font-normal leading-[1.04] tracking-[-0.025em] text-[#141312]">
              Chiclayo, a solo unos pasos
            </h2>
            <p className="mb-5 max-w-2xl text-lg font-normal leading-relaxed text-[#3B3935] sm:text-xl">
              Una ubicación que te acerca a todo lo que quieres descubrir.
            </p>
            <p className="mb-7 max-w-2xl text-base font-normal leading-relaxed text-neutral-700 sm:text-lg">
              A solo dos cuadras de la Plaza de Armas, el Hotel Ayapalleck Muchik te permite
              disfrutar del centro de Chiclayo con comodidad. Camina hacia la Catedral, descubre
              restaurantes y comercios locales, o simplemente disfruta de la ciudad a tu ritmo.
            </p>
            <div className="mb-7 flex items-start gap-3 border-y border-[#E4DCD0] py-5 text-neutral-700">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C5A059]" aria-hidden="true" />
              <p className="text-sm font-normal leading-relaxed sm:text-base">
                Nuestra ubicación frente a una comisaría y la atención cercana de nuestro equipo
                hacen que regresar al hotel al final del día sea parte de una estadía agradable.
              </p>
            </div>
            <p className="mb-8 flex items-center gap-3 font-serif text-xl leading-relaxed text-[#141312] sm:text-2xl">
              <Footprints className="h-5 w-5 shrink-0 text-[#C5A059]" aria-hidden="true" />
              Descubre Chiclayo. Nosotros te esperamos para descansar.
            </p>

            <div className="space-y-4 text-xs text-neutral-700 mb-8 border-l border-[#C5A059]/40 pl-5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 block mb-1">
                  Dirección
                </span>
                <p className="font-medium text-[#141312] flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  Centro de Chiclayo — Justo Frente a la Comisaría, Lambayeque, Perú
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 block mb-1">
                  Recepción &amp; Reservas Directas
                </span>
                <p className="font-medium text-[#141312] flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  +51 978 007 640
                  <span className="text-neutral-300">·</span>
                  <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                  reservas@ayapalleckmuchik.com
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 block mb-1">
                  Atención Ininterrumpida
                </span>
                <p className="font-medium text-[#141312] flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  Recepción 24 Horas • Check-in: 14:00 • Check-out: 12:00
                </p>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/Cy6rwLHwrSdT3gB96"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#141312] hover:bg-[#1E1D1B] text-[#C5A059] border border-[#C5A059]/40 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 shadow-sm active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Abrir en Google Maps</span>
            </a>
          </div>

          {/* Location Visual Card */}
          <div className="lg:col-span-6 border border-[#E4DCD0] p-2 bg-[#FAF8F5]">
            <div className="relative h-96 sm:h-[460px] overflow-hidden">
              <motion.img
                src="/images-hotel/recepcion.jpg"
                alt="Recepción del Hotel Ayapalleck Muchik Chiclayo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                initial={reduceMotion ? false : { opacity: 0.7, scale: 1.03 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 bg-[#141312]/30 backdrop-blur-[0.5px]" />
              <motion.div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 text-white"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: reduceMotion ? 0 : 0.15 }}>
                <div className="w-14 h-14 rounded-full border border-[#C5A059]/60 text-[#C5A059] flex items-center justify-center text-xl mb-4 bg-[#141312]/80 shadow-md">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-serif font-light mb-2 [text-shadow:0_1px_3px_rgb(0_0_0_/_0.8)]">
                  Hotel Ayapalleck Muchik
                </h4>
                <p className="text-neutral-100 text-xs sm:text-sm font-light max-w-sm mb-6 leading-relaxed [text-shadow:0_1px_3px_rgb(0_0_0_/_0.8)]">
                  En el centro de Chiclayo, frente a la comisaría, para que tengas un punto claro de llegada.
                </p>
                <div className="inline-flex items-center gap-2 border border-white/50 text-white bg-white/10 px-6 py-2.5 text-[11px] uppercase tracking-[0.25em] font-medium">
                  <span>Centro de Chiclayo</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
