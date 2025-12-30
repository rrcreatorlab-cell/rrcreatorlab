import { Check, Star, Sparkles, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Starter Creator Plan",
      price: "₹5,000 – ₹8,000",
      period: "/ month",
      description: "Best for new & small creators",
      features: [
        "Content strategy & ideas",
        "8–10 reels/shorts editing",
        "Uploading & scheduling",
        "Caption + hashtag support",
        "Basic YouTube/Instagram optimization",
        "Weekly update",
      ],
      popular: false,
      icon: Sparkles,
    },
    {
      name: "Growth Plan",
      price: "₹12,000 – ₹20,000",
      period: "/ month",
      description: "Full content growth strategy",
      features: [
        "Full content growth strategy",
        "12–20 reels/shorts editing",
        "YouTube + Instagram management",
        "Titles, descriptions & hashtags",
        "Uploading & scheduling",
        "Engagement support (likes/comments strategy)",
        "Monthly performance report",
      ],
      popular: true,
      icon: Star,
    },
    {
      name: "Premium Management Plan",
      price: "₹25,000 – ₹50,000",
      period: "/ month",
      description: "For serious creators & brands",
      features: [
        "End-to-end account management",
        "YouTube + Instagram handled fully",
        "Content planning + execution",
        "Advanced growth strategy",
        "Comment moderation (basic)",
        "Community building support",
        "Detailed monthly analytics & roadmap",
      ],
      popular: false,
      icon: Sparkles,
    },
  ];

  const editingPackages = [
    {
      name: "Shorts/Reels Editing",
      price: "₹300 – ₹500",
      unit: "per reel",
      note: "Bulk pricing available",
    },
    {
      name: "Long Video Editing (Basic)",
      price: "₹1,000 – ₹3,000",
      unit: "per video",
      note: "Depending on length & complexity",
    },
    {
      name: "Channel Audit & Strategy",
      price: "₹999",
      unit: "one-time",
      note: "Complete channel analysis & growth roadmap",
    },
    {
      name: "Thumbnails / Creatives",
      price: "₹299",
      unit: "each",
      note: "Eye-catching designs that drive clicks",
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
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Flexible packages designed for creators at every stage of their journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "bg-gradient-to-b from-primary/20 to-primary/5 border-2 border-primary shadow-lg shadow-primary/20"
                  : "glass-card border border-border/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <plan.icon className={`w-10 h-10 mb-4 ${plan.popular ? "text-primary" : "text-accent"}`} />
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? "text-primary" : "text-accent"}`} />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "default" : "outline"}
                className="w-full"
                asChild
              >
                <Link to="/lets-connect">Get Started</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Packages */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <Scissors className="w-4 h-4" />
              Additional Packages
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {editingPackages.map((pkg, index) => (
              <div
                key={index}
                className="glass-card rounded-xl p-6 border border-border/50 hover:border-accent/50 transition-all duration-300"
              >
                <h4 className="text-lg font-bold mb-2">{pkg.name}</h4>
                <div className="mb-2">
                  <span className="text-2xl font-bold text-accent">{pkg.price}</span>
                  <span className="text-muted-foreground text-sm ml-2">{pkg.unit}</span>
                </div>
                <p className="text-muted-foreground text-sm">{pkg.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
