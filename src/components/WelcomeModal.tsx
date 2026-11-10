import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';

interface WelcomeModalProps {
  onCheckAvailability: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onCheckAvailability }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal 2 seconds after page load as requested
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  const handleAction = () => {
    setIsOpen(false);
    onCheckAvailability();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-neutral-50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#C5A059]/30 grid grid-cols-1 md:grid-cols-2">
        {/* Discrete Close Button (X) */}
        <button
          onClick={() => setIsOpen(false)}
          type="button"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-900 flex items-center justify-center transition-all shadow-md cursor-pointer border border-neutral-200"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image with object-fit: cover */}
        <div className="relative min-h-[220px] sm:min-h-[300px] md:min-h-[460px] bg-neutral-900 overflow-hidden">
          <img
            src="/images-hotel/elpapa-chiclayo.jpg"
            alt="Histórica Visita Papal en Chiclayo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#141312]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C5A059]/30 text-white text-[11px] tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Chiclayo • Enclave Histórico</span>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-neutral-50">
          <div>
            {/* Small Gold Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CBA153]/15 text-[#9e7d38] border border-[#CBA153]/40 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CBA153]" />
              <span>EVENTO HISTÓRICO</span>
            </div>

            {/* Large Serif Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-neutral-900 font-light tracking-wide leading-tight mb-4">
              Vive la Visita Papal desde el Corazón de Chiclayo
            </h2>

            {/* Sans-serif Paragraph */}
            <p className="text-neutral-600 text-xs sm:text-sm lg:text-base font-sans font-light leading-relaxed mb-6">
              Asegura tu comodidad a pasos de la ruta principal del Papa León XIV. Habitaciones
              limitadas para esta temporada.
            </p>
          </div>

          {/* Large Gold Call To Action Button */}
          <div className="pt-2">
            <button
              onClick={handleAction}
              type="button"
              className="w-full inline-flex items-center justify-center gap-3 bg-[#CBA153] hover:bg-[#b88e40] text-neutral-900 hover:text-black py-4 px-6 rounded-xl font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              <span>Ver Disponibilidad →</span>
            </button>
            <p className="text-center text-[10px] text-neutral-400 mt-3 font-light">
              Cancelación flexible y reserva directa sin comisiones ocultas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
