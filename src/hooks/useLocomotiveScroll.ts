import { useEffect, useRef, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to initialize and manage Locomotive Scroll
 * Synchronized with GSAP ScrollTrigger for smooth animations
 */
export const useLocomotiveScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveRef = useRef<LocomotiveScroll | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!scrollRef.current) return;

    // Initialize Locomotive Scroll
    locomotiveRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      lerp: 0.1,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    });

    // Sync Locomotive Scroll with GSAP ScrollTrigger
    locomotiveRef.current.on('scroll', ScrollTrigger.update);

    // Set up ScrollTrigger scroller proxy
    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length && locomotiveRef.current
          ? locomotiveRef.current.scrollTo(value as number, { duration: 0, disableLerp: true })
          : locomotiveRef.current?.scroll.instance.scroll.y ?? 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollRef.current.style.transform ? 'transform' : 'fixed',
    });

    // Refresh ScrollTrigger after Locomotive Scroll updates
    ScrollTrigger.addEventListener('refresh', () => {
      locomotiveRef.current?.update();
    });

    // Initial refresh
    ScrollTrigger.refresh();
    setIsReady(true);

    return () => {
      locomotiveRef.current?.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollTo = (target: string | number, options?: { offset?: number; duration?: number }) => {
    locomotiveRef.current?.scrollTo(target, options);
  };

  return {
    scrollRef,
    locomotive: locomotiveRef.current,
    isReady,
    scrollTo,
  };
};
