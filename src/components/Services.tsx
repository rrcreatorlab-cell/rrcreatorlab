import { Target, Youtube, Instagram, Scissors, BarChart3, Calendar, Sparkles, TrendingUp, LucideIcon } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useParallax } from "@/hooks/useParallax";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, LucideIcon> = {
  Target,
  Youtube,
  Instagram,
  Scissors,
  BarChart3,
  Calendar,
  Sparkles,
  TrendingUp,
};

const gradients = [
  "from-primary to-blue-400",
  "from-red-500 to-orange-500",
  "from-pink-500 via-purple-500 to-indigo-500",
  "from-green-400 to-emerald-500",
  "from-blue-500 to-cyan-400",
  "from-accent to-pink-500",
  "from-yellow-400 to-orange-500",
  "from-teal-400 to-blue-500",
  "from-violet-500 to-purple-500",
  "from-rose-400 to-red-500",
  "from-lime-400 to-green-500",
  "from-sky-400 to-indigo-500",
];

interface ServiceRow {
  id: string;
  title: string;
  description: string;
  features: string;
  icon: string;
  active: boolean;
  display_order: number;
}

const Services = () => {
  const { scrollY } = useParallax();

  const { data: services = [] } = useQuery({
    queryKey: ["services-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as ServiceRow[];
    },
  });

  return (
    <section className="relative py-24 overflow-hidden" id="services">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" style={{ transform: `translateY(${scrollY * 0.08}px)` }} />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * -0.06}px)` }} />

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
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;
            const gradient = gradients[index % gradients.length];
            const features = service.features
              .split("|")
              .map((f) => f.trim())
              .filter(Boolean);

            return (
              <AnimatedSection
                key={service.id}
                animation="fade-up"
                delay={index * 100}
              >
                <div className="group gradient-border p-6 rounded-xl hover:scale-[1.02] transition-all duration-300 h-full hover:shadow-lg hover:shadow-primary/10">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <IconComponent className="h-7 w-7 text-foreground" />
                  </div>

                  <h3 className="font-display text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 text-sm">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 group-hover:scale-150 transition-transform" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
