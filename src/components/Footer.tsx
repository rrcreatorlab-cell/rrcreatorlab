import { Youtube, Instagram, Mail, Phone } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const Footer = () => {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="container px-4">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold gradient-text mb-4">
              RR Creator Lab
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mb-4">
              Building Creators. Scaling Reach. We help creators and brands grow on YouTube and Instagram 
              through strategy, consistency, and optimized execution.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <a 
                href="https://wa.me/919483886270" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                +91 9483886270
              </a>
              <a 
                href="mailto:rrcreatorlab@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                rrcreatorlab@gmail.com
              </a>
              <a 
                href="https://instagram.com/rrcreatorlab" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
                @rrcreatorlab
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/rrcreatorlab" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="mailto:rrcreatorlab@gmail.com"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">Content Strategy</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">YouTube Management</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Instagram Management</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Video Editing</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Analytics & Tracking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#process" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#why-us" className="hover:text-primary transition-colors">Why Choose Us</a></li>
              <li><a href="#clients" className="hover:text-primary transition-colors">Who We Work With</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground mb-4">
              © 2024 RR Creator Lab. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70">
              <strong>Disclaimer:</strong> RR Creator Lab provides content strategy and social media management services only. 
              Engagement and growth depend on multiple factors including content quality, consistency, and platform algorithms. 
              No guaranteed results are promised.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
};

export default Footer;
