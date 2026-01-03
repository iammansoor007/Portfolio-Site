import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Facebook,
  PhoneCall,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/iammansoor007",
    color: "hover:bg-gray-900 hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/themansoorshah/",
    color: "hover:bg-blue-600 hover:text-white",
  },

  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/Iammansoor007",
    color: "hover:bg-blue-700 hover:text-white",
  },
  {
    name: "WhatsApp",
    icon: PhoneCall,
    href: "https://wa.me/+923152280754",
    color: "hover:bg-green-600 hover:text-white",
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(
        ".contact-eyebrow",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".contact-title",
        { y: 60, opacity: 0, skewY: 3 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Form animation
      gsap.fromTo(
        ".contact-form",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 85%",
          },
        }
      );

      // Info cards animation
      gsap.fromTo(
        ".contact-info-card",
        { x: 40, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-info-card",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Using Formspree or similar service - replace with your actual endpoint
      const response = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Auto-reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset status when user starts typing again
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden min-h-[80vh]"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] sm:w-[1000px] sm:h-[600px] bg-gradient-radial from-primary/10 to-transparent blur-3xl" />

      {/* Animated floating elements */}
      <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-primary/30 animate-pulse" />
      <div className="absolute bottom-40 right-20 w-6 h-6 rounded-full bg-accent/20 animate-pulse delay-700" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-primary/40 animate-pulse delay-300" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="contact-eyebrow flex items-center justify-center gap-4 mb-4">
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-primary" />
            <p className="text-primary font-mono text-xs sm:text-sm tracking-[0.3em] uppercase">
              Contact Me
            </p>
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="contact-title font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Let's Build <span className="text-gradient">Together</span>
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-base sm:text-lg">
            Whether it's a new project, collaboration, or just a tech chat - I'm
            always open to interesting conversations.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact form */}
          <div className="lg:col-span-3 contact-form">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-card/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground/50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-card/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground/50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-card/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-foreground placeholder:text-muted-foreground/50"
                  placeholder="Project Inquiry / Job Opportunity / Collaboration"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-card/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 resize-none text-foreground placeholder:text-muted-foreground/50"
                  placeholder="Tell me about your project, timeline, and requirements..."
                />
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                  <p className="text-green-600 font-medium">
                    ✓ Message sent successfully!
                  </p>
                  <p className="text-green-500/80 text-sm mt-1">
                    Thank you for reaching out. I'll get back to you within 24
                    hours.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                  <p className="text-red-600 font-medium">
                    ✗ Something went wrong
                  </p>
                  <p className="text-red-500/80 text-sm mt-1">
                    Please try again or contact me directly via email.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                I typically respond within 24 hours
              </p>
            </form>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6">
            {/* Info card */}
            <div className="contact-info-card glass rounded-2xl p-5 sm:p-6 md:p-8 card-hover shine-effect border border-border/50">
              <h3 className="font-display text-lg sm:text-xl font-bold mb-5 sm:mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Contact Information
              </h3>

              <div className="space-y-4 sm:space-y-5">
                <a
                  href="mailto:contact@codeperia.com"
                  className="flex items-start gap-4 group p-3 rounded-lg hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Email (Business)
                    </p>
                    <p className="text-muted-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                      contact@codeperia.com
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      For project inquiries & collaborations
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:ammansoor007@gmail.com"
                  className="flex items-start gap-4 group p-3 rounded-lg hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Email (Personal)
                    </p>
                    <p className="text-muted-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                      ammansoor007@gmail.com
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      For direct contact
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+923152280754"
                  className="flex items-start gap-4 group p-3 rounded-lg hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Phone / WhatsApp
                    </p>
                    <p className="text-muted-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                      +92 315 2280754
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Available Mon-Fri, 10AM-6PM PKT
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-3 rounded-lg">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Karachi, Pakistan
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Open to remote work worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links card */}
            <div className="contact-info-card glass rounded-2xl p-5 sm:p-6 md:p-8 card-hover shine-effect border border-border/50">
              <h3 className="font-display text-lg sm:text-xl font-bold mb-4">
                Connect with me
              </h3>
              <p className="text-muted-foreground mb-5 sm:mb-6 text-sm sm:text-base">
                Follow my work, projects, and development journey.
              </p>
              <div className="grid grid-cols-4 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full aspect-square rounded-xl bg-secondary/50 flex items-center justify-center transition-all duration-300 ${social.color} hover:scale-105 group`}
                    title={`Visit my ${social.name}`}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/70 mt-4 text-center">
                Click to visit profiles
              </p>
            </div>

            {/* Quick CTA */}

            {/* Availability Status */}
            <div className="contact-info-card rounded-2xl p-5 sm:p-6 border border-border/50 bg-card/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Current Status</p>
                  <p className="text-sm text-muted-foreground">
                    Available for projects / job opportunities
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-green-600">
                    Open
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  ✓ Accepting new clients
                </p>
                <p className="text-xs text-muted-foreground">
                  ✓ Open to collaborations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
