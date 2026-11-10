import React from 'react';
import { ArrowRight, MapPin, ShieldCheck, Coffee } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#141312] text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/95 rounded-full p-1 flex items-center justify-center border border-[#C5A059]/30">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw2FdjgJ7_6vUK2TYsz9mVB9TY8qwMUqqSlIPk4gY4DeAIsKqrI5BKyrMBUNgFMoUK8eCrW4I4kJuUzCyUnccH-qrgwmLQ4ZZycrbEU6Y1TVHHqwqLuIRRouHph1W-qfVEVlG5-Af-Qii9FJM5t9a3RR68ia7MiPuzRMDNoz1UMUSw-_LVWN6xTnBiKUwoMfd3p7Z8bDZqdsNnA_MlP04DHpfGkzIlqbU-mQR6gzBOYz1XHvphkQ7MBJBaFmzgwavWlQs"
                  alt="Hotel Ayapalleck Muchik Chiclayo"
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-white font-serif tracking-[0.25em] text-base font-light uppercase block">
                  AYAPALLECK
                </span>
                <span className="text-[#C5A059] text-[9px] tracking-[0.25em] uppercase font-semibold">
                  Hotel Boutique Chiclayo
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Un lugar cálido para descansar en el centro de Chiclayo. El desayuno está incluido con tu estadía.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-serif text-sm uppercase tracking-[0.25em] mb-5">
              Navegación
            </h4>
            <ul className="space-y-3 text-xs font-light">
              <li>
                <a href="#habitaciones" className="hover:text-[#C5A059] transition">
                  Habitaciones &amp; Suites
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-[#C5A059] transition">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#desayuno" className="hover:text-[#C5A059] transition">
                  Desayunos de Cortesía
                </a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-[#C5A059] transition">
                  Ubicación
                </a>
              </li>
            </ul>
          </div>

          {/* Real Services & Mobility Notice */}
          <div>
            <h4 className="text-white font-serif text-sm uppercase tracking-[0.25em] mb-5">
              Durante tu estadía
            </h4>
            <ul className="space-y-2 text-xs font-light text-neutral-400">
              <li className="flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Desayuno incluido</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Frente a la comisaría</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Ubicación céntrica peatonal</span>
              </li>
              <li className="pt-2 text-[11px] text-neutral-500">
                Check-in desde las 06:00 • Check-out hasta las 12:00 del día siguiente • Recepción 24h
              </li>
            </ul>
          </div>

          {/* Direct Reservations */}
          <div>
            <h4 className="text-white font-serif text-sm uppercase tracking-[0.25em] mb-5">
              Reservas Directas
            </h4>
            <p className="text-xs text-neutral-400 mb-5 leading-relaxed font-light">
              Consulta fechas y habitaciones directamente con el hotel.
            </p>
            <button
              onClick={onOpenBooking}
              type="button"
              className="inline-flex items-center gap-2 border border-[#C5A059]/60 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#141312] px-5 py-3 text-[11px] uppercase tracking-[0.25em] font-medium transition duration-300 w-full justify-center cursor-pointer active:scale-95"
            >
              <span>Consultar disponibilidad</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-800/80 text-center text-[11px] text-neutral-500 tracking-wider">
          <p>© 2026 Hotel Ayapalleck Muchik. Centro de Chiclayo, Perú. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
