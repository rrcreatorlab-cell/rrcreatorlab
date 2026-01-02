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
            <div className="absolute bottom-0 left-0 right-0 p-6">
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
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">Complete Growth Roadmap</h3>
              <p className="text-muted-foreground text-sm">
                From channel launch to building your brand & monetizing your audience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthVisuals;
