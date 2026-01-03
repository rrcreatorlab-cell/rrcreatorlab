import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import growthViewsImage from "@/assets/growth-views.jpg";
import creatorGrowthImage from "@/assets/creator-growth-phases.webp";

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
          {/* Views Growth Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20">
            <div className="aspect-video overflow-hidden">
              <img 
                src={growthViewsImage} 
                alt="Secret websites to grow faster - Views growth from 100 to 200.8k"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            
            {/* Stats Overlay */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-6 p-6">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  <p className="text-3xl md:text-4xl font-bold text-primary">200K+</p>
                  <p className="text-sm text-muted-foreground">Views Growth</p>
                </div>
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  <p className="text-3xl md:text-4xl font-bold text-accent">10x</p>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                </div>
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                  <p className="text-3xl md:text-4xl font-bold text-primary">30 Days</p>
                  <p className="text-sm text-muted-foreground">Avg. Results</p>
                </div>
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">
                  <p className="text-3xl md:text-4xl font-bold text-accent">500%</p>
                  <p className="text-sm text-muted-foreground">ROI Increase</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="text-xl font-bold text-foreground mb-2">Explosive View Growth</h3>
              <p className="text-muted-foreground text-sm">
                Learn the secrets to skyrocket your views from 100 to 200k+
              </p>
            </div>
          </div>

          {/* Creator Growth Phases Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20">
            <div className="aspect-video overflow-hidden">
              <img 
                src={creatorGrowthImage} 
                alt="YouTube Creator Growth Phases - Launch, Revenue, Audience, Brand"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            
            {/* Stats Overlay */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-6 p-6">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  <p className="text-3xl md:text-4xl font-bold text-primary">4 Phases</p>
                  <p className="text-sm text-muted-foreground">Growth Journey</p>
                </div>
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  <p className="text-3xl md:text-4xl font-bold text-accent">$50K+</p>
                  <p className="text-sm text-muted-foreground">Revenue Potential</p>
                </div>
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                  <p className="text-3xl md:text-4xl font-bold text-primary">100K</p>
                  <p className="text-sm text-muted-foreground">Subscriber Goal</p>
                </div>
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">
                  <p className="text-3xl md:text-4xl font-bold text-accent">Brand</p>
                  <p className="text-sm text-muted-foreground">Final Phase</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="text-xl font-bold text-foreground mb-2">Complete Growth Roadmap</h3>
              <p className="text-muted-foreground text-sm">
                From channel launch to building your brand & monetizing your audience
              </p>
            </div>
          </div>
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
