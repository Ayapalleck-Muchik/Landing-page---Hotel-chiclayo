import React, { useState } from 'react';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { hotelRooms } from '../data/roomsData';

interface BookingSearchBoxProps {
  onSearch: (params: {
    checkIn: string;
    checkOut: string;
    suiteId: string;
  }) => void;
}

export const BookingSearchBox: React.FC<BookingSearchBoxProps> = ({ onSearch }) => {
  // Set default dates (today + 1 and today + 3)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(nextDay));
  const [suiteId, setSuiteId] = useState(hotelRooms[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ checkIn, checkOut, suiteId });
  };

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-6 -mt-16 sm:-mt-20">
      <div className="bg-white border border-[#E4DCD0] shadow-2xl p-6 sm:p-8 lg:p-9">
        {/* Top Header Information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-[#E4DCD0]/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#C5A059] rounded-full animate-pulse" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-neutral-800">
              Verificar Disponibilidad • Tarifas Exclusivas
            </span>
          </div>
          <span className="text-[11px] text-neutral-500 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
            Mejor tarifa garantizada directa
          </span>
        </div>

        {/* Form Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
          {/* Check In Field */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-[0.22em] mb-2">
              Llegada (Check-in)
            </label>
            <div className="relative">
              <input
                type="date"
                value={checkIn}
                min={formatDate(today)}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] px-4 py-3 text-xs tracking-wider text-[#141312] outline-none transition cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Check Out Field */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-[0.22em] mb-2">
              Salida (Check-out)
            </label>
            <div className="relative">
              <input
                type="date"
                value={checkOut}
                min={checkIn || formatDate(tomorrow)}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] px-4 py-3 text-xs tracking-wider text-[#141312] outline-none transition cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Room Selection */}
          <div>
            <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-[0.22em] mb-2">
              Categoría de Suite
            </label>
            <select
              value={suiteId}
              onChange={(e) => setSuiteId(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] px-4 py-3 text-xs text-neutral-800 outline-none transition cursor-pointer"
            >
              {hotelRooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.refCode.replace('Ref. ', '')} — {room.title}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#141312] hover:bg-[#1E1D1B] text-[#C5A059] border border-[#C5A059]/50 hover:border-[#C5A059] font-medium text-xs uppercase tracking-[0.25em] px-6 py-3.5 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-98 shadow-md"
            >
              <span>Consultar Fechas</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
