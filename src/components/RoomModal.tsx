import React, { useRef, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Room } from '../types';
import { useModalFocus } from '../utils/useModalFocus';

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
  onSelectForBooking: (room: Room) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({ room, onClose, onSelectForBooking }) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalFocus(Boolean(room), onClose, dialogRef, closeButtonRef);

  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="room-modal-title" className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-[#C5A059]/40 shadow-2xl">
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#141312]/80 hover:bg-[#141312] text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Gallery Viewport */}
          <div className="lg:col-span-7 bg-[#141312] flex flex-col justify-between">
            <div className="relative h-72 sm:h-96 lg:h-[460px] overflow-hidden">
              <img
                src={room.gallery[activeImageIdx] || room.image}
                alt={room.title}
                className="w-full h-full object-cover transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#141312]/90 backdrop-blur-md px-3.5 py-1 border border-[#C5A059]/40 text-[#C5A059] text-[10px] tracking-[0.25em] uppercase font-semibold">
                {room.badge || room.categoryLabel}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {room.gallery.length > 1 && (
              <div className="p-3 bg-[#1E1D1B] border-t border-neutral-800 flex gap-2 overflow-x-auto">
                {room.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    type="button"
                    className={`relative w-16 h-12 shrink-0 border-2 overflow-hidden transition-all cursor-pointer ${
                      activeImageIdx === idx
                        ? 'border-[#C5A059] opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Vista ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Room Details Viewport */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] text-neutral-500 uppercase tracking-[0.25em] mb-2">
                <span>{room.refCode}</span>
                <span>{room.bedType}</span>
              </div>

              <h2 id="room-modal-title" className="text-2xl sm:text-3xl font-serif text-[#141312] font-light leading-snug mb-3">
                {room.title}
              </h2>

              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-light mb-6">
                {room.description}
              </p>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-[11px] font-semibold text-neutral-800 uppercase tracking-[0.2em] mb-3">
                  Especificaciones
                </h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs text-neutral-700">
                  {room.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#C5A059] shrink-0" />
                      <span className="truncate">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mb-6 pt-4 border-t border-[#E4DCD0] text-xs text-neutral-600 font-light leading-relaxed">
                Si tienes alguna preferencia para tu estadía, consulta directamente con el hotel.
              </p>
            </div>

            {/* Price & Action */}
            <div className="pt-4 border-t border-[#E4DCD0] flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-neutral-500 tracking-[0.25em] uppercase block">
                  Tarifa por noche
                </span>
                <span className="text-2xl font-serif text-[#141312]">
                  S/ {room.pricePerNightPen}
                </span>
              </div>

              <button
                onClick={() => {
                  onSelectForBooking(room);
                  onClose();
                }}
                type="button"
                className="inline-flex items-center gap-2 bg-[#141312] hover:bg-[#C5A059] text-white hover:text-[#141312] px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 cursor-pointer shadow-md active:scale-95"
              >
                <span>Consultar habitación</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
