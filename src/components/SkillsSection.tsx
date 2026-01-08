import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Creative Development',
    subtitle: 'Where code meets canvas',
    description: 'Crafting immersive digital experiences that blur the line between art and engineering. Every pixel intentional, every interaction memorable.',
    skills: ['Three.js', 'WebGL', 'GSAP', 'Framer Motion', 'Canvas API', 'Shaders', 'Aceternity UI', 'shadcn/ui'],
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    title: 'Motion & Animation',
    subtitle: 'Choreographing digital experiences',
    description: 'Breathing life into interfaces through physics-based animations, scroll-driven narratives, and micro-interactions that delight.',
    skills: ['ScrollTrigger', 'Lottie', 'CSS Animations', 'Spring Physics', 'Keyframe Design', 'Easing'],
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Frontend Architecture',
    subtitle: 'Building at scale',
    description: 'Engineering robust, performant applications with modern frameworks. Type-safe, tested, and ready for whatever comes next.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React Query', 'Aceternity UI', 'shadcn/ui'],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'E-Commerce & CMS',
    subtitle: 'Building online stores & content platforms',
    description: 'Developing scalable e-commerce solutions and content management systems with Shopify, WordPress, and WooCommerce integrations.',
    skills: ['Shopify', 'WordPress', 'WooCommerce', 'Liquid (Shopify)', 'Theme Customization', 'PHP', 'Python'],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Tools & Workflow',
    subtitle: 'The craftsman\'s toolkit',
    description: 'Leveraging the best tools to deliver faster, collaborate better, and maintain quality at every stage of development.',
    skills: ['Figma', 'Git', 'Vercel', 'Docker', 'VS Code', 'Linear', 'Python'],
    gradient: 'from-amber-500 to-orange-500',
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal with dramatic entrance
      gsap.fromTo(
        '.skills-eyebrow',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Title characters animation
      gsap.fromTo(
        '.skills-title .word',
        { y: 120, opacity: 0, rotateX: -45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Horizontal scroll for skill categories
      if (horizontalRef.current) {
        // Calculate scroll width correctly
        const scrollWidth = Math.max(
          0,
          horizontalRef.current.scrollWidth - window.innerWidth
        );

        console.log('Scroll width calculated:', scrollWidth);
        
        const scrollTween = gsap.to(horizontalRef.current, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const newIndex = Math.floor(progress * skillCategories.length);
              setActiveCategory(Math.min(newIndex, skillCategories.length - 1));
            },
          },
        });

        // Skill cards entrance
        const cards = gsap.utils.toArray('.skill-card') as HTMLElement[];
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              rotateY: 15,
              scale: 0.85,
              opacity: 0,
            },
            {
              rotateY: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: 'left 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Skill pills stagger within each card
          const pills = card.querySelectorAll('.skill-pill');
          gsap.fromTo(
            pills,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: 'left 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Text lines reveal
          const textLines = card.querySelectorAll('.text-reveal');
          gsap.fromTo(
            textLines,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: 'left 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Floating orbs parallax
      gsap.to('.floating-orb-1', {
        y: -150,
        x: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      gsap.to('.floating-orb-2', {
        y: 100,
        x: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
    >
      {/* Ambient decorations */}
      <div className="floating-orb-1 absolute top-1/4 right-0 w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="floating-orb-2 absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Bottom tech ticker - MOVED UP AND PLACED BEHIND CONTENT */}
      <div className="absolute bottom-1/4 left-0 w-full overflow-hidden pointer-events-none z-0">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-8 mx-8">
              {['React', 'Three.js', 'GSAP', 'TypeScript', 'Next.js', 'WebGL', 'Framer Motion', 'Tailwind', 'Shopify', 'WordPress', 'WooCommerce', 'Python', 'Aceternity UI', 'shadcn/ui'].map((tech, i) => (
                <span
                  key={`${setIndex}-${i}`}
                  className="text-6xl sm:text-7xl font-display font-bold text-muted-foreground/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed header during horizontal scroll */}
      <div className="absolute top-0 left-0 w-full pt-24 pb-8 z-20 pointer-events-none">
        <div className="container mx-auto px-6">
          <div className="skills-eyebrow flex items-center gap-4 mb-4">
            <span className="text-primary font-mono text-sm">[ 02 ]</span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-primary to-transparent" />
            <span className="text-muted-foreground uppercase tracking-[0.2em] text-sm">Expertise</span>
          </div>

          <h2 className="skills-title font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold perspective-1000">
            <span className="word inline-block">Skills</span>
          </h2>
        </div>
      </div>

      {/* Category indicator */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3">
        {skillCategories.map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-500 cursor-pointer ${
              i === activeCategory
                ? 'h-12 bg-primary'
                : 'h-3 bg-border hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>

      {/* Horizontal scroll container - FOLLOWING THE SAME PATTERN AS PROJECTS SECTION */}
      <div 
        ref={horizontalRef}
        className="flex items-center min-h-screen pt-48 relative z-10"
        style={{ width: `${skillCategories.length * 45 + 20}vw` }}
      >
        <div className="flex gap-8 pl-[10vw] pr-[10vw]">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              data-cursor="card"
              data-cursor-hover
              className="skill-card flex-shrink-0 w-[80vw] sm:w-[60vw] lg:w-[40vw]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`group relative h-[70vh] rounded-3xl p-8 sm:p-12 bg-card/70 backdrop-blur-2xl border border-border/30 overflow-hidden transition-all duration-700 ${
                hoveredIndex === index ? 'border-primary/30 shadow-2xl shadow-primary/10' : ''
              }`}>
                
                {/* Gradient background accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-700`} />
                
                {/* Large background number */}
                <div className="absolute -right-8 -bottom-16 text-[20rem] font-display font-bold text-muted-foreground/5 leading-none select-none pointer-events-none">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Category header */}
                  <div className="mb-8">
                    <span className={`text-reveal inline-block px-4 py-2 rounded-full bg-gradient-to-r ${category.gradient} text-white text-sm font-medium mb-4`}>
                      {category.subtitle}
                    </span>
                    <h3 className="text-reveal font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                      {category.title}
                    </h3>
                    <p className="text-reveal text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                      {category.description}
                    </p>
                  </div>

                  {/* Skills grid */}
                  <div className="flex-1 flex items-end">
                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill, i) => (
                        <span
                          key={skill}
                          className={`skill-pill px-5 py-3 rounded-full bg-background/80 backdrop-blur-xl border border-border/50 
                            text-foreground font-medium
                            hover:border-primary/50 hover:bg-primary/10 hover:scale-105
                            transition-all duration-300 cursor-default`}
                          style={{ transitionDelay: `${i * 30}ms` }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${category.gradient} opacity-10 rounded-bl-[100px] pointer-events-none`} />
                </div>

                {/* Hover glow */}
                <div className={`absolute inset-0 rounded-3xl transition-opacity duration-700 pointer-events-none ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
                  style={{
                    background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.06), transparent 40%)',
                  }}
                />
              </div>

              {/* Category number */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-6xl font-display font-bold text-muted-foreground/20">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        /* Ensure proper stacking context */
        .skill-card {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;