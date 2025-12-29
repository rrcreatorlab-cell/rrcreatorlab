import { Button } from "@/components/ui/button";
import { Mail, Phone, Instagram, ExternalLink, ChevronDown, Clock, Users, Zap, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LetsConnect = () => {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc7w7_crTXDPXa1Rz_2OOkAX7k_5jq88dEdLr8KiiaICcGh5g/viewform?usp=header";
  const whatsappNumber = "9483886270";
  const email = "rrcreatorlab@gmail.com";
  const instagramUrl = "https://www.instagram.com/rr_creator_lab";

  const scrollToContent = () => {
    window.scrollBy({ top: window.innerHeight * 0.5, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container px-4">
          {/* Header */}
          <div className="text-center mb-12 relative">
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary mb-6">
              Ready to Grow?
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Fill out our form to get started, or reach out directly through any of our channels below.
            </p>
            
            {/* Scroll Indicator Arrow - visible on mobile */}
            <button 
              onClick={scrollToContent}
              className="md:hidden animate-bounce inline-flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
              aria-label="Scroll down"
            >
              <span className="text-xs mb-1">Scroll down</span>
              <ChevronDown className="h-6 w-6" />
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Google Form Section */}
            <div className="glass-card rounded-2xl p-8 border border-border/50">
              <h2 className="font-display text-2xl font-bold mb-4">Get Started</h2>
              <p className="text-muted-foreground mb-6">
                Fill out our quick form and we'll get back to you within 24 hours with a personalized growth plan.
              </p>
              <Button variant="hero" size="lg" className="w-full" asChild>
                <a href={googleFormUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Open Application Form
                </a>
              </Button>
            </div>

            {/* Contact Info Section */}
            <div className="glass-card rounded-2xl p-8 border border-border/50">
              <h2 className="font-display text-2xl font-bold mb-4">Contact Us Directly</h2>
              <p className="text-muted-foreground mb-6">
                Prefer to reach out directly? We're available on all these platforms.
              </p>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/91${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">WhatsApp</p>
                    <p className="text-muted-foreground text-sm">+91 {whatsappNumber}</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">Email</p>
                    <p className="text-muted-foreground text-sm">{email}</p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                    <Instagram className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">Instagram</p>
                    <p className="text-muted-foreground text-sm">@rr_creator_lab</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Why Work With Us Section */}
          <div className="mt-16 max-w-5xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
              Why Creators <span className="gradient-text">Trust Us</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card rounded-xl p-6 text-center border border-border/50">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">24hr Response</h3>
                <p className="text-muted-foreground text-sm">Quick turnaround on all inquiries</p>
              </div>
              <div className="glass-card rounded-xl p-6 text-center border border-border/50">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Personal Touch</h3>
                <p className="text-muted-foreground text-sm">Dedicated support for your channel</p>
              </div>
              <div className="glass-card rounded-xl p-6 text-center border border-border/50">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Proven Results</h3>
                <p className="text-muted-foreground text-sm">Channels with 520x+ growth</p>
              </div>
              <div className="glass-card rounded-xl p-6 text-center border border-border/50">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Quality First</h3>
                <p className="text-muted-foreground text-sm">Premium thumbnails & SEO</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
              Quick <span className="gradient-text">Questions</span>
            </h2>
            <div className="space-y-4">
              <div className="glass-card rounded-xl p-6 border border-border/50">
                <h3 className="font-semibold mb-2">How long does it take to see results?</h3>
                <p className="text-muted-foreground text-sm">Most channels see noticeable growth within 2-4 weeks of implementing our strategies.</p>
              </div>
              <div className="glass-card rounded-xl p-6 border border-border/50">
                <h3 className="font-semibold mb-2">Do you work with small channels?</h3>
                <p className="text-muted-foreground text-sm">Absolutely! We specialize in helping small creators grow from the ground up.</p>
              </div>
              <div className="glass-card rounded-xl p-6 border border-border/50">
                <h3 className="font-semibold mb-2">What languages do you support?</h3>
                <p className="text-muted-foreground text-sm">We work with Hindi and English content creators primarily.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LetsConnect;
