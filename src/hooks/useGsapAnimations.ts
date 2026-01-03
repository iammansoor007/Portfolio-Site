import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP scroll-triggered animations
 * Provides reusable animation patterns for the portfolio
 */
export const useGsapReveal = (options?: {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          y: options?.y ?? 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: options?.duration ?? 1,
          delay: options?.delay ?? 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [options?.y, options?.duration, options?.delay]);

  return ref;
};

/**
 * Hook for staggered children animations
 */
export const useGsapStagger = (selector: string, options?: {
  y?: number;
  duration?: number;
  stagger?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        {
          y: options?.y ?? 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: options?.duration ?? 0.8,
          stagger: options?.stagger ?? 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [selector, options?.y, options?.duration, options?.stagger]);

  return ref;
};

/**
 * Hook for parallax effect on scroll
 */
export const useGsapParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: -20 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
};

/**
 * Hook for horizontal scroll section
 */
export const useHorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current!.scrollWidth - window.innerWidth;

      gsap.to(scrollRef.current, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return { containerRef, scrollRef };
};

/**
 * Hook for text reveal animation with split effect
 */
export const useTextReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const lines = ref.current!.querySelectorAll('.line');
      
      lines.forEach((line, index) => {
        gsap.fromTo(
          line,
          {
            yPercent: 100,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Hook for magnetic effect on elements
 */
export const useMagnetic = (strength: number = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
};

export { gsap, ScrollTrigger };
