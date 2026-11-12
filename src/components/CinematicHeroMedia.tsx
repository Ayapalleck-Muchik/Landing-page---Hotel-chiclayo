import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const VIDEO_URL = '/videos-hotel/fachada-scroll.mp4';
const POSTER_URL = '/images-hotel/fachada-scroll-poster.webp';

interface CinematicHeroMediaProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

/**
 * Keeps the supplied low-resolution façade clip as a contained, optional detail.
 * The high-resolution façade photograph remains the hero's canonical image.
 */
export const CinematicHeroMedia: React.FC<CinematicHeroMediaProps> = ({ sectionRef }) => {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const seekFrameRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const isLoadedRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || reduceMotion) return;

    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const hasSaveData = () => Boolean((navigator as NavigatorWithConnection).connection?.saveData);
    const canLoad = () => mediaQuery.matches && !hasSaveData();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && canLoad()) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '220px 0px' },
    );

    if (canLoad()) observer.observe(frame);
    const onChange = () => {
      if (canLoad()) observer.observe(frame);
    };
    mediaQuery.addEventListener('change', onChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', onChange);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!shouldLoad) return;

    const controller = new AbortController();
    const loadVideo = async () => {
      try {
        const response = await fetch(VIDEO_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`Video request failed: ${response.status}`);
        const objectUrl = URL.createObjectURL(await response.blob());
        objectUrlRef.current = objectUrl;
        const video = videoRef.current;
        if (!video) return;
        video.src = objectUrl;
        video.load();
      } catch (error) {
        if (!controller.signal.aborted) {
          setHasError(true);
        }
      }
    };

    void loadVideo();

    return () => {
      controller.abort();
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [shouldLoad]);

  useEffect(() => {
    if (!isReady || reduceMotion) return;

    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const seekToLatestTime = () => {
      seekFrameRef.current = null;
      if (!isLoadedRef.current || video.seeking || !Number.isFinite(video.duration)) return;
      if (Math.abs(video.currentTime - targetTimeRef.current) < 1 / 30) return;
      video.currentTime = targetTimeRef.current;
    };

    const updateTarget = () => {
      scrollFrameRef.current = null;
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (-rect.top + window.innerHeight * 0.15) / rect.height));
      targetTimeRef.current = progress * Math.max(0, video.duration - 0.05);
      if (seekFrameRef.current === null) {
        seekFrameRef.current = window.requestAnimationFrame(seekToLatestTime);
      }
    };

    const scheduleUpdate = () => {
      if (scrollFrameRef.current === null) {
        scrollFrameRef.current = window.requestAnimationFrame(updateTarget);
      }
    };
    const onSeeked = () => scheduleUpdate();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    video.addEventListener('seeked', onSeeked);
    scheduleUpdate();

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      video.removeEventListener('seeked', onSeeked);
      if (seekFrameRef.current !== null) window.cancelAnimationFrame(seekFrameRef.current);
      if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
    };
  }, [isReady, reduceMotion, sectionRef]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    isLoadedRef.current = true;
    video.muted = true;
    // Deliberately keep the media paused: scrolling is the only playback control.
    video.pause();
    setIsReady(true);
  };

  const handleSeeked = () => setIsReady(true);

  const handleError = () => {
    setHasError(true);
    setIsReady(false);
  };

  return (
    <div
      ref={frameRef}
      className="pointer-events-none absolute bottom-7 right-5 z-[1] hidden w-[min(35vw,31rem)] border border-[#DFCA9D]/60 bg-[#141312]/60 p-1.5 shadow-2xl backdrop-blur-sm lg:block"
      aria-hidden="true"
    >
      <div className="relative aspect-video overflow-hidden bg-[#141312]">
        <img src={POSTER_URL} alt="" className="absolute inset-0 h-full w-full object-cover" />
        {!hasError && (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="none"
            poster={POSTER_URL}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}
            onLoadedMetadata={handleLoadedMetadata}
            onSeeked={handleSeeked}
            onError={handleError}
          />
        )}
      </div>
    </div>
  );
};
