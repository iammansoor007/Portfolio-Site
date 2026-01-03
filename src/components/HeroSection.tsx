import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene3D from './Scene3D';
import { useMousePosition } from '@/hooks/useMousePosition';
import { ArrowDown, Github, Linkedin, Twitter, Dribbble, Sparkles, Facebook, PhoneCall } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '3+', label: 'Years Exp.', suffix: '' },
  { value: '20+', label: 'Projects', suffix: '' },
  { value: '10+', label: 'Clients', suffix: '' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/iammansoor007', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/themansoorshah/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Facebook, href: 'https://www.facebook.com/Iammansoor007', label: 'Facebook' },
  { icon: PhoneCall, href: 'https://wa.me/+923152280754', label: 'WhatsApp' },
];

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states synchronously to avoid any "static" flash
      const shapes = shapesRef.current?.querySelectorAll('.hero-shape');
      gsap.set(shapes, { scale: 0, opacity: 0, rotation: -180 });
      gsap.set(eyebrowRef.current, { y: 30, opacity: 0, scale: 0.8 });
      gsap.set(titleRef.current?.querySelectorAll('.word'), {
        y: 120,
        opacity: 0,
        rotateX: -90,
        scale: 0.8,
      });
      gsap.set(subtitleRef.current, { y: 40, opacity: 0, filter: 'blur(10px)' });
      gsap.set(ctaRef.current?.children, { y: 40, opacity: 0, scale: 0.9 });
      gsap.set(statsRef.current?.children, { x: 60, opacity: 0, scale: 0.8 });
      gsap.set(socialRef.current?.children, { x: -40, opacity: 0, scale: 0.5 });
      gsap.set(scrollIndicatorRef.current, { y: 30, opacity: 0 });

      const tl = gsap.timeline();

      // Animate floating shapes first
      shapes?.forEach((shape, i) => {
        gsap.fromTo(
          shape,
          { scale: 0, opacity: 0, rotation: -180 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.5)',
            delay: 0.1 + i * 0.08,
          }
        );
      });

      // Eyebrow badge animation
      tl.fromTo(
        eyebrowRef.current,
        { y: 30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        0
      );

      // Title words animation with 3D effect
      const titleWords = titleRef.current?.querySelectorAll('.word');
      titleWords?.forEach((word, i) => {
        tl.fromTo(
          word,
          { y: 120, opacity: 0, rotateX: -90, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power4.out',
          },
          0.1 + i * 0.15
        );
      });

      // Subtitle reveal with blur
      tl.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        '-=0.6'
      );

      // CTA buttons with stagger
      const ctaButtons = ctaRef.current?.children;
      if (ctaButtons) {
        tl.fromTo(
          ctaButtons,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.5'
        );
      }

      // Stats animation with counter effect
      const statItems = statsRef.current?.children;
      if (statItems) {
        tl.fromTo(
          statItems,
          { x: 60, opacity: 0, scale: 0.8 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: 'back.out(1.5)',
          },
          '-=0.6'
        );
      }

      // Social links with bounce effect
      const socialItems = socialRef.current?.children;
      if (socialItems) {
        tl.fromTo(
          socialItems,
          { x: -40, opacity: 0, scale: 0.5 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'back.out(2)',
          },
          '-=0.7'
        );
      }

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

      // Parallax on scroll
      gsap.to(heroRef.current, {
        yPercent: 30,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Continuous floating animation for shapes
      shapes?.forEach((shape, i) => {
        gsap.to(shape, {
          y: i % 2 === 0 ? -20 : 20,
          x: i % 2 === 0 ? 10 : -10,
          rotation: i % 2 === 0 ? 10 : -10,
          duration: 4 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const handleScrollClick = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      data-page-transition-skip
      className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <Scene3D />

      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient opacity-50" />

      {/* Floating glassmorphism shapes */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large frosted circle */}
        <div className="hero-shape absolute top-[15%] left-[10%] w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-primary/5 backdrop-blur-md border border-primary/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]" />
        
        {/* Gradient orb with glow */}
        <div className="hero-shape absolute top-[25%] right-[15%] w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 backdrop-blur-lg border border-accent/30 shadow-lg shadow-accent/20" />
        
        {/* Diamond shape with glass effect */}
        <div className="hero-shape absolute bottom-[30%] left-[8%] w-16 h-16 sm:w-20 sm:h-20 rotate-45 bg-secondary/40 backdrop-blur-xl border border-border/40 shadow-xl" />
        
        {/* Large blurred glow orb */}
        <div className="hero-shape absolute bottom-[20%] right-[12%] w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-radial from-primary/15 via-primary/5 to-transparent blur-2xl" />
        
        {/* Small floating ring */}
        <div className="hero-shape absolute top-[40%] left-[20%] w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-dashed border-primary/20 backdrop-blur-sm" />
        
        {/* Small accent square */}
        <div className="hero-shape absolute top-[60%] right-[25%] w-8 h-8 sm:w-12 sm:h-12 bg-accent/10 backdrop-blur-md rounded-xl rotate-12 border border-accent/20" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />

      {/* Social Links - Left Side with Glassmorphism */}
      <div
        ref={socialRef}
        className="hidden md:flex fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-20"
      >
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-card/40 backdrop-blur-xl border border-border/50 flex items-center justify-center 
              hover:bg-primary/10 hover:border-primary/40 hover:scale-110 hover:shadow-lg hover:shadow-primary/20
              transition-all duration-300 ease-out overflow-hidden"
            aria-label={label}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/20 to-transparent" />
            <Icon className="relative z-10 w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
          </a>
        ))}
        <div className="w-[1px] h-16 lg:h-20 bg-gradient-to-b from-border via-primary/30 to-transparent mx-auto mt-2" />
      </div>

      {/* Stats - Right Side with Enhanced Glassmorphism */}
      <div
        ref={statsRef}
        className="hidden md:flex fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 flex-col gap-4 lg:gap-5 z-20"
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="group relative rounded-2xl p-4 lg:p-5 text-center min-w-[100px] lg:min-w-[120px]
              bg-card/40 backdrop-blur-xl border border-border/50
              hover:bg-card/60 hover:border-primary/40 hover:scale-105 hover:shadow-xl hover:shadow-primary/10
              transition-all duration-500 ease-out overflow-hidden"
          >
            {/* Animated gradient border on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-[1px] rounded-2xl bg-card/80" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 via-transparent to-accent/30" />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <p className="text-2xl lg:text-3xl font-display font-bold text-gradient">{stat.value}</p>
              <p className="text-[10px] lg:text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
            </div>
            
            {/* Subtle shine effect */}
            <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-45deg] group-hover:left-[100%] transition-all duration-700" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div
        className="container mx-auto px-4 sm:px-6 text-center relative z-10"
        style={{
          transform: `translate(${normalizedX * 15}px, ${normalizedY * 15}px)`,
          transition: 'transform 0.4s ease-out',
        }}
      >
        

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] mb-6 sm:mb-8 perspective-2000"
        >
          <span className="split-parent block overflow-hidden">
            <span className="word inline-block transform-gpu">Building</span>
          </span>
          <span className="split-parent block overflow-hidden">
            <span className="word inline-block text-gradient transform-gpu glow-text">Digital</span>
          </span>
          <span className="split-parent block overflow-hidden">
            <span className="word inline-block transform-gpu">Experiences</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xl lg:max-w-2xl mx-auto mb-8 sm:mb-12 px-4 leading-relaxed"
        >
          Full-stack developer crafting immersive web experiences with cutting-edge technologies and stunning animations.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 glow flex items-center justify-center gap-2"
            data-cursor-hover
          >
            <span>View My Work</span>
            <ArrowDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-border bg-card/50 backdrop-blur-sm text-foreground font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 hover:scale-105"
            data-cursor-hover
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile Stats */}
        <div className="flex md:hidden justify-center gap-3 mt-10 px-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-xl p-3 text-center flex-1 max-w-[100px]">
              <p className="text-xl font-display font-bold text-gradient">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mobile Social */}
        <div className="flex md:hidden justify-center gap-3 mt-6">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-card/40 backdrop-blur-xl border border-border/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
              aria-label={label}
            >
              <Icon className="w-4 h-4 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        onClick={handleScrollClick}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        data-cursor-hover
      >
        <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-primary transition-colors font-medium">
          Scroll to explore
        </span>
        <div className="w-6 h-10 sm:w-7 sm:h-12 rounded-full border-2 border-muted-foreground/50 group-hover:border-primary transition-all duration-300 flex items-start justify-center p-1.5 sm:p-2 group-hover:glow">
          <div className="w-1.5 h-3 bg-muted-foreground group-hover:bg-primary rounded-full animate-bounce transition-colors" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
