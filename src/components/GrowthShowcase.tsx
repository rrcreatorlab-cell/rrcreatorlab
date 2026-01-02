import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TrendingUp, Users, Eye, Award } from "lucide-react";

import growthAnalytics from "@/assets/growth-analytics.jpg";
import growthCelebration from "@/assets/growth-celebration.jpg";
import growthStrategy from "@/assets/growth-strategy.jpg";
import growthSuccess from "@/assets/growth-success.jpg";

const slides = [
  {
    image: growthAnalytics,
    title: "Data-Driven Growth",
    description: "Real analytics showing consistent subscriber and view increases",
    icon: TrendingUp,
    stat: "500%+ Average Growth",
  },
  {
    image: growthCelebration,
    title: "Milestone Celebrations",
    description: "Helping creators reach their subscriber goals",
    icon: Users,
    stat: "4K+ Subscribers Gained",
  },
  {
    image: growthStrategy,
    title: "Strategic Planning",
    description: "Expert team crafting personalized growth strategies",
    icon: Eye,
    stat: "100K+ Views Generated",
  },
  {
    image: growthSuccess,
    title: "Creator Success",
    description: "Building towards YouTube recognition and awards",
    icon: Award,
    stat: "Multiple Success Stories",
  },
];

const GrowthShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary mb-6">
            Our Growth Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Real Results, Real{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Growth
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how we help creators transform their channels with proven strategies
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="md:basis-full">
                <div className="relative group">
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-2xl aspect-video">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                          <slide.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-foreground">
                            {slide.title}
                          </h3>
                          <p className="text-muted-foreground text-sm md:text-base">
                            {slide.description}
                          </p>
                        </div>
                      </div>
                      <div className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-semibold text-sm">
                        {slide.stat}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-background/80 border-border hover:bg-background" />
          <CarouselNext className="right-4 bg-background/80 border-border hover:bg-background" />
        </Carousel>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthShowcase;
