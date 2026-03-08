import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Maximize2, Minimize2, Square, Volume2, VolumeX, Home, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const JOTFORM_AGENT_ID = "019b8a9ef4a2706a97010c77b5fad0244ed8";

type SizeMode = "small" | "medium" | "large";

const createNotificationSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const playSound = () => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };
  return playSound;
};

const ChatSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sizeMode, setSizeMode] = useState<SizeMode>("small");
  const [showPulse, setShowPulse] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const playSoundRef = useRef<(() => void) | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    playSoundRef.current = createNotificationSound();
  }, []);

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

  const closeChat = () => { setIsOpen(false); setSizeMode("small"); };

  const cycleSize = () => {
    setSizeMode((prev) => prev === "small" ? "medium" : prev === "medium" ? "large" : "small");
  };

  const getSizeClasses = () => {
    switch (sizeMode) {
      case "small": return "bottom-20 right-4 w-[360px] h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)]";
      case "medium": return "bottom-20 right-4 w-[440px] h-[580px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)]";
      case "large": return "bottom-20 right-4 w-[600px] h-[80vh] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)]";
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
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ease-out ${
          isOpen
            ? "bg-destructive/90 hover:bg-destructive shadow-lg shadow-destructive/25"
            : "bg-gradient-to-br from-primary to-accent shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-110"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-destructive-foreground" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
            {(showPulse || hasNewMessage) && (
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full border-2 border-primary animate-pulse bg-accent" />
            )}
          </div>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className={`fixed z-[9998] flex flex-col transition-all duration-300 ease-out rounded-2xl overflow-hidden 
            border border-border/50 shadow-2xl shadow-black/20 backdrop-blur-sm
            animate-in slide-in-from-bottom-4 fade-in duration-300
            ${getSizeClasses()}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-b border-border/50 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full border-2 border-background" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-foreground leading-tight">Sam</span>
                <span className="text-[10px] text-muted-foreground leading-tight">AI Assistant • Online</span>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-muted/80"
                onClick={() => setSoundEnabled(!soundEnabled)}
                aria-label={soundEnabled ? "Mute" : "Unmute"}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-muted-foreground" /> : <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-muted/80"
                onClick={cycleSize}
                aria-label="Resize"
              >
                {getSizeIcon()}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-muted/80"
                onClick={scrollToTop}
                aria-label="Go to homepage"
              >
                <Home className="w-3.5 h-3.5 text-muted-foreground" />
              </Button>
            </div>
          </div>

          {/* Chat iframe */}
          <div className="flex-1 overflow-hidden bg-card">
            <iframe
              src={`https://agent.jotform.com/${JOTFORM_AGENT_ID}`}
              title="Chat with RR Creator Lab"
              className="w-full h-full border-0"
              allow="microphone"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatSidebar;
