import { Check, GraduationCap, Youtube, Sparkles, Bot } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "@/components/ui/button";

const TOPMATE = "https://topmate.io/rrcreatorlab";

const courses = [
  {
    title: "Entrepreneurship & Digital Growth Masterclass",
    duration: "3-9 days",
    badge: "Most Popular",
    icon: GraduationCap,
    gradient: "from-primary to-blue-400",
    pricing: [
      { label: "Student Batch", price: "₹7,999" },
      { label: "Professional Batch", price: "₹14,999" },
    ],
    learn: [
      "Business Foundations",
      "Sales & Marketing",
      "Website Development",
      "Digital Marketing",
      "Social Media Management",
      "YouTube Growth",
      "Content Creation & UGC",
      "AI Tools & Automation",
      "Finance & Business Planning",
    ],
    cta: "Enroll Now",
  },
  {
    title: "YouTube Management & Growth Mastery",
    duration: "4 Hours",
    icon: Youtube,
    gradient: "from-red-500 to-orange-500",
    pricing: [{ label: "Price", price: "₹4,999" }],
    learn: [
      "Channel Setup",
      "YouTube SEO",
      "Thumbnail Design",
      "Analytics",
      "Content Planning",
      "Monetization",
    ],
    cta: "Join Course",
  },
  {
    title: "Content Marketing & Personal Branding",
    duration: "5 Hours",
    icon: Sparkles,
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
    pricing: [{ label: "Price", price: "₹5,999" }],
    learn: [
      "Instagram Growth",
      "Personal Branding",
      "UGC Marketing",
      "Content Strategy",
      "Reels Growth",
      "Lead Generation",
    ],
    cta: "Join Course",
  },
  {
    title: "AI Tools For Business & Creators",
    duration: "3 Hours",
    icon: Bot,
    gradient: "from-green-400 to-emerald-500",
    pricing: [{ label: "Price", price: "₹4,999" }],
    learn: [
      "ChatGPT",
      "AI Automation",
      "AI Content Creation",
      "AI Video Tools",
      "Productivity Systems",
    ],
    cta: "Join Course",
  },
];

const Courses = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="courses">
      <div className="container relative z-10 px-4">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Courses
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            RR Creator Lab <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Learn High-Income Skills & Build Your Future
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((c, i) => {
            const Icon = c.icon;
            return (
              <AnimatedSection key={c.title} animation="fade-up" delay={i * 100}>
                <div className="relative h-full gradient-border rounded-xl p-6 flex flex-col hover:shadow-lg hover:shadow-primary/10 transition-all">
                  {c.badge && (
                    <span className="absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary to-accent text-white shadow-md">
                      {c.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold leading-tight">{c.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">Duration: {c.duration}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {c.pricing.map((p) => (
                      <div key={p.label} className="px-3 py-2 rounded-lg bg-muted/40 border border-border/60">
                        <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{p.label}</div>
                        <div className="font-display text-lg font-bold gradient-text">{p.price}</div>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {c.learn.map((l) => (
                      <li key={l} className="flex items-start text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        {l}
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="w-full">
                    <a href={TOPMATE} target="_blank" rel="noopener noreferrer">{c.cta}</a>
                  </Button>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Courses;