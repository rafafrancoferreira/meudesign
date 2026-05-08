'use client';

import { useEffect, useRef } from 'react';

interface MotionBlurTitleProps {
  text: string;
  className?: string;
}

export function MotionBlurTitle({ text, className }: MotionBlurTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.opacity = '1';
    el.style.transform = 'translateX(0)';
  }, []);

  return (
    <div ref={containerRef} className={`relative select-none ${className ?? ''}`} style={{ opacity: 0, transform: 'translateX(-20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
      {/* Ghost layer with blur */}
      <span
        aria-hidden
        className="absolute inset-0 font-display font-black uppercase text-foreground/10"
        style={{ filter: 'blur(14px)', transform: 'translateX(-6px)' }}
      >
        {text}
      </span>
      {/* Main text */}
      <span className="relative font-display font-black uppercase">{text}</span>
    </div>
  );
}
