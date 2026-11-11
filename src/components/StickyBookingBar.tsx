import React, { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { hotelRooms } from '../data/roomsData';

interface BookingDraft {
  checkIn?: string;
  checkOut?: string;
  suiteId?: string;
}

interface StickyBookingBarProps {
  draft: BookingDraft;
  hidden?: boolean;
  onOpenBooking: () => void;
}

const formatDate = (value?: string) => {
  if (!value) return 'Elige fechas';
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'short' }).format(
    new Date(year, month - 1, day)
  );
};

export const StickyBookingBar: React.FC<StickyBookingBarProps> = ({
  draft,
  hidden = false,
  onOpenBooking,
}) => {
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const room = hotelRooms.find((item) => item.id === draft.suiteId);

  useEffect(() => {
    const updateVisibility = () => {
      const threshold = window.innerWidth < 640 ? window.innerHeight + 360 : 620;
      const nextVisible = window.scrollY > threshold;
      setIsVisible((current) => (current === nextVisible ? current : nextVisible));
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  if (hidden || !isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-4 left-4 right-20 z-30 mx-auto max-w-4xl sm:inset-x-4 sm:bottom-6"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      role="region"
      aria-label="Acceso rápido a reservas"
    >
      <div className="flex items-center justify-between gap-3 border border-[#C5A059]/45 bg-[#141312]/95 p-2.5 text-white shadow-[0_14px_36px_rgb(20_19_18_/_0.28)] backdrop-blur-md sm:gap-6 sm:px-5">
        <div className="hidden min-w-0 items-center gap-3 sm:flex">
          <CalendarDays className="h-5 w-5 shrink-0 text-[#DFCA9D]" aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {room?.title || 'Tu próxima estadía'}
            </p>
            <p className="text-xs text-[#DFCA9D]">
              {formatDate(draft.checkIn)} — {formatDate(draft.checkOut)}
            </p>
          </div>
        </div>
        <p className="pl-2 text-sm font-medium text-[#F4EFE7] sm:hidden">Consulta tu estadía</p>
        <button
          type="button"
          onClick={onOpenBooking}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 bg-[#C5A059] px-4 text-sm font-semibold text-[#141312] transition-colors hover:bg-[#DFCA9D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#141312] sm:px-6"
        >
          Abrir reservas
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
};
