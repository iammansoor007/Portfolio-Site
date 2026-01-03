import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const services = [
  'Web Development',
  'UI/UX Design',
  'Mobile Apps',
  'E-Commerce',
  'Brand Identity',
  'SEO Optimization',
  'Cloud Solutions',
  'API Integration',
];

/**
 * Infinite scrolling marquee component
 * Displays services/solutions in a continuous loop
 */
const Marquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // First track moves left
      gsap.to(track1Ref.current, {
        xPercent: -100,
        repeat: -1,
        duration: 25,
        ease: 'linear',
      });

      // Second track moves right (reverse)
      gsap.to(track2Ref.current, {
        xPercent: 100,
        repeat: -1,
        duration: 25,
        ease: 'linear',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-background via-card/30 to-background">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* First track - moving left */}
      <div ref={marqueeRef} className="mb-8 overflow-hidden">
        <div ref={track1Ref} className="flex whitespace-nowrap">
          {[...services, ...services].map((service, index) => (
            <div
              key={`track1-${index}`}
              className="flex items-center gap-8 px-8"
            >
              <span className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground/10 hover:text-gradient transition-all duration-500 cursor-default">
                {service}
              </span>
              <span className="w-3 h-3 rounded-full bg-primary/50" />
            </div>
          ))}
        </div>
      </div>

      {/* Second track - moving right */}
      <div className="overflow-hidden">
        <div ref={track2Ref} className="flex whitespace-nowrap" style={{ transform: 'translateX(-100%)' }}>
          {[...services, ...services].map((service, index) => (
            <div
              key={`track2-${index}`}
              className="flex items-center gap-8 px-8"
            >
              <span className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gradient opacity-30 hover:opacity-100 transition-all duration-500 cursor-default">
                {service}
              </span>
              <span className="w-3 h-3 rounded-full bg-accent/50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
