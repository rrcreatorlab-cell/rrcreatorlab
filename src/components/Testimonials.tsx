import { useState, useEffect } from "react";
import { Star, StarHalf, Quote, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  created_at: string;
}

const Testimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    rating: 5,
    review: "",
  });

  // Static testimonials as fallback - only approved clients
  const staticTestimonials = [
    {
      id: "static-1",
      name: "The Currency India Official",
      role: "Finance YouTuber",
      rating: 5,
      review: "RR Creator Lab helped us grow from 8 to 4.17K subscribers! Their strategic approach to content and analytics-driven optimization made all the difference.",
      created_at: "",
    },
    {
      id: "static-2",
      name: "Sambodhi Mechanical Engineering Coaching",
      role: "Educational Creator",
      rating: 5,
      review: "Our channel grew from 28 to 473 subscribers with their expert guidance. The team understands educational content perfectly and delivers quality edits.",
      created_at: "",
    },
    {
      id: "static-3",
      name: "Shilpa Art House",
      role: "Art & Craft Creator",
      rating: 5,
      review: "Amazing creative team! They enhanced our art content beautifully and helped us reach a wider audience. Highly professional and timely delivery.",
      created_at: "",
    },
    {
      id: "static-4",
      name: "Startup Stories",
      role: "Business Content Creator",
      rating: 5,
      review: "The team at RR Creator Lab understands the startup ecosystem perfectly. Our content quality and engagement improved dramatically after partnering with them.",
      created_at: "",
    },
    {
      id: "static-5",
      name: "V Filmy Steps",
      role: "Entertainment YouTuber",
      rating: 5,
      review: "Outstanding editing and creative direction! They brought our vision to life with professional quality that rivals top production houses.",
      created_at: "",
    },
    {
      id: "static-6",
      name: "Homzyee Property Management",
      role: "Real Estate Creator",
      rating: 5,
      review: "Excellent service for our property showcase videos. The editing quality and turnaround time exceeded our expectations. Great team to work with!",
      created_at: "",
    },
    {
      id: "static-7",
      name: "Rahul Sharma",
      role: "Tech YouTuber",
      rating: 5,
      review: "RR Creator Lab transformed my channel completely! My subscriber count doubled in just 3 months. Their editing quality and strategy are top-notch.",
      created_at: "",
    },
    {
      id: "static-8",
      name: "Sneha Reddy",
      role: "Food Blogger",
      rating: 5,
      review: "Amazing thumbnails and video edits! My click-through rate improved significantly. The team is responsive and delivers quality work on time.",
      created_at: "",
    },
  ];

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Combine database testimonials with static ones
      const dbTestimonials = data || [];
      setTestimonials([...dbTestimonials, ...staticTestimonials]);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials(staticTestimonials);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.role.trim() || !formData.review.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("testimonials").insert({
        name: formData.name.trim(),
        role: formData.role.trim(),
        rating: formData.rating,
        review: formData.review.trim(),
      });

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "Your review has been submitted and will appear after approval.",
      });

      setFormData({ name: "", role: "", rating: 5, review: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Join hundreds of satisfied creators who have grown their channels with us
          </p>
          
          {/* Rate Us Button */}
          <Button
            onClick={() => setShowForm(!showForm)}
            variant="outline"
            className="border-primary/50 hover:bg-primary/10"
          >
            {showForm ? "Close Form" : "Rate Us"}
          </Button>
        </div>

        {/* Rating Form */}
        {showForm && (
          <div className="max-w-xl mx-auto mb-16">
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 border border-border/50">
              <h3 className="text-xl font-bold mb-6 text-center">Share Your Experience</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Your Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    maxLength={100}
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Your Role/Profession</label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="YouTuber, Blogger, etc."
                    maxLength={100}
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= formData.rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Your Review</label>
                  <Textarea
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    placeholder="Share your experience working with us..."
                    rows={4}
                    maxLength={500}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Submitting..." : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Review
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.slice(0, 8).map((testimonial) => (
            <div
              key={testimonial.id}
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
                  {getInitials(testimonial.name)}
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
