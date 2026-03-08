import { Youtube, Instagram, Users, TrendingUp } from "lucide-react";

const stats = [
  { icon: Youtube, label: "YouTube Managed", value: "50+" },
  { icon: Instagram, label: "Insta Growth", value: "10M+" },
  { icon: Users, label: "Happy Creators", value: "100+" },
  { icon: TrendingUp, label: "Avg. Growth", value: "3x" },
];

const HeroTrustBar = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10">
      <div className="glass-card border-t border-border/30">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-around gap-2 overflow-x-auto scrollbar-hide">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 flex-shrink-0 animate-slide-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm md:text-lg font-bold text-foreground font-display leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs text-muted-foreground leading-tight whitespace-nowrap">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTrustBar;
