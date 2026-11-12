import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { HotelScene } from '../data/hotelScenes';

export interface ScrollScrubVideoHandle {
  setProgress: (progress: number) => void;
  setOpacity: (opacity: number) => void;
}

interface ScrollScrubVideoProps {
  scene: HotelScene;
  shouldLoad: boolean;
  initialVisible: boolean;
}

/** A paused video whose timeline is driven only by the parent scroll engine. */
export const ScrollScrubVideo = forwardRef<ScrollScrubVideoHandle, ScrollScrubVideoProps>(
  ({ scene, shouldLoad, initialVisible }, ref) => {
    const layerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const objectUrlRef = useRef<string | null>(null);
    const pendingProgressRef = useRef(0);
    const seekingRef = useRef(false);
    const seekFrameRef = useRef<number | null>(null);
    const [hasPainted, setHasPainted] = useState(false);
    const [hasError, setHasError] = useState(false);

    const seekToPendingTime = () => {
      seekFrameRef.current = null;
      const video = videoRef.current;
      if (!video || seekingRef.current || !Number.isFinite(video.duration) || video.duration <= 0) return;
      const nextTime = Math.min(
        Math.max(pendingProgressRef.current * video.duration, 0),
        Math.max(0, video.duration - 0.04),
      );
      if (Math.abs(video.currentTime - nextTime) < 1 / 30) return;
      seekingRef.current = true;
      video.currentTime = nextTime;
    };

    const scheduleSeek = () => {
      if (seekFrameRef.current === null) {
        seekFrameRef.current = window.requestAnimationFrame(seekToPendingTime);
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        setProgress: (progress) => {
          pendingProgressRef.current = progress;
          const video = videoRef.current;
          if (!video || !Number.isFinite(video.duration)) return;
          scheduleSeek();
        },
        setOpacity: (opacity) => {
          if (layerRef.current) layerRef.current.style.opacity = String(opacity);
        },
      }),
      [],
    );

    useEffect(() => {
      if (!shouldLoad) return;

      const controller = new AbortController();
      const load = async () => {
        try {
          const response = await fetch(scene.video, { signal: controller.signal });
          if (!response.ok) throw new Error(`Unable to load ${scene.id}`);
          const objectUrl = URL.createObjectURL(await response.blob());
          objectUrlRef.current = objectUrl;
          const video = videoRef.current;
          if (!video) return;
          video.src = objectUrl;
          video.load();
        } catch {
          if (!controller.signal.aborted) setHasError(true);
        }
      };

      setHasError(false);
      void load();

      return () => {
        controller.abort();
        if (seekFrameRef.current !== null) window.cancelAnimationFrame(seekFrameRef.current);
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
          objectUrlRef.current = null;
        }
        const video = videoRef.current;
        if (video) video.removeAttribute('src');
      };
    }, [scene.id, scene.video, shouldLoad]);

    const handleLoadedMetadata = () => {
      const video = videoRef.current;
      if (!video) return;
      video.pause();
      video.currentTime = Math.max(0.001, pendingProgressRef.current * video.duration);
    };

    const handleSeeked = () => {
      seekingRef.current = false;
      setHasPainted(true);
      scheduleSeek();
    };

    return (
      <div
        ref={layerRef}
        className="absolute inset-0 bg-[#141312] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ opacity: initialVisible ? 1 : 0 }}
        aria-hidden="true"
      >
        <img
          src={scene.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-contain md:object-cover"
          style={{ objectPosition: scene.objectPosition }}
        />
        <div className="absolute inset-0 bg-[#141312]/20" />
        {!hasError && (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="none"
            poster={scene.poster}
            onLoadedMetadata={handleLoadedMetadata}
            onSeeked={handleSeeked}
            onError={() => setHasError(true)}
            className={`absolute inset-0 hidden h-full w-full object-cover transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:block ${hasPainted ? 'opacity-100' : 'opacity-0'}`}
            style={{ objectPosition: scene.objectPosition }}
          />
        )}
      </div>
    );
  },
);

ScrollScrubVideo.displayName = 'ScrollScrubVideo';
