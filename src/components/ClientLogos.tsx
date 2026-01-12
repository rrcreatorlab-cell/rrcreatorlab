import { useEffect, useRef } from "react";
import AnimatedSection from "./AnimatedSection";

const clients = [
  { name: "The Currency India", handle: "@thecurrencyindia" },
  { name: "Sambodhi Engineering", handle: "@sambodhiengineering" },
  { name: "Tech Creators Hub", handle: "@techcreatorshub" },
  { name: "Finance Simplified", handle: "@financesimplified" },
  { name: "Startup Stories", handle: "@startupstories" },
  { name: "Digital Marketing Pro", handle: "@digitalmarketingpro" },
];

const ClientLogos = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    let animationId: number;
    let scrollPosition = 0;

    const animate = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scroll.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scroll.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scroll.addEventListener("mouseenter", handleMouseEnter);
    scroll.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scroll.removeEventListener("mouseenter", handleMouseEnter);
      scroll.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-12 relative overflow-hidden border-y border-border/30">
      <div className="container px-4">
        <AnimatedSection className="text-center mb-8">
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
            Trusted by Growing Creators
          </p>
        </AnimatedSection>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-8 overflow-hidden whitespace-nowrap"
        style={{ scrollBehavior: "auto" }}
      >
        {/* Double the items for seamless loop */}
        {[...clients, ...clients].map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="flex-shrink-0 px-8 py-4 glass-card rounded-xl hover:bg-secondary/50 transition-colors cursor-default"
          >
            <div className="text-foreground font-semibold">{client.name}</div>
            <div className="text-muted-foreground text-sm">{client.handle}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientLogos;
