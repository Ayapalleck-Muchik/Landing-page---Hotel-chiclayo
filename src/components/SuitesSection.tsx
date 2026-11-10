import React, { useState } from 'react';
import { ArrowRight, Bed, Laptop, Wind, Wifi, Coffee, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { hotelRooms } from '../data/roomsData';
import { Room } from '../types';
import { RoomModal } from './RoomModal';

interface SuitesSectionProps {
  onBookRoom: (room: Room) => void;
}

export const SuitesSection: React.FC<SuitesSectionProps> = ({ onBookRoom }) => {
  const reduceMotion = useReducedMotion();
  const [selectedRoomForModal, setSelectedRoomForModal] = useState<Room | null>(null);

  const heroSuite = hotelRooms[0];
  const secondarySuites = hotelRooms.slice(1);

  return (
    <section className="py-24 bg-[#F4EFE7]/50 border-b border-[#E4DCD0]" id="habitaciones">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E4DCD0]">
          <div>
            <span className="text-[#C5A059] font-semibold tracking-[0.35em] uppercase text-[11px] block mb-2">
              Habitaciones
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#141312] font-light">
              Nuestras Habitaciones en el Centro
            </h2>
          </div>
          <div className="text-neutral-600 text-xs sm:text-sm font-light max-w-md mt-4 md:mt-0 leading-relaxed space-y-1">
            <p>
              Tres opciones para descansar y hacer de Chiclayo tu punto de partida.
            </p>
            <p className="text-[#9e7d38] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Todas las tarifas incluyen desayuno.
            </p>
          </div>
        </div>

        {/* Architectural Bento Composition */}
        <div className="space-y-12">
          {/* HERO SUITE (Split View) */}
          <article className="bg-white border border-[#E4DCD0] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm hover:shadow-xl transition-shadow duration-500">
            {/* Main Photo Column (60%) */}
            <div
              onClick={() => setSelectedRoomForModal(heroSuite)}
              className="lg:col-span-7 relative min-h-[360px] lg:min-h-[500px] overflow-hidden group cursor-pointer"
            >
              <motion.img
                src={heroSuite.image}
                alt={heroSuite.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-6 left-6 bg-[#141312]/90 backdrop-blur-md px-4 py-1.5 border border-[#C5A059]/40 text-[#C5A059] text-[10px] tracking-[0.35em] uppercase font-semibold">
                Habitación King • Desayuno Incluido
              </div>
              <div className="absolute bottom-6 left-6 text-white lg:hidden">
                <span className="text-xs uppercase tracking-wider text-[#DFCA9D]">Desde</span>
                <p className="text-2xl font-serif">
                  S/ {heroSuite.pricePerNightPen}{' '}
                  <span className="text-xs font-sans font-light">/ noche</span>
                </p>
              </div>
              <div className="absolute bottom-6 right-6 hidden lg:flex items-center gap-2 bg-[#141312]/80 backdrop-blur-md text-white text-[11px] px-3.5 py-1.5 uppercase tracking-wider border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Ver Galería &amp; Detalles</span>
              </div>
            </div>

            {/* Editorial Details Column (40%) */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center justify-between text-[11px] text-neutral-500 uppercase tracking-[0.25em] mb-3">
                  <span>{heroSuite.refCode}</span>
                  <span>{heroSuite.bedType}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#141312] font-light leading-snug mb-4">
                  {heroSuite.title}
                </h3>

                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-light mb-8">
                  {heroSuite.description}
                </p>

                {/* Technical Specs */}
                <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 py-5 border-y border-[#E4DCD0] text-[11px] text-neutral-700 tracking-wider">
                  {heroSuite.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 bg-[#C5A059] shrink-0" />
                      <span>{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and Clean CTA */}
              <div className="mt-8 pt-4 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-neutral-500 tracking-[0.25em] uppercase block">
                    Tarifa por noche
                  </span>
                  <span className="text-2xl sm:text-3xl font-serif font-normal text-[#141312]">
                    S/ {heroSuite.pricePerNightPen}
                  </span>
                </div>

                <button
                  onClick={() => onBookRoom(heroSuite)}
                  type="button"
                  className="inline-flex items-center gap-2 bg-[#141312] hover:bg-[#C5A059] hover:text-[#141312] text-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 group cursor-pointer active:scale-95 shadow-sm"
                >
                  <span>Consultar habitación</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </article>

          {/* SECONDARY ROOMS (2-Column Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {secondarySuites.map((room) => {
              const featureIcons = [Bed, Laptop, Wind, Coffee];
              return (
                <article
                  key={room.id}
                  className="bg-white border border-[#E4DCD0] overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div>
                    <div
                      onClick={() => setSelectedRoomForModal(room)}
                      className="relative h-72 overflow-hidden cursor-pointer"
                    >
                      <motion.img
                        src={room.image}
                        alt={room.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.65, ease: 'easeOut' }}
                      />
                      <div className="absolute top-4 left-4 bg-[#141312]/90 backdrop-blur-md px-3.5 py-1 border border-[#C5A059]/30 text-[#C5A059] text-[9px] tracking-[0.35em] uppercase font-semibold">
                        {room.badge}
                      </div>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-[#141312]/80 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.25em] px-4 py-2 border border-white/20">
                          Ver Detalles &amp; Fotos
                        </span>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center justify-between text-[10px] text-neutral-500 uppercase tracking-[0.25em] mb-2">
                        <span>{room.refCode}</span>
                        <span>{room.bedType}</span>
                      </div>

                      <h3 className="text-2xl font-serif font-light text-[#141312] mb-3">
                        {room.title}
                      </h3>

                      <p className="text-neutral-600 text-xs sm:text-sm font-light leading-relaxed mb-6">
                        {room.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2.5 text-[11px] text-neutral-700 py-4 border-t border-b border-[#E4DCD0]">
                        {room.features.map((feature, index) => {
                          const FeatureIcon = featureIcons[index] || Wifi;
                          return (
                            <div key={feature.label} className="flex items-center gap-2">
                              <FeatureIcon className="w-3.5 h-3.5 text-[#C5A059]" />
                              <span>{feature.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 pt-0 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-500 tracking-[0.25em] uppercase block">
                        Desde
                      </span>
                      <span className="text-2xl font-serif text-[#141312]">
                        S/ {room.pricePerNightPen}{' '}
                        <span className="text-xs font-sans text-neutral-500 font-light">/ noche</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onBookRoom(room)}
                      type="button"
                      className="inline-flex items-center gap-2 text-[#141312] hover:text-[#C5A059] text-xs font-semibold uppercase tracking-[0.25em] border-b border-[#141312] pb-1 hover:border-[#C5A059] transition-colors duration-300 cursor-pointer active:scale-95"
                    >
                      <span>Consultar habitación</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Room Modal */}
      <RoomModal
        room={selectedRoomForModal}
        onClose={() => setSelectedRoomForModal(null)}
        onSelectForBooking={(room) => onBookRoom(room)}
      />
    </section>
  );
};
