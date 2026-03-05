import { Youtube, Instagram, Users, TrendingUp } from "lucide-react";

const stats = [
  { icon: Youtube, label: "YouTube Channels Managed", value: "50+" },
  { icon: Instagram, label: "Instagram Growth", value: "10M+" },
  { icon: Users, label: "Happy Creators", value: "100+" },
  { icon: TrendingUp, label: "Avg. Growth Rate", value: "3x" },
];

const HeroTrustBar = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10">
      <div className="glass-card border-t border-border/30">
        <div className="container px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 justify-center animate-slide-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-lg md:text-xl font-bold text-foreground font-display">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">
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
