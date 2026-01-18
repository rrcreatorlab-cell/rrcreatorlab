import { useEffect, useState } from "react";
import { TrendingUp, Users } from "lucide-react";

const notifications = [
  { icon: TrendingUp, message: "The Currency India Official just hit 100K views!", time: "2 hours ago" },
  { icon: Users, message: "Sambodhi gained 5K subscribers this month", time: "5 hours ago" },
  { icon: TrendingUp, message: "Startup Stories reached 50K milestone!", time: "1 day ago" },
  { icon: Users, message: "V Filmy Steps grew 300% this quarter", time: "2 days ago" },
];

const SocialProofToast = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Show first notification after 5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Hide after 4 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    // Show next notification after 15 seconds
    const nextTimer = setTimeout(() => {
      if (!hasInteracted) {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }
    }, 15000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isVisible, currentIndex, hasInteracted]);

  const handleClose = () => {
    setIsVisible(false);
    setHasInteracted(true);
  };

  const notification = notifications[currentIndex];

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-24 left-6 z-40 max-w-xs animate-slide-in-right cursor-pointer"
      onClick={handleClose}
    >
      <div className="glass-card rounded-xl p-4 border border-primary/20 shadow-xl shadow-primary/10">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <notification.icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{notification.message}</p>
            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofToast;
