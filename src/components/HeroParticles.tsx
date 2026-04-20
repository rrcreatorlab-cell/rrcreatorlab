import { useEffect, useRef } from "react";

const HeroParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    if (isSmallScreen) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let isVisible = true;
    let lastTime = 0;
    const targetFps = 30;
    const frameInterval = 1000 / targetFps;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "hsla(175, 80%, 50%, ",
      "hsla(200, 100%, 60%, ",
      "hsla(280, 80%, 60%, ",
    ];

    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;
      if (time - lastTime < frameInterval) return;
      lastTime = time;

      const ww = window.innerWidth;
      const hh = window.innerHeight;
      ctx.clearRect(0, 0, ww, hh);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = ww;
        if (p.x > ww) p.x = 0;
        if (p.y < 0) p.y = hh;
        if (p.y > hh) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.fill();
      }
    };
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[3] pointer-events-none"
    />
  );
};

export default HeroParticles;
