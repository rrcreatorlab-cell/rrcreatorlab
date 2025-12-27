import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Tech YouTuber • 850K Subs",
    content: "Went from 50K to 850K subscribers in 8 months. The growth is insane and completely organic-looking. My engagement actually improved!",
    avatar: "AR",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Lifestyle Influencer • 1.2M Followers",
    content: "Best investment I've made for my Instagram. The targeted followers actually engage with my content. Totally transformed my brand deals.",
    avatar: "SC",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Gaming Creator • 2.1M Subs",
    content: "Their team understood exactly what I needed. Fast delivery, real subscribers, and my watch time went through the roof. Highly recommend!",
    avatar: "MJ",
    rating: 5,
  },
  {
    name: "Emma Williams",
    role: "Fitness Coach • 500K Followers",
    content: "I was skeptical at first, but the results speak for themselves. My coaching business has 5x'd since working with them.",
    avatar: "EW",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Music Artist • 750K Subs",
    content: "The engagement on my music videos is incredible now. More views means more streams and more revenue. Game changer!",
    avatar: "DP",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Beauty Creator • 980K Followers",
    content: "From micro-influencer to major brand ambassador in under a year. The growth was natural and my audience is super engaged.",
    avatar: "LT",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="testimonials">
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Creators Love
            <span className="gradient-text"> Our Results</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of successful creators who've transformed their social presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="glass-card rounded-xl p-6 hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground/90 mb-6 text-sm leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-semibold text-primary-foreground">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
