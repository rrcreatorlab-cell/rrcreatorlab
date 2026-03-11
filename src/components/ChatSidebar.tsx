import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Maximize2, Minimize2, Square, Home, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const JOTFORM_AGENT_ID = "019b8a9ef4a2706a97010c77b5fad0244ed8";

type SizeMode = "small" | "medium" | "large";

const ChatSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sizeMode, setSizeMode] = useState<SizeMode>("small");
  const [showPulse, setShowPulse] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  // Show tooltip after 3 seconds if chat hasn't been opened
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setShowTooltip(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowTooltip(false);
    }
  }, [isOpen]);

  // Auto-hide tooltip after 5 seconds
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const playNotification = useCallback(() => {
    if (soundEnabled && playSoundRef.current) {
      try { playSoundRef.current(); } catch (e) { console.log("Audio playback failed:", e); }
    }
  }, [soundEnabled]);

  useEffect(() => {
    const removeJotformElements = () => {
      document.querySelectorAll('[id*="jotform"], [class*="jotform-agent"]').forEach(el => {
        if (!chatContainerRef.current?.contains(el)) el.remove();
      });
    };
    removeJotformElements();
    const timer = setTimeout(removeJotformElements, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const checkForNewMessages = () => {
      const chatContainer = document.querySelector('[class*="jotform"]') || document.querySelector('iframe[src*="jotform"]');
      if (chatContainer) {
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0 && (!document.hasFocus() || !isOpen)) {
              setHasNewMessage(true);
              playNotification();
            }
          });
        });
        observerRef.current.observe(document.body, { childList: true, subtree: true });
      }
    };
    const timer = setTimeout(checkForNewMessages, 1000);
    return () => { clearTimeout(timer); observerRef.current?.disconnect(); };
  }, [isOpen, playNotification]);

  useEffect(() => {
    if (isOpen) { setShowPulse(false); setHasNewMessage(false); }
  }, [isOpen]);

  const closeChat = () => { setIsOpen(false); setSizeMode("small"); setIframeLoaded(false); };

  const cycleSize = () => {
    setSizeMode((prev) => prev === "small" ? "medium" : prev === "medium" ? "large" : "small");
  };

  const getSizeClasses = () => {
    switch (sizeMode) {
      case "small": return "bottom-24 right-4 w-[370px] h-[520px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-7rem)]";
      case "medium": return "bottom-24 right-4 w-[440px] h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-7rem)]";
      case "large": return "bottom-24 right-4 w-[600px] h-[80vh] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-7rem)]";
    }
  };

  const getSizeIcon = () => {
    switch (sizeMode) {
      case "small": return <Maximize2 className="w-3.5 h-3.5" />;
      case "medium": return <Square className="w-3.5 h-3.5" />;
      case "large": return <Minimize2 className="w-3.5 h-3.5" />;
    }
  };

  const scrollToTop = () => {
    closeChat();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Tooltip bubble */}
      {showTooltip && !isOpen && (
        <div className="fixed bottom-[88px] right-6 z-[9999] animate-fade-in">
          <div className="relative bg-card border border-border/60 rounded-2xl px-4 py-3 shadow-xl shadow-primary/10 max-w-[200px]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <p className="text-xs text-foreground font-medium leading-tight">
                Hi! Need help? Chat with <span className="text-primary font-semibold">Sam</span> 👋
              </p>
            </div>
            {/* Arrow pointing down */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-card border-b border-r border-border/60 rotate-45" />
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => { if (!isOpen && soundEnabled && playOpenSoundRef.current) { try { playOpenSoundRef.current(); } catch(e) {} } setIsOpen(!isOpen); setShowTooltip(false); }}
        onMouseEnter={() => !isOpen && setShowTooltip(false)}
        className={`fixed bottom-6 right-6 z-[9999] group transition-all duration-500 ease-out ${
          isOpen ? "" : ""
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <div className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ease-out ${
          isOpen
            ? "bg-destructive/90 hover:bg-destructive shadow-lg shadow-destructive/25 rotate-0"
            : "bg-gradient-to-br from-primary via-primary to-accent shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-110"
        }`}>
          {/* Ripple ring animation */}
          {!isOpen && (showPulse || hasNewMessage) && (
            <>
              <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping" />
              <span className="absolute inset-[-4px] rounded-full border border-primary/20 animate-pulse" />
            </>
          )}
          
          {isOpen ? (
            <X className="w-5 h-5 text-destructive-foreground transition-transform duration-300" />
          ) : (
            <div className="relative">
              <MessageCircle className="w-6 h-6 text-primary-foreground transition-transform duration-300 group-hover:scale-110" />
              {(showPulse || hasNewMessage) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent border-2 border-primary shadow-lg shadow-accent/50">
                  <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
                </span>
              )}
            </div>
          )}
        </div>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className={`fixed z-[9998] flex flex-col transition-all duration-300 ease-out overflow-hidden 
            shadow-2xl shadow-black/30
            animate-scale-in
            ${getSizeClasses()}`}
          style={{ borderRadius: "20px" }}
        >
          {/* Header */}
          <div className="relative flex items-center justify-between px-4 py-3 border-b border-border/30"
            style={{
              background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--secondary)) 100%)",
            }}
          >
            {/* Subtle gradient line at top */}
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "var(--gradient-primary)" }} />
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md shadow-primary/20">
                  <Bot className="w-4.5 h-4.5 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full border-2 border-card shadow-sm shadow-accent/50" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-foreground leading-tight tracking-tight">Sam</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] text-muted-foreground leading-tight">Online now</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-muted/60 transition-colors"
                onClick={() => setSoundEnabled(!soundEnabled)}
                aria-label={soundEnabled ? "Mute" : "Unmute"}
              >
                {soundEnabled 
                  ? <Volume2 className="w-3.5 h-3.5 text-muted-foreground" /> 
                  : <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />
                }
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-muted/60 transition-colors"
                onClick={cycleSize}
                aria-label="Resize"
              >
                {getSizeIcon()}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-muted/60 transition-colors"
                onClick={scrollToTop}
                aria-label="Go to homepage"
              >
                <Home className="w-3.5 h-3.5 text-muted-foreground" />
              </Button>
              <div className="w-px h-5 bg-border/50 mx-0.5" />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                onClick={closeChat}
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Loading state */}
          {!iframeLoaded && (
            <div className="absolute inset-0 top-[52px] z-10 flex flex-col items-center justify-center gap-4 bg-card">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Bot className="w-7 h-7 text-primary" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-medium text-foreground">Connecting to Sam...</span>
                <span className="text-xs text-muted-foreground">This won't take long</span>
              </div>
              {/* Typing dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* Chat iframe */}
          <div className="flex-1 overflow-hidden bg-card">
            <iframe
              src={`https://agent.jotform.com/${JOTFORM_AGENT_ID}`}
              title="Chat with RR Creator Lab"
              className="w-full h-full border-0"
              allow="microphone"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>

          {/* Footer branding */}
          <div className="flex items-center justify-center gap-1.5 py-2 bg-card border-t border-border/30">
            <Sparkles className="w-3 h-3 text-primary/60" />
            <span className="text-[10px] text-muted-foreground">Powered by <span className="text-primary/80 font-medium">RR Creator Lab</span></span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatSidebar;
