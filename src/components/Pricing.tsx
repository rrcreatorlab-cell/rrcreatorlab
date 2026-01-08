import { Check, Star, Sparkles, Scissors, Video, Crown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const monthlyPlans = [
    {
      name: "Starter Creator Plan",
      price: "₹2,000 – ₹8,000",
      period: "/ month",
      description: "Best for new & small creators",
      features: [
        "Content strategy & ideas",
        "8–10 reels/shorts editing",
        "1–2 long videos",
        "Uploading & scheduling",
        "Caption + hashtag support",
        "Basic YouTube/Instagram optimization",
        "Weekly update",
      ],
      popular: false,
      icon: Sparkles,
      detailedDescription: "Perfect for creators just starting their journey. We help you build a strong foundation with consistent content and basic optimization to grow your audience organically.",
      idealFor: ["New YouTubers & Instagram creators", "Those with less than 10K followers", "Creators exploring content creation"],
      deliverables: ["8-10 professionally edited reels/shorts", "1-2 polished long-form videos", "Weekly strategy calls", "Content calendar planning"],
    },
    {
      name: "Growth Plan",
      price: "₹8,000 – ₹20,000",
      period: "/ month",
      description: "Full content growth strategy",
      features: [
        "Full content growth strategy",
        "12–20 reels/shorts editing",
        "2–4 long videos",
        "YouTube or Instagram management",
        "Titles, descriptions & hashtags",
        "Uploading & scheduling",
        "Engagement support (likes/comments strategy)",
        "Monthly performance report",
      ],
      popular: true,
      icon: Star,
      detailedDescription: "Our most popular plan for creators ready to scale. We handle everything from content strategy to execution, helping you grow faster with data-driven decisions.",
      idealFor: ["Creators with 10K-100K followers", "Those looking to monetize their content", "Serious creators wanting faster growth"],
      deliverables: ["12-20 reels/shorts with trending formats", "2-4 high-quality long videos", "Complete platform management", "Monthly analytics report with actionable insights"],
    },
    {
      name: "Premium Management Plan",
      price: "₹25,000 – ₹50,000",
      period: "/ month",
      description: "For serious creators & brands",
      features: [
        "End-to-end account management",
        "20–25 shorts/reels + 4–5 long videos",
        "YouTube + Instagram handled fully",
        "Content planning + execution",
        "Advanced growth strategy",
        "Comment moderation (basic)",
        "Community building support",
        "Detailed monthly analytics & roadmap",
      ],
      popular: false,
      icon: Crown,
      detailedDescription: "The ultimate creator package. We become your dedicated content team, handling everything so you can focus on creating. Perfect for creators who want hands-off growth.",
      idealFor: ["Full-time creators & influencers", "Brands building their presence", "Creators with 100K+ followers"],
      deliverables: ["20-25 viral-optimized shorts/reels", "4-5 premium long-form videos", "Dual platform management (YT + IG)", "Community management & engagement", "Quarterly strategy roadmap"],
    },
  ];

  const yearlyPlans = [
    {
      name: "Starter – Yearly",
      price: "₹20,000 – ₹80,000",
      period: "/ year",
      description: "Best for new & small creators",
      features: [
        "8–10 shorts/reels per month",
        "1–2 long-form videos per month",
        "Strategy, uploads & optimization",
        "Monthly progress review",
      ],
      popular: false,
      icon: Sparkles,
      detailedDescription: "Lock in a full year of growth support at a discounted rate. Perfect for creators committed to long-term success with consistent content creation.",
      idealFor: ["New YouTubers & Instagram creators", "Those with less than 10K followers", "Creators exploring content creation"],
      deliverables: ["96-120 reels/shorts per year", "12-24 long-form videos per year", "Monthly strategy reviews", "Priority support"],
    },
    {
      name: "Growth – Yearly",
      price: "₹80,000 – ₹2,00,000",
      period: "/ year",
      description: "Full content growth strategy",
      features: [
        "12–20 shorts/reels per month",
        "2–4 long-form videos per month",
        "Full YouTube + Instagram management",
        "Monthly analytics & engagement strategy",
      ],
      popular: true,
      icon: Star,
      detailedDescription: "Save up to 17% with our yearly growth commitment. Get consistent, high-quality content management with predictable costs and guaranteed growth.",
      idealFor: ["Creators with 10K-100K followers", "Those looking to monetize their content", "Serious creators wanting faster growth"],
      deliverables: ["144-240 reels/shorts per year", "24-48 long-form videos per year", "12 monthly analytics reports", "Quarterly strategy planning sessions"],
    },
    {
      name: "Premium – Yearly",
      price: "₹2,50,000 – ₹5,00,000",
      period: "/ year",
      description: "For serious creators & brands",
      features: [
        "20–25 shorts/reels per month",
        "4–5 long-form videos per month",
        "Complete account handling",
        "Likes & comment moderation",
        "Community growth",
        "Detailed monthly + yearly roadmap",
      ],
      popular: false,
      icon: Crown,
      detailedDescription: "The ultimate yearly partnership for serious creators. Includes all premium benefits with dedicated account management and priority service.",
      idealFor: ["Full-time creators & influencers", "Brands building their presence", "Creators with 100K+ followers"],
      deliverables: ["240-300 shorts/reels per year", "48-60 premium long-form videos", "Dedicated account manager", "Quarterly in-depth strategy sessions", "Annual content audit & roadmap"],
    },
  ];

  const plans = isYearly ? yearlyPlans : monthlyPlans;

  const editingPackages = [
    {
      name: "Shorts/Reels Editing",
      price: "₹300 – ₹500",
      unit: "per reel",
      note: "Bulk pricing available",
      detailedDescription: "Professional editing for your short-form content with trending effects, transitions, and audio sync.",
      includes: ["Trendy transitions & effects", "Audio sync & beat matching", "Color grading", "Caption/subtitle addition", "2-3 revisions included"],
      turnaround: "24-48 hours per reel",
    },
    {
      name: "Long Video Editing (Basic)",
      price: "₹1,000 – ₹3,000",
      unit: "per video",
      note: "Depending on length & complexity",
      detailedDescription: "Complete editing for YouTube videos including cuts, transitions, graphics, and optimization.",
      includes: ["Professional cuts & pacing", "Background music & SFX", "Basic motion graphics", "Color correction", "Thumbnail suggestion"],
      turnaround: "3-5 business days",
    },
    {
      name: "Channel Audit & Strategy",
      price: "₹999",
      unit: "one-time",
      note: "Complete channel analysis & growth roadmap",
      detailedDescription: "In-depth analysis of your channel with actionable recommendations to accelerate growth.",
      includes: ["Complete channel review", "Competitor analysis", "Content gap identification", "SEO recommendations", "90-day growth roadmap"],
      turnaround: "5-7 business days",
    },
    {
      name: "Thumbnails / Creatives",
      price: "₹299",
      unit: "each",
      note: "Eye-catching designs that drive clicks",
      detailedDescription: "Click-worthy thumbnails designed to boost your CTR and stand out in search results.",
      includes: ["Custom design", "A/B test variations", "Text overlay optimization", "Brand consistency", "2 revisions included"],
      turnaround: "24 hours",
    },
    {
      name: "YT Complete Teaching",
      price: "₹2,999",
      unit: "one-time",
      note: "Webinar + One-to-one sessions",
      detailedDescription: "Learn everything about YouTube growth from scratch with personalized guidance and live sessions.",
      includes: ["2-hour comprehensive webinar", "1-on-1 strategy call (30 mins)", "Channel setup guidance", "Content planning framework", "Lifetime access to recordings"],
      turnaround: "Sessions scheduled within 7 days",
    },
    {
      name: "Toolkit",
      price: "₹4,999",
      unit: "per year",
      note: "Templates, systems, and creator resources bundle",
      detailedDescription: "Everything you need to run your creator business efficiently with proven templates and systems.",
      includes: ["Content calendar templates", "Script writing frameworks", "Thumbnail templates (Canva/PS)", "Analytics tracking sheets", "Email & collab templates", "Regular updates included"],
      turnaround: "Instant access upon purchase",
    },
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Service Packages
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Choose Your{" "}
            <span className="gradient-text">Growth Plan</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Flexible packages designed for creators at every stage of their journey
          </p>
          
          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium transition-all duration-300 ${!isYearly ? "text-primary scale-105" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 overflow-hidden hover:shadow-lg ${
                isYearly ? "bg-primary shadow-primary/30" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ease-out ${
                  isYearly ? "translate-x-7 scale-110" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-medium transition-all duration-300 ${isYearly ? "text-primary scale-105" : "text-muted-foreground"}`}>
              Yearly
            </span>
            <span 
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium transition-all duration-500 ${
                isYearly ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-4 scale-90 pointer-events-none"
              }`}
            >
              <span className="animate-pulse">Save up to 17%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={`${isYearly ? 'yearly' : 'monthly'}-${index}`}
              className={`relative rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in ${
                plan.popular
                  ? "bg-gradient-to-b from-primary/20 to-primary/5 border-2 border-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                  : "glass-card border border-border/50 hover:border-primary/30 hover:shadow-lg"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium animate-pulse">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <plan.icon className={`w-10 h-10 mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-12 ${plan.popular ? "text-primary" : "text-accent"}`} />
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => {
                  const isVideoFeature = feature.toLowerCase().includes('video') || feature.toLowerCase().includes('reel') || feature.toLowerCase().includes('short');
                  return (
                    <li 
                      key={featureIndex} 
                      className="flex items-start gap-3 animate-fade-in"
                      style={{ animationDelay: `${(index * 100) + (featureIndex * 50)}ms` }}
                    >
                      {isVideoFeature ? (
                        <Video className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-transform duration-300 hover:scale-125 ${plan.popular ? "text-primary" : "text-accent"}`} />
                      ) : (
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-transform duration-300 hover:scale-125 ${plan.popular ? "text-primary" : "text-accent"}`} />
                      )}
                      <span className={`text-sm transition-colors duration-300 ${isVideoFeature ? "text-foreground font-medium" : "text-muted-foreground"}`}>{feature}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="space-y-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-muted-foreground hover:text-primary transition-all duration-300"
                  onClick={() => setSelectedPlan(index)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full transition-all duration-300 hover:scale-105 hover:shadow-md"
                  asChild
                >
                  <Link to="/lets-connect">Get Started</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Plan Details Dialog */}
        <Dialog open={selectedPlan !== null} onOpenChange={() => setSelectedPlan(null)}>
          <DialogContent className="max-w-lg">
            {selectedPlan !== null && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {(() => {
                      const PlanIcon = plans[selectedPlan].icon;
                      return <PlanIcon className="w-8 h-8 text-primary" />;
                    })()}
                    <DialogTitle className="text-2xl">{plans[selectedPlan].name}</DialogTitle>
                  </div>
                  <DialogDescription className="text-base">
                    {plans[selectedPlan].detailedDescription}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 mt-4">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">
                      {plans[selectedPlan].price}
                      <span className="text-lg text-muted-foreground font-normal">{plans[selectedPlan].period}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Ideal For:</h4>
                    <ul className="space-y-2">
                      {plans[selectedPlan].idealFor.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">What You Get:</h4>
                    <ul className="space-y-2">
                      {plans[selectedPlan].deliverables.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <Star className="w-4 h-4 text-accent flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full" asChild>
                    <Link to="/lets-connect">Get Started with {plans[selectedPlan].name}</Link>
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Additional Packages */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <Scissors className="w-4 h-4" />
              Additional Packages
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editingPackages.map((pkg, index) => (
              <div
                key={index}
                className="glass-card rounded-xl p-6 border border-border/50 hover:border-accent/50 transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-lg animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedPackage(index)}
              >
                <h4 className="text-lg font-bold mb-2">{pkg.name}</h4>
                <div className="mb-2">
                  <span className="text-2xl font-bold text-accent">{pkg.price}</span>
                  <span className="text-muted-foreground text-sm ml-2">{pkg.unit}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{pkg.note}</p>
                <Button variant="ghost" size="sm" className="w-full text-accent hover:text-accent/80">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            ))}
          </div>

          {/* Package Details Dialog */}
          <Dialog open={selectedPackage !== null} onOpenChange={() => setSelectedPackage(null)}>
            <DialogContent className="max-w-lg">
              {selectedPackage !== null && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{editingPackages[selectedPackage].name}</DialogTitle>
                    <DialogDescription className="text-base">
                      {editingPackages[selectedPackage].detailedDescription}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 mt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-accent">{editingPackages[selectedPackage].price}</span>
                      <span className="text-muted-foreground">{editingPackages[selectedPackage].unit}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">What's Included:</h4>
                      <ul className="space-y-2">
                        {editingPackages[selectedPackage].includes.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-muted-foreground">
                            <Check className="w-4 h-4 text-accent flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10">
                      <span className="text-sm font-medium text-accent">Turnaround:</span>
                      <span className="text-sm text-muted-foreground">{editingPackages[selectedPackage].turnaround}</span>
                    </div>
                    
                    <Button className="w-full" asChild>
                      <Link to="/lets-connect">Get {editingPackages[selectedPackage].name}</Link>
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
