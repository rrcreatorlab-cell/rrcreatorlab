import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="contact">
      <div className="container relative z-10 px-4">
        <div className="relative max-w-4xl mx-auto">
          {/* Glow effects */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-blue-500/20 to-accent/20 rounded-3xl blur-2xl" />
          
          <div className="relative gradient-border rounded-3xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Limited Time Offer</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Ready to 
              <span className="gradient-text"> Blow Up</span> Your Socials?
            </h2>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Get 20% off your first order when you sign up today. 
              Join 10,000+ creators already crushing it on social media.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gradient" size="xl">
                Claim 20% Discount
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="ghost" size="lg">
                Questions? Chat with us
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              No credit card required • Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
