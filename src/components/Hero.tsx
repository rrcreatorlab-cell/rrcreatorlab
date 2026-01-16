import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Target, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax animated background */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(175,80%,15%),transparent_50%)]"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,hsl(280,80%,10%),transparent_40%)]"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      />
      <div 
        className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"
        style={{ transform: `translateY(${scrollY * 0.5}px) translateX(${scrollY * 0.1}px)` }}
      />
      <div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
        style={{ transform: `translateY(${scrollY * 0.4}px) translateX(${-scrollY * 0.15}px)` }}
      />
      
      {/* Grid pattern overlay with parallax */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(hsl(220,20%,15%)_1px,transparent_1px),linear-gradient(90deg,hsl(220,20%,15%)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Content Growth & Social Media Management Studio</span>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Building Creators.
            <span className="block gradient-text">Scaling Reach.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Helping creators and brands grow on YouTube and Instagram through strategy, 
            consistency, and optimized execution.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/lets-connect">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/success-stories">
                <Play className="mr-2 h-5 w-5" />
                See Our Work
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mx-auto mb-3">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-display font-bold gradient-text">Strategy</div>
              <div className="text-sm text-muted-foreground">Data-backed growth plans</div>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div className="text-3xl font-display font-bold gradient-text">Growth</div>
              <div className="text-sm text-muted-foreground">Organic, optimized results</div>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-display font-bold gradient-text">Execution</div>
              <div className="text-sm text-muted-foreground">Clean & consistent delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
