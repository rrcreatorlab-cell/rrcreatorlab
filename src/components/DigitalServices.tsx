import { Globe, Bot, BarChart3, Palette, Zap, Code2, Instagram, Youtube, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "@/components/ui/button";

const TOPMATE = "https://topmate.io/rrcreatorlab";

const services = [
  { title: "Landing Page Development", price: "Starting From ₹4,999", icon: Globe, gradient: "from-primary to-blue-400" },
  { title: "AI Voice Agents", price: "Starting From ₹7,999", icon: Bot, gradient: "from-violet-500 to-purple-500" },
  { title: "Google Ads Management", price: "Starting From ₹6,999", icon: BarChart3, gradient: "from-yellow-400 to-orange-500" },
  { title: "Branding & Logo Design", price: "Starting From ₹3,999", icon: Palette, gradient: "from-pink-500 to-rose-500" },
  { title: "Business Automation", price: "Starting From ₹9,999", icon: Zap, gradient: "from-teal-400 to-blue-500" },
  { title: "Website Development", price: "Starting From ₹9,999", icon: Code2, gradient: "from-green-400 to-emerald-500" },
  { title: "Social Media Management", price: "Starting From ₹7,999/month", icon: Instagram, gradient: "from-pink-500 via-purple-500 to-indigo-500" },
  { title: "YouTube Management", price: "Starting From ₹6,999/month", icon: Youtube, gradient: "from-red-500 to-orange-500" },
  { title: "Content Marketing", price: "Starting From ₹5,999/month", icon: Sparkles, gradient: "from-accent to-pink-500" },
];

const DigitalServices = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="digital-services">
      <div className="container relative z-10 px-4">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Digital Growth <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg">Done-For-You Solutions For Businesses</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <AnimatedSection key={s.title} animation="fade-up" delay={i * 60}>
                <div className="group h-full gradient-border rounded-xl p-6 flex flex-col hover:shadow-lg hover:shadow-primary/10 transition-all">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">{s.title}</h3>
                  <p className="gradient-text font-semibold mb-4">{s.price}</p>
                  <Button asChild variant="outline" size="sm" className="mt-auto">
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

export default DigitalServices;