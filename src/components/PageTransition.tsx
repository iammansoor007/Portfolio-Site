import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
  isLoaded: boolean;
}

/**
 * Page transition wrapper that handles enter animations
 * after loading screen completes
 */
const PageTransition = ({ children, isLoaded }: PageTransitionProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Page enter animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      // Animate sections with stagger (skip sections that handle their own intro)
      const sections = contentRef.current?.querySelectorAll(
        'section:not([data-page-transition-skip])'
      );
      if (sections?.length) {
        gsap.fromTo(
          sections,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }
    });

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div
      ref={contentRef}
      className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
