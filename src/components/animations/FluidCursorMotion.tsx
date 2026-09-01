'use client';

import React, { useEffect, useRef } from 'react';

const TAIL_LENGTH = 20;

interface CursorPosition {
  x: number;
  y: number;
}

const FluidMotionCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  // The pointer position is animation state, not render state: keeping it in a
  // ref means a mousemove no longer re-renders the 20 trail nodes, and the
  // rAF loop below can be started once instead of being torn down per event.
  const mousePositionRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const cursorHistoryRef = useRef<CursorPosition[]>(
    Array.from({ length: TAIL_LENGTH }, () => ({ x: 0, y: 0 })),
  );
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = { x: event.clientX, y: event.clientY };
    };

    const updateCursor = () => {
      const cursorHistory = cursorHistoryRef.current;

      // Shift history and add new position
      cursorHistory.shift();
      cursorHistory.push({ ...mousePositionRef.current });

      if (cursorRef.current) {
        const cursorCircles = cursorRef.current.children;

        for (let i = 0; i < TAIL_LENGTH; i++) {
          const current = cursorHistory[i];
          const next = cursorHistory[i + 1] ?? cursorHistory[TAIL_LENGTH - 1];

          current.x += (next.x - current.x) * 0.35;
          current.y += (next.y - current.y) * 0.35;

          const circle = cursorCircles[i] as HTMLDivElement | undefined;
          if (circle) {
            circle.style.transform = `translate(${current.x}px, ${current.y}px) scale(${i / TAIL_LENGTH})`;
          }
        }
      }

      animationRef.current = requestAnimationFrame(updateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(updateCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

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
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 mix-blend-difference"
      >
        {Array.from({ length: TAIL_LENGTH }).map((_, index) => (
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
