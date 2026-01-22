import { Calendar, Clock, Video, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

const benefits = [
  "30-minute free strategy call",
  "Personalized growth roadmap",
  "Content audit & recommendations",
  "No commitment required",
];

const BookingSection = () => {
  const bookingUrl = "https://topmate.io/rishabh269/";

  return (
    <section className="relative py-24 overflow-hidden" id="booking">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5" />
      
      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <AnimatedSection animation="fade-right">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
              Free Consultation
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Ready to
              <span className="gradient-text"> Level Up?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Book a free strategy call with our founder to discuss your content goals 
              and discover how we can help you grow faster.
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button variant="gradient" size="xl" asChild>
              <a 
                href={bookingUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                Book Your Free Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </AnimatedSection>

          {/* Right - Booking Preview Card */}
          <AnimatedSection animation="fade-left" delay={200}>
            <div className="glass-card rounded-2xl p-8 relative">
              {/* Decorative glow */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent/30 rounded-full blur-2xl" />

              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-2xl font-bold text-foreground">RA</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">Rishabh Alevoor</h3>
                    <p className="text-muted-foreground text-sm">Founder & CEO</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Flexible Scheduling</p>
                      <p className="text-xs text-muted-foreground">Pick a time that works for you</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">30 Minutes</p>
                      <p className="text-xs text-muted-foreground">Focused, actionable session</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <Video className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Video Call</p>
                      <p className="text-xs text-muted-foreground">Google Meet or Zoom</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Available this week
                  </div>
                </div>

                <Button variant="hero" size="lg" className="w-full" asChild>
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    Schedule Now →
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
