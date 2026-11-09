import React from 'react';
import { Star } from 'lucide-react';
import { hotelTestimonials } from '../data/testimonialsData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E4DCD0]">
          <div>
            <span className="text-[#C5A059] font-semibold tracking-[0.35em] uppercase text-[11px] block mb-2">
              05 / Testimonios
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#141312] font-light">
              Elogios de Quienes Nos Visitaron
            </h2>
          </div>
          <p className="text-neutral-500 text-xs font-light tracking-wider uppercase mt-4 md:mt-0">
            Huéspedes verificados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hotelTestimonials.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 sm:p-10 border border-[#E4DCD0] flex flex-col justify-between hover:border-[#C5A059]/60 transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex text-[#C5A059] gap-1.5 mb-5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                  ))}
                </div>
                <p className="text-neutral-600 text-xs sm:text-sm font-light italic leading-relaxed mb-6">
                  {review.text}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4DCD0]/60">
                <p className="text-xs font-semibold text-[#141312] uppercase tracking-wider">
                  {review.author}
                </p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-0.5">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
