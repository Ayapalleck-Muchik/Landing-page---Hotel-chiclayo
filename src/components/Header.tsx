import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#141312]/95 backdrop-blur-md border-b border-[#C5A059]/25 shadow-xl'
          : 'bg-[#141312]/85 backdrop-blur-sm border-b border-[#C5A059]/15'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo Branding */}
          <a
            href="#"
            className="flex items-center gap-3.5 group"
            aria-label="Hotel Ayapalleck Muchik Chiclayo"
          >
            <div className="relative w-11 h-11 bg-white/95 rounded-full p-1.5 flex items-center justify-center border border-[#C5A059]/50 shadow-sm transition-transform duration-500 group-hover:scale-105">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiPN7Z8dlbOdfTXs938z-pYUeHYRg6jqFQldtnSMGCsjSH5gI9rw-ryylwB-7dtnkoxhMenDbbJZor1ojlO86vRfsAkOblHJW0ThTGJf7OtC3_Bflgzn86Ps_TtacmvZ2vI1FPh05VuxWeQsgPK44PraLGPz2IhVLUnuASvR3PZaYTYoYOqpW9s3xTillZ5Pyx3oLY_eJAKoyOPCwGRhhEkqdMjdhpkiHX6_2sHKSWkjOSD-ZTeKQxAjTa7z0u18sz4AY"
                alt="Hotel Ayapalleck Muchik Chiclayo"
                className="h-full w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left">
              <span className="block text-white font-serif tracking-[0.25em] text-base lg:text-lg font-light uppercase leading-none">
                Ayapalleck
              </span>
              <span className="text-[#C5A059] text-[9px] lg:text-[10px] tracking-[0.35em] uppercase font-semibold block mt-1">
                Hotel Boutique Chiclayo
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-[0.06em] text-neutral-200">
            <a
              href="#habitaciones"
              className="hover:text-[#C5A059] transition-colors duration-200 py-1"
            >
              Habitaciones
            </a>
            <a
              href="#servicios"
              className="hover:text-[#C5A059] transition-colors duration-200 py-1"
            >
              Lo esencial
            </a>
            <a
              href="#desayuno"
              className="hover:text-[#C5A059] transition-colors duration-200 py-1"
            >
              Desayunos
            </a>
            <a
              href="#ubicacion"
              className="hover:text-[#C5A059] transition-colors duration-200 py-1"
            >
            Ubicación
            </a>
          </nav>

          {/* CTA Header Action */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              type="button"
              className="hidden sm:inline-flex items-center gap-2.5 bg-[#C5A059] hover:bg-[#9e7d38] text-[#141312] hover:text-white text-xs uppercase tracking-[0.22em] font-semibold px-5 py-2.5 transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
            >
              <span>Consultar disponibilidad</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden text-white hover:text-[#C5A059] p-2 focus:outline-none transition-colors"
              aria-label="Abrir Menú de Navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1E1D1B] border-b border-[#C5A059]/30 px-6 py-6 space-y-4 text-sm tracking-[0.06em] animate-in fade-in slide-in-from-top-4 duration-200">
          <a
            href="#habitaciones"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 hover:text-[#C5A059] py-1 border-b border-neutral-800"
          >
            Habitaciones
          </a>
          <a
            href="#servicios"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 hover:text-[#C5A059] py-1 border-b border-neutral-800"
          >
            Lo esencial
          </a>
          <a
            href="#desayuno"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 hover:text-[#C5A059] py-1 border-b border-neutral-800"
          >
            Desayunos de Cortesía
          </a>
          <a
            href="#ubicacion"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-300 hover:text-[#C5A059] py-1 border-b border-neutral-800"
          >
              Ubicación
          </a>

          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#9e7d38] text-[#141312] py-3 text-xs font-semibold tracking-[0.25em] uppercase transition-colors"
            >
              <span>Consultar disponibilidad</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
