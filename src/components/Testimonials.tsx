import { useState, useEffect } from "react";
import { Star, StarHalf, Quote, Send, MessageSquarePlus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AnimatedSection from "./AnimatedSection";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Validation schema
const testimonialSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  role: z.string().trim().min(2, "Role must be at least 2 characters").max(100, "Role must be less than 100 characters"),
  rating: z.number().min(1).max(5),
  review: z.string().trim().min(20, "Review must be at least 20 characters").max(500, "Review must be less than 500 characters"),
});

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  created_at: string;
}

interface FormErrors {
  name?: string;
  role?: string;
  review?: string;
}

const Testimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
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

  const validateForm = (): boolean => {
    try {
      testimonialSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormErrors] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
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

      setSubmitted(true);
      setFormData({ name: "", role: "", rating: 5, review: "" });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setShowDialog(false);
      }, 3000);
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
        <AnimatedSection className="text-center mb-16">
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
          
          {/* Share Your Experience Button */}
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                <MessageSquarePlus className="w-5 h-5 mr-2" />
                Share Your Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display text-center">
                  {submitted ? "Thank You!" : "Share Your Experience"}
                </DialogTitle>
              </DialogHeader>
              
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-center text-muted-foreground">
                    Your review has been submitted successfully!<br />
                    It will appear after approval.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="John Doe"
                      maxLength={100}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Role/Profession *</label>
                    <Input
                      value={formData.role}
                      onChange={(e) => {
                        setFormData({ ...formData, role: e.target.value });
                        if (errors.role) setErrors({ ...errors, role: undefined });
                      }}
                      placeholder="YouTuber, Blogger, etc."
                      maxLength={100}
                      className={errors.role ? "border-destructive" : ""}
                    />
                    {errors.role && (
                      <p className="text-sm text-destructive">{errors.role}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="transition-all hover:scale-125 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              star <= formData.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground hover:text-primary/50"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Review *</label>
                    <Textarea
                      value={formData.review}
                      onChange={(e) => {
                        setFormData({ ...formData, review: e.target.value });
                        if (errors.review) setErrors({ ...errors, review: undefined });
                      }}
                      placeholder="Share your experience working with us... (minimum 20 characters)"
                      rows={4}
                      maxLength={500}
                      className={errors.review ? "border-destructive" : ""}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {errors.review ? (
                        <p className="text-destructive">{errors.review}</p>
                      ) : (
                        <span>Minimum 20 characters</span>
                      )}
                      <span>{formData.review.length}/500</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90" 
                    disabled={submitting}
                    size="lg"
                  >
                    {submitting ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2">⏳</span>
                        Submitting...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Review
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    Your review will be visible after approval by our team.
                  </p>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.slice(0, 8).map((testimonial, index) => (
            <AnimatedSection
              key={testimonial.id}
              animation="scale"
              delay={index * 100}
            >
              <div className="glass-card rounded-2xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-300 group h-full">
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
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
