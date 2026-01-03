import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  stagger?: number;
}

/**
 * Wrapper component for section transition animations
 * Animates children on scroll with configurable direction and timing
 */
const SectionTransition = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 1,
  stagger = 0.1,
}: SectionTransitionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Calculate initial position based on direction
      const getInitialProps = () => {
        switch (direction) {
          case 'up':
            return { y: 100, x: 0 };
          case 'down':
            return { y: -100, x: 0 };
          case 'left':
            return { y: 0, x: 100 };
          case 'right':
            return { y: 0, x: -100 };
          default:
            return { y: 100, x: 0 };
        }
      };

      const { x, y } = getInitialProps();

      // Animate section content
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate overlay reveal
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { scaleY: 1 },
          {
            scaleY: 0,
            duration: duration * 0.8,
            delay: delay + 0.2,
            ease: 'power4.inOut',
            transformOrigin: direction === 'up' || direction === 'left' ? 'top' : 'bottom',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Stagger children animations
      const children = sectionRef.current?.querySelectorAll('.stagger-child');
      if (children && children.length > 0) {
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger,
            delay: delay + 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [direction, delay, duration, stagger]);

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      {/* Reveal overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-background z-10 pointer-events-none origin-top"
      />
      {children}
    </div>
  );
};

export default SectionTransition;
