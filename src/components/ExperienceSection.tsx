import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, Calendar, MapPin, ArrowUpRight, Code, ShoppingBag, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    type: 'work',
    title: 'Frontend Developer',
    company: 'SU Solz',
    location: 'Karachi, Pakistan',
    period: '2024 - 2025',
    description: 'Developing modern, responsive web interfaces and interactive user experiences using React and modern frontend technologies.',
    highlights: ['Built responsive e-commerce interfaces', 'Improved site performance metrics', 'Collaborated with design teams'],
    technologies: ['React', 'TypeScript', 'Tailwind', 'GSAP'],
  },
  {
    id: 2,
    type: 'work',
    title: 'Shopify/WordPress Developer',
    company: 'Crest Wave Digital',
    location: 'Karachi, Pakistan',
    period: '2023 - 2024',
    description: 'Specialized in creating and customizing Shopify stores and WordPress websites for various clients, focusing on e-commerce solutions.',
    highlights: ['Launched 10+ Shopify stores', 'Custom theme development', 'E-commerce optimization'],
    technologies: ['Shopify', 'WordPress', 'Liquid', 'PHP', 'CSS'],
  },
  {
    id: 3,
    type: 'work',
    title: 'Python Intern',
    company: 'VexTech',
    location: 'Karachi, Pakistan',
    period: '2023',
    description: 'Started professional journey with Python development, learning backend fundamentals and contributing to small-scale projects.',
    highlights: ['First professional experience', 'Backend API development', 'Data processing scripts'],
    technologies: ['Python', 'Django', 'REST APIs', 'PostgreSQL'],
  },
  {
    id: 4,
    type: 'education',
    title: 'Intermediate (Computer Science)',
    company: 'FG Inter Boys College',
    location: 'Karachi, Pakistan',
    period: '2023 - 2025',
    description: 'Completed intermediate education with focus on Computer Science, building foundation in programming and computer fundamentals.',
    highlights: ['Computer Science major', 'Programming fundamentals', 'Academic projects'],
    technologies: ['C++', 'HTML/CSS', 'Computer Fundamentals'],
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'work' | 'education'>('all');

  const filteredExperiences = experiences.filter(exp => 
    filter === 'all' ? true : exp.type === filter
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow animation
      gsap.fromTo(
        '.experience-eyebrow',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      // Title animation
      gsap.fromTo(
        '.experience-title',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Filter buttons animation
      gsap.fromTo(
        '.filter-btn',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.filter-container',
            start: 'top 90%',
          },
        }
      );

      // Timeline line draw
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
          },
        }
      );

      // Timeline items stagger (re-run on filter change)
      gsap.fromTo(
        '.timeline-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        '.experience-cta',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.experience-cta',
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filter]);

  const getExperienceIcon = (type: string, title: string) => {
    if (type === 'education') return <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />;
    
    // Custom icons for different work roles
    if (title.toLowerCase().includes('python')) return <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />;
    if (title.toLowerCase().includes('shopify') || title.toLowerCase().includes('wordpress')) 
      return <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />;
    return <Code className="w-4 h-4 sm:w-5 sm:h-5" />;
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          {/* Eyebrow */}
          <div className="experience-eyebrow flex items-center justify-center gap-4 mb-6">
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary font-mono text-xs sm:text-sm tracking-[0.3em] uppercase">
              My Journey
            </span>
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-primary" />
          </div>

          {/* Title */}
          <h2 className="experience-title font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Experience & <span className="text-gradient">Education</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg mb-8">
            From Python intern to Frontend Developer - my journey through tech roles in Karachi
          </p>

          {/* Filter Buttons */}
          <div className="filter-container flex justify-center gap-4 mb-8">
            {(['all', 'work', 'education'] as const).map((filterType) => (
              <button
                key={filterType}
                className={`filter-btn px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === filterType
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                onClick={() => setFilter(filterType)}
                data-cursor="button"
              >
                {filterType === 'all' ? 'All' : filterType === 'work' ? 'Work Experience' : 'Education'}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="timeline-line absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-border rounded-full origin-top" />

          {/* Timeline items */}
          <div className="space-y-4 sm:space-y-6">
            {filteredExperiences.map((exp, index) => (
              <div
                key={exp.id}
                className="timeline-item relative pl-14 sm:pl-20"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                data-cursor="card"
              >
                {/* Timeline dot */}
                <div className={`absolute left-6 sm:left-8 top-8 -translate-x-1/2 z-10 transition-all duration-300 ${
                  activeIndex === index ? 'scale-110' : ''
                }`}>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-card border-2 flex items-center justify-center transition-all duration-300 ${
                    activeIndex === index 
                      ? 'border-primary shadow-lg shadow-primary/20 rotate-3' 
                      : 'border-border'
                  }`}>
                    <div className={activeIndex === index ? 'text-primary' : 'text-muted-foreground'}>
                      {getExperienceIcon(exp.type, exp.title)}
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`bg-card rounded-2xl p-5 sm:p-6 lg:p-8 transition-all duration-500 border hover:shadow-xl ${
                  activeIndex === index 
                    ? 'border-primary/40 shadow-lg shadow-primary/5 -translate-y-1' 
                    : 'border-border/50 hover:border-primary/20'
                }`}>
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex-1">
                      {/* Period badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>

                      <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-1">
                        {exp.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                        <span className="font-medium text-foreground/80">{exp.company}</span>
                        <span className="text-border">•</span>
                        <span className="flex items-center gap-1 text-sm">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <span className={`self-start px-3 py-1.5 rounded-full text-xs font-semibold ${
                      exp.type === 'work' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-accent/10 text-accent'
                    }`}>
                      {exp.type === 'work' ? 'Work' : 'Education'}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-5 text-sm sm:text-base">
                    {exp.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {exp.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1.5 rounded-full bg-muted text-foreground/80 text-xs font-medium"
                      >
                        ✓ {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-primary/5 border border-primary/10 text-xs text-primary font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Summary */}
       
        {/* Resume CTA */}
        <div className="text-center mt-8 sm:mt-12 experience-cta">
          <a
            href="/resume.pdf" // Update with your actual resume link
            className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 hover:bg-primary/5 hover:shadow-lg font-semibold"
            data-cursor="button"
          >
            <span>Download Full Resume</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <p className="text-sm text-muted-foreground mt-4">
            Based in Karachi, Pakistan • Open to remote opportunities
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;