import React, { useState, useEffect, useRef } from 'react';
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

const WHATSAPP_COOLDOWN_MS = 30_000;

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
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const isOpeningWhatsAppRef = useRef(false);

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

  useEffect(() => {
    if (!cooldownUntil) return;

    const updateCooldown = () => {
      const seconds = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
      setCooldownSeconds(seconds);
      if (seconds === 0) {
        setCooldownUntil(null);
        isOpeningWhatsAppRef.current = false;
      }
    };

    updateCooldown();
    const interval = window.setInterval(updateCooldown, 250);
    return () => window.clearInterval(interval);
  }, [cooldownUntil]);

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
    const now = Date.now();
    const millisecondsRemaining = Math.max(0, (cooldownUntil || 0) - now);

    if (isOpeningWhatsAppRef.current || millisecondsRemaining > 0) {
      setCooldownSeconds(Math.max(1, Math.ceil(millisecondsRemaining / 1000)) || 30);
      return;
    }

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
- Nombre: ${guestName || 'Por definir'}
- Teléfono: ${guestPhone || 'No especificado'}
- Observaciones: ${notes || 'Ninguna'}
- Desayuno incluido
- Total estimado: S/ ${totalPrice}
- Solicitud pendiente de confirmación por el hotel.`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/51978007640?text=${encoded}`;

    isOpeningWhatsAppRef.current = true;
    setCooldownUntil(now + WHATSAPP_COOLDOWN_MS);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const cooldownMessage = cooldownSeconds > 0
    ? `Para evitar aperturas repetidas, podrás volver a abrir WhatsApp en ${cooldownSeconds} ${cooldownSeconds === 1 ? 'segundo' : 'segundos'}. Esta espera solo aplica en este navegador.`
    : '';

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
                Solicitud lista para enviar
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                Revisa y envía el mensaje por WhatsApp para solicitar <strong>{currentRoom.title}</strong> por{' '}
                {nights} noches (S/ {totalPrice}). La reserva queda pendiente de confirmación por el hotel;
                el desayuno está incluido.
              </p>
              {cooldownMessage && (
                <p id="whatsapp-cooldown" role="status" aria-live="polite" className="text-xs text-[#9e7d38] max-w-md mx-auto leading-relaxed">
                  {cooldownMessage}
                </p>
              )}

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
                  disabled={cooldownSeconds > 0}
                  aria-describedby={cooldownMessage ? 'whatsapp-cooldown' : undefined}
                  className="px-6 py-3 bg-[#141312] hover:bg-[#C5A059] hover:text-[#141312] text-white text-xs uppercase tracking-[0.2em] font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reabrir WhatsApp
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmReservation} className="space-y-5">
              {/* Room Selection */}
              <div>
                <label htmlFor="booking-room" className="block text-xs font-semibold text-neutral-700 uppercase tracking-[0.18em] mb-2">
                  Habitación
                </label>
                <select
                  id="booking-room"
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full rounded-lg bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30 px-4 py-3.5 text-sm text-neutral-800 outline-none transition"
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
                  <label htmlFor="booking-check-in" className="block text-xs font-semibold text-neutral-700 uppercase tracking-[0.18em] mb-2">
                    Llegada
                  </label>
                  <input
                    id="booking-check-in"
                    type="date"
                    value={checkIn}
                    min={formatLocalDate(today)}
                    onChange={(e) => handleCheckInChange(e.target.value)}
                    aria-invalid={Boolean(dateError)}
                    aria-describedby={dateError ? 'booking-date-error' : undefined}
                    className="w-full rounded-lg bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30 px-4 py-3 text-sm text-neutral-800 outline-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="booking-check-out" className="block text-xs font-semibold text-neutral-700 uppercase tracking-[0.18em] mb-2">
                    Salida
                  </label>
                  <input
                    id="booking-check-out"
                    type="date"
                    value={checkOut}
                    min={minimumCheckOutDate(checkIn)}
                    onChange={(e) => {
                      setCheckOut(e.target.value);
                      setDateError('');
                    }}
                    aria-invalid={Boolean(dateError)}
                    aria-describedby={dateError ? 'booking-date-error' : undefined}
                    className="w-full rounded-lg bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30 px-4 py-3 text-sm text-neutral-800 outline-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="booking-guests" className="block text-xs font-semibold text-neutral-700 uppercase tracking-[0.18em] mb-2">
                    Huéspedes
                  </label>
                  <select
                    id="booking-guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full rounded-lg bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30 px-4 py-3 text-sm text-neutral-800 outline-none"
                  >
                    <option value={1}>1 Persona</option>
                    <option value={2}>2 Personas</option>
                    <option value={3}>3 Personas</option>
                    <option value={4}>4 Personas</option>
                  </select>
                </div>
              </div>

              {dateError && (
                <p id="booking-date-error" className="text-xs text-red-700" role="alert">
                  {dateError}
                </p>
              )}

              {/* Client Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-name" className="block text-xs font-semibold text-neutral-700 uppercase tracking-[0.18em] mb-2">
                    Nombre
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    maxLength={80}
                    autoComplete="name"
                    className="w-full rounded-lg bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30 px-4 py-3 text-sm text-neutral-800 outline-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="booking-whatsapp" className="block text-xs font-semibold text-neutral-700 uppercase tracking-[0.18em] mb-2">
                    WhatsApp
                  </label>
                  <input
                    id="booking-whatsapp"
                    type="tel"
                    placeholder="+51 987 654 321"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    maxLength={32}
                    inputMode="tel"
                    autoComplete="tel"
                    className="w-full rounded-lg bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30 px-4 py-3 text-sm text-neutral-800 outline-none"
                  />
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label htmlFor="booking-notes" className="block text-xs font-semibold text-neutral-700 uppercase tracking-[0.18em] mb-2">
                  Observaciones (opcional)
                </label>
                <textarea
                  id="booking-notes"
                  rows={2}
                  placeholder="Hora estimada de llegada, traslados desde aeropuerto, preferencias de cama..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={500}
                  className="w-full rounded-lg bg-[#FAF8F5] border border-neutral-300 focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30 p-3.5 text-sm text-neutral-800 outline-none resize-none"
                />
              </div>

              {/* Pricing Summary Box */}
              <div className="bg-[#FAF8F5] border border-[#E4DCD0] p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">
                    Resumen: {nights} {nights === 1 ? 'noche' : 'noches'} × S/
                    {currentRoom.pricePerNightPen}
                  </span>
                  <span className="text-[11px] text-[#9e7d38] font-semibold uppercase tracking-wider block mb-1">
                    Desayuno incluido
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
                disabled={cooldownSeconds > 0}
                aria-describedby={cooldownMessage ? 'whatsapp-cooldown' : undefined}
                className="w-full bg-[#141312] hover:bg-[#C5A059] text-white hover:text-[#141312] py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>Abrir WhatsApp para enviar solicitud</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              {cooldownMessage && (
                <p id="whatsapp-cooldown" role="status" aria-live="polite" className="text-xs text-[#9e7d38] text-center leading-relaxed">
                  {cooldownMessage}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
