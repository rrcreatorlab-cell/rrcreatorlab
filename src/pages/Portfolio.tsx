import { useState } from "react";
import { Play, ExternalLink, Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
  description: string;
  views?: string;
  client?: string;
}

const categories = ["All", "YT Video", "YT Shorts", "Insta Reels", "Website"];

const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Documentary Style Edit",
    category: "YT Video",
    thumbnail: "/placeholder.svg",
    description: "Cinematic documentary editing with professional color grading and seamless transitions.",
    views: "250K+",
    client: "The Currency India Official",
  },
  {
    id: "2",
    title: "Viral Short Format",
    category: "YT Shorts",
    thumbnail: "/placeholder.svg",
    description: "Fast-paced, hook-driven content optimized for maximum retention and engagement.",
    views: "1.2M+",
    client: "Startup Stories",
  },
  {
    id: "3",
    title: "Instagram Reel",
    category: "Insta Reels",
    thumbnail: "/placeholder.svg",
    description: "Trendy reel with smooth transitions, trending audio, and engaging captions.",
    views: "500K+",
    client: "Sambodhi",
  },
  {
    id: "4",
    title: "Tutorial Video",
    category: "YT Video",
    thumbnail: "/placeholder.svg",
    description: "Clear, educational content with animated graphics and step-by-step breakdown.",
    views: "180K+",
    client: "Shilpa Art House",
  },
  {
    id: "5",
    title: "Creator Portfolio Website",
    category: "Website",
    thumbnail: "/placeholder.svg",
    description: "Modern, responsive portfolio website with contact forms and social integration.",
    client: "V Filmy Steps",
  },
  {
    id: "6",
    title: "Product Showcase Reel",
    category: "Insta Reels",
    thumbnail: "/placeholder.svg",
    description: "Premium product videography with smooth camera movements and lifestyle shots.",
    views: "320K+",
    client: "Homzyee Property Management",
  },
  {
    id: "7",
    title: "Trending YT Short",
    category: "YT Shorts",
    thumbnail: "/placeholder.svg",
    description: "Viral short with trending audio, dynamic cuts, and engaging hooks.",
    views: "800K+",
    client: "Tech Reviews India",
  },
  {
    id: "8",
    title: "Business Landing Page",
    category: "Website",
    thumbnail: "/placeholder.svg",
    description: "Professional landing page with lead capture forms and analytics integration.",
    client: "Local Business Hub",
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = activeCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />

        <div className="container relative z-10 px-4">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Our Work
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Portfolio
              <span className="gradient-text"> Showcase</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              See the quality and creativity we bring to every project.
            </p>
          </AnimatedSection>

          {/* Category Filter */}
          <AnimatedSection delay={100} className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "gradient" : "glass"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </AnimatedSection>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredItems.map((item, index) => (
              <AnimatedSection
                key={item.id}
                animation="fade-up"
                delay={index * 100}
              >
                <div
                  className="group glass-card rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300"
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-foreground fill-foreground" />
                      </div>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm rounded-full">
                        {item.category}
                      </span>
                    </div>
                    {/* Views badge */}
                    {item.views && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1">
                        <Eye className="h-3 w-3 text-foreground/70" />
                        <span className="text-xs text-foreground/70">{item.views}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-display font-bold mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                      {item.description}
                    </p>
                    {item.client && (
                      <p className="text-xs text-primary/70">Client: {item.client}</p>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA */}
          <AnimatedSection delay={400} className="text-center mt-12">
            <Button variant="gradient" size="xl" asChild>
              <a href="https://topmate.io/rishabh269/" target="_blank" rel="noopener noreferrer">
                Get Similar Results
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">{selectedItem?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">Video preview coming soon</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                {selectedItem?.category}
              </span>
              {selectedItem?.views && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Eye className="h-4 w-4" /> {selectedItem.views} views
                </span>
              )}
            </div>
            <p className="text-muted-foreground">{selectedItem?.description}</p>
            {selectedItem?.client && (
              <p className="text-sm">
                <span className="text-muted-foreground">Client:</span>{" "}
                <span className="text-primary">{selectedItem.client}</span>
              </p>
            )}
            <Button variant="gradient" className="w-full" asChild>
              <a href="https://topmate.io/rishabh269/" target="_blank" rel="noopener noreferrer">
                Get Similar Results
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Portfolio;
