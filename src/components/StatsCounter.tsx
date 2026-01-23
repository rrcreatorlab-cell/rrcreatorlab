import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { TrendingUp, Users, Award, Eye, Heart, Star, Zap, Target, Trophy, Sparkles, LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  trending_up: TrendingUp,
  award: Award,
  eye: Eye,
  heart: Heart,
  star: Star,
  zap: Zap,
  target: Target,
  trophy: Trophy,
  sparkles: Sparkles,
};

const StatItem = ({
  icon: Icon,
  value,
  suffix,
  label,
  color,
  isVisible,
  delay,
}: {
  icon: typeof Users;
  value: number;
  suffix: string;
  label: string;
  color: string;
  isVisible: boolean;
  delay: number;
}) => {
  const count = useCountUp({
    end: value,
    duration: 2500,
    isVisible,
    suffix,
  });

  return (
    <div
      className="text-center p-6 rounded-2xl glass-card hover:scale-105 transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s ease-out ${delay}ms`,
      }}
    >
      <Icon className={`w-8 h-8 ${color} mx-auto mb-3`} />
      <div className={`text-4xl md:text-5xl font-bold ${color} mb-2`}>
        {count}
      </div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </div>
  );
};

const StatsCounter = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const { data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stats")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="container px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Our <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real numbers, real growth. Here's what we've achieved for our creators.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.id}
              icon={iconMap[stat.icon] || Users}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              color={stat.color}
              isVisible={isVisible}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
