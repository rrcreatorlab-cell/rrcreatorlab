import { Button } from "@/components/ui/button";
import { Check, Star, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "29",
    description: "Perfect for new creators just getting started",
    features: [
      "1,000 YouTube Subscribers",
      "2,500 Instagram Followers",
      "Basic Analytics",
      "Email Support",
      "7-day delivery",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "79",
    description: "For serious creators ready to scale",
    features: [
      "5,000 YouTube Subscribers",
      "10,000 Instagram Followers",
      "Advanced Analytics Dashboard",
      "Priority 24/7 Support",
      "Engagement Boost Package",
      "3-day express delivery",
      "Drip-feed option",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "199",
    description: "Maximum growth for established brands",
    features: [
      "15,000 YouTube Subscribers",
      "30,000 Instagram Followers",
      "Custom Growth Strategy",
      "Dedicated Account Manager",
      "Premium Analytics Suite",
      "Same-day start",
      "VIP priority queue",
      "Monthly strategy calls",
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="pricing">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,hsl(175,80%,10%),transparent_60%)]" />

      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
            Pricing
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent
            <span className="gradient-text"> Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            No hidden fees. No surprises. Just real results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] ${
                plan.popular
                  ? "gradient-border bg-card glow-primary"
                  : "glass-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-display font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "outline"}
                size="lg"
                className="w-full"
              >
                {plan.popular && <Zap className="mr-2 h-4 w-4" />}
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-8">
          All plans include a 30-day money-back guarantee. Need a custom package?{" "}
          <a href="#contact" className="text-primary hover:underline">
            Contact us
          </a>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
