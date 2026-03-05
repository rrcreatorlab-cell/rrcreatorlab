import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useEffect, useState, useCallback } from "react";
import rrLogo from "@/assets/rr-creator-lab-logo.png";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";
import heroSlide5 from "@/assets/hero-slide-5.jpg";
import HeroParticles from "./HeroParticles";
import HeroTrustBar from "./HeroTrustBar";

const slides = [
  {
    image: heroSlide1,
    headline: "Building Creators.",
    headlineAccent: "Scaling Reach.",
    subtext:
      "Helping creators and brands grow on YouTube and Instagram through strategy, consistency, and optimized execution.",
  },
  {
    image: heroSlide2,
    headline: "Turn Content",
    headlineAccent: "Into Growth.",
    subtext:
      "Editing, strategy and social media management that scales your brand.",
  },
  {
    image: heroSlide3,
    headline: "Focus On Creating.",
    headlineAccent: "We Handle The Growth.",
    subtext:
      "RR Creator Lab manages editing, posting and optimization.",
  },
  {
    image: heroSlide4,
    headline: "Strategy That",
    headlineAccent: "Drives Results.",
    subtext:
      "Data-driven content planning and team collaboration to maximize your social media impact.",
  },
  {
    image: heroSlide5,
    headline: "Celebrate Every",
    headlineAccent: "Milestone.",
    subtext:
      "From first 1K to 1M subscribers — we're with you at every step of your creator journey.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [typedText, setTypedText] = useState("");
  const { isAdmin } = useAdminCheck();

  const goToSlide = useCallback(
    (index: number) => {
      if (index === current || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 600);
    },
    [current, isTransitioning]
  );

  const goNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning]);

  const goPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 600);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Typing animation for the badge
  useEffect(() => {
    const text = "Content Growth & Social Media Management Studio";
    setTypedText("");
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setTypedText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Slide backgrounds with ken burns */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: current === i && !isTransitioning ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              animation: current === i ? "kenburns 8s ease-in-out forwards" : "none",
            }}
          />
        </div>
      ))}

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/70 z-[1]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(220,20%,15%)_1px,transparent_1px),linear-gradient(90deg,hsl(220,20%,15%)_1px,transparent_1px)] bg-[size:60px_60px] opacity-10 z-[2]" />

      {/* Particles */}
      <HeroParticles />

      {/* Glow accents */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse z-[2]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl z-[2]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse-glow z-[2]" />

      {/* Floating decorative elements */}
      <div className="absolute top-[15%] right-[10%] w-3 h-3 rounded-full bg-primary/40 animate-float z-[4]" />
      <div className="absolute top-[25%] left-[8%] w-2 h-2 rounded-full bg-accent/40 animate-float z-[4]" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-[30%] right-[15%] w-4 h-4 rounded-full bg-primary/20 animate-float z-[4]" style={{ animationDelay: "4s" }} />
      <div className="absolute top-[40%] left-[15%] w-2 h-2 rounded-full bg-accent/30 animate-float z-[4]" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-[40%] left-[5%] w-3 h-3 rounded-full bg-primary/30 animate-float z-[4]" style={{ animationDelay: "3s" }} />

      {/* Navigation arrows */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground/70 hover:text-foreground hover:scale-110 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground/70 hover:text-foreground hover:scale-110 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 animate-slide-up">
            <img
              src={rrLogo}
              alt="RR Creator Lab"
              className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 mx-auto rounded-full object-cover shadow-2xl shadow-primary/20"
            />
          </div>

          {/* Badge with typing animation */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateY(12px)" : "translateY(0)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              {typedText}
              <span className="inline-block w-0.5 h-4 bg-primary/70 ml-0.5 animate-pulse align-middle" />
            </span>
          </div>

          {/* Headline with fade animation */}
          <h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateY(20px)" : "translateY(0)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {slides[current].headline}
            <span className="block gradient-text">
              {slides[current].headlineAccent}
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateY(16px)" : "translateY(0)",
              transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
            }}
          >
            {slides[current].subtext}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateY(12px)" : "translateY(0)",
              transition: "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s",
            }}
          >
            <Button variant="hero" size="xl" asChild>
              <a
                href="https://topmate.io/rishabh269/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Consultation
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/lets-connect">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {isAdmin && (
              <Button variant="glass" size="xl" asChild>
                <Link to="/admin">
                  <Settings className="mr-2 h-5 w-5" />
                  Admin
                </Link>
              </Button>
            )}
          </div>

          {/* Slide indicators */}
          <div className="flex items-center justify-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className="group relative h-2 rounded-full transition-all duration-500 overflow-hidden"
                style={{ width: current === i ? 40 : 12 }}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className="absolute inset-0 rounded-full bg-muted-foreground/30" />
                {current === i && (
                  <span
                    className="absolute inset-0 rounded-full bg-primary"
                    style={{ animation: "progress 5s linear forwards" }}
                  />
                )}
                {current !== i && (
                  <span className="absolute inset-0 rounded-full bg-muted-foreground/50 group-hover:bg-muted-foreground/70 transition-colors" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trust bar at bottom */}
      <HeroTrustBar />
    </section>
  );
};

export default Hero;
