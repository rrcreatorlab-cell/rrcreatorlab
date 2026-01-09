import { useState, useEffect } from "react";
import { MessageCircle, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const FallbackContactButton = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if JotForm widget loaded
      const jotformWidget = document.querySelector('[class*="jotform"]') || 
                           document.querySelector('iframe[src*="jotform"]') ||
                           document.querySelector('[id*="JotFormAgent"]');
      
      if (!jotformWidget) {
        setShowFallback(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!showFallback) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9998] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="bg-card border border-border rounded-xl shadow-2xl p-4 mb-2 animate-in slide-in-from-bottom-2 fade-in duration-200">
          <p className="text-sm text-muted-foreground mb-3 font-medium">Chat unavailable. Contact us:</p>
          <div className="flex flex-col gap-2">
            <a
              href="https://wa.me/919483886270"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href="mailto:rrcreatorlab@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors text-sm font-medium"
            >
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </div>
        </div>
      )}
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
};

export default FallbackContactButton;
