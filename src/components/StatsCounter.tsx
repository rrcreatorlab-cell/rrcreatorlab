import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { TrendingUp, Users, Play, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 50,
    suffix: "+",
    label: "Creators Helped",
    color: "text-primary",
  },
  {
    icon: TrendingUp,
    value: 500,
    suffix: "%",
    label: "Avg. Growth Rate",
    color: "text-green-400",
  },
  {
    icon: Play,
    value: 10,
    suffix: "M+",
    label: "Views Generated",
    color: "text-blue-400",
  },
  {
    icon: Award,
    value: 95,
    suffix: "%",
    label: "Client Satisfaction",
    color: "text-accent",
  },
];

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
              key={stat.label}
              {...stat}
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
