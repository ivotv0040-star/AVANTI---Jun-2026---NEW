import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const AnnualGoalCard = () => {
  const progress = 60;
  const currentHours = 30;
  const targetHours = 50;
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const mouse = { x: 0, y: 0, isHovered: false };

    // Free floating particles list
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
    }
    let particles: Particle[] = [];

    // ResizeObserver to dynamically update canvas dimension when the container stretches/scales
    const ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    });
    ro.observe(container);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (width / (rect.width || 1));
      const y = (e.clientY - rect.top) * (height / (rect.height || 1));
      mouse.x = x;
      mouse.y = y;
      mouse.isHovered = true;

      // Spawn a cluster of gentle, floating particles exactly at the cursor position
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mouse.x, // spawn exactly at cursor x
          y: mouse.y, // spawn exactly at cursor y
          vx: (Math.random() - 0.5) * 0.9, // gentle horizontal drift
          vy: (Math.random() - 0.5) * 0.9 - 0.2, // gentle drift, slightly biased upwards
          alpha: 1.0,
          size: Math.random() * 2.2 + 1.2 // size between 1.2px and 3.4px
        });
      }
    };

    const onMouseEnter = () => {
      mouse.isHovered = true;
    };

    const onMouseLeave = () => {
      mouse.isHovered = false;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update free floating particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.007; // fade out slowly so they travel across the entire button

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <Card 
      ref={containerRef}
      onClick={() => navigate("/learning-hours")}
      className="p-6 bg-gradient-primary hover:bg-gradient-primary-neon cursor-pointer border-0 text-white relative overflow-hidden h-full flex flex-col justify-between transition-all duration-300 hover:shadow-purple hover:scale-[1.02] hover:-translate-y-0.5 group"
    >
      <div className="relative z-10 pointer-events-none">
        <h3 className="text-lg font-semibold mb-4">Meta Anual de Aprendizado</h3>
        
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray={`${progress}, 100`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{progress}%</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/80 text-sm mb-1">{currentHours} horas</p>
          <p className="text-lg font-semibold">{targetHours} horas</p>
        </div>
      </div>
      
      {/* Interactive canvas grid */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0" 
      />
      
      {/* Background decoration */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl z-0" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-lg z-0" />
    </Card>
  );
};