import React from 'react';
import { Coffee, MessageCircle, Sunrise } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const advantages = [
  {
    title: 'Desayuno incluido',
    description: 'Una pausa para empezar el día antes de salir a descubrir Chiclayo.',
    icon: Coffee,
  },
  {
    title: 'Reserva directa por WhatsApp',
    description: 'Envía tu solicitud al hotel y recibe la confirmación directamente del equipo.',
    icon: MessageCircle,
  },
  {
    title: 'Horarios pensados para tu llegada',
    description: 'Ingreso desde las 06:00 y salida hasta las 12:00 del día siguiente.',
    icon: Sunrise,
  },
];

export const BookingAdvantagesSection: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b border-[#E4DCD0] bg-white py-20 sm:py-24" id="servicios" aria-labelledby="advantages-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-8 border-b border-[#E4DCD0] pb-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
          <h2 id="advantages-title" className="max-w-xl font-serif text-[clamp(2.25rem,4.8vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.03em] text-[#141312]">
            Lo esencial para tu estadía
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg">
            Información directa y confirmada para organizar tu llegada con calma.
          </p>
        </div>

        <motion.div
          className="grid gap-x-8 gap-y-10 pt-10 sm:grid-cols-3"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.09 } },
          }}
        >
          {advantages.map(({ title, description, icon: Icon }) => (
            <motion.article
              key={title}
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="group border-t border-[#C5A059]/55 pt-5"
            >
              <Icon className="mb-6 h-6 w-6 text-[#9e7d38] transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true" />
              <h3 className="font-serif text-2xl font-medium leading-tight text-[#141312]">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
