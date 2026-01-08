import {
  Heart,
  Github,
  Linkedin,
  Facebook,
  PhoneCall,
  ArrowUpRight,
  Mail,
} from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/iammansoor007", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/themansoorshah/",
    label: "LinkedIn",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/Iammansoor007",
    label: "Facebook",
  },
  { icon: PhoneCall, href: "https://wa.me/+923152280754", label: "WhatsApp" },
];

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative pt-16 sm:pt-20 pb-6 sm:pb-8 overflow-hidden min-w-[300px]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-[50%] h-[50%] bg-gradient-radial from-primary/5 to-transparent blur-3xl" />

      <div className="container mx-auto px-3 xs:px-4 sm:px-6 relative z-10 max-w-screen-2xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8 sm:gap-10 lg:gap-8 mb-10 sm:mb-16">
          {/* Brand - Full width on mobile, then spans 2 columns */}
          <div className="xs:col-span-2 md:col-span-2 lg:col-span-2">
            <a
              href="#"
              className="inline-block text-2xl xs:text-2xl sm:text-3xl font-display font-bold text-gradient mb-3 sm:mb-4"
            >
              MS<span className="text-primary">.</span>
            </a>
            <p className="text-muted-foreground text-sm xs:text-sm sm:text-base max-w-md mb-4 xs:mb-6 leading-relaxed">
              Full-stack developer crafting immersive web experiences with
              cutting-edge technologies and stunning animations. Based in
              Karachi, Pakistan.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2 xs:gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg xs:rounded-xl bg-card/50 backdrop-blur-xl border border-border/50 flex items-center justify-center 
                    hover:bg-primary/10 hover:border-primary/40 hover:scale-110 hover:shadow-lg hover:shadow-primary/10
                    transition-all duration-300 flex-shrink-0"
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-4 xs:mt-0">
            <h4 className="font-display font-bold text-base xs:text-lg mb-4 xs:mb-6 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2 xs:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="group flex items-center gap-2 text-sm xs:text-base text-muted-foreground hover:text-primary transition-colors duration-300 w-full text-left"
                  >
                    <span className="w-0 group-hover:w-1.5 xs:group-hover:w-2 h-[1px] xs:h-[2px] bg-primary transition-all duration-300" />
                    <span className="truncate">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="mt-4 xs:mt-0">
            <h4 className="font-display font-bold text-base xs:text-lg mb-4 xs:mb-6 text-foreground">
              Get in Touch
            </h4>
            <div className="space-y-3 xs:space-y-4">
              <a
                href="mailto:contact@codeperia.com"
                className="group flex items-center gap-2 xs:gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg xs:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs xs:text-sm block truncate">
                    contact@codeperia.com
                  </span>
                  <span className="text-xs text-muted-foreground">
                    (Business)
                  </span>
                </div>
              </a>

              <a
                href="mailto:ammansoor007@gmail.com"
                className="group flex items-center gap-2 xs:gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg xs:rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs xs:text-sm block truncate">
                    ammansoor007@gmail.com
                  </span>
                  <span className="text-xs text-muted-foreground">
                    (Personal)
                  </span>
                </div>
              </a>

              <button
                onClick={() => handleNavClick("#contact")}
                className="group inline-flex items-center gap-1.5 xs:gap-2 px-4 xs:px-5 py-2 xs:py-2.5 rounded-full bg-primary/10 border border-primary/30 
                  text-primary font-medium text-xs xs:text-sm hover:bg-primary hover:text-primary-foreground 
                  transition-all duration-300 mt-2 xs:mt-4 w-full xs:w-auto justify-center"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-border to-transparent mb-6 xs:mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col xs:flex-row items-center justify-between gap-4">
          {/* Availability Status - Top on mobile */}
          <div className="flex items-center gap-2 order-1 xs:order-2 mb-0 xs:mb-0">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
            <span className="text-xs xs:text-sm text-green-600 font-medium truncate">
              Available for opportunities
            </span>
          </div>

          {/* Copyright - Middle on mobile */}
          <p className="text-muted-foreground text-xs xs:text-sm flex items-center gap-1.5 order-2 xs:order-1 text-center flex-wrap justify-center">
            © {currentYear} Mansoor Shah. Made with
            <Heart className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary fill-primary animate-pulse flex-shrink-0" />
            <span className="whitespace-nowrap">in Karachi, Pakistan</span>
          </p>

          {/* Back to top - Bottom on mobile */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border/50 
              text-xs xs:text-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-lg
              transition-all duration-300 order-3 xs:order-3 mx-auto xs:mx-0"
          >
            <span>Back to top</span>
            <span className="w-4 h-4 xs:w-5 xs:h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
              <svg
                className="w-2.5 h-2.5 xs:w-3 xs:h-3 rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Extra small screen warning/optimization */}
        <div className="mt-4 text-center xs:hidden">
          <p className="text-[10px] text-muted-foreground/60">
            For best experience, rotate your device or use a larger screen.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
