import { useState, useEffect } from "react";
import { MessageCircle, X, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const JOTFORM_AGENT_URL = "https://agent.jotform.com/019b8a9ef4a2706a97010c77b5fad0244ed8";

const ChatSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  // Stop pulse animation after first interaction
  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

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

      {/* Chat Sidebar / Fullscreen Panel */}
      {isOpen && (
        <>
          {/* Backdrop for fullscreen mode */}
          {isFullscreen && (
            <div
              className="fixed inset-0 bg-black/50 z-[9998] animate-fade-in"
              onClick={() => setIsFullscreen(false)}
            />
          )}

          <div
            className={`fixed z-[9999] bg-card border border-border shadow-2xl flex flex-col transition-all duration-300 ease-out ${
              isFullscreen
                ? "inset-4 rounded-2xl"
                : "bottom-4 right-4 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-2rem)] rounded-2xl"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium text-sm text-foreground">Chat with Sam</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setIsOpen(false);
                    setIsFullscreen(false);
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
        </>
      )}
    </>
  );
};

export default ChatSidebar;
