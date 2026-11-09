import React from 'react';
import { X, Coffee, Check, Clock, UtensilsCrossed, ArrowRight } from 'lucide-react';

interface BreakfastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const BreakfastModal: React.FC<BreakfastModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white border border-[#C5A059]/40 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#141312] p-6 text-white flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#C5A059] border border-[#C5A059]/40">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[#DFCA9D] text-[10px] tracking-[0.25em] uppercase font-semibold block">
                Cortesía de la Casa
              </span>
              <h3 className="text-xl font-serif font-light">Desayuno Diario Incluido</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 bg-white/10 hover:bg-[#C5A059] hover:text-[#141312] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm text-neutral-700 font-light leading-relaxed">
            "Especialistas en tus mañanas. Dedicamos toda nuestra atención a prepararte un desayuno
            premium de cortesía. Para el resto del día, nuestra ubicación privilegiada te permitirá
            descubrir los restaurantes y picanterías más afamados del centro histórico a solo
            minutos caminando."
          </p>

          <div className="bg-[#FAF8F5] border border-[#E4DCD0] p-4 text-xs space-y-2 text-neutral-600">
            <div className="flex items-center gap-2 text-[#141312] font-semibold uppercase tracking-wider">
              <Clock className="w-4 h-4 text-[#C5A059]" />
              <span>Horario de Atención: 07:00 am a 10:00 am</span>
            </div>
            <p>Servido en nuestro acogedor comedor de la planta baja.</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-neutral-800 uppercase tracking-wider mb-3">
              Incluye para cada huésped:
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-700">
              {[
                'Cesta de panes frescos y tostadas artesanales',
                'Café recién pasado del norte peruano y leche fresca',
                'Variedad de té orgánico e infusiones digestivas',
                'Jugo natural de fruta fresca de la temporada',
                'Mantequilla de campo, mermeladas y quesillo',
                'Opciones de huevos al gusto preparados al instante',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Location culinary advantage */}
          <div className="p-4 bg-[#FAF8F5] border-l-2 border-[#C5A059] text-xs text-neutral-700 font-light">
            <strong className="text-[#141312] font-semibold block mb-0.5">
              Gastronomía chiclayana a tu alcance:
            </strong>
            Nuestra ubicación céntrica te sitúa a pasos de los templos del arroz con pato, cebiches y
            espesados más reconocidos de Chiclayo para tus almuerzos y cenas.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E4DCD0] flex justify-end gap-3">
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2.5 border border-neutral-300 text-neutral-700 text-xs uppercase tracking-wider hover:bg-neutral-100"
          >
            Entendido
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            type="button"
            className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#9e7d38] text-[#141312] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow"
          >
            <span>Reservar Ahora</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
