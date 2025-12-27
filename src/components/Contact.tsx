import { Button } from "@/components/ui/button";
import { Instagram, Mail, MessageCircle, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="contact">
      <div className="container relative z-10 px-4">
        <div className="relative max-w-4xl mx-auto">
          {/* Glow effects */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-blue-500/20 to-accent/20 rounded-3xl blur-2xl" />
          
          <div className="relative gradient-border rounded-3xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Let's Connect</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Ready to 
              <span className="gradient-text"> Grow?</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              DM us on Instagram or send us an email to get started. 
              We'd love to hear about your content goals and how we can help.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button variant="gradient" size="xl" asChild>
                <a href="https://instagram.com/rrcreatorlab" target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2 h-5 w-5" />
                  @rrcreatorlab
                </a>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <a href="mailto:rrcreatorlab@gmail.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <ArrowRight className="h-4 w-4" />
              <span>Quick response within 24 hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
