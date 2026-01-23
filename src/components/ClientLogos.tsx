import { useEffect, useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ClientLogos = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: clients = [] } = useQuery({
    queryKey: ["client_logos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_logos")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll || clients.length === 0) return;

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
  }, [clients]);

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
