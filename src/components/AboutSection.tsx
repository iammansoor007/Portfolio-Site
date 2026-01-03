import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code2, Palette, Sparkles, Zap, Download } from 'lucide-react';
import mansoor from '../assets/22upscalemedia-transformed.jpeg'

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'Python / Flask', level: 90 },
  { name: 'Shopify / WordPress', level: 85 },
  { name: 'Three.js / WebGL', level: 80 },
];

const highlights = [
  { icon: Code2, label: 'Clean Code', value: '100 %' },
  { icon: Palette, label: 'Pixel Perfect', value: '∞' },
  { icon: Sparkles, label: 'Innovation', value: '24 / 7' },
  { icon: Zap, label: 'Performance', value: '99+' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.about-reveal', { y: 80, opacity: 0 });
      gsap.set('.skill-bar-fill', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('.highlight-item', { scale: 0.8, opacity: 0 });
      gsap.set('.about-image-main', { scale: 1.2, opacity: 0 });
      gsap.set('.floating-badge', { y: 30, opacity: 0, scale: 0.8 });

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Image reveal with clip-path
      tl.to('.about-image-main', {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Floating badges
      tl.to(
        '.floating-badge',
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        },
        '-=0.8'
      );

      // Text reveals
      tl.to(
        '.about-reveal',
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      // Skill bars animation
      tl.to(
        '.skill-bar-fill',
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // Highlight cards
      tl.to(
        '.highlight-item',
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.7)',
        },
        '-=0.8'
      );

      // Parallax effect on image
      gsap.to(imageRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Counter animation for highlight values
      const counters = document.querySelectorAll('.highlight-value');
      counters.forEach((counter) => {
        const value = counter.getAttribute('data-value');
        if (value && !isNaN(parseInt(value))) {
          gsap.fromTo(
            counter,
            { textContent: 0 },
            {
              textContent: parseInt(value),
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: counter,
                start: 'top 90%',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 sm:py-32 lg:py-40 relative overflow-hidden"
    >
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="about-reveal inline-flex items-center gap-3 mb-6">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">
              About
            </span>
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="about-reveal font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95]">
            Creating digital
            <br />
            <span className="text-gradient">experiences</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Image Column - Asymmetric layout */}
          <div ref={imageRef} className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative">
              {/* Main image with mask */}
              <div className="about-image-main relative aspect-[3/4] rounded-3xl overflow-hidden">
                <img
                  src={mansoor}
                  alt="Developer portrait"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                
                {/* Noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjY1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
              </div>

              {/* Floating badges */}
              <div className="floating-badge absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-2xl shadow-primary/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-display font-bold text-gradient">3+</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Years of</p>
                    <p className="font-semibold text-foreground">Experience</p>
                  </div>
                </div>
              </div>

              <div className="floating-badge absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-2xl shadow-accent/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <p className="font-semibold text-foreground">Available</p>
                    <p className="text-xs text-muted-foreground">for new projects</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 -inset-4 border border-dashed border-border/50 rounded-[2rem]" />
              <div className="absolute -z-10 -inset-8 border border-dashed border-border/30 rounded-[2.5rem]" />
            </div>
          </div>

          {/* Content Column */}
          <div ref={textRef} className="lg:col-span-7 space-y-10">
            {/* Bio */}
            <div className="space-y-6">
              <p className="about-reveal text-xl sm:text-2xl lg:text-3xl text-foreground leading-relaxed font-light">
                I'm a <span className="text-gradient font-medium">full-stack developer</span> passionate 
                about crafting exceptional digital experiences that blend stunning visuals with 
                flawless functionality.
              </p>
              <p className="about-reveal text-base sm:text-lg text-muted-foreground leading-relaxed">
                With over 3 years of experience, I specialize in building modern web applications 
                using cutting-edge technologies. My focus is on creating immersive, performant, 
                and accessible experiences that leave lasting impressions.
              </p>
            </div>

            {/* Skills with animated bars */}
            <div ref={skillsRef} className="space-y-5">
              <h3 className="about-reveal text-sm font-mono text-muted-foreground uppercase tracking-wider">
                Core Technologies
              </h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="about-reveal">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="skill-bar-fill h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlight metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {highlights.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="highlight-item group p-5 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 text-center"
                  data-cursor="card"
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p
                    className="highlight-value text-2xl font-display font-bold text-gradient"
                    data-value={value.replace(/\D/g, '') || value}
                  >
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="about-reveal flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.5)] hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                data-cursor="button"
              >
                <span className="relative z-10">Let's Collaborate</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </button>
              <button
                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-border bg-transparent font-semibold transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98]"
                data-cursor="button"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
