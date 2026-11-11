import React, { useState } from 'react';
import { WelcomeModal } from './components/WelcomeModal';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BookingSearchBox } from './components/BookingSearchBox';
import { StickyBookingBar } from './components/StickyBookingBar';
import { BookingAdvantagesSection } from './components/BookingAdvantagesSection';
import { SuitesSection } from './components/SuitesSection';
import { BreakfastSection } from './components/BreakfastSection';
import { LocationContactSection } from './components/LocationContactSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BookingModal } from './components/BookingModal';
import { Room } from './types';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [bookingParams, setBookingParams] = useState<{
    suiteId?: string;
    checkIn?: string;
    checkOut?: string;
  }>({});

  const handleOpenBooking = (params?: { suiteId?: string; checkIn?: string; checkOut?: string }) => {
    if (params) {
      setBookingParams(params);
    }
    setIsBookingModalOpen(true);
  };

  const handleBookRoom = (room: Room) => {
    setBookingParams((prev) => ({ ...prev, suiteId: room.id }));
    setIsBookingModalOpen(true);
  };

  const handleSearchDates = (params: { checkIn: string; checkOut: string; suiteId: string }) => {
    setBookingParams(params);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141312] selection:bg-[#C5A059] selection:text-white flex flex-col font-sans">
      {/* 01. Header Principal con Navegación y Reserva Directa */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 03. Hero Section con Copywriting Persuasivo Urbano */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenPapalAnnouncement={() => setIsWelcomeModalOpen(true)}
        />

        {/* 04. Barra de Disponibilidad Acoplada */}
        <BookingSearchBox onSearch={handleSearchDates} onDraftChange={setBookingParams} />

        <BookingAdvantagesSection />

        {/* 05. Colección de Habitaciones & Suites */}
        <SuitesSection onBookRoom={handleBookRoom} />

        {/* 06. Desayuno incluido */}
        <BreakfastSection onOpenBooking={() => handleOpenBooking()} />

        {/* 07. Ubicación en el centro de Chiclayo */}
        <LocationContactSection />

        {/* 08. Opiniones recibidas */}
        <TestimonialsSection />
      </main>

      {/* 10. Footer Institucional */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* 11. Botón Flotante de WhatsApp (ÚNICO elemento verde en la app) */}
      <WhatsAppButton />

      <StickyBookingBar
        draft={bookingParams}
        hidden={isBookingModalOpen || isWelcomeModalOpen}
        onOpenBooking={() => handleOpenBooking(bookingParams)}
      />

      {/* Modals Interactivos */}
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={() => setIsWelcomeModalOpen(false)}
        onCheckAvailability={() => handleOpenBooking()}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialRoomId={bookingParams.suiteId}
        initialCheckIn={bookingParams.checkIn}
        initialCheckOut={bookingParams.checkOut}
      />

    </div>
  );
}
