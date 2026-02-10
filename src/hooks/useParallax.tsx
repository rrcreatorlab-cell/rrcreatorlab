import { useEffect, useState } from "react";

export const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getParallaxStyle = (speed: number = 0.1, direction: "y" | "x" = "y") => ({
    transform: direction === "y"
      ? `translateY(${scrollY * speed}px)`
      : `translateX(${scrollY * speed}px)`,
  });

  return { scrollY, getParallaxStyle };
};
