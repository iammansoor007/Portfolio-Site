import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { X, ExternalLink, Github, ArrowRight, Calendar, Users, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  github: string;
  color: string;
  // Extended case study data
  challenge?: string;
  solution?: string;
  results?: string[];
  gallery?: string[];
  duration?: string;
  team?: string;
  year?: string;
  role?: string;
}

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.modal-hero-image',
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
        );

        gsap.fromTo(
          '.modal-title',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', delay: 0.2 }
        );

        gsap.fromTo(
          '.modal-meta-item',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
        );

        gsap.fromTo(
          '.modal-section',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.4 }
        );

        gsap.fromTo(
          '.gallery-image',
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.6 }
        );
      }, contentRef);

      return () => ctx.revert();
    }
  }, [isOpen]);

  if (!project) return null;

  // Extended project data with case study info
  const caseStudyData = {
    challenge: project.challenge || "The client needed a modern, high-performance web application that could handle complex data visualizations while maintaining a seamless user experience across all devices.",
    solution: project.solution || "We implemented a cutting-edge architecture using React and Three.js, with custom WebGL shaders for real-time data visualization. The modular design system ensured consistency while allowing for creative flexibility.",
    results: project.results || [
      "40% increase in user engagement",
      "Sub-second load times achieved",
      "98% client satisfaction score",
      "Featured on Awwwards SOTD"
    ],
    gallery: project.gallery || [
      project.image,
      `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop`,
      `https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop`,
      `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop`,
    ],
    duration: project.duration || "3 months",
    team: project.team || "4 members",
    year: project.year || "2024",
    role: project.role || "Lead Developer & Designer"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 bg-background/95 backdrop-blur-xl border-border/50">
        <div ref={contentRef}>
          {/* Hero Image */}
          <div className="relative h-[40vh] overflow-hidden">
            <div className="modal-hero-image absolute inset-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-40`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-xl border border-border/50 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category badge */}
            <div className="absolute top-4 left-6 px-4 py-2 rounded-full bg-background/80 backdrop-blur-xl border border-border/50">
              <span className="text-xs font-medium text-primary tracking-wider uppercase">
                {project.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10 -mt-20 relative z-10">
            <DialogHeader className="mb-8">
              <DialogTitle className="modal-title font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
                {project.title}
              </DialogTitle>
            </DialogHeader>

            {/* Meta info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              <div className="modal-meta-item p-4 rounded-xl bg-muted/30 border border-border/30">
                <Calendar className="w-5 h-5 text-primary mb-2" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Year</p>
                <p className="text-sm font-semibold text-foreground">{caseStudyData.year}</p>
              </div>
              <div className="modal-meta-item p-4 rounded-xl bg-muted/30 border border-border/30">
                <Clock className="w-5 h-5 text-primary mb-2" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Duration</p>
                <p className="text-sm font-semibold text-foreground">{caseStudyData.duration}</p>
              </div>
              <div className="modal-meta-item p-4 rounded-xl bg-muted/30 border border-border/30">
                <Users className="w-5 h-5 text-primary mb-2" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Team</p>
                <p className="text-sm font-semibold text-foreground">{caseStudyData.team}</p>
              </div>
              <div className="modal-meta-item p-4 rounded-xl bg-muted/30 border border-border/30">
                <ArrowRight className="w-5 h-5 text-primary mb-2" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Role</p>
                <p className="text-sm font-semibold text-foreground">{caseStudyData.role}</p>
              </div>
            </div>

            {/* Tech stack */}
            <div className="modal-section mb-10">
              <h3 className="text-lg font-semibold text-foreground mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenge */}
            <div className="modal-section mb-10">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                The Challenge
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                {caseStudyData.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="modal-section mb-10">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                The Solution
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                {caseStudyData.solution}
              </p>
            </div>

            {/* Results */}
            <div className="modal-section mb-10">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Key Results
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {caseStudyData.results.map((result, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-muted/20 border border-border/30 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm text-foreground">{result}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="modal-section mb-10">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Project Gallery
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {caseStudyData.gallery.map((img, index) => (
                  <div
                    key={index}
                    className="gallery-image relative aspect-video rounded-xl overflow-hidden group"
                  >
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="modal-section flex flex-wrap gap-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                View Live Project
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted border border-border text-foreground font-medium hover:border-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                View Source Code
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
