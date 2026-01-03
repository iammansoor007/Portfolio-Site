import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FloatingElementsProps {
  variant?: 'circles' | 'lines' | 'dots' | 'shapes' | 'orbs' | 'geometric';
  className?: string;
  intensity?: 'subtle' | 'medium' | 'dramatic';
}

/**
 * Premium floating elements with cinematic parallax
 * Creates visual depth and premium feel throughout sections
 */
const FloatingElements = ({ 
  variant = 'circles', 
  className = '',
  intensity = 'medium'
}: FloatingElementsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const speedMultiplier = intensity === 'subtle' ? 0.5 : intensity === 'dramatic' ? 1.5 : 1;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll('.floating-element');
      
      elements?.forEach((el, index) => {
        const speed = (0.3 + (index * 0.15)) * speedMultiplier;
        const direction = index % 2 === 0 ? 1 : -1;
        const delay = index * 0.1;
        
        // Parallax on scroll
        gsap.to(el, {
          yPercent: direction * 80 * speed,
          xPercent: direction * 30 * speed,
          rotation: direction * 20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1 + delay,
          },
        });

        // Subtle floating animation
        gsap.to(el, {
          y: `+=${20 * speed}`,
          x: `+=${10 * speed * direction}`,
          duration: 4 + index,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay,
        });
      });
    });

    return () => ctx.revert();
  }, [speedMultiplier]);

  const renderElements = () => {
    switch (variant) {
      case 'orbs':
        return (
          <>
            <div className="floating-element absolute top-[10%] left-[5%] w-[30vw] h-[30vw] rounded-full bg-gradient-radial from-primary/10 to-transparent blur-[80px]" />
            <div className="floating-element absolute top-[40%] right-[0%] w-[25vw] h-[25vw] rounded-full bg-gradient-radial from-accent/10 to-transparent blur-[60px]" />
            <div className="floating-element absolute bottom-[10%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-gradient-radial from-primary/5 to-transparent blur-[100px]" />
          </>
        );
      case 'geometric':
        return (
          <>
            <div className="floating-element absolute top-[15%] left-[8%] w-24 h-24 border border-primary/20 rotate-45 backdrop-blur-sm" />
            <div className="floating-element absolute top-[35%] right-[12%] w-32 h-32 rounded-full border-2 border-dashed border-accent/15" />
            <div className="floating-element absolute bottom-[25%] left-[15%] w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rotate-12" />
            <div className="floating-element absolute top-[60%] right-[25%]">
              <svg width="80" height="80" viewBox="0 0 80 80" className="text-primary/10">
                <polygon points="40,0 80,80 0,80" fill="currentColor" />
              </svg>
            </div>
            <div className="floating-element absolute bottom-[40%] right-[8%] w-20 h-20 rounded-2xl border border-border/30 rotate-[25deg]" />
          </>
        );
      case 'circles':
        return (
          <>
            <div className="floating-element absolute top-20 left-[10%] w-40 h-40 rounded-full border border-primary/10" />
            <div className="floating-element absolute top-[30%] right-[12%] w-28 h-28 rounded-full bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="floating-element absolute bottom-[20%] left-[18%] w-20 h-20 rounded-full border-2 border-accent/10" />
            <div className="floating-element absolute bottom-[35%] right-[22%] w-48 h-48 rounded-full bg-gradient-radial from-primary/5 to-transparent" />
            <div className="floating-element absolute top-[55%] left-[8%] w-24 h-24 rounded-full border border-dashed border-primary/10" />
          </>
        );
      case 'lines':
        return (
          <>
            <div className="floating-element absolute top-[20%] left-[8%] w-48 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent rotate-[35deg]" />
            <div className="floating-element absolute top-[45%] right-[10%] w-64 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent -rotate-[15deg]" />
            <div className="floating-element absolute bottom-[30%] left-[25%] w-32 h-[2px] bg-gradient-to-r from-primary/20 to-transparent rotate-90" />
            <div className="floating-element absolute top-[70%] right-[30%] w-56 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
          </>
        );
      case 'dots':
        return (
          <>
            <div className="floating-element absolute top-[15%] left-[12%] w-3 h-3 rounded-full bg-primary/30" />
            <div className="floating-element absolute top-[18%] left-[14%] w-1.5 h-1.5 rounded-full bg-primary/50" />
            <div className="floating-element absolute top-[25%] right-[18%] w-4 h-4 rounded-full bg-accent/20" />
            <div className="floating-element absolute bottom-[35%] left-[28%] w-2.5 h-2.5 rounded-full bg-primary/40" />
            <div className="floating-element absolute bottom-[30%] left-[30%] w-1 h-1 rounded-full bg-accent/60" />
            <div className="floating-element absolute top-[50%] right-[15%] w-2 h-2 rounded-full bg-primary/25" />
            <div className="floating-element absolute top-[65%] right-[22%] w-1.5 h-1.5 rounded-full bg-accent/40" />
            <div className="floating-element absolute bottom-[20%] right-[35%] w-3 h-3 rounded-full bg-primary/20" />
          </>
        );
      case 'shapes':
        return (
          <>
            <div className="floating-element absolute top-[12%] left-[10%] w-20 h-20 border border-primary/15 rotate-45" />
            <div className="floating-element absolute top-[35%] right-[15%] w-16 h-16 border border-accent/15 rotate-12 rounded-lg" />
            <div className="floating-element absolute bottom-[28%] left-[20%]">
              <svg width="50" height="50" viewBox="0 0 50 50" className="text-primary/15">
                <polygon points="25,0 50,50 0,50" fill="currentColor" />
              </svg>
            </div>
            <div className="floating-element absolute top-[60%] right-[25%] w-12 h-12 rounded-full border-2 border-dashed border-primary/10 animate-[spin_25s_linear_infinite]" />
            <div className="floating-element absolute bottom-[35%] right-[12%] w-28 h-28 border border-accent/10 rounded-2xl rotate-[30deg]" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {renderElements()}
    </div>
  );
};

export default FloatingElements;
