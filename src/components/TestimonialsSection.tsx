import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, ChevronLeft, ChevronRight, ShoppingCart, Globe, Code, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Ahsan Memon',
    role: 'E-commerce Director',
    company: 'Shopify Store',
    tech: 'Shopify',
    quote: "The custom Shopify solutions transformed our online store completely. Page load times improved by 65% and conversions increased by 40% within the first month. The attention to e-commerce UX was exceptional.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    icon: ShoppingCart,
    color: 'from-green-400 to-emerald-600'
  },
  {
    id: 2,
    name: 'Kashif Khan',
    role: 'Digital Marketing Lead',
    company: 'WordPress Agency',
    tech: 'WordPress',
    quote: "Our WordPress multisite network was becoming unmanageable until this overhaul. The custom themes and performance optimizations reduced bounce rate by 55% and improved our Core Web Vitals to perfect scores.",
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    icon: Globe,
    color: 'from-blue-400 to-sky-600'
  },
  {
    id: 3,
    name: 'Anus Arshad',
    role: 'Operations Manager',
    company: 'Shopify Plus Store',
    tech: 'Shopify Plus',
    quote: "Migrating to Shopify Plus was seamless with this expertise. The custom apps and automation workflows saved 20+ hours weekly in manual tasks. Our international storefront setup was executed flawlessly.",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    icon: ShoppingCart,
    color: 'from-green-400 to-emerald-600'
  },
  {
    id: 4,
    name: 'Komal Aftab',
    role: 'Backend Developer',
    company: 'FinTech Startup',
    tech: 'Python Flask',
    quote: "The Flask REST API implementation was robust and scalable. Our transaction processing time went from 3 seconds to 200ms. The clean architecture and thorough documentation made team onboarding effortless.",
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    icon: Code,
    color: 'from-yellow-400 to-amber-600'
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(
        '.testimonials-eyebrow',
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

      gsap.fromTo(
        '.testimonials-title',
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

      // Cards stagger animation
      gsap.fromTo(
        '.testimonial-card',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-gradient-to-b from-background to-muted/20"
    >
      {/* Tech pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-l from-accent/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="testimonials-eyebrow flex items-center justify-center gap-4 mb-6">
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary font-mono text-xs sm:text-sm tracking-[0.3em] uppercase">
              Client Success Stories
            </span>
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-primary" />
          </div>

          <h2 className="testimonials-title font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Trusted by <span className="text-gradient">Tech Leaders</span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Real results from industry professionals across Shopify, WordPress, and Python Flask ecosystems
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="testimonials-grid hidden md:grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => {
            const IconComponent = testimonial.icon;
            return (
              <div
                key={testimonial.id}
                className="testimonial-card group relative p-6 lg:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 overflow-hidden"
                data-cursor="card"
              >
                {/* Tech gradient accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${testimonial.color} opacity-5 rounded-full -translate-y-16 translate-x-16`} />

                {/* Tech badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-background to-card border border-border/50 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {testimonial.tech}
                  </span>
                </div>

                {/* Quote icon */}
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Quote className="w-5 h-5 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-foreground text-base lg:text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br ${testimonial.color} border-2 border-background`} />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <div className="relative">
            {/* Active Card */}
            <div className="testimonial-card relative p-6 rounded-2xl bg-card border border-border/50 overflow-hidden">
              {(() => {
                const testimonial = testimonials[activeIndex];
                const IconComponent = testimonial.icon;
                return (
                  <>
                    {/* Tech gradient accent */}
                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${testimonial.color} opacity-5 rounded-full -translate-y-20 translate-x-20`} />

                    {/* Tech badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-background to-card border border-border/50 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {testimonial.tech}
                      </span>
                    </div>

                    {/* Quote icon */}
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <Quote className="w-5 h-5 text-primary" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-foreground text-base leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-5 border-t border-border/50">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br ${testimonial.color} border-2 border-background`} />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} • {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 px-4">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots with tech icons */}
              <div className="flex gap-3 items-center">
                {testimonials.map((testimonial, i) => {
                  const IconComponent = testimonial.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className="flex flex-col items-center gap-1"
                    >
                      <div className={`p-1.5 rounded-full transition-all duration-300 ${
                        i === activeIndex 
                          ? 'bg-primary text-primary-foreground scale-110' 
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}>
                        <IconComponent className="w-3 h-3" />
                      </div>
                      <div className={`h-1 w-1 rounded-full transition-all duration-300 ${
                        i === activeIndex ? 'bg-primary w-3' : 'bg-border'
                      }`} />
                    </button>
                  );
                })}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tech Stack Summary */}
        <div className="mt-16 sm:mt-20 text-center">
          <p className="text-sm text-muted-foreground font-mono tracking-wide">
            Specializing in • Shopify Development • WordPress Solutions • Python Flask APIs • Custom Integrations
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;