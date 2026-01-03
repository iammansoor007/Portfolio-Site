import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

/**
 * Animated loading screen with logo animation
 * Displays on initial page load with cinematic reveal
 */
const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation (faster)
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.6,
            ease: 'power4.inOut',
            onComplete,
          });
        },
      });

      // Logo scale and glow animation (faster)
      tl.fromTo(
        logoRef.current,
        { scale: 0, rotate: -180, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.6)' }
      );

      // Logo letters animation (faster)
      const letters = logoRef.current?.querySelectorAll('.logo-letter');
      letters?.forEach((letter) => {
        tl.fromTo(
          letter,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.25, ease: 'power3.out' },
          `-=0.2`
        );
      });

      // Progress bar animation (faster)
      tl.to(
        {},
        {
          duration: 0.8,
          ease: 'power2.inOut',
          onUpdate: function () {
            const prog = Math.round(this.progress() * 100);
            setProgress(prog);
          },
        },
        '-=0.3'
      );

      // Text reveal (faster)
      tl.fromTo(
        textRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' },
        '-=0.6'
      );

      // Logo pulse (faster)
      tl.to(
        logoRef.current,
        { scale: 1.05, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 1 },
        '-=0.2'
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-hero-gradient opacity-50" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Logo */}
      <div ref={logoRef} className="relative mb-8">
        <div className="flex items-center gap-1 text-6xl md:text-8xl font-display font-bold">
          <span className="logo-letter text-gradient">Mansoor</span>
          <span className="logo-letter text-gradient">Shah</span>
          <span className="logo-letter text-primary text-7xl md:text-9xl">.</span>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 blur-2xl bg-primary/30 -z-10 scale-150" />
      </div>

      {/* Loading text */}
      <span ref={textRef} className="text-muted-foreground text-sm tracking-widest uppercase mb-6">
        Crafting Experience
      </span>

      {/* Progress bar */}
      <div className="w-48 md:w-64 h-1 bg-border rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress percentage */}
      <span className="mt-4 text-2xl font-display font-bold text-foreground tabular-nums">
        {progress}%
      </span>
    </div>
  );
};

export default LoadingScreen;
