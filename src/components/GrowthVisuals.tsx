import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import growthViewsImage from "@/assets/growth-views.jpg";
import creatorGrowthImage from "@/assets/creator-growth-phases.webp";

// ============= EDITABLE CARD CONFIG =============
// Update stats and card content here
const GROWTH_CARDS_CONFIG = [
  {
    id: "views-growth",
    image: growthViewsImage,
    imageAlt: "Secret websites to grow faster - Views growth from 100 to 200.8k",
    title: "Explosive View Growth",
    description: "Learn the secrets to skyrocket your views from 100 to 200k+",
    stats: [
      { value: "200K+", label: "Views Growth", color: "primary" },
      { value: "10x", label: "Engagement", color: "accent" },
      { value: "30 Days", label: "Avg. Results", color: "primary" },
      { value: "500%", label: "ROI Increase", color: "accent" },
    ],
  },
  {
    id: "creator-growth",
    image: creatorGrowthImage,
    imageAlt: "YouTube Creator Growth Phases - Launch, Revenue, Audience, Brand",
    title: "Complete Growth Roadmap",
    description: "From channel launch to building your brand & monetizing your audience",
    stats: [
      { value: "4 Phases", label: "Growth Journey", color: "primary" },
      { value: "$50K+", label: "Revenue Potential", color: "accent" },
      { value: "100K", label: "Subscriber Goal", color: "primary" },
      { value: "Brand", label: "Final Phase", color: "accent" },
    ],
  },
];
// ================================================

const DELAY_CLASSES = ["delay-75", "delay-100", "delay-150", "delay-200"];

const GrowthVisuals = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Unlock Your Channel's Potential
          </span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {GROWTH_CARDS_CONFIG.map((card) => (
            <div
              key={card.id}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

              {/* Stats Overlay */}
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 p-6">
                  {card.stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ${DELAY_CLASSES[index]}`}
                    >
                      <p className={`text-3xl md:text-4xl font-bold ${stat.color === "primary" ? "text-primary" : "text-accent"}`}>
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-xl font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm">{card.description}</p>
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

export default GrowthVisuals;
