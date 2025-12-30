import { Star, StarHalf, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Tech YouTuber",
      rating: 5,
      review: "RR Creator Lab transformed my channel completely! My subscriber count doubled in just 3 months. Their editing quality and strategy are top-notch.",
      avatar: "RS",
    },
    {
      name: "Priya Patel",
      role: "Lifestyle Influencer",
      rating: 4,
      review: "The team understands exactly what works on Instagram. My reels engagement increased by 300% after working with them. Highly recommended!",
      avatar: "PP",
    },
    {
      name: "Amit Kumar",
      role: "Educational Creator",
      rating: 5,
      review: "Professional, reliable, and creative. They handle everything from editing to uploading, letting me focus on creating content. Best decision ever!",
      avatar: "AK",
    },
    {
      name: "Sneha Reddy",
      role: "Food Blogger",
      rating: 3.5,
      review: "Amazing thumbnails and video edits! My click-through rate improved significantly. The team is responsive and delivers quality work on time.",
      avatar: "SR",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-primary text-primary" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-5 h-5 fill-primary text-primary" />);
    }
    return stars;
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Client Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            What Our{" "}
            <span className="gradient-text">Creators Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join hundreds of satisfied creators who have grown their channels with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/30 mb-4 group-hover:text-primary/50 transition-colors" />

              {/* Review Text */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.review}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
