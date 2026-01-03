// hooks/useAnimationFrame.ts
import { useEffect, useRef } from 'react';

/**
 * Custom hook for smooth animation frames with requestAnimationFrame
 * Provides delta time and elapsed time
 */
export const useAnimationFrame = (callback: (deltaTime: number, elapsedTime: number) => void) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const startTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        const elapsedTime = time - startTimeRef.current;
        callback(deltaTime, elapsedTime);
      }
      
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback]);
};

/**
 * Hook for creating smooth transitions with spring physics
 */
export const useSpringAnimation = (
  targetValue: number,
  initialValue: number = 0,
  stiffness: number = 0.1,
  damping: number = 0.85
) => {
  const currentRef = useRef(initialValue);
  const velocityRef = useRef(0);

  useAnimationFrame((deltaTime) => {
    // Normalize delta time for consistent animation speed
    const deltaTimeInSeconds = Math.min(deltaTime, 100) / 1000;
    
    // Spring physics calculation
    const force = (targetValue - currentRef.current) * stiffness;
    velocityRef.current = velocityRef.current * damping + force * deltaTimeInSeconds;
    currentRef.current += velocityRef.current * deltaTimeInSeconds;
    
    // Prevent overshoot and oscillation
    if (Math.abs(targetValue - currentRef.current) < 0.001 && Math.abs(velocityRef.current) < 0.001) {
      currentRef.current = targetValue;
      velocityRef.current = 0;
    }
  });

  return currentRef.current;
};

/**
 * Hook for smooth interpolation (lerp) animations
 */
export const useLerpAnimation = (
  targetValue: number,
  speed: number = 0.1,
  initialValue: number = 0
) => {
  const currentRef = useRef(initialValue);

  useAnimationFrame((deltaTime) => {
    const deltaTimeInSeconds = Math.min(deltaTime, 100) / 1000;
    const lerpFactor = speed * deltaTimeInSeconds * 60; // Normalize to 60fps
    
    currentRef.current += (targetValue - currentRef.current) * lerpFactor;
    
    // Snap to target when close enough
    if (Math.abs(targetValue - currentRef.current) < 0.001) {
      currentRef.current = targetValue;
    }
  });

  return currentRef.current;
};

/**
 * Hook for creating pulsating/oscillating animations
 */
export const usePulseAnimation = (
  frequency: number = 1,
  amplitude: number = 1,
  offset: number = 0
) => {
  const timeRef = useRef(0);

  useAnimationFrame((deltaTime) => {
    timeRef.current += deltaTime / 1000; // Convert to seconds
  });

  return Math.sin(timeRef.current * frequency * Math.PI * 2) * amplitude + offset;
};

/**
 * Hook for smooth mouse following with inertia
 */
export const useSmoothMouseFollow = (
  targetX: number,
  targetY: number,
  inertia: number = 0.85
) => {
  const currentX = useRef(0);
  const currentY = useRef(0);
  const velocityX = useRef(0);
  const velocityY = useRef(0);

  useAnimationFrame((deltaTime) => {
    const deltaTimeInSeconds = Math.min(deltaTime, 100) / 1000;
    const frameRateFactor = deltaTimeInSeconds * 60; // Normalize to 60fps

    // Calculate velocity
    velocityX.current += (targetX - currentX.current) * 0.1 * frameRateFactor;
    velocityY.current += (targetY - currentY.current) * 0.1 * frameRateFactor;

    // Apply inertia
    velocityX.current *= inertia;
    velocityY.current *= inertia;

    // Update position
    currentX.current += velocityX.current * frameRateFactor;
    currentY.current += velocityY.current * frameRateFactor;

    // Prevent drift
    if (Math.abs(velocityX.current) < 0.001 && Math.abs(targetX - currentX.current) < 0.001) {
      currentX.current = targetX;
      velocityX.current = 0;
    }
    if (Math.abs(velocityY.current) < 0.001 && Math.abs(targetY - currentY.current) < 0.001) {
      currentY.current = targetY;
      velocityY.current = 0;
    }
  });

  return { x: currentX.current, y: currentY.current };
};