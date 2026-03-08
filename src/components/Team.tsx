import { useState } from "react";
import { Instagram, Linkedin, Twitter, ChevronDown } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useParallax } from "@/hooks/useParallax";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  active: boolean;
  display_order: number;
}

const Team = () => {
  const { scrollY } = useParallax();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: teamMembers = [] } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="team" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * 0.06}px)` }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * -0.08}px)` }} />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Meet the <span className="gradient-text">Creative Minds</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate professionals dedicated to helping creators achieve their dreams
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => {
            const isExpanded = expandedId === member.id;
            return (
              <AnimatedSection key={member.id} animation="scale" delay={index * 100}>
                <div
                  className="group relative cursor-pointer"
                  onClick={() => toggleExpand(member.id)}
                >
                  <div className="glass-card rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-500 text-center">
                    {/* Image */}
                    <div className="relative mx-auto mb-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300 mx-auto">
                        {member.image_url ? (
                          <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </div>

                    {/* Name & Role */}
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary text-sm font-medium">{member.role}</p>

                    {/* Expand indicator */}
                    <ChevronDown
                      className={`w-4 h-4 mx-auto mt-2 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    />

                    {/* Expandable content */}
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{ maxHeight: isExpanded ? '400px' : '0', opacity: isExpanded ? 1 : 0 }}
                    >
                      <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                        {member.bio}
                      </p>

                      {member.socials && (
                        <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-border/30">
                          {member.socials.instagram && member.socials.instagram !== "#" && (
                            <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer"
                              className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Instagram className="w-4 h-4" />
                            </a>
                          )}
                          {member.socials.linkedin && member.socials.linkedin !== "#" && (
                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"
                              className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                          {member.socials.twitter && member.socials.twitter !== "#" && (
                            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer"
                              className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Twitter className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Team;
