import { useEffect, useRef, useState } from 'react';

/**
 * Simple, cool animated custom cursor
 */
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'button' | 'link' | 'text'>('default');
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const innerPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isFinePointer = window.matchMedia?.('(pointer: fine)').matches;
    if (!isFinePointer) return;

    document.body.classList.add('has-custom-cursor');

    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Outer ring - smooth follow with slight delay
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;

      // Inner dot - faster, more responsive follow
      innerPos.current.x += (mousePos.current.x - innerPos.current.x) * 0.3;
      innerPos.current.y += (mousePos.current.y - innerPos.current.y) * 0.3;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }

      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = `translate(${innerPos.current.x}px, ${innerPos.current.y}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  useEffect(() => {
    const getInteractiveEl = (el: Element | null) =>
      el?.closest('a, button, [data-cursor], input, textarea') as HTMLElement | null;

    const handlePointerOver = (e: PointerEvent) => {
      const el = getInteractiveEl(e.target as Element);
      if (!el) return;

      setIsHovering(true);
      const variant = el.dataset.cursor || (el.tagName === 'BUTTON' ? 'button' : 'link');
      setCursorVariant(variant as typeof cursorVariant);
    };

    const handlePointerOut = (e: PointerEvent) => {
      const toEl = getInteractiveEl(e.relatedTarget as Element | null);
      if (toEl) return;

      setIsHovering(false);
      setCursorVariant('default');
    };

    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);

    return () => {
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  const getOuterSize = () => {
    switch (cursorVariant) {
      case 'button':
        return 'w-12 h-12';
      case 'link':
        return 'w-8 h-8';
      case 'text':
        return 'w-6 h-6';
      default:
        return 'w-8 h-8';
    }
  };

  const getOuterStyle = () => {
    if (cursorVariant === 'button') {
      return 'rounded-full bg-primary/20 border-2 border-primary/60';
    }
    if (cursorVariant === 'text') {
      return 'rounded-full bg-foreground/80 mix-blend-difference';
    }
    if (cursorVariant === 'link') {
      return 'rounded-full border-primary border-dashed animate-spin-slow';
    }
    return 'rounded-full border-2 border-foreground/50';
  };

  return (
    <>
      {/* Outer animated ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 ${getOuterSize()} ${getOuterStyle()}`}
        style={{ transform: 'translate(-100px, -100px)' }}
      />

      {/* Inner animated dot with pulse effect */}
      <div
        ref={cursorInnerRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block transition-all duration-200 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovering 
            ? 'w-4 h-4 bg-primary animate-pulse' 
            : 'w-2 h-2 bg-primary'
        } rounded-full ${cursorVariant === 'link' ? 'bg-white' : ''}`}
        style={{ transform: 'translate(-100px, -100px)' }}
      />

      {/* Optional ripple effect on hover */}
      {isHovering && cursorVariant === 'button' && (
        <div
          className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-[9997] hidden md:block rounded-full border-2 border-primary/40 -translate-x-1/2 -translate-y-1/2 animate-ping"
          style={{
            transform: `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`,
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;