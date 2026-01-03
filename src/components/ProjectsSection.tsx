import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight, Eye } from 'lucide-react';
import ProjectDetailModal from './ProjectDetailModal';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Ethereal Commerce',
    category: 'Digital Experience',
    description: 'Redefining e-commerce through immersive 3D product exploration and gesture-driven navigation. A seamless blend of art and conversion.',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&h=800&fit=crop',
    tech: ['Three.js', 'Next.js', 'Stripe'],
    link: '#',
    github: '#',
    color: 'from-violet-500/20 to-fuchsia-500/20',
  },
  {
    id: 2,
    title: 'Pulse Analytics',
    category: 'Data Visualization',
    description: 'Where data becomes narrative. Real-time analytics transformed into living, breathing visual stories that executives actually understand.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    tech: ['D3.js', 'WebGL', 'GraphQL'],
    link: '#',
    github: '#',
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 3,
    title: 'Spatial Canvas',
    category: 'Creative Tool',
    description: 'A digital atelier where designers think in three dimensions. Collaborative 3D workspace with real-time synchronization and AR preview.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    tech: ['WebXR', 'React', 'Socket.io'],
    link: '#',
    github: '#',
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    id: 4,
    title: 'Echo Social',
    category: 'Platform',
    description: 'Community architecture for the creator economy. Where meaningful connections eclipse vanity metrics and creativity flourishes.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=800&fit=crop',
    tech: ['React Native', 'Node.js', 'Redis'],
    link: '#',
    github: '#',
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 5,
    title: 'Muse AI',
    category: 'AI Experience',
    description: 'Your creative co-pilot. Neural networks trained on the masters, delivering inspiration that feels less artificial, more collaborator.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop',
    tech: ['Python', 'GPT-4', 'FastAPI'],
    link: '#',
    github: '#',
    color: 'from-rose-500/20 to-pink-500/20',
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with stagger
      gsap.fromTo(
        '.projects-eyebrow',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      // Title reveal with mask
      gsap.fromTo(
        '.projects-title-line',
        { 
          clipPath: 'inset(0 100% 0 0)',
          opacity: 0 
        },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Horizontal scroll section
      if (horizontalRef.current) {
        const scrollWidth = Math.max(
          0,
          horizontalRef.current.scrollWidth - window.innerWidth
        );

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
          },
        });

        // Card parallax and reveal animations
        const cards = gsap.utils.toArray('.project-card') as HTMLElement[];
        cards.forEach((card) => {
          // Card entrance with rotation
          gsap.fromTo(
            card,
            {
              rotateY: 25,
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

          // Image parallax within card
          const image = card.querySelector('.card-image');
          if (image) {
            gsap.to(image, {
              xPercent: -15,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: 'left right',
                end: 'right left',
                scrub: 1,
              },
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic effect for hovered card
  const getMagneticStyle = (index: number, cardRef: HTMLDivElement | null) => {
    if (hoveredIndex !== index || !cardRef) return {};
    
    const rect = cardRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (mousePos.x - centerX) * 0.05;
    const deltaY = (mousePos.y - centerY) * 0.05;
    
    return {
      transform: `translate(${deltaX}px, ${deltaY}px) rotateY(${deltaX * 0.1}deg) rotateX(${-deltaY * 0.1}deg)`,
    };
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background pointer-events-none" />
      
      {/* Floating grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      {/* Header - Fixed during horizontal scroll */}
      <div className="absolute top-0 left-0 w-full pt-24 pb-8 z-20 pointer-events-none">
        <div className="container mx-auto px-6">
          <div className="projects-eyebrow flex items-center gap-4 mb-4">
            <span className="text-primary font-mono text-sm tracking-wider">[ 03 ]</span>
            <div className="w-16 h-[1px] bg-gradient-to-r from-primary to-transparent" />
            <span className="text-muted-foreground uppercase tracking-[0.2em] text-sm">Selected Works</span>
          </div>
          
          <div className="projects-title-line">
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div 
        ref={horizontalRef}
        className="flex items-center min-h-screen pt-48"
        style={{ width: `${projects.length * 45 + 20}vw` }}
      >
        <div className="flex gap-8 pl-[10vw] pr-[10vw]">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-cursor="card"
              data-cursor-hover
              className="project-card flex-shrink-0 w-[80vw] sm:w-[60vw] lg:w-[40vw] perspective-2000"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={getMagneticStyle(index, cardRefs.current[index] ?? null)}
            >
              <div
                className={`group relative h-[70vh] rounded-3xl overflow-hidden bg-card border border-border/30 transition-all duration-700 ${
                  hoveredIndex === index ? 'border-primary/30 shadow-2xl shadow-primary/10' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Background image with parallax */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className={`card-image absolute inset-[-20%] transition-transform duration-700 ${
                      hoveredIndex === index ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8 sm:p-10">
                  {/* Category badge */}
                  <div
                    className={`absolute top-8 left-8 px-4 py-2 rounded-full bg-background/80 backdrop-blur-xl border border-border/50 transition-all duration-500 ${
                      hoveredIndex === index
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-2 opacity-80'
                    }`}
                  >
                    <span className="text-xs font-medium text-primary tracking-wider uppercase">
                      {project.category}
                    </span>
                  </div>

                  {/* Action buttons - appear on hover */}
                  <div
                    className={`absolute top-8 right-8 flex gap-3 transition-all duration-500 ${
                      hoveredIndex === index
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-4'
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                        setIsModalOpen(true);
                      }}
                      data-cursor="link"
                      className="w-11 h-11 rounded-full bg-background/80 backdrop-blur-xl border border-border/50 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <a
                      href={project.github}
                      data-cursor="link"
                      className="w-11 h-11 rounded-full bg-background/80 backdrop-blur-xl border border-border/50 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={project.link}
                      data-cursor="link"
                      className="w-11 h-11 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5 text-primary-foreground" />
                    </a>
                  </div>

                  {/* Project info */}
                  <div
                    className={`transition-all duration-500 ${
                      hoveredIndex === index ? 'translate-y-0' : 'translate-y-4'
                    }`}
                  >
                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                      {project.title}
                    </h3>

                    <p
                      className={`text-muted-foreground text-base sm:text-lg leading-relaxed mb-6 max-w-lg transition-all duration-500 ${
                        hoveredIndex === index ? 'opacity-100' : 'opacity-70'
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={tech}
                          className={`px-4 py-2 rounded-full bg-background/60 backdrop-blur-xl border border-border/50 text-sm font-medium transition-all duration-300 ${
                            hoveredIndex === index
                              ? 'border-primary/30 text-primary'
                              : 'text-muted-foreground'
                          }`}
                          style={{ transitionDelay: `${i * 50}ms` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View project indicator */}
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setIsModalOpen(true);
                    }}
                    className={`absolute bottom-8 right-8 flex items-center gap-2 text-sm font-medium transition-all duration-500 ${
                      hoveredIndex === index
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-4'
                    }`}
                  >
                    <span className="text-primary">View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </button>
                </div>

                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-3xl transition-opacity duration-700 pointer-events-none ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background:
                      'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.06), transparent 40%)',
                  }}
                />
              </div>

              {/* Project number */}
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

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-muted-foreground">
        <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center animate-pulse">
          <ArrowUpRight className="w-4 h-4 rotate-90" />
        </div>
        <span className="text-sm font-medium tracking-wider uppercase">Scroll to explore</span>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </section>
  );
};

export default ProjectsSection;
