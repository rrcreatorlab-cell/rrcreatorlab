import { Instagram, Linkedin, Twitter } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Rishabh Alevoor",
    role: "Founder & CEO",
    bio: "Visionary leader with 5+ years in content strategy. Passionate about helping creators scale their digital presence and build sustainable growth.",
    image: "/placeholder.svg",
    socials: {
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "Head of Video Editing",
    bio: "Creative editor with expertise in storytelling. Transforms raw footage into compelling narratives that captivate audiences.",
    image: "/placeholder.svg",
    socials: {
      instagram: "#",
    },
  },
  {
    id: "3",
    name: "Arjun Mehta",
    role: "Growth Strategist",
    bio: "Data-driven strategist specializing in YouTube algorithm optimization. Helped clients achieve 10M+ combined views.",
    image: "/placeholder.svg",
    socials: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: "4",
    name: "Sneha Reddy",
    role: "Thumbnail Designer",
    bio: "Visual artist crafting click-worthy thumbnails. Expert in color psychology and viewer attention patterns.",
    image: "/placeholder.svg",
    socials: {
      instagram: "#",
    },
  },
];

const Team = () => {
  return (
    <section id="team" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
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

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <AnimatedSection
              key={member.id}
              animation="scale"
              delay={index * 100}
            >
              <div className="group relative">
                {/* Card */}
                <div className="glass-card rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-500 text-center h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative mx-auto mb-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300">
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </div>

                  {/* Info */}
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  {member.socials && (
                    <div className="flex justify-center gap-3 mt-6 pt-4 border-t border-border/30">
                      {member.socials.instagram && (
                        <a
                          href={member.socials.instagram}
                          className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          aria-label={`${member.name}'s Instagram`}
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {member.socials.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a
                          href={member.socials.twitter}
                          className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          aria-label={`${member.name}'s Twitter`}
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Join CTA */}
        <AnimatedSection className="text-center mt-16">
          <div className="glass-card inline-block rounded-2xl px-8 py-6 border border-border/50">
            <p className="text-muted-foreground mb-2">
              Want to join our creative team?
            </p>
            <a
              href="mailto:careers@rrcreatorlab.com"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              Send us your portfolio →
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Team;
