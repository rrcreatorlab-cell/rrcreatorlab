import { Youtube, Instagram, Users, TrendingUp, Shield, Clock } from "lucide-react";

const services = [
  {
    icon: Youtube,
    title: "YouTube Growth",
    description: "Subscribers, views, and watch time that actually stick. Boost your channel with organic-looking growth.",
    features: ["Real subscribers", "High retention views", "Custom targeting"],
    gradient: "from-red-500 to-orange-500",
  },
  {
    icon: Instagram,
    title: "Instagram Growth",
    description: "Followers, likes, and engagement that make your profile stand out in any niche.",
    features: ["Targeted followers", "Reel views & likes", "Story engagement"],
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Turn passive followers into an engaged community that interacts with every post.",
    features: ["Comment management", "DM automation", "Engagement pods"],
    gradient: "from-primary to-blue-400",
  },
  {
    icon: TrendingUp,
    title: "Analytics & Strategy",
    description: "Data-driven insights to optimize your content and maximize your reach potential.",
    features: ["Growth tracking", "Content analysis", "Competitor insights"],
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Account Safety",
    description: "We prioritize your account security with gradual, natural-looking growth patterns.",
    features: ["Safe delivery", "Drip-feed option", "24/7 monitoring"],
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "See results within hours, not weeks. Quick turnaround without compromising quality.",
    features: ["Instant start", "Express options", "Guaranteed delivery"],
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="gradient-text"> Dominate</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive growth solutions for YouTube and Instagram creators at every level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group gradient-border p-6 rounded-xl hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
