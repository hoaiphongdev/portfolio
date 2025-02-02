'use client';

import React, { useEffect, useRef, useState } from 'react';

const TAIL_LENGTH = 20;

interface CursorPosition {
  x: number;
  y: number;
}

const FluidMotionCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const cursorHistoryRef = useRef<CursorPosition[]>(
    Array(TAIL_LENGTH).fill({ x: 0, y: 0 }),
  );
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateCursor = () => {
      const cursorHistory = cursorHistoryRef.current;

      // Shift history and add new position
      cursorHistory.shift();
      cursorHistory.push(mousePosition);

      if (cursorRef.current) {
        const cursorCircles = cursorRef.current.children;

        for (let i = 0; i < TAIL_LENGTH; i++) {
          const current: any = cursorHistory[i];
          const next: any
            = cursorHistory[i + 1] ?? cursorHistory[TAIL_LENGTH - 1];

          const xDiff = next.x - current.x;
          const yDiff = next.y - current.y;

          current.x += xDiff * 0.35;
          current.y += yDiff * 0.35;

          const circle = cursorCircles[i] as HTMLDivElement;
          circle.style.transform = `translate(${current.x}px, ${current.y}px) scale(${i / TAIL_LENGTH})`;
        }
      }

      animationRef.current = requestAnimationFrame(updateCursor);
    };

    animationRef.current = requestAnimationFrame(updateCursor);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="goo"
        version="1.1"
        width="100%"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        ref={cursorRef}
        id="cursor"
        className="mix-blend-mode-difference pointer-events-none fixed left-0 top-0"
      >
        {[...Array(TAIL_LENGTH)].map((_, index) => (
          <div

            key={index}
            className="cursor-circle absolute left-0 top-0 rounded-full bg-primary"
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '10px',
              transformOrigin: 'center center',
            }}
          />
        ))}
      </div>
    </>
  );
};

export default FluidMotionCursor;
