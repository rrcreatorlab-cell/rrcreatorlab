import { Check, Star, Sparkles, Scissors, Video, Crown, Eye, LayoutGrid, Table, X, Globe, Bot, Zap, Youtube, BookOpen, Package, Play, BarChart3, LucideIcon } from "lucide-react";
import levelUpVideo from "@/assets/level-up-creators.mp4";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParallax } from "@/hooks/useParallax";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  star: Star,
  crown: Crown,
  globe: Globe,
  bot: Bot,
  package: Package,
  bar_chart: BarChart3,
  zap: Zap,
};

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Fetch pricing plans from database
  const { data: dbPricingPlans = [] } = useQuery({
    queryKey: ["pricing_plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pricing_plans")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  // Fetch one-time services from database
  const { data: dbOneTimeServices = [] } = useQuery({
    queryKey: ["one_time_services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("one_time_services")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  // Transform database plans into display format
  const monthlyDbPlans = dbPricingPlans.filter(p => p.duration === 'Monthly');
  const yearlyDbPlans = dbPricingPlans.filter(p => p.duration === 'Yearly');

  const formatPrice = (min: number, max: number) => {
    if (min >= 100000) {
      return `₹${(min / 100000).toFixed(0)},00,000 – ₹${(max / 100000).toFixed(0)},00,000`;
    }
    return `₹${min.toLocaleString('en-IN')} – ₹${max.toLocaleString('en-IN')}`;
  };

  const getIconForPlan = (index: number): LucideIcon => {
    const icons = [Sparkles, Star, Crown];
    return icons[index] || Sparkles;
  };

  const parseFeatures = (features: string | null): string[] => {
    if (!features) return [];
    // Support both pipe-separated and newline-separated features
    return features.split(/[|\n]/).map(f => f.trim()).filter(f => f.length > 0);
  };

  const transformPlans = (plans: typeof dbPricingPlans, isYearlyPlan: boolean) => {
    return plans.map((plan, index) => {
      const featuresList = parseFeatures(plan.features);
      return {
        name: plan.name,
        price: formatPrice(plan.price_min, plan.price_max),
        period: isYearlyPlan ? "/ year" : "/ month",
        description: featuresList[0] || "Growth plan",
        features: featuresList,
        popular: plan.popular,
        icon: getIconForPlan(index),
        detailedDescription: `Complete ${plan.name} package for creators.`,
        idealFor: ["Growing creators", "Content enthusiasts", "Brand builders"],
        deliverables: featuresList.slice(0, 4),
      };
    });
  };

  const monthlyPlans = monthlyDbPlans.length > 0 
    ? transformPlans(monthlyDbPlans, false)
    : [
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
          detailedDescription: "Perfect for creators just starting their journey.",
          idealFor: ["New YouTubers & Instagram creators", "Those with less than 10K followers"],
          deliverables: ["8-10 professionally edited reels/shorts", "1-2 polished long-form videos"],
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
            "Monthly performance report",
          ],
          popular: true,
          icon: Star,
          detailedDescription: "Our most popular plan for creators ready to scale.",
          idealFor: ["Creators with 10K-100K followers"],
          deliverables: ["12-20 reels/shorts", "2-4 long videos"],
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
            "Community building support",
          ],
          popular: false,
          icon: Crown,
          detailedDescription: "The ultimate creator package.",
          idealFor: ["Full-time creators & influencers"],
          deliverables: ["20-25 shorts/reels", "4-5 premium long-form videos"],
        },
      ];

  const yearlyPlans = yearlyDbPlans.length > 0
    ? transformPlans(yearlyDbPlans, true)
    : [
        {
          name: "Starter – Yearly",
          price: "₹20,000 – ₹80,000",
          period: "/ year",
          description: "Best for new & small creators",
          features: ["8–10 shorts/reels per month", "1–2 long-form videos per month"],
          popular: false,
          icon: Sparkles,
          detailedDescription: "Lock in a full year of growth support.",
          idealFor: ["New YouTubers & Instagram creators"],
          deliverables: ["96-120 reels/shorts per year"],
        },
        {
          name: "Growth – Yearly",
          price: "₹80,000 – ₹2,00,000",
          period: "/ year",
          description: "Full content growth strategy",
          features: ["12–20 shorts/reels per month", "2–4 long-form videos per month"],
          popular: true,
          icon: Star,
          detailedDescription: "Save up to 17% with yearly commitment.",
          idealFor: ["Creators with 10K-100K followers"],
          deliverables: ["144-240 reels/shorts per year"],
        },
        {
          name: "Premium – Yearly",
          price: "₹2,50,000 – ₹5,00,000",
          period: "/ year",
          description: "For serious creators & brands",
          features: ["20–25 shorts/reels per month", "4–5 long-form videos per month"],
          popular: false,
          icon: Crown,
          detailedDescription: "The ultimate yearly partnership.",
          idealFor: ["Full-time creators & influencers"],
          deliverables: ["240-300 shorts/reels per year"],
        },
      ];

  const plans = isYearly ? yearlyPlans : monthlyPlans;

  // Transform one-time services from database
  const oneTimeServices = dbOneTimeServices.length > 0
    ? dbOneTimeServices.map((service, index) => {
        const iconOptions: LucideIcon[] = [Globe, Bot, Zap, Package, BarChart3];
        const colorOptions = ["primary", "accent", "primary", "emerald-400", "cyan-400"];
        return {
          name: service.name,
          price: formatPrice(service.price_min, service.price_max),
          description: service.description || "",
          highlight: service.highlight,
          icon: iconOptions[index % iconOptions.length],
          color: colorOptions[index % colorOptions.length],
        };
      })
    : [];

  const editingPackages = [
    {
      name: "Shorts/Reels Editing",
      price: "₹300 – ₹500",
      unit: "per reel",
      note: "Bulk pricing available",
      detailedDescription: "Professional editing for your short-form content.",
      includes: ["Trendy transitions & effects", "Audio sync & beat matching", "Color grading"],
      turnaround: "24-48 hours per reel",
    },
    {
      name: "Long Video Editing (Basic)",
      price: "₹1,000 – ₹3,000",
      unit: "per video",
      note: "Depending on length & complexity",
      detailedDescription: "Complete editing for YouTube videos.",
      includes: ["Professional cuts & pacing", "Background music & SFX", "Basic motion graphics"],
      turnaround: "3-5 business days",
    },
    {
      name: "Channel Audit & Strategy",
      price: "₹999",
      unit: "one-time",
      note: "Complete channel analysis & growth roadmap",
      detailedDescription: "In-depth analysis of your channel.",
      includes: ["Complete channel review", "Competitor analysis", "90-day growth roadmap"],
      turnaround: "5-7 business days",
    },
    {
      name: "Thumbnails / Creatives",
      price: "₹299",
      unit: "each",
      note: "Eye-catching designs that drive clicks",
      detailedDescription: "Click-worthy thumbnails.",
      includes: ["Custom design", "A/B test variations", "2 revisions included"],
      turnaround: "24 hours",
    },
  ];

  const { scrollY } = useParallax();

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * 0.07}px)` }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * -0.05}px)` }} />

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
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
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
            
            {/* View Toggle */}
            <div className="flex items-center gap-2 p-1 rounded-lg bg-muted/50 border border-border/50">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  viewMode === 'cards' 
                    ? 'bg-background text-primary shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  viewMode === 'table' 
                    ? 'bg-background text-primary shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Table className="w-4 h-4" />
                Compare
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards View */}
        {viewMode === 'cards' && (
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
        )}

        {/* Comparison Table View */}
        {viewMode === 'table' && (
          <div className="mb-20 overflow-x-auto animate-fade-in">
            <div className="glass-card rounded-2xl border border-border/50 min-w-[800px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-6 font-semibold text-foreground w-1/4">Features</th>
                    {plans.map((plan, index) => (
                      <th 
                        key={index} 
                        className={`text-center p-6 ${plan.popular ? 'bg-primary/10' : ''}`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-primary' : 'text-accent'}`} />
                          <span className="font-bold text-lg">{plan.name.replace(' – Yearly', '').replace(' Creator Plan', '').replace(' Plan', '').replace(' Management', '')}</span>
                          {plan.popular && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                              <Star className="w-3 h-3 fill-current" />
                              Popular
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50 bg-muted/30">
                    <td className="p-4 font-medium text-muted-foreground">Price</td>
                    {plans.map((plan, index) => (
                      <td key={index} className={`text-center p-4 ${plan.popular ? 'bg-primary/5' : ''}`}>
                        <div className="font-bold text-xl text-foreground">{plan.price}</div>
                        <div className="text-sm text-muted-foreground">{plan.period}</div>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Shorts/Reels */}
                  <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-accent" />
                        Shorts/Reels per month
                      </div>
                    </td>
                    <td className={`text-center p-4 font-medium ${plans[0].popular ? 'bg-primary/5' : ''}`}>8–10</td>
                    <td className={`text-center p-4 font-medium ${plans[1].popular ? 'bg-primary/5' : ''}`}>12–20</td>
                    <td className={`text-center p-4 font-medium ${plans[2].popular ? 'bg-primary/5' : ''}`}>20–25</td>
                  </tr>
                  {/* Long Videos */}
                  <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-accent" />
                        Long-form videos per month
                      </div>
                    </td>
                    <td className={`text-center p-4 font-medium ${plans[0].popular ? 'bg-primary/5' : ''}`}>1–2</td>
                    <td className={`text-center p-4 font-medium ${plans[1].popular ? 'bg-primary/5' : ''}`}>2–4</td>
                    <td className={`text-center p-4 font-medium ${plans[2].popular ? 'bg-primary/5' : ''}`}>4–5</td>
                  </tr>
                  {/* Platform Management */}
                  <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-4 text-muted-foreground">Platform management</td>
                    <td className={`text-center p-4 ${plans[0].popular ? 'bg-primary/5' : ''}`}>
                      <span className="text-muted-foreground text-sm">Basic optimization</span>
                    </td>
                    <td className={`text-center p-4 ${plans[1].popular ? 'bg-primary/5' : ''}`}>
                      <span className="text-foreground font-medium">YouTube or Instagram</span>
                    </td>
                    <td className={`text-center p-4 ${plans[2].popular ? 'bg-primary/5' : ''}`}>
                      <span className="text-foreground font-medium">YouTube + Instagram</span>
                    </td>
                  </tr>
                  {/* Content Strategy */}
                  <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-4 text-muted-foreground">Content strategy</td>
                    <td className={`text-center p-4 ${plans[0].popular ? 'bg-primary/5' : ''}`}>
                      <Check className="w-5 h-5 text-accent mx-auto" />
                    </td>
                    <td className={`text-center p-4 ${plans[1].popular ? 'bg-primary/5' : ''}`}>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td className={`text-center p-4 ${plans[2].popular ? 'bg-primary/5' : ''}`}>
                      <Check className="w-5 h-5 text-accent mx-auto" />
                    </td>
                  </tr>
                  {/* Uploading & Scheduling */}
                  <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-4 text-muted-foreground">Uploading & scheduling</td>
                    <td className={`text-center p-4 ${plans[0].popular ? 'bg-primary/5' : ''}`}>
                      <Check className="w-5 h-5 text-accent mx-auto" />
                    </td>
                    <td className={`text-center p-4 ${plans[1].popular ? 'bg-primary/5' : ''}`}>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td className={`text-center p-4 ${plans[2].popular ? 'bg-primary/5' : ''}`}>
                      <Check className="w-5 h-5 text-accent mx-auto" />
                    </td>
                  </tr>
                  {/* Engagement Support */}
                  <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-4 text-muted-foreground">Engagement support</td>
                    <td className={`text-center p-4 ${plans[0].popular ? 'bg-primary/5' : ''}`}>
                      <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className={`text-center p-4 ${plans[1].popular ? 'bg-primary/5' : ''}`}>
                      <Check className="w-5 h-5 text-primary mx-auto" />
                    </td>
                    <td className={`text-center p-4 ${plans[2].popular ? 'bg-primary/5' : ''}`}>
                      <Check className="w-5 h-5 text-accent mx-auto" />
                    </td>
                  </tr>
                  {/* Comment Moderation */}
                  <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-4 text-muted-foreground">Comment moderation</td>
                    <td className={`text-center p-4 ${plans[0].popular ? 'bg-primary/5' : ''}`}>
                      <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className={`text-center p-4 ${plans[1].popular ? 'bg-primary/5' : ''}`}>
                      <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className={`text-center p-4 ${plans[2].popular ? 'bg-primary/5' : ''}`}>
                      <Check className="w-5 h-5 text-accent mx-auto" />
                    </td>
                  </tr>
                  {/* Community Building */}
                  <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-4 text-muted-foreground">Community building</td>
                    <td className={`text-center p-4 ${plans[0].popular ? 'bg-primary/5' : ''}`}>
                      <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className={`text-center p-4 ${plans[1].popular ? 'bg-primary/5' : ''}`}>
                      <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className={`text-center p-4 ${plans[2].popular ? 'bg-primary/5' : ''}`}>
                      <Check className="w-5 h-5 text-accent mx-auto" />
                    </td>
                  </tr>
                  {/* Reports */}
                  <tr className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="p-4 text-muted-foreground">Performance reports</td>
                    <td className={`text-center p-4 ${plans[0].popular ? 'bg-primary/5' : ''}`}>
                      <span className="text-muted-foreground text-sm">Weekly updates</span>
                    </td>
                    <td className={`text-center p-4 ${plans[1].popular ? 'bg-primary/5' : ''}`}>
                      <span className="text-foreground font-medium">Monthly reports</span>
                    </td>
                    <td className={`text-center p-4 ${plans[2].popular ? 'bg-primary/5' : ''}`}>
                      <span className="text-foreground font-medium">Detailed monthly + roadmap</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-muted/20">
                    <td className="p-6"></td>
                    {plans.map((plan, index) => (
                      <td key={index} className={`text-center p-6 ${plan.popular ? 'bg-primary/10' : ''}`}>
                        <Button
                          variant={plan.popular ? "default" : "outline"}
                          className="transition-all duration-300 hover:scale-105"
                          asChild
                        >
                          <Link to="/lets-connect">Get Started</Link>
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

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

        {/* YT Management Section */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">
              <Youtube className="w-4 h-4" />
              YT Management
            </span>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
              YouTube <span className="text-red-400">Growth Services</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Learn, manage, and scale your YouTube channel with our specialized services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* YT Complete Teaching */}
            <div className="glass-card rounded-2xl p-8 border border-border/50 hover:border-red-400/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl animate-fade-in">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-red-400" />
              </div>
              <h4 className="text-xl font-bold mb-2">YT Complete Teaching</h4>
              <div className="mb-4">
                <span className="text-2xl font-bold text-red-400">₹2,999</span>
                <span className="text-muted-foreground text-sm ml-2">one-time</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Webinar + One-to-one sessions for complete YouTube mastery
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>2-hour comprehensive webinar</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>1-on-1 strategy call (30 mins)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>Lifetime access to recordings</span>
                </div>
              </div>
              <Button variant="outline" className="w-full border-red-400/50 text-red-400 hover:bg-red-400 hover:text-white transition-all duration-300" asChild>
                <Link to="/lets-connect">Get Started</Link>
              </Button>
            </div>

            {/* Toolkit 6 Months */}
            <div className="glass-card rounded-2xl p-8 border border-border/50 hover:border-orange-400/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6">
                <Package className="w-7 h-7 text-orange-400" />
              </div>
              <h4 className="text-xl font-bold mb-2">Toolkit (6 Months)</h4>
              <div className="mb-4">
                <span className="text-2xl font-bold text-orange-400">₹2,499</span>
                <span className="text-muted-foreground text-sm ml-2">for 6 months</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Templates, systems, and creator resources bundle
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Content calendar templates</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Script writing frameworks</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>6 months of updates</span>
                </div>
              </div>
              <Button variant="outline" className="w-full border-orange-400/50 text-orange-400 hover:bg-orange-400 hover:text-white transition-all duration-300" asChild>
                <Link to="/lets-connect">Get Started</Link>
              </Button>
            </div>

            {/* Toolkit Yearly - Best Value */}
            <div className="relative glass-card rounded-2xl p-8 border-2 border-orange-400 bg-gradient-to-b from-orange-500/10 to-orange-500/5 shadow-lg shadow-orange-400/20 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-400/30 transition-all duration-500 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-orange-400 text-white text-sm font-medium">
                  <Star className="w-4 h-4 fill-current" />
                  Best Value
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6">
                <Package className="w-7 h-7 text-orange-400" />
              </div>
              <h4 className="text-xl font-bold mb-2">Toolkit (Yearly)</h4>
              <div className="mb-4">
                <span className="text-2xl font-bold text-orange-400">₹3,999</span>
                <span className="text-muted-foreground text-sm ml-2">per year</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Full year access with priority support included!
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                  <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Everything in 6-month plan</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                  <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Full year of updates</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                  <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Priority support</span>
                </div>
              </div>
              <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white transition-all duration-300 hover:scale-105" asChild>
                <Link to="/lets-connect">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Video Promo for Toolkit */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="glass-card rounded-2xl p-6 border border-orange-400/30 bg-gradient-to-r from-orange-500/5 to-red-500/5">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="relative w-full lg:w-auto aspect-[9/16] max-h-[400px] rounded-xl overflow-hidden shadow-lg shadow-orange-400/20">
                  <video
                    src={levelUpVideo}
                    className="w-full h-full object-cover"
                    controls
                    poster=""
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-400/10 text-orange-400 text-xs font-medium mb-3">
                    <Play className="w-3 h-3" />
                    Toolkit Preview
                  </div>
                  <h4 className="text-xl font-bold mb-2">Level Up Your Content Game</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    See how our toolkit helps creators streamline their workflow and grow faster
                  </p>
                  <Button className="bg-orange-400 hover:bg-orange-500 text-white" asChild>
                    <Link to="/lets-connect">Get the Toolkit</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* One-Time Services Section */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              One-Time Services
            </span>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Quick Setup <span className="gradient-text">Solutions</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Made for creators & brands • One-time setup • No monthly charges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {oneTimeServices.map((service, index) => {
              const ServiceIcon = service.icon;
              const isHighlight = service.highlight;
              return (
                <div
                  key={index}
                  className={`relative glass-card rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl animate-fade-in ${
                    isHighlight
                      ? "border-2 border-primary bg-gradient-to-b from-primary/10 to-primary/5 shadow-lg shadow-primary/20 hover:shadow-primary/30"
                      : "border border-border/50 hover:border-primary/50"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {isHighlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        <Star className="w-4 h-4 fill-current" />
                        Best Value
                      </span>
                    </div>
                  )}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    isHighlight ? "bg-primary/20" : "bg-primary/10"
                  }`}>
                    <ServiceIcon className={`w-7 h-7 text-primary`} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{service.name}</h4>
                  <div className="mb-4">
                    <span className={`text-2xl font-bold text-primary`}>{service.price}</span>
                    <span className="text-muted-foreground text-sm ml-2">one-time</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className={`w-4 h-4 text-primary flex-shrink-0`} />
                      <span>One-time setup</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className={`w-4 h-4 text-primary flex-shrink-0`} />
                      <span>No monthly charges</span>
                    </div>
                  </div>
                  <Button
                    variant={isHighlight ? "default" : "outline"}
                    className="w-full transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <Link to="/lets-connect">Get Started</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
