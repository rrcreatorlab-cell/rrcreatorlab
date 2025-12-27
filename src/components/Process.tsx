import { MessageCircle, Lightbulb, Rocket, FileText, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Understanding Your Goals",
    description: "We start by learning about your content, audience, and what success looks like for you.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategy & Content Planning",
    description: "We develop a customized growth strategy with content calendars and optimization plans.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Execution & Management",
    description: "Our team handles the day-to-day management, posting, and optimization of your channels.",
  },
  {
    number: "04",
    icon: FileText,
    title: "Weekly Updates",
    description: "Stay informed with regular progress reports and transparent communication.",
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Monthly Performance Review",
    description: "Comprehensive analytics review to refine strategy and maximize results.",
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
      </div>
    </section>
  );
};

export default Process;
