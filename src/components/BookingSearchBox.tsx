import React, { useEffect, useState } from 'react';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { hotelRooms } from '../data/roomsData';
import { addLocalDays, formatLocalDate, isValidStay, minimumCheckOutDate } from '../utils/bookingDates';

interface BookingSearchBoxProps {
  onSearch: (params: {
    checkIn: string;
    checkOut: string;
    suiteId: string;
  }) => void;
  onDraftChange?: (params: { checkIn: string; checkOut: string; suiteId: string }) => void;
}

export const BookingSearchBox: React.FC<BookingSearchBoxProps> = ({ onSearch, onDraftChange }) => {
  // Set default dates using the visitor's local calendar day.
  const today = new Date();
  const tomorrow = addLocalDays(today, 1);
  const nextDay = addLocalDays(today, 3);

  const [checkIn, setCheckIn] = useState(formatLocalDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatLocalDate(nextDay));
  const [suiteId, setSuiteId] = useState(hotelRooms[0].id);
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    onDraftChange?.({ checkIn, checkOut, suiteId });
  }, [checkIn, checkOut, onDraftChange, suiteId]);

  const handleCheckInChange = (value: string) => {
    setCheckIn(value);
    const earliestCheckOut = minimumCheckOutDate(value);
    if (checkOut < earliestCheckOut) setCheckOut(earliestCheckOut);
    setDateError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidStay(checkIn, checkOut)) {
      setDateError('Selecciona una salida posterior a la llegada.');
      return;
    }
    setDateError('');
    onSearch({ checkIn, checkOut, suiteId });
  };

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-6 -mt-16 sm:-mt-20">
      <div className="bg-white border border-[#E4DCD0] shadow-2xl p-6 sm:p-8 lg:p-9 rounded-xl">
        {/* Top Header Information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-[#E4DCD0]/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#C5A059] rounded-full animate-pulse" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-neutral-800">
              Consulta disponibilidad
            </span>
          </div>
          <span className="text-[11px] text-neutral-500 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
            Elige fechas y habitación
          </span>
        </div>

        {/* Form Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
          {/* Check In Field */}
          <div>
            <label htmlFor="search-check-in" className="block text-xs font-semibold text-neutral-700 uppercase tracking-[0.18em] mb-2">
              Llegada
            </label>
            <div className="relative">
              <input
                type="date"
                id="search-check-in"
                value={checkIn}
                min={formatLocalDate(today)}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="w-full rounded-lg bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30 px-4 py-3.5 text-sm text-[#141312] outline-none transition cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Check Out Field */}
          <div>
            <label htmlFor="search-check-out" className="block text-xs font-semibold text-neutral-700 uppercase tracking-[0.18em] mb-2">
              Salida
            </label>
            <div className="relative">
              <input
                type="date"
                id="search-check-out"
                value={checkOut}
                min={minimumCheckOutDate(checkIn)}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                  setDateError('');
                }}
                className="w-full rounded-lg bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30 px-4 py-3.5 text-sm text-[#141312] outline-none transition cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Room Selection */}
          <div>
            <label htmlFor="search-room" className="block text-xs font-semibold text-neutral-700 uppercase tracking-[0.18em] mb-2">
              Habitación
            </label>
            <select
              id="search-room"
              value={suiteId}
              onChange={(e) => setSuiteId(e.target.value)}
              className="w-full rounded-lg bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30 px-4 py-3.5 text-sm text-neutral-800 outline-none transition cursor-pointer"
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
              <span>Ver Disponibilidad</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </form>
        {dateError && (
          <p className="mt-3 text-xs text-red-700" role="alert">
            {dateError}
          </p>
        )}
      </div>
    </div>
  );
};
