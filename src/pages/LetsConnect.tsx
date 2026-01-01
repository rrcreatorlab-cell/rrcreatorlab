import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, Users, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import founderImage from "@/assets/founder-rishabh.jpeg";

const LetsConnect = () => {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc7w7_crTXDPXa1Rz_2OOkAX7k_5jq88dEdLr8KiiaICcGh5g/viewform?usp=header";

  const values = [
    {
      icon: Heart,
      title: "Quality over quantity",
      description: "Every project is handled with attention to detail."
    },
    {
      icon: Users,
      title: "Client-first approach",
      description: "We focus on long-term relationships, not short-term results."
    },
    {
      icon: Lightbulb,
      title: "Continuous learning & innovation",
      description: "We adapt to trends, tools, and platforms to deliver the best outcomes."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary mb-6">
              Ready to Grow?
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fill out our form to get started and meet the person behind RR Creator Lab.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Google Form Section */}
            <div className="glass-card rounded-2xl p-8 border border-border/50">
              <h2 className="font-display text-2xl font-bold mb-4">Get Started</h2>
              <p className="text-muted-foreground mb-6">
                Fill out our quick form and we'll get back to you within 24 hours with a personalized growth plan.
              </p>
              <Button variant="hero" size="lg" className="w-full" asChild>
                <a href={googleFormUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Open Application Form
                </a>
              </Button>
            </div>

            {/* Meet the Founder Section */}
            <div className="glass-card rounded-2xl p-8 border border-border/50">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary via-blue-500 to-accent rounded-full blur-lg opacity-50" />
                  <img
                    src={founderImage}
                    alt="Rishabh Alevoor - Founder & CEO"
                    className="relative w-24 h-24 rounded-full object-cover border-2 border-primary/50"
                  />
                </div>
                <h2 className="font-display text-2xl font-bold mb-1">Rishabh Alevoor</h2>
                <p className="text-primary text-sm mb-4">Founder & CEO, RR Creator Lab</p>
                <p className="text-muted-foreground text-sm mb-6">
                  I started RR Creator Lab to help creators and businesses grow with the right strategy, creativity, and consistency.
                </p>

                {/* Core Values */}
                <div className="w-full space-y-3">
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-border/50 text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <value.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{value.title}</p>
                        <p className="text-muted-foreground text-xs">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LetsConnect;
