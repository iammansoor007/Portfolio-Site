import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

/**
 * Custom hook to track mouse position
 * Returns both absolute and normalized (-1 to 1) coordinates
 */
export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const normalizedX = (x / window.innerWidth) * 2 - 1;
    const normalizedY = (y / window.innerHeight) * 2 - 1;

    setMousePosition({ x, y, normalizedX, normalizedY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return mousePosition;
};

/**
 * Hook for smooth interpolated mouse position
 * Better for animations that need smooth transitions
 */
export const useSmoothMousePosition = (lerp: number = 0.1) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTarget({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (target.x - prev.x) * lerp,
        y: prev.y + (target.y - prev.y) * lerp,
      }));
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [target, lerp]);

  return position;
};
