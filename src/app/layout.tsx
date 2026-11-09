import React from 'react';
import { Marcellus, Jost } from 'next/font/google';
import '../index.css';

/**
 * ============================================================================
 * CONFIGURACIÓN DE TIPOGRAFÍA OFICIAL (next/font/google)
 * 
 * - Fuente Primaria: Marcellus (Títulos, h1-h6, botones destacados, tracking amplio)
 * - Fuente Secundaria: Jost (Cuerpo, párrafos, menús, descripciones, pesos 300/400)
 * ============================================================================
 */

export const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marcellus',
  display: 'swap',
});

export const jost = Jost({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata = {
  title: 'Hotel Ayapalleck Muchik | Hotel Boutique Chiclayo Centro',
  description:
    'Tu descanso perfecto en el centro de Chiclayo. Confort moderno, seguridad 24/7 y desayuno de cortesía.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${marcellus.variable} ${jost.variable} scroll-smooth`}
    >
      <body className="font-sans font-light bg-[#FAF8F5] text-[#141312] antialiased">
        {children}
      </body>
    </html>
  );
}
