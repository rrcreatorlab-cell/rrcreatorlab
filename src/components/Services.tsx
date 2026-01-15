import { Target, Youtube, Instagram, Scissors, BarChart3, Calendar } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    icon: Target,
    title: "Content Growth Strategy",
    description: "Smart planning and research to maximize your content impact and audience reach.",
    features: ["Niche & audience analysis", "Content ideas & calendars", "Trend & SEO research"],
    gradient: "from-primary to-blue-400",
  },
  {
    icon: Youtube,
    title: "YouTube Management",
    description: "End-to-end channel management to help your videos reach the right audience.",
    features: ["Video ideas, titles & descriptions", "Uploading & scheduling", "Thumbnail & SEO guidance", "Community tab support"],
    gradient: "from-red-500 to-orange-500",
  },
  {
    icon: Instagram,
    title: "Instagram Management",
    description: "Strategic content planning and execution to grow your Instagram presence.",
    features: ["Reels & post strategy", "Caption & hashtag planning", "Posting & engagement support"],
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
  },
  {
    icon: Scissors,
    title: "Editing Support",
    description: "Professional video editing to make your content stand out and perform better.",
    features: ["Reels / Shorts editing", "Basic long-video edits", "Content repurposing"],
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Calendar,
    title: "Scheduling & Optimization",
    description: "Strategic timing and optimization to ensure maximum visibility for your content.",
    features: ["Optimal posting times", "Cross-platform scheduling", "Performance optimization"],
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: BarChart3,
    title: "Analytics & Tracking",
    description: "Data-driven insights to understand what works and refine your strategy.",
    features: ["Performance reports", "Growth tracking", "Monthly reviews"],
    gradient: "from-accent to-pink-500",
  },
];

const Services = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="services">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            What We
            <span className="gradient-text"> Do</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Helping creators increase reach, engagement, and visibility through smart content planning and hands-on account management.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <AnimatedSection
              key={service.title}
              animation="fade-up"
              delay={index * 100}
            >
              <div
                className="group gradient-border p-6 rounded-xl hover:scale-[1.02] transition-all duration-300 h-full"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-7 w-7 text-foreground" />
                </div>
                
                <h3 className="font-display text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
