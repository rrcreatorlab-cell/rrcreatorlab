import { Package, Rocket, Crown } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "@/components/ui/button";

const TOPMATE = "https://topmate.io/rrcreatorlab";

const packages = [
  { title: "Starter Growth Package", price: "₹14,999", icon: Package, gradient: "from-primary to-blue-400" },
  { title: "Business Growth Package", price: "₹24,999", icon: Rocket, gradient: "from-pink-500 via-purple-500 to-indigo-500" },
  { title: "Complete Digital Growth Package", price: "₹49,999", icon: Crown, gradient: "from-yellow-400 to-orange-500", badge: "Best Value" },
];

const ComboPackages = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="combo-packages">
      <div className="container relative z-10 px-4">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Combo Packages
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Bundled <span className="gradient-text">Growth Packages</span>
          </h2>
          <p className="text-muted-foreground text-lg">All-in-one packages built to accelerate your digital growth.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((p, i) => {
            const Icon = p.icon;
            return (
              <AnimatedSection key={p.title} animation="fade-up" delay={i * 100}>
                <div className="relative h-full gradient-border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg hover:shadow-primary/10 transition-all">
                  {p.badge && (
                    <span className="absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary to-accent text-white shadow-md">
                      {p.badge}
                    </span>
                  )}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${p.gradient} mb-4`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{p.title}</h3>
                  <div className="font-display text-3xl font-bold gradient-text mb-6">{p.price}</div>
                  <Button asChild className="w-full">
                    <a href={TOPMATE} target="_blank" rel="noopener noreferrer">Get Started</a>
                  </Button>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComboPackages;