import { Users, Lightbulb, GraduationCap, Briefcase } from "lucide-react";

const audiences = [
  {
    icon: Users,
    title: "New & Growing Creators",
    description: "Just starting out or looking to take your channel to the next level with professional guidance.",
  },
  {
    icon: GraduationCap,
    title: "Students & Influencers",
    description: "Building your personal brand while focusing on your studies or other pursuits.",
  },
  {
    icon: Lightbulb,
    title: "Personal Brands",
    description: "Entrepreneurs and thought leaders looking to establish authority in their niche.",
  },
  {
    icon: Briefcase,
    title: "Small Businesses",
    description: "Local businesses and startups wanting to leverage social media for growth.",
  },
];

const WhoWeWorkWith = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="clients">
      <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
            Our Clients
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Who We
            <span className="gradient-text"> Work With</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We partner with creators and brands at every stage of their journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {audiences.map((audience, index) => (
            <div
              key={audience.title}
              className="glass-card rounded-xl p-6 text-center hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent mx-auto mb-4">
                <audience.icon className="h-7 w-7 text-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{audience.title}</h3>
              <p className="text-muted-foreground text-sm">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
