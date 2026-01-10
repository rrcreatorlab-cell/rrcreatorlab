import { useState, useEffect } from "react";
import { MessageCircle, X, Maximize2, Minimize2, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

const JOTFORM_AGENT_URL = "https://agent.jotform.com/019b8a9ef4a2706a97010c77b5fad0244ed8";

type SizeMode = "small" | "medium" | "large";

const ChatSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sizeMode, setSizeMode] = useState<SizeMode>("small");
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    if (isOpen) setShowPulse(false);
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
        return "bottom-4 right-4 w-[320px] h-[400px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]";
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
          className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-lg ${
            showPulse ? "animate-pulse" : ""
          }`}
          size="icon"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Panel - Always visible alongside website */}
      {isOpen && (
        <div
          className={`fixed z-[9999] bg-card border border-border shadow-2xl flex flex-col transition-all duration-300 ease-out rounded-2xl ${getSizeClasses()}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/50 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium text-sm text-foreground">Chat with Sam</span>
            </div>
            <div className="flex items-center gap-1">
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
              src={JOTFORM_AGENT_URL}
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
