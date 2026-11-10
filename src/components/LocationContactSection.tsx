import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Footprints, ExternalLink, Church } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

export const LocationContactSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section className="py-24 bg-white border-t border-[#E4DCD0]" id="ubicacion">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Details & Security Guarantee */}
          <div className="lg:col-span-6" id="contacto">
            <span className="text-[#C5A059] font-semibold tracking-[0.35em] uppercase text-[11px] block mb-2">
              Ubicación
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#141312] font-light mb-6">
              En el centro de Chiclayo
            </h2>

            {/* MANDATORY REAL COPY: UBICACIÓN Y SEGURIDAD PREMIUM */}
            <div className="bg-[#FAF8F5] border-l-2 border-[#C5A059] p-5 mb-6">
              <div className="flex items-center gap-2 mb-2 text-[#C5A059]">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] uppercase font-semibold tracking-[0.2em] text-[#141312]">
                  Frente a la comisaría
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-light">
                Estamos ubicados en el centro de Chiclayo, justo frente a la comisaría.
              </p>
            </div>

            {/* MANDATORY REAL COPY: TU PUNTO DE PARTIDA PERFECTO */}
            <div className="bg-[#FAF8F5] border-l-2 border-neutral-800 p-5 mb-8">
              <div className="flex items-center gap-2 mb-2 text-neutral-800">
                <Footprints className="w-4 h-4 text-[#C5A059]" />
                <span className="text-[11px] uppercase font-semibold tracking-[0.2em] text-[#141312]">
                  Una ubicación para organizar tu día
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-light">
                Desde aquí puedes organizar tus recorridos por la ciudad y volver a descansar al final del día.
              </p>
            </div>

            {/* Pope's Historic Route Highlight */}
            <div className="flex items-start gap-3 text-xs text-neutral-700 mb-8 p-4 bg-[#141312] text-white">
              <Church className="w-5 h-5 text-[#DFCA9D] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#DFCA9D] block mb-1 uppercase tracking-wider font-semibold">
                  Visita Papal en Chiclayo
                </strong>
                <p className="font-light text-neutral-300">
                  Consulta al hotel la información actualizada sobre rutas y actividades relacionadas con la visita.
                </p>
              </div>
            </div>

            {/* Contact details */}
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
