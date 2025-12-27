import { Button } from "@/components/ui/button";
import { ArrowRight, Play, TrendingUp, Users, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(175,80%,15%),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,hsl(280,80%,10%),transparent_40%)]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(220,20%,15%)_1px,transparent_1px),linear-gradient(90deg,hsl(220,20%,15%)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Trusted by 10,000+ creators worldwide</span>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Explode Your
            <span className="block gradient-text">Social Growth</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Premium YouTube & Instagram growth services that deliver real, engaged followers. 
            Transform your content into a thriving community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl">
              Start Growing Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="glass" size="xl">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mx-auto mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-display font-bold gradient-text">50M+</div>
              <div className="text-sm text-muted-foreground">Followers Delivered</div>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div className="text-3xl font-display font-bold gradient-text">320%</div>
              <div className="text-sm text-muted-foreground">Avg. Engagement Boost</div>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mx-auto mb-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-display font-bold gradient-text">24/7</div>
              <div className="text-sm text-muted-foreground">Premium Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
