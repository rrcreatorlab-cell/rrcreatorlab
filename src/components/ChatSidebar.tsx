import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Maximize2, Minimize2, Square, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const JOTFORM_AGENT_ID = "019b8a9ef4a2706a97010c77b5fad0244ed8";

type SizeMode = "small" | "medium" | "large";

// Create notification sound using Web Audio API
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

  // Initialize notification sound
  useEffect(() => {
    playSoundRef.current = createNotificationSound();
  }, []);

  // Play notification sound
  const playNotification = useCallback(() => {
    if (soundEnabled && playSoundRef.current) {
      try {
        playSoundRef.current();
      } catch (e) {
        console.log("Audio playback failed:", e);
      }
    }
  }, [soundEnabled]);

  // Load JotForm embed script
  useEffect(() => {
    const existingScript = document.querySelector(`script[src*="jotfor.ms/agent/embedjs/${JOTFORM_AGENT_ID}"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://cdn.jotfor.ms/agent/embedjs/${JOTFORM_AGENT_ID}/embed.js`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Monitor for new messages and play sound
  useEffect(() => {
    if (!isOpen) return;

    const checkForNewMessages = () => {
      const chatContainer = document.querySelector('[class*="jotform"]') || 
                           document.querySelector('iframe[src*="jotform"]');
      
      if (chatContainer) {
        // Set up mutation observer to detect DOM changes (new messages)
        if (observerRef.current) {
          observerRef.current.disconnect();
        }

        observerRef.current = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
              // New content detected - likely a new message
              if (!document.hasFocus() || !isOpen) {
                setHasNewMessage(true);
                playNotification();
              }
            }
          });
        });

        observerRef.current.observe(document.body, {
          childList: true,
          subtree: true,
        });
      }
    };

    const timer = setTimeout(checkForNewMessages, 1000);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isOpen, playNotification]);

  useEffect(() => {
    if (isOpen) {
      setShowPulse(false);
      setHasNewMessage(false);
    }
  }, [isOpen]);

  const cycleSize = () => {
    setSizeMode((prev) => {
      if (prev === "small") return "medium";
      if (prev === "medium") return "large";
      return "small";
    });
  };

  const getSizeClasses = () => {
    switch (sizeMode) {
      case "small":
        return "bottom-4 right-4 w-[340px] h-[480px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]";
      case "medium":
        return "bottom-4 right-4 w-[420px] h-[550px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]";
      case "large":
        return "bottom-4 right-4 w-[600px] h-[80vh] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]";
    }
  };

  const getSizeIcon = () => {
    switch (sizeMode) {
      case "small":
        return <Maximize2 className="w-4 h-4" />;
      case "medium":
        return <Square className="w-4 h-4" />;
      case "large":
        return <Minimize2 className="w-4 h-4" />;
    }
  };

  const getSizeLabel = () => {
    switch (sizeMode) {
      case "small":
        return "Expand";
      case "medium":
        return "Full";
      case "large":
        return "Compact";
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-[9999] h-12 px-4 rounded-full shadow-lg flex items-center gap-2 ${
            showPulse || hasNewMessage ? "animate-pulse" : ""
          }`}
          aria-label="Open chat"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium text-sm">Chat</span>
          {hasNewMessage && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          )}
        </Button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className={`fixed z-[9999] bg-card border border-border shadow-2xl flex flex-col transition-all duration-300 ease-out rounded-2xl ${getSizeClasses()}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/50 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium text-sm text-foreground">Chat with Sam</span>
            </div>
            <div className="flex items-center gap-1">
              {/* Sound toggle button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setSoundEnabled(!soundEnabled)}
                aria-label={soundEnabled ? "Mute notifications" : "Enable notifications"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              {/* Size toggle button */}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs gap-1"
                onClick={cycleSize}
                aria-label={getSizeLabel()}
              >
                {getSizeIcon()}
                <span className="hidden sm:inline">{getSizeLabel()}</span>
              </Button>
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => {
                  setIsOpen(false);
                  setSizeMode("small");
                }}
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chat iframe */}
          <div className="flex-1 overflow-hidden rounded-b-2xl">
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
