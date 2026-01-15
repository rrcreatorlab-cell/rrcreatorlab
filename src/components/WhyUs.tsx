import { Heart, BarChart3, CheckCircle, MessageSquare, TrendingUp } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const reasons = [
  {
    icon: Heart,
    title: "Creator-First Approach",
    description: "We understand creators because we think like creators. Your success is our priority.",
  },
  {
    icon: BarChart3,
    title: "Data-Backed Strategies",
    description: "Every decision is informed by analytics and proven growth methodologies.",
  },
  {
    icon: CheckCircle,
    title: "Clean & Consistent Execution",
    description: "Reliable, on-time delivery with attention to detail in everything we do.",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    description: "Regular updates and honest feedback. No surprises, just results.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Growth Plans",
    description: "Strategies that grow with you, from beginner to established creator.",
  },
];

const WhyUs = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="why-us">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="fade-right">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Why
              <span className="gradient-text"> RR Creator Lab?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We focus on organic, optimized growth through smart strategy and consistent execution. 
              Our team is dedicated to helping you build a sustainable content presence.
            </p>
            
            <div className="glass-card rounded-xl p-6">
              <p className="text-sm text-muted-foreground italic">
                "We don't just manage accounts—we build communities and help creators thrive."
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {reasons.map((reason, index) => (
              <AnimatedSection
                key={reason.title}
                animation="fade-left"
                delay={index * 100}
              >
                <div className="flex items-start gap-4 glass-card rounded-xl p-4 hover:scale-[1.01] transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <reason.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold mb-1">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm">{reason.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
