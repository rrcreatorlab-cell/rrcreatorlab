import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, Mail, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LetsConnect = () => {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc7w7_crTXDPXa1Rz_2OOkAX7k_5jq88dEdLr8KiiaICcGh5g/viewform?usp=header";

  const contactMethods = [
    {
      icon: Phone,
      title: "WhatsApp",
      value: "+91 9483886270",
      href: "https://wa.me/919483886270"
    },
    {
      icon: Mail,
      title: "Email",
      value: "rrcreatorlab@gmail.com",
      href: "mailto:rrcreatorlab@gmail.com"
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: "@rrcreatorlab",
      href: "https://instagram.com/rrcreatorlab"
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

            {/* Contact Info Section */}
            <div className="glass-card rounded-2xl p-8 border border-border/50">
              <h2 className="font-display text-2xl font-bold mb-4">Reach Out Directly</h2>
              <p className="text-muted-foreground mb-6">
                Prefer a quick chat? Connect with us through any of these channels.
              </p>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <method.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{method.title}</p>
                      <p className="text-muted-foreground text-sm">{method.value}</p>
                    </div>
                  </a>
                ))}
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
