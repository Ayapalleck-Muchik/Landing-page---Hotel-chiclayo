import React, { useRef } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useModalFocus } from '../utils/useModalFocus';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckAvailability: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  onCheckAvailability,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalFocus(isOpen, onClose, dialogRef, closeButtonRef);

  if (!isOpen) return null;

  const handleAction = () => {
    onClose();
    onCheckAvailability();
  };

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="papal-announcement-title"
    >
      <div className="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border border-[#C5A059]/30 bg-neutral-50 shadow-2xl sm:rounded-3xl md:grid-cols-2">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/80 text-neutral-700 shadow-md transition-colors hover:bg-white hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          aria-label="Cerrar ventana"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative min-h-[220px] overflow-hidden bg-neutral-900 sm:min-h-[300px] md:min-h-[460px]">
          <img
            src="/images-hotel/elpapa-chiclayo.jpg"
            alt="Histórica Visita Papal en Chiclayo"
            className="h-full w-full object-cover object-[18%_center] md:object-[15%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#141312]/80 px-3.5 py-1.5 text-[11px] uppercase tracking-wider text-white backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Chiclayo • Enclave Histórico</span>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-neutral-50 p-6 sm:p-10 md:p-12">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#CBA153]/40 bg-[#CBA153]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9e7d38] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CBA153]" />
              <span>Evento histórico</span>
            </div>
            <h2 id="papal-announcement-title" className="mb-4 font-serif text-2xl font-light leading-tight tracking-wide text-neutral-900 sm:text-3xl lg:text-4xl">
              Vive la Visita Papal desde el Corazón de Chiclayo
            </h2>
            <p className="mb-6 text-xs font-light leading-relaxed text-neutral-600 sm:text-sm lg:text-base">
              Consulta disponibilidad para tu visita y descansa a pasos de la ruta principal del Papa León XIV.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleAction}
              type="button"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#CBA153] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 shadow-lg transition-colors duration-300 hover:bg-[#b88e40] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9e7d38] focus-visible:ring-offset-2 sm:text-sm"
            >
              Ver disponibilidad
            </button>
            <p className="mt-3 text-center text-[10px] font-light text-neutral-400">
              La disponibilidad se confirma directamente con el hotel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
