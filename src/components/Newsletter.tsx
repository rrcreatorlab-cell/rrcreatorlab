import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AnimatedSection from "./AnimatedSection";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    setEmail("");
    
    toast({
      title: "Welcome aboard! 🎉",
      description: "You've successfully subscribed to our newsletter.",
    });
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container px-4 relative">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center glass-card p-8 md:p-12 rounded-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Free Growth Tips
            </div>

            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Get Weekly <span className="gradient-text">Creator Insights</span>
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join 500+ creators receiving actionable tips, trends, and strategies 
              to grow your YouTube and Instagram. No spam, just value.
            </p>

            {isSubmitted ? (
              <div className="flex items-center justify-center gap-3 text-green-400 py-4">
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">You're all set! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 bg-secondary/50 border-border/50 focus:border-primary"
                  />
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="h-12 px-8"
                  disabled={isLoading}
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              Unsubscribe anytime. We respect your inbox.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Newsletter;
