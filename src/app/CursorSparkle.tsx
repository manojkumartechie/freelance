"use client";
import { useEffect, useRef, useState } from "react";

interface SwirlPuff {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  angle: number;
  swirlAngle: number;
  color: string;
}

const SWIRL_LIFETIME = 1100; // ms
const SWIRL_MIN_SIZE = 22;
const SWIRL_MAX_SIZE = 40;

function randomRGB() {
  const r = Math.floor(128 + Math.random() * 127);
  const g = Math.floor(128 + Math.random() * 127);
  const b = Math.floor(128 + Math.random() * 127);
  return `rgb(${r},${g},${b})`;
}

export default function CursorSparkle() {
  const [swirls, setSwirls] = useState<SwirlPuff[]>([]);
  const swirlId = useRef(0);
  const timeoutRefs = useRef<{ [id: number]: NodeJS.Timeout }>({});

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const id = swirlId.current++;
      const size = Math.random() * (SWIRL_MAX_SIZE - SWIRL_MIN_SIZE) + SWIRL_MIN_SIZE;
      const opacity = 0.18 + Math.random() * 0.18;
      const angle = Math.random() * 360;
      const swirlAngle = Math.random() * 360;
      const color = randomRGB();
      setSwirls((prev) => [
        ...prev,
        {
          id,
          x: e.clientX,
          y: e.clientY,
          size,
          opacity,
          angle,
          swirlAngle,
          color,
        },
      ]);
      timeoutRefs.current[id] = setTimeout(() => {
        setSwirls((prev) => prev.filter((f) => f.id !== id));
        delete timeoutRefs.current[id];
      }, SWIRL_LIFETIME);
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      Object.values(timeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

  // Swirl animation: use CSS keyframes to spiral out
  return (
    <div style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 9999 }}>
      {swirls.map((f) => (
        <span
          key={f.id}
          style={{
            position: "absolute",
            left: f.x - f.size / 2,
            top: f.y - f.size / 2,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            pointerEvents: "none",
            filter: "blur(6px)",
            animation: `swirl-fade ${SWIRL_LIFETIME}ms linear forwards, swirl-move-${f.id} ${SWIRL_LIFETIME}ms linear forwards`,
            background: f.color,
            borderRadius: "50%",
            mixBlendMode: "lighter"
          }}
        />
      ))}
      <style>{`
        @keyframes swirl-fade {
          0% { opacity: 0.7; transform: scale(1); }
          60% { opacity: 0.5; }
          100% { opacity: 0; transform: scale(1.22); }
        }
        ${swirls.map(f => `
          @keyframes swirl-move-${f.id} {
            0% { transform: translate(0,0) scale(1) rotate(0deg); }
            100% { transform: translate(${Math.cos(f.swirlAngle) * 32}px, ${Math.sin(f.swirlAngle) * 32}px) scale(1.22) rotate(${f.angle + 180}deg); }
          }
        `).join('')}
      `}</style>
    </div>
  );
} 