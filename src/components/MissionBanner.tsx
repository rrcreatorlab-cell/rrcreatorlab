import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const MissionBanner = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="container px-4 relative">
        <div
          className="max-w-4xl mx-auto text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out",
          }}
        >
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">
            Our Mission
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-6">
            We don't just manage content.{" "}
            <span className="gradient-text">We build creators.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Strategy, consistency, and optimized execution — everything your channel needs to grow, without the burnout.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionBanner;
