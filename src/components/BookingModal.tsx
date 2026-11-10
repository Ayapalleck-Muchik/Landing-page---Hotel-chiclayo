import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Room } from '../types';
import { hotelRooms } from '../data/roomsData';
import {
  addLocalDays,
  calculateNights,
  formatLocalDate,
  isValidStay,
  minimumCheckOutDate,
} from '../utils/bookingDates';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialRoomId,
  initialCheckIn,
  initialCheckOut,
}) => {
  const today = new Date();
  const tomorrow = addLocalDays(today, 1);
  const nextDay = addLocalDays(today, 3);

  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialRoomId || hotelRooms[0].id
  );
  const [checkIn, setCheckIn] = useState<string>(initialCheckIn || formatLocalDate(tomorrow));
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut || formatLocalDate(nextDay));
  const [guests, setGuests] = useState<number>(2);
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const todayValue = formatLocalDate(new Date());
    const defaultCheckIn = formatLocalDate(addLocalDays(new Date(), 1));
    const nextCheckIn = initialCheckIn && initialCheckIn >= todayValue ? initialCheckIn : defaultCheckIn;
    const defaultCheckOut = minimumCheckOutDate(nextCheckIn);
    const nextCheckOut = initialCheckOut && calculateNights(nextCheckIn, initialCheckOut) > 0
      ? initialCheckOut
      : defaultCheckOut;

    setSelectedRoomId(initialRoomId || hotelRooms[0].id);
    setCheckIn(nextCheckIn);
    setCheckOut(nextCheckOut);
    setSubmitted(false);
    setDateError('');
  }, [isOpen, initialRoomId, initialCheckIn, initialCheckOut]);

  if (!isOpen) return null;

  const currentRoom = hotelRooms.find((r) => r.id === selectedRoomId) || hotelRooms[0];

  const nights = calculateNights(checkIn, checkOut);
  const totalPrice = nights * currentRoom.pricePerNightPen;

  const handleCheckInChange = (value: string) => {
    setCheckIn(value);
    const earliestCheckOut = minimumCheckOutDate(value);
    if (checkOut < earliestCheckOut) setCheckOut(earliestCheckOut);
    setDateError('');
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidStay(checkIn, checkOut)) {
      setDateError('La fecha de salida debe ser posterior a la fecha de llegada.');
      return;
    }

    setDateError('');
    setSubmitted(true);

    const message = `Hola Hotel Ayapalleck Muchik, deseo solicitar disponibilidad y una reserva desde la página web:
- Habitación: ${currentRoom.title} (${currentRoom.refCode})
- Llegada: ${checkIn}
- Salida: ${checkOut} (${nights} noches)
- Huéspedes: ${guests}
- Titular: ${guestName || 'Por definir'}
- Teléfono: ${guestPhone || 'No especificado'}
${notes ? `- Requerimientos: ${notes}` : ''}
- Desayuno incluido
- Total estimado: S/ ${totalPrice}
- Solicitud pendiente de confirmación por el hotel.`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/51999999999?text=${encoded}`;

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-[#C5A059]/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#141312] p-5 sm:p-6 text-white flex items-center justify-between border-b border-[#C5A059]/30">
          <div>
            <span className="text-[#DFCA9D] text-[10px] tracking-[0.35em] uppercase font-semibold block mb-1">
              Hotel Boutique Chiclayo • Desayuno Incluido
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-light">
              Reservar Habitación en el Centro
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-9 h-9 bg-white/10 hover:bg-[#C5A059] hover:text-[#141312] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar modal de reserva"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#FAF8F5] border border-[#C5A059] rounded-full flex items-center justify-center mx-auto text-[#C5A059]">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-serif text-[#141312]">
                Solicitud enviada por WhatsApp
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                Tu solicitud para <strong>{currentRoom.title}</strong> por {nights} noches (S/ {totalPrice})
                está pendiente de confirmación por el hotel. El desayuno está incluido. Si la ventana de
                WhatsApp no se abrió automáticamente, puedes presionar el botón inferior.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={onClose}
                  type="button"
                  className="px-6 py-3 border border-neutral-300 text-neutral-700 text-xs uppercase tracking-wider hover:bg-neutral-100"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleConfirmReservation}
                  type="button"
                  className="px-6 py-3 bg-[#141312] hover:bg-[#C5A059] hover:text-[#141312] text-white text-xs uppercase tracking-[0.2em] font-semibold transition"
                >
                  Reabrir WhatsApp
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmReservation} className="space-y-5">
              {/* Room Selection */}
              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-[0.2em] mb-2">
                  Seleccionar Suite o Habitación
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] px-4 py-3 text-xs text-neutral-800 outline-none transition"
                >
                  {hotelRooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.title} — S/ {room.pricePerNightPen} / noche ({room.refCode})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wider mb-1.5">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    min={formatLocalDate(today)}
                    onChange={(e) => handleCheckInChange(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] px-3 py-2.5 text-xs text-neutral-800 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wider mb-1.5">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={minimumCheckOutDate(checkIn)}
                    onChange={(e) => {
                      setCheckOut(e.target.value);
                      setDateError('');
                    }}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] px-3 py-2.5 text-xs text-neutral-800 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wider mb-1.5">
                    Huéspedes
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] px-3 py-2.5 text-xs text-neutral-800 outline-none"
                  >
                    <option value={1}>1 Persona</option>
                    <option value={2}>2 Personas</option>
                    <option value={3}>3 Personas</option>
                    <option value={4}>4 Personas</option>
                  </select>
                </div>
              </div>

              {dateError && (
                <p className="text-xs text-red-700" role="alert">
                  {dateError}
                </p>
              )}

              {/* Client Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wider mb-1.5">
                    Nombre del Titular
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] px-3 py-2.5 text-xs text-neutral-800 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wider mb-1.5">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+51 987 654 321"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] px-3 py-2.5 text-xs text-neutral-800 outline-none"
                  />
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-[11px] font-medium text-neutral-600 uppercase tracking-wider mb-1.5">
                  Requerimientos Especiales (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Hora estimada de llegada, traslados desde aeropuerto, preferencias de cama..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] p-3 text-xs text-neutral-800 outline-none resize-none"
                />
              </div>

              {/* Pricing Summary Box */}
              <div className="bg-[#FAF8F5] border border-[#E4DCD0] p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">
                    Resumen: {nights} {nights === 1 ? 'noche' : 'noches'} × S/
                    {currentRoom.pricePerNightPen}
                  </span>
                  <span className="text-xl sm:text-2xl font-serif text-[#141312] font-semibold">
                    Total estimado: S/ {totalPrice}
                  </span>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] text-neutral-500 block">Desayuno incluido</span>
                  <span className="text-[11px] text-[#C5A059] font-medium">Tarifa directa oficial</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#141312] hover:bg-[#C5A059] text-white hover:text-[#141312] py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98"
              >
                <span>Enviar solicitud por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
