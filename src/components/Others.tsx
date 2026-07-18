import { Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface OtherItem {
  id: string;
  title: string;
  display_order: number;
  active: boolean;
}

const Others = () => {
  const { data: items = [] } = useQuery({
    queryKey: ["others-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("others_items")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data || []) as OtherItem[];
    },
  });

  if (items.length === 0) return null;

  return (
    <section className="relative py-24 overflow-hidden" id="others">
      <div className="container relative z-10 px-4">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            More
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Others</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Additional services we offer
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <AnimatedSection key={item.id} animation="fade-up" delay={i * 60}>
              <div className="group h-full gradient-border rounded-xl p-5 flex items-center gap-3 hover:shadow-lg hover:shadow-primary/10 transition-all">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-display text-sm font-semibold leading-tight">
                  {item.title}
                </h3>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Others;