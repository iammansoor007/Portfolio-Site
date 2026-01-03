import { Heart, Github, Linkedin, Facebook, PhoneCall, ArrowUpRight, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/iammansoor007', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/themansoorshah/', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://www.facebook.com/Iammansoor007', label: 'Facebook' },
  { icon: PhoneCall, href: 'https://wa.me/+923152280754', label: 'WhatsApp' },
];

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-[50%] h-[50%] bg-gradient-radial from-primary/5 to-transparent blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block text-3xl font-display font-bold text-gradient mb-4">
              MS<span className="text-primary">.</span>
            </a>
            <p className="text-muted-foreground text-base max-w-md mb-6 leading-relaxed">
              Full-stack developer crafting immersive web experiences with cutting-edge technologies and stunning animations. Based in Karachi, Pakistan.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-xl bg-card/50 backdrop-blur-xl border border-border/50 flex items-center justify-center 
                    hover:bg-primary/10 hover:border-primary/40 hover:scale-110 hover:shadow-lg hover:shadow-primary/10
                    transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-primary transition-all duration-300" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-foreground">Get in Touch</h4>
            <div className="space-y-4">
              <a 
                href="mailto:contact@codeperia.com"
                className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-sm block">contact@codeperia.com</span>
                  <span className="text-xs text-muted-foreground">(Business)</span>
                </div>
              </a>

              <a 
                href="mailto:ammansoor007@gmail.com"
                className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-sm block">ammansoor007@gmail.com</span>
                  <span className="text-xs text-muted-foreground">(Personal)</span>
                </div>
              </a>
              
              <button
                onClick={() => handleNavClick('#contact')}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 
                  text-primary font-medium text-sm hover:bg-primary hover:text-primary-foreground 
                  transition-all duration-300 mt-4"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-muted-foreground text-sm flex items-center gap-1.5 order-2 sm:order-1">
            © {currentYear} Mansoor Shah. Made with 
            <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" /> 
            in Karachi, Pakistan
          </p>

          {/* Availability Status */}
          <div className="flex items-center gap-2 order-1 sm:order-2 mb-4 sm:mb-0">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-green-600 font-medium">Available for opportunities</span>
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border/50 
              text-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-lg
              transition-all duration-300 order-3"
          >
            <span>Back to top</span>
            <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <svg className="w-3 h-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;