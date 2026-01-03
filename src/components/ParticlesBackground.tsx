import { useEffect, useRef } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const { normalizedX, normalizedY } = useMousePosition();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    mouseRef.current = { x: normalizedX, y: normalizedY };
  }, [normalizedX, normalizedY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Get CSS variables for theming
    const getColor = () => {
      const style = getComputedStyle(document.documentElement);
      const primary = style.getPropertyValue('--primary').trim();
      const accent = style.getPropertyValue('--accent').trim();
      return { primary, accent };
    };

    // Initialize particles
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    const colors = getColor();
    
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? `hsl(${colors.primary})` : `hsl(${colors.accent})`,
    }));

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouseInfluence = 50;
      const { x: mouseX, y: mouseY } = mouseRef.current;

      particlesRef.current.forEach((particle, i) => {
        // Mouse influence on particles
        particle.x += particle.speedX + mouseX * mouseInfluence * 0.0005;
        particle.y += particle.speedY + mouseY * mouseInfluence * 0.0005;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', ` / ${particle.opacity})`).replace('hsl', 'hsla');
        ctx.fill();

        // Draw connections
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = (1 - distance / 120) * 0.15;
            ctx.strokeStyle = particle.color.replace(')', ` / ${opacity})`).replace('hsl', 'hsla');
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticlesBackground;
