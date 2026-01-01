import { Heart, Target, TrendingUp } from "lucide-react";
import founderImage from "@/assets/founder-rishabh.jpeg";

const Founder = () => {
  const coreValues = [
    {
      icon: Heart,
      title: "Quality over quantity",
      description: "Every project is handled with attention to detail.",
    },
    {
      icon: Target,
      title: "Client-first approach",
      description: "We focus on long-term relationships, not short-term results.",
    },
    {
      icon: TrendingUp,
      title: "Continuous learning & innovation",
      description: "We adapt to trends, tools, and platforms to deliver the best outcomes.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Meet the Founder
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The Vision Behind <span className="text-primary">RR Creator Lab</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image Section */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative">
              <img
                src={founderImage}
                alt="Rishabh Alevoor - Founder & CEO of RR Creator Lab"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover aspect-[3/4]"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-xl p-4 text-center">
                <h3 className="text-xl font-bold text-foreground">Rishabh Alevoor</h3>
                <p className="text-primary font-medium">Founder & CEO, RR Creator Lab</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Why I Started RR Creator Lab</h3>
              <p className="text-muted-foreground leading-relaxed">
                I noticed that many creators and businesses struggle not because they lack talent, 
                but because they don't have proper guidance, branding, or digital structure. I wanted 
                to build a platform that simplifies content creation, branding, and digital growth 
                while maintaining quality and trust. RR Creator Lab was created to bridge this gap 
                and provide professional solutions at affordable and transparent pricing.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">How We Will Succeed</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our success is built on three core values:
              </p>
              
              <div className="space-y-4">
                {coreValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border/50 hover:border-primary/30 transition-colors duration-300"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-4">
              With dedication, consistency, and a strong creative mindset, RR Creator Lab aims to 
              grow into a trusted digital partner for creators and businesses across India and beyond.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
