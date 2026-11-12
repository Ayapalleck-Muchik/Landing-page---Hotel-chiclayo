import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { hotelScenes } from '../data/hotelScenes';
import { ScrollScrubVideo, type ScrollScrubVideoHandle } from './ScrollScrubVideo';

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * A short editorial sequence built from independent real clips.
 * Dissolves intentionally mark room changes; they do not imply a false connected camera path.
 */
export const ImmersiveHotelWorld: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const worldRef = useRef<HTMLElement>(null);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sceneHandles = useRef<Array<ScrollScrubVideoHandle | null>>([]);
  const scrollFrameRef = useRef<number | null>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [worldVisible, setWorldVisible] = useState(false);
  const [canScrub, setCanScrub] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateCapability = () => {
      const saveData = Boolean((navigator as NavigatorWithConnection).connection?.saveData);
      setCanScrub(mediaQuery.matches && !saveData && !reduceMotion);
    };
    updateCapability();
    mediaQuery.addEventListener('change', updateCapability);
    return () => mediaQuery.removeEventListener('change', updateCapability);
  }, [reduceMotion]);

  useEffect(() => {
    const world = worldRef.current;
    if (!world) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWorldVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '360px 0px' },
    );
    observer.observe(world);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      scrollFrameRef.current = null;
      const markers = markerRefs.current;
      let index = 0;
      for (let markerIndex = 0; markerIndex < markers.length; markerIndex += 1) {
        const marker = markers[markerIndex];
        if (marker && marker.getBoundingClientRect().top <= 0) index = markerIndex;
      }

      const currentMarker = markers[index];
      if (!currentMarker) return;
      const progress = clamp(-currentMarker.getBoundingClientRect().top / currentMarker.offsetHeight);
      const dissolve = index < hotelScenes.length - 1 ? clamp((progress - 0.82) / 0.18) : 0;

      sceneHandles.current.forEach((handle, handleIndex) => {
        if (!handle) return;
        if (handleIndex === index) {
          handle.setOpacity(1 - dissolve);
          handle.setProgress(progress);
        } else if (handleIndex === index + 1) {
          handle.setOpacity(dissolve);
          handle.setProgress(0);
        } else {
          handle.setOpacity(0);
        }
      });

      setActiveScene((previous) => (previous === index ? previous : index));
    };

    const scheduleUpdate = () => {
      if (scrollFrameRef.current === null) {
        scrollFrameRef.current = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
    };
  }, []);

  const scene = hotelScenes[activeScene];

  return (
    <section ref={worldRef} id="recorrido" className="relative bg-[#141312]" aria-label="Recorrido visual del hotel">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {hotelScenes.map((item, index) => (
          <ScrollScrubVideo
            key={item.id}
            ref={(node) => {
              sceneHandles.current[index] = node;
            }}
            scene={item}
            initialVisible={index === 0}
            shouldLoad={worldVisible && canScrub && Math.abs(index - activeScene) <= 1}
          />
        ))}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#141312]/75 to-transparent" aria-hidden="true" />
        <motion.div
          key={scene.id}
          className="pointer-events-none absolute bottom-10 left-6 z-10 border-l-2 border-[#C5A059] pl-4 text-white sm:bottom-12 sm:left-12"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#DFCA9D]">{scene.chapter}</p>
          <p className="mt-1 font-serif text-3xl font-normal sm:text-4xl">{scene.label}</p>
        </motion.div>
        <div className="absolute bottom-8 right-6 z-10 flex gap-2 sm:right-12" aria-hidden="true">
          {hotelScenes.map((item, index) => (
            <span key={item.id} className={`h-px w-8 transition-colors duration-500 ${index === activeScene ? 'bg-[#DFCA9D]' : 'bg-white/35'}`} />
          ))}
        </div>
      </div>

      <div aria-hidden="true">
        {hotelScenes.map((item, index) => (
          <div
            key={item.id}
            ref={(node) => {
              markerRefs.current[index] = node;
            }}
            className={item.scrollLength}
          />
        ))}
      </div>
    </section>
  );
};
