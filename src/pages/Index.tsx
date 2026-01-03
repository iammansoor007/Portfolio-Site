import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import Marquee from '@/components/Marquee';
import SkillsSection from '@/components/SkillsSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ExperienceSection from '@/components/ExperienceSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import PageTransition from '@/components/PageTransition';
import ParticlesBackground from '@/components/ParticlesBackground';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  // Only show loader on first visit per session
  const hasVisited = sessionStorage.getItem('hasVisited');
  const [isLoading, setIsLoading] = useState(!hasVisited);
  const [isLoaded, setIsLoaded] = useState(!!hasVisited);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoaded) return;

    const t = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => window.clearTimeout(t);
  }, [isLoaded]);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisited', 'true');
    setIsLoading(false);
    setIsLoaded(true);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {isLoaded && (
        <div className="relative noise">
          <ParticlesBackground />
          <CustomCursor />
          <Navigation />

          <PageTransition isLoaded={isLoaded}>
            <main>
              <HeroSection />
              <AboutSection />
              <Marquee />
              <SkillsSection />
              <ServicesSection />
              <ProjectsSection />
              <TestimonialsSection />
              <ExperienceSection />
              <FAQSection />
              <ContactSection />
            </main>
          </PageTransition>

          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;