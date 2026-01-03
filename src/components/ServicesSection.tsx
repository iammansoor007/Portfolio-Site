import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code2, Palette, Zap, Layers, ShoppingCart, Smartphone, Gauge, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Creative Development',
    tagline: 'Immersive, performance-first web experiences',
    description: 'Concept-first websites where motion becomes storytelling. Brand personality expressed through every interaction, scroll, and transition.',
    deliverables: ['Concept Development', 'Motion Design', 'WebGL Experiences', 'Interactive Narratives'],
    approach: 'Every project starts with understanding the soul of your brand. We translate that into digital experiences that feel alive.',
    tools: ['GSAP', 'Three.js', 'React', 'Next.js'],
    icon: Code2,
  },
  {
    number: '02',
    title: 'E-Commerce Development',
    tagline: 'High-converting Shopify & WooCommerce stores',
    description: 'Custom Shopify themes and headless e-commerce solutions built for conversion. Seamless integrations with payment gateways, ERP, and inventory systems.',
    deliverables: ['Shopify Store Development', 'Custom Liquid Themes', 'Headless E-commerce', 'Payment Integration'],
    approach: "We build stores that not only look beautiful but convert. Every element is optimized for the buyer's journey.",
    tools: ['Shopify', 'WooCommerce', 'Liquid', 'Sanity'],
    icon: ShoppingCart,
  },
  {
    number: '03',
    title: 'UI/UX Design',
    tagline: 'Interfaces built for clarity and conversion',
    description: 'Systems, not just screens. Design that reduces cognitive load while amplifying emotional response and driving action.',
    deliverables: ['User Research', 'Design Systems', 'Prototyping', 'Usability Testing'],
    approach: "We obsess over the details that users feel but never consciously notice. That's where trust is built.",
    tools: ['Figma', 'Framer', 'Principle', 'Maze'],
    icon: Palette,
  },
  {
    number: '04',
    title: 'Frontend Engineering',
    tagline: 'Pixel-perfect with production-grade performance',
    description: 'Implementation that honors design intent while exceeding performance benchmarks. Zero layout shift, buttery animations.',
    deliverables: ['React Development', 'Animation Systems', 'Performance Optimization', 'Accessibility'],
    approach: 'Code is craft. Every component is engineered for reusability, every animation for smoothness.',
    tools: ['TypeScript', 'GSAP', 'Tailwind', 'Vite'],
    icon: Zap,
  },
  {
    number: '05',
    title: 'WordPress Development',
    tagline: 'Custom themes, plugins, and headless solutions',
    description: 'From custom theme development to headless WordPress setups. We create scalable, secure solutions with modern development practices.',
    deliverables: ['Custom Themes', 'Plugin Development', 'Headless WordPress', 'Migration'],
    approach: 'WordPress that feels modern and performs exceptionally. We bridge the gap between flexibility and performance.',
    tools: ['WordPress', 'PHP', 'ACF', 'GraphQL'],
    icon: Globe,
  },
  {
    number: '06',
    title: 'Performance Optimization',
    tagline: 'Lightning-fast experiences that convert better',
    description: 'Comprehensive performance audits and optimization. We fix Core Web Vitals, reduce load times, and improve user experience scores.',
    deliverables: ['Performance Audits', 'Core Web Vitals', 'Code Splitting', 'Caching Strategies'],
    approach: 'Performance is not just technical—it impacts conversions, SEO, and user retention directly.',
    tools: ['Lighthouse', 'Webpack', 'CDN', 'Redis'],
    icon: Gauge,
  },
  {
    number: '07',
    title: 'Mobile App Development',
    tagline: 'Native and cross-platform mobile experiences',
    description: 'From React Native to Flutter, we build mobile apps that feel native. Offline-first approaches with seamless backend integration.',
    deliverables: ['React Native Apps', 'Flutter Development', 'App Store Deployment', 'API Integration'],
    approach: 'We build apps that users love to use daily. Focus on smooth interactions and intuitive navigation.',
    tools: ['React Native', 'Flutter', 'Expo', 'Firebase'],
    icon: Smartphone,
  },
  {
    number: '08',
    title: 'Brand & Motion Systems',
    tagline: 'Visual identities that scale across platforms',
    description: 'Motion languages and design systems that maintain brand consistency from micro-interactions to hero moments.',
    deliverables: ['Brand Guidelines', 'Motion Libraries', 'Component Systems', 'Documentation'],
    approach: 'We create living systems that grow with your brand, ensuring every touchpoint feels intentional.',
    tools: ['After Effects', 'Lottie', 'Storybook', 'Figma'],
    icon: Layers,
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      gsap.fromTo(
        '.services-eyebrow',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.services-title',
        { y: 50, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.services-subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Service cards stagger
      gsap.fromTo(
        '.service-card-wrapper',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.services-list',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Intro Block */}
        <div className="max-w-4xl mb-20 sm:mb-28">
          <div className="services-eyebrow flex items-center gap-4 mb-6">
            <span className="text-primary font-mono text-sm tracking-wider">[ 04 ]</span>
            <div className="w-16 h-[1px] bg-gradient-to-r from-primary to-transparent" />
            <span className="text-muted-foreground uppercase tracking-[0.2em] text-sm">What I Do</span>
          </div>

          <h2 className="services-title font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
            Comprehensive digital solutions that{' '}
            <span className="text-gradient">drive business growth</span>
          </h2>

          <p className="services-subtitle text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            End-to-end development services from creative design to e-commerce, performance optimization, and custom applications.
          </p>
        </div>

        {/* Services List */}
        <div className="services-list space-y-4">
          {services.map((service, index) => (
            <div
              key={service.number}
              className="service-card-wrapper"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`relative group cursor-pointer transition-all duration-500 ${
                  expandedIndex === index ? 'bg-muted/30' : ''
                } ${hoveredIndex === index && expandedIndex !== index ? 'bg-muted/10' : ''}`}
              >
                {/* Main Card Row */}
                <div
                  onClick={() => toggleExpand(index)}
                  className="relative py-8 sm:py-10 border-t border-border/50 transition-all duration-300"
                >
                  <div className="flex items-start sm:items-center justify-between gap-6">
                    {/* Left: Number + Title */}
                    <div className="flex items-start sm:items-center gap-6 sm:gap-10">
                      <span className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold transition-colors duration-300 ${
                        hoveredIndex === index || expandedIndex === index ? 'text-primary' : 'text-muted-foreground/30'
                      }`}>
                        {service.number}
                      </span>
                      
                      <div>
                        <h3 className={`font-display text-2xl sm:text-3xl lg:text-4xl font-bold transition-colors duration-300 ${
                          hoveredIndex === index || expandedIndex === index ? 'text-foreground' : 'text-foreground/80'
                        }`}>
                          {service.title}
                        </h3>
                        <p className={`text-sm sm:text-base text-muted-foreground mt-1 transition-opacity duration-300 ${
                          hoveredIndex === index || expandedIndex === index ? 'opacity-100' : 'opacity-60'
                        }`}>
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Right: Icon + Arrow */}
                    <div className="flex items-center gap-4">
                      <div className={`hidden sm:flex w-12 h-12 rounded-full items-center justify-center border transition-all duration-300 ${
                        hoveredIndex === index || expandedIndex === index 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border/50 bg-muted/20'
                      }`}>
                        <service.icon className={`w-5 h-5 transition-colors duration-300 ${
                          hoveredIndex === index || expandedIndex === index ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        expandedIndex === index 
                          ? 'border-primary bg-primary rotate-45' 
                          : hoveredIndex === index 
                            ? 'border-primary' 
                            : 'border-border/50'
                      }`}>
                        <ArrowUpRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                          expandedIndex === index ? 'text-primary-foreground' : ''
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <div className={`overflow-hidden transition-all duration-500 ease-out ${
                  expandedIndex === index ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pb-10 pl-0 sm:pl-[106px] lg:pl-[130px]">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                      {/* Left Column */}
                      <div className="space-y-6">
                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                        <div className="p-5 rounded-xl bg-muted/20 border border-border/30">
                          <p className="text-sm text-foreground/80 italic leading-relaxed">
                            "{service.approach}"
                          </p>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Deliverables */}
                        <div>
                          <h4 className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">
                            Deliverables
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {service.deliverables.map((item) => (
                              <span
                                key={item}
                                className="px-3 py-1.5 rounded-full bg-background/60 border border-border/50 text-xs sm:text-sm font-medium text-foreground"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Tools */}
                        <div>
                          <h4 className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">
                            Tools & Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {service.tools.map((tool) => (
                              <span
                                key={tool}
                                className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm font-medium text-primary"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-300 group">
                          <span>View Case Studies</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional expertise section */}
       

        {/* Soft CTA */}
        <div className="mt-20 sm:mt-28 text-center">
          <p className="text-muted-foreground text-lg mb-6">
            Have a project in mind? Let's discuss your requirements.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-medium text-base hover:scale-105 transition-transform duration-300"
          >
            <span>Let's Work Together</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;