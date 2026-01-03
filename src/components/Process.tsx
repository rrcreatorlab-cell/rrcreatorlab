import { MessageCircle, Lightbulb, Rocket, FileText, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Client Onboarding",
    description: "Fill out our simple form and share your goals. We learn about your content, audience, and vision for growth.",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Strategy & Analytics Review",
    description: "We analyze your channel performance and develop a customized growth strategy tailored to your niche.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Editing + Uploading",
    description: "Our team handles professional editing, optimization, and strategic uploading to maximize reach.",
  },
  {
    number: "04",
    icon: FileText,
    title: "Weekly / Monthly Growth Report",
    description: "Receive detailed performance reports with insights, analytics, and actionable recommendations.",
  },
];

const Process = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="process">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,hsl(175,80%,10%),transparent_60%)]" />

      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Our Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            How It
            <span className="gradient-text"> Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A simple, transparent process designed to deliver consistent results.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex items-start gap-6 pb-12 last:pb-0"
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="absolute left-7 top-16 w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent" />
              )}

              {/* Step number/icon */}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-card border-2 border-primary flex items-center justify-center text-xs font-bold">
                  {step.number.replace("0", "")}
                </div>
              </div>

              {/* Content */}
              <div className="glass-card rounded-xl p-6 flex-1 hover:scale-[1.01] transition-all duration-300">
                <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link to="/lets-connect">
            <Button variant="gradient" size="xl">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Process;
