import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What services do you offer?',
    answer: 'I offer comprehensive web development services including frontend development with React/Next.js, backend development with Node.js, UI/UX design, mobile app development, and performance optimization. Each project is tailored to meet your specific needs and goals.',
  },
  {
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary based on complexity and scope. A simple landing page might take 1-2 weeks, while a full-stack web application could take 2-3 months. I always provide detailed timelines during our initial consultation and keep you updated throughout the process.',
  },
  {
    question: 'How do you handle project communication?',
    answer: 'I believe in transparent and regular communication. We can use your preferred tools (Slack, Email, or project management platforms like Notion). I provide weekly progress updates and am available for calls to discuss any concerns or changes.',
  },
  {
    question: 'Do you offer ongoing maintenance and support?',
    answer: 'Yes! I offer ongoing maintenance packages that include bug fixes, security updates, performance monitoring, and feature additions. This ensures your application stays up-to-date and running smoothly long after launch.',
  },
  {
    question: 'What is your pricing structure?',
    answer: 'I offer both project-based and hourly pricing depending on the nature of the work. For most projects, I provide a detailed quote after understanding your requirements. I believe in transparent pricing with no hidden fees.',
  },
  {
    question: 'Can you work with my existing team?',
    answer: 'Absolutely! I have extensive experience collaborating with cross-functional teams including designers, developers, and product managers. I can seamlessly integrate into your workflow and contribute to your team\'s success.',
  },
];

const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.faq-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-list',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="absolute top-1/4 right-0 w-[30%] h-[40%] bg-gradient-radial from-primary/5 to-transparent blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[30%] h-[40%] bg-gradient-radial from-accent/5 to-transparent blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="faq-header text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4 flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" />
            FAQ
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Got questions? I've got answers. Find quick solutions to common queries below.
          </p>
        </div>

        {/* FAQ List */}
        <div className="faq-list max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item rounded-2xl transition-all duration-500 overflow-hidden ${
                openIndex === index 
                  ? 'bg-card/60 backdrop-blur-xl border-primary/30 shadow-lg shadow-primary/5' 
                  : 'bg-card/40 backdrop-blur-xl border-border/50 hover:border-border'
              } border`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <span className={`font-display font-semibold text-base sm:text-lg transition-colors duration-300 ${
                  openIndex === index ? 'text-primary' : 'text-foreground group-hover:text-primary'
                }`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-primary text-primary-foreground rotate-180' 
                    : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              
              {/* Answer */}
              <div
                className={`grid transition-all duration-500 ease-out ${
                  openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-5">
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-border to-transparent mb-4" />
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Still have questions? I'm here to help!
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium
              hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4" />
            <span>Get in Touch</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
