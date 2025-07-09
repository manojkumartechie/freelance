"use client";
import { useEffect, useRef, useState } from "react";

interface FireSpark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  trail: { x: number; y: number; opacity: number }[];
}

const SPARK_COUNT = 8;
const SPARK_LIFETIME = 800;
const COLORS = [
  '#FF6B35', '#F7931E', '#FFD23F', '#FF4757', 
  '#FF6B81', '#FF9F43', '#FFA502', '#FF3838'
];

export default function EnhancedCursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sparks, setSparks] = useState<FireSpark[]>([]);
  const sparkId = useRef(0);
  const animationRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createSpark = (x: number, y: number) => {
      const velocity = Math.random() * 3 + 1;
      const angle = Math.random() * Math.PI * 2;
      const size = Math.random() * 4 + 2;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const maxLife = SPARK_LIFETIME + Math.random() * 400;

      return {
        id: sparkId.current++,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size,
        opacity: 1,
        color,
        life: maxLife,
        maxLife,
        trail: []
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePos.current = { ...mousePos.current };
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Calculate mouse velocity for more sparks on fast movement
      const dx = mousePos.current.x - lastMousePos.current.x;
      const dy = mousePos.current.y - lastMousePos.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      if (velocity > 2) {
        const sparkCount = Math.min(Math.floor(velocity / 10), SPARK_COUNT);
        
        setSparks(prev => {
          const newSparks = [];
          for (let i = 0; i < sparkCount; i++) {
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;
            newSparks.push(createSpark(
              mousePos.current.x + offsetX, 
              mousePos.current.y + offsetY
            ));
          }
          return [...prev, ...newSparks].slice(-50); // Limit total sparks
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setSparks(prev => {
        return prev.map(spark => {
          // Update trail
          spark.trail.push({ 
            x: spark.x, 
            y: spark.y, 
            opacity: spark.opacity * 0.5 
          });
          if (spark.trail.length > 8) {
            spark.trail.shift();
          }

          // Update position
          spark.x += spark.vx;
          spark.y += spark.vy;
          
          // Apply gravity and air resistance
          spark.vy += 0.1;
          spark.vx *= 0.98;
          spark.vy *= 0.98;
          
          // Update life and opacity
          spark.life -= 16;
          spark.opacity = Math.max(0, spark.life / spark.maxLife);
          
          // Shrink over time
          spark.size *= 0.995;

          return spark;
        }).filter(spark => spark.life > 0 && spark.size > 0.1);
      });

      // Render sparks
      sparks.forEach(spark => {
        // Draw trail
        spark.trail.forEach((point, index) => {
          const trailOpacity = point.opacity * (index / spark.trail.length);
          const trailSize = spark.size * (index / spark.trail.length) * 0.5;
          
          ctx.save();
          ctx.globalAlpha = trailOpacity;
          ctx.fillStyle = spark.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = spark.color;
          ctx.beginPath();
          ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Draw main spark
        ctx.save();
        ctx.globalAlpha = spark.opacity;
        ctx.fillStyle = spark.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = spark.color;
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size * 1.5, 0, Math.PI * 2);
        ctx.globalAlpha = spark.opacity * 0.3;
        ctx.fill();
        
        // Inner core
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.globalAlpha = spark.opacity;
        ctx.fill();
        
        // Bright center
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size * 0.3, 0, Math.PI * 2);
        ctx.globalAlpha = spark.opacity * 0.8;
        ctx.fill();
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [sparks]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}