import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { useMagnetic } from '@/hooks/useGsapAnimations';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = (resolvedTheme ?? theme)
    ? (resolvedTheme ?? theme) === 'dark'
    : document.documentElement.classList.contains('dark');
  const logoRef = useMagnetic(0.2);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
    );
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current || !menuItemsRef.current) return;

    if (isMobileMenuOpen) {
      // Open animation
      gsap.set(mobileMenuRef.current, { display: 'block' });
      gsap.fromTo(
        mobileMenuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      );
      
      // Stagger menu items
      gsap.fromTo(
        menuItemsRef.current.children,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.5, delay: 0.2, ease: 'power3.out' }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          if (mobileMenuRef.current) {
            gsap.set(mobileMenuRef.current, { display: 'none' });
          }
        }
      });
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    // Ensure native form controls match theme as well
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  }, [isDark]);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass py-3' : 'py-4 sm:py-6'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="magnetic">
            <a
              href="#"
              className="text-xl sm:text-2xl font-display font-bold text-gradient"
              data-cursor-hover
            >
              Mansoor<span className="text-primary">.</span>
            </a>
          </div>

          {/* Desktop Navigation - Enhanced */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <NavItem
                key={link.href}
                label={link.label}
                href={link.href}
                index={index}
                onClick={() => handleNavClick(link.href)}
              />
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="relative w-10 h-10 rounded-xl bg-card/40 backdrop-blur-xl border border-border/50 flex items-center justify-center 
                hover:bg-primary/10 hover:border-primary/40 hover:scale-105 hover:rotate-12
                transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/20 to-transparent" />
              {isDark ? <Sun className="w-5 h-5 relative z-10" /> : <Moon className="w-5 h-5 relative z-10" />}
            </button>
            <button
              onClick={() => handleNavClick('#contact')}
              className="relative px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium 
                transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30
                overflow-hidden group"
              data-cursor-hover
            >
              <span className="relative z-10">Let's Talk</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-gradient-shift transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl bg-card/40 backdrop-blur-xl border border-border/50 flex items-center justify-center hover:bg-primary/10 transition-all duration-300"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center relative z-[60]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Right Side Slide */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-y-0 right-0 w-[85%] max-w-[320px] z-[55] hidden"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="h-full bg-card/95 backdrop-blur-xl border-l border-border/50 flex flex-col">
          {/* Menu Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-border/30">
            <span className="text-lg font-display font-bold text-gradient">Menu</span>
          </div>

          {/* Menu Items */}
          <div ref={menuItemsRef} className="flex-1 flex flex-col justify-center px-6 space-y-2">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="group py-4 text-left border-b border-border/20 last:border-0"
              >
                <span className="flex items-center justify-between">
                  <span className="text-2xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    {link.label}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    0{index + 1}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Menu Footer */}
          <div className="p-6 border-t border-border/30">
            <button
              onClick={() => handleNavClick('#contact')}
              className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-center"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[54] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

const NavItem = ({
  label,
  href,
  index,
  onClick,
}: {
  label: string;
  href: string;
  index: number;
  onClick: () => void;
}) => {
  const itemRef = useMagnetic(0.15);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      itemRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.6 + index * 0.1, ease: 'power3.out' }
    );
  }, [index]);

  return (
    <div ref={itemRef} className="magnetic">
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group rounded-lg overflow-hidden"
        data-cursor-hover
      >
        {/* Background hover effect */}
        <div 
          className={`absolute inset-0 bg-card/60 backdrop-blur-sm border border-border/30 rounded-lg transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        />
        
        {/* Gradient glow on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg transition-all duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Label */}
        <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
          {label}
        </span>
        
        {/* Animated underline */}
        <span 
          className={`absolute bottom-1.5 left-4 right-4 h-[2px] bg-gradient-to-r from-primary via-accent to-primary transition-all duration-500 ease-out rounded-full ${
            isHovered ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`}
          style={{ transformOrigin: 'center' }}
        />
      </button>
    </div>
  );
};

export default Navigation;
