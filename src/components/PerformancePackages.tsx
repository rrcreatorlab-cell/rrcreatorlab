import { Rocket, Building2, TrendingUp, MapPin, Check } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "@/components/ui/button";

const TOPMATE = "https://topmate.io/rrcreatorlab";

const packages = [
  {
    title: "The Solopreneur Starter",
    icon: Rocket,
    gradient: "from-primary to-blue-400",
    idealFor: "Testing a new product, hobby brands, side hustles.",
    fee: "₹10,000 – ₹15,000 / mo",
    adSpend: "₹15,000 – ₹20,000 / mo",
    features: [
      "Platforms: Meta only (Instagram + Facebook)",
      "3–4 basic static image creatives",
      "WhatsApp chat ads only",
      "Monthly WhatsApp text summary",
      "Basic ad copy (AI-assisted)",
      "GST: 0% (unregistered freelancer)",
    ],
  },
  {
    title: "The Micro-Agency Base",
    icon: Building2,
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
    idealFor: "Established shops, new D2C brands, clothing/food.",
    fee: "₹18,000 – ₹25,000 / mo",
    adSpend: "₹25,000 – ₹40,000 / mo",
    features: [
      "Platforms: Meta + basic Google Ads",
      "6–8 images + 2 reels/videos",
      "Website traffic / lead forms",
      "Bi-weekly PDF report",
      "Custom headlines & hooks",
      "18% GST extra (registered agency)",
    ],
  },
  {
    title: "The Growth Hybrid",
    icon: TrendingUp,
    gradient: "from-yellow-400 to-orange-500",
    idealFor: "E-commerce or B2B needing aggressive sales / leads.",
    fee: "₹15,000 + Performance Bonus",
    adSpend: "₹35,000 – ₹60,000 / mo",
    features: [
      "Platforms: Meta + Google + Retargeting",
      "Unlimited iterative creative testing",
      "Conversion sales / pixel tracking",
      "Weekly live dashboard review",
      "A/B testing multiple angles",
      "18% GST extra (registered agency)",
    ],
    badge: "Performance Bonus",
  },
  {
    title: "The Local High-Intent",
    icon: MapPin,
    gradient: "from-teal-400 to-blue-500",
    idealFor: "Local services — clinics, gyms, salons, tutors.",
    fee: "₹20,000 – ₹28,000 / mo",
    adSpend: "₹20,000 – ₹35,000 / mo",
    features: [
      "Platforms: Google Maps + Meta Ads",
      "4 static images + 1 location video",
      "Inbound phone calls & Maps clicks",
      "Bi-weekly call review",
      "Hyper-local localized copy",
      "18% GST extra (boutique agency)",
    ],
  },
];

const PerformancePackages = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="performance-packages">
      <div className="container relative z-10 px-4">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Performance Packaging
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Performance Marketing <span className="gradient-text">Packages</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Built for Indian micro-businesses — from solo founders to local high-intent brands.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((p, i) => {
            const Icon = p.icon;
            return (
              <AnimatedSection key={p.title} animation="fade-up" delay={i * 80}>
                <div className="relative h-full gradient-border rounded-xl p-6 flex flex-col hover:shadow-lg hover:shadow-primary/10 transition-all">
                  {p.badge && (
                    <span className="absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary to-accent text-white shadow-md">
                      {p.badge}
                    </span>
                  )}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{p.idealFor}</p>

                  <div className="mb-4 space-y-1">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">Monthly Fee</div>
                    <div className="font-display text-xl font-bold gradient-text">{p.fee}</div>
                    <div className="text-xs text-muted-foreground pt-1">Recommended ad spend: <span className="text-foreground font-medium">{p.adSpend}</span></div>
                  </div>

                  <ul className="space-y-2 mb-6 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild size="sm" className="mt-auto w-full">
                    <a href={TOPMATE} target="_blank" rel="noopener noreferrer">Get Started</a>
                  </Button>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="mt-16 max-w-4xl mx-auto">
          <div className="gradient-border rounded-xl p-6 md:p-8">
            <h3 className="font-display text-2xl font-bold mb-4">Core Differences Explained</h3>
            <div className="space-y-4 text-sm md:text-base text-muted-foreground">
              <p>
                <span className="text-foreground font-semibold">Setup Objective:</span> Package 1 relies entirely on sending traffic to WhatsApp Business because micro-brands usually don't have good websites. Package 3 requires a fully integrated Meta Pixel or Google Tag Manager to track actual website purchases.
              </p>
              <p>
                <span className="text-foreground font-semibold">Bonus Structure (Package 3):</span> The bonus is typically capped. For example, you pay ₹15,000 flat, plus ₹50 per verified lead or 2%–3% of tracked web revenue — alignment that ensures the marketer keeps optimizing daily.
              </p>
              <p>
                <span className="text-foreground font-semibold">Creative Output:</span> In Package 1, you must provide your own raw photos/videos. In Packages 2 and 4, the agency takes your raw footage and professionally edits it with trending audio, transitions, and text overlays.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PerformancePackages;