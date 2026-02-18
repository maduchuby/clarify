'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 96;

function getFrameSrc(index: number): string {
  const padded = String(index).padStart(3, '0');
  return `/frames/frame_${padded}.jpg`;
}

export default function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);

  // Resize canvas without resetting it on every frame draw
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.width / dpr;
    const displayHeight = canvas.height / dpr;
    if (!displayWidth || !displayHeight) return;

    // Cover the canvas with the image (like object-fit: cover)
    const imgRatio = img.width / img.height;
    const canvasRatio = displayWidth / displayHeight;
    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

    if (imgRatio > canvasRatio) {
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgRatio;
      const isPortrait = displayWidth < displayHeight;
      const focusX = isPortrait ? 0.47 : 0.5;
      offsetX = (displayWidth - drawWidth) * focusX;
      offsetY = 0;
    } else {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgRatio;
      offsetX = 0;
      offsetY = (displayHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Preload all images
  useEffect(() => {
    setupCanvas();
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
          drawFrame(0);
        }
      };
      img.onerror = () => { loadedCount++; };
      images[i] = img;
    }
  }, [setupCanvas, drawFrame]);

  // Scroll handler — uses clientHeight for stable mobile viewport measurement
  useEffect(() => {
    if (!loaded) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      // clientHeight is stable on mobile (doesn't change with browser chrome)
      const vh = document.documentElement.clientHeight;
      const scrollHeight = container.offsetHeight - vh;
      if (scrollHeight <= 0) return;

      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / scrollHeight);
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * TOTAL_FRAMES)
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, drawFrame]);

  // Handle resize — resize canvas then redraw current frame
  useEffect(() => {
    if (!loaded) return;
    const handleResize = () => {
      setupCanvas();
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loaded, drawFrame, setupCanvas]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: '400dvh' }}
    >
      {/* dvh = dynamic viewport height — fixes iOS Safari 100vh white-space bug */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100dvh' }}>
        {/* Loading state */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f5f0eb]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-[#1a1a1a]/10 border-t-[#1a1a1a]/60 rounded-full animate-spin" />
              <span className="text-[#1a1a1a]/40 text-sm tracking-widest uppercase">Loading</span>
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Gradient overlay at bottom for smooth transition into cream */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f5f0eb] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
