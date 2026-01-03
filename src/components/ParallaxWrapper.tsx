import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  scale?: boolean;
  rotate?: boolean;
  fade?: boolean;
  skew?: boolean;
  scrub?: number;
}

/**
 * Premium parallax wrapper with cinematic scroll animations
 * Used throughout the site for Awwwards-level depth and motion
 */
const ParallaxWrapper = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  scale = false,
  rotate = false,
  fade = false,
  skew = false,
  scrub = 1,
}: ParallaxWrapperProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const getAnimationProps = () => {
      const distance = 100 * speed;
      switch (direction) {
        case 'up':
          return { yPercent: -distance };
        case 'down':
          return { yPercent: distance };
        case 'left':
          return { xPercent: -distance };
        case 'right':
          return { xPercent: distance };
        default:
          return { yPercent: -distance };
      }
    };

    const ctx = gsap.context(() => {
      const animProps: gsap.TweenVars = {
        ...getAnimationProps(),
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub,
        },
      };

      if (scale) {
        animProps.scale = 1 + speed * 0.3;
      }

      if (rotate) {
        animProps.rotation = speed * 20;
      }

      if (skew) {
        animProps.skewY = speed * 5;
      }

      if (fade) {
        gsap.fromTo(
          elementRef.current,
          { opacity: 0.2 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: elementRef.current,
              start: 'top 95%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        );
      }

      gsap.to(elementRef.current, animProps);
    });

    return () => ctx.revert();
  }, [speed, direction, scale, rotate, fade, skew, scrub]);

  return (
    <div ref={elementRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxWrapper;
