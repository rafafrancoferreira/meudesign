'use client';

import { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789░▓▒█@#$%';

interface ScrambledTextProps {
  text: string;
  isActive: boolean;
  className?: string;
}

export function ScrambledText({ text, isActive, className }: ScrambledTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!isActive) {
      setDisplay(text);
      return;
    }

    let iteration = 0;
    const maxIterations = text.length * 4;

    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < Math.floor(iteration / 4)) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      iteration++;
      if (iteration >= maxIterations) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [text, isActive]);

  return <span className={className}>{display}</span>;
}
