import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';

const WHATSAPP_NUMBER = '51978007640';
const COOLDOWN_MS = 30_000;

export const TestimonialsSection: React.FC = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [readyToSend, setReadyToSend] = useState(false);
  const isOpeningRef = useRef(false);

  useEffect(() => {
    if (!cooldownUntil) return;
    const update = () => {
      const seconds = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
      setSecondsLeft(seconds);
      if (seconds === 0) {
        setCooldownUntil(null);
        isOpeningRef.current = false;
      }
    };
    update();
    const timer = window.setInterval(update, 250);
    return () => window.clearInterval(timer);
  }, [cooldownUntil]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const remaining = Math.max(0, (cooldownUntil || 0) - Date.now());
    if (isOpeningRef.current || remaining > 0) {
      setSecondsLeft(Math.max(1, Math.ceil(remaining / 1000)) || 30);
      return;
    }
    if (!name.trim() || !rating || !comment.trim() || !consent) {
      setError('Completa tu nombre, valoración, comentario y consentimiento antes de continuar.');
      return;
    }

    setError('');
    setReadyToSend(true);
    isOpeningRef.current = true;
    setCooldownUntil(Date.now() + COOLDOWN_MS);
    const message = `Hola Hotel Ayapalleck Muchik, quiero compartir mi experiencia:\n- Nombre: ${name.trim()}\n- Valoración: ${rating}/5\n- Comentario: ${comment.trim()}\n- Autorizo publicar mi nombre y comentario tras la moderación del hotel.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const cooldownMessage = secondsLeft > 0
    ? `Para evitar aperturas repetidas, podrás volver a abrir WhatsApp en ${secondsLeft} ${secondsLeft === 1 ? 'segundo' : 'segundos'}.`
    : '';

  return (
    <section className="py-24 lg:py-32 bg-[#FAF8F5]" aria-labelledby="experiencias-title">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-5">
          <h2 id="experiencias-title" className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#141312] font-light leading-tight mb-5">
            Experiencias que se comparten con calma
          </h2>
          <p className="text-neutral-700 text-sm sm:text-base font-light leading-relaxed max-w-md">
            Aún no publicamos testimonios precargados. Si te hospedaste con nosotros, tu experiencia puede ayudar a futuros visitantes.
          </p>
          <p className="mt-5 text-sm text-[#9e7d38] leading-relaxed max-w-md">
            Tu comentario se enviará al hotel por WhatsApp para revisión; no se publicará automáticamente.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white border border-[#E4DCD0] rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
          {readyToSend ? (
            <div className="space-y-4" role="status" aria-live="polite">
              <h3 className="text-2xl font-serif text-[#141312]">Tu comentario está listo para enviar</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">Revisa el mensaje en WhatsApp y envíalo cuando quieras. El hotel lo revisará antes de decidir si se publica.</p>
              <button type="button" onClick={() => setReadyToSend(false)} className="text-sm text-[#141312] underline underline-offset-4 hover:text-[#9e7d38]">Editar comentario</button>
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="review-name" className="block text-sm font-semibold text-neutral-800 mb-2">Nombre</label>
                <input id="review-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={80} autoComplete="name" required className="w-full rounded-lg bg-[#FAF8F5] border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/25" />
              </div>
              <fieldset>
                <legend className="text-sm font-semibold text-neutral-800 mb-2">Valoración</legend>
                <div className="flex gap-2" aria-label="Selecciona una valoración de una a cinco estrellas">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button key={value} type="button" onClick={() => setRating(value)} aria-label={`${value} ${value === 1 ? 'estrella' : 'estrellas'}`} aria-pressed={rating === value} className="p-1 text-[#C5A059] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]">
                      <Star className={`w-6 h-6 ${value <= rating ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="review-comment" className="block text-sm font-semibold text-neutral-800 mb-2">Comentario</label>
                <textarea id="review-comment" value={comment} onChange={(event) => setComment(event.target.value)} maxLength={500} rows={4} required className="w-full rounded-lg bg-[#FAF8F5] border border-neutral-300 p-4 text-sm outline-none resize-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/25" />
              </div>
              <label className="flex items-start gap-3 text-sm text-neutral-600 leading-relaxed cursor-pointer">
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-1 accent-[#C5A059]" />
                <span>Autorizo al hotel a publicar mi nombre y comentario después de su revisión.</span>
              </label>
              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              {cooldownMessage && <p role="status" className="text-sm text-[#9e7d38]">{cooldownMessage}</p>}
              <button type="submit" disabled={secondsLeft > 0} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#141312] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#9e7d38] disabled:cursor-not-allowed disabled:opacity-50">
                <span>Abrir WhatsApp para enviar opinión</span><ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};
