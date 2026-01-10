import { useEffect, useMemo, useState } from "react";
import { Mail, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FALLBACK_DELAY_MS = 5000;
const STOP_POLLING_AFTER_MS = 20000;
const POLL_INTERVAL_MS = 750;

const FallbackContactButton = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const widgetSelectors = useMemo(
    () =>
      [
        // Common agent/chat embeds
        'iframe[src*="jotform"]',
        'iframe[src*="jotfor"]',
        'iframe[src*="jotfor.ms"]',
        '[id*="JotFormAgent"]',
        '[id*="JotformAgent"]',
        '[id*="jotform"]',
        '[class*="jotform"]',
      ].join(","),
    []
  );

  useEffect(() => {
    const detectWidget = () => !!document.querySelector(widgetSelectors);

    const startedAt = Date.now();

    // If the widget is already present, never show fallback.
    if (detectWidget()) {
      setShowFallback(false);
      return;
    }

    const poll = () => {
      const found = detectWidget();

      if (found) {
        setShowFallback(false);
        return;
      }

      const elapsed = Date.now() - startedAt;
      if (elapsed >= FALLBACK_DELAY_MS) setShowFallback(true);
    };

    const interval = window.setInterval(() => {
      poll();

      const elapsed = Date.now() - startedAt;
      if (elapsed >= STOP_POLLING_AFTER_MS) {
        window.clearInterval(interval);
        observer.disconnect();
      }
    }, POLL_INTERVAL_MS);

    const observer = new MutationObserver(() => {
      if (detectWidget()) {
        setShowFallback(false);
      }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    return () => {
      window.clearInterval(interval);
      observer.disconnect();
    };
  }, [widgetSelectors]);

  // Close the fallback panel if we stop showing the fallback.
  useEffect(() => {
    if (!showFallback) setIsOpen(false);
  }, [showFallback]);

  if (!showFallback) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9998] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="bg-card border border-border rounded-xl shadow-2xl p-4 mb-2 animate-in slide-in-from-bottom-2 fade-in duration-200">
          <p className="text-sm text-muted-foreground mb-3 font-medium">
            Chat unavailable. Contact us:
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="https://wa.me/919483886270"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg transition-colors text-sm font-medium"
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
        className="w-14 h-14 rounded-full shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
};

export default FallbackContactButton;
