"use client";
import { useRef, useState } from "react";
import gsap from "gsap";

interface BlowTextProps {
  text: string;
  distance?: number; // max px letters fly
  rotation?: number; // max deg letters spin
  duration?: number; // animation duration (s)
  restoreDelay?: number; // ms before restore
  glowColor?: string;
  className?: string;
}

export default function BlowText({
  text,
  distance = 60,
  rotation = 60,
  duration = 0.7,
  restoreDelay = 800,
  glowColor,
  className = ""
}: BlowTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [blown, setBlown] = useState(false);

  // Split text into spans
  const letters = text.split("").map((char, i) => (
    <span key={i} className="inline-block">{char === " " ? '\u00A0' : char}</span>
  ));

  const blow = () => {
    if (blown || !ref.current) return;
    setBlown(true);
    const spans = ref.current.querySelectorAll('span');
    gsap.to(spans, {
      y: () => gsap.utils.random(-distance / 2, distance / 2),
      x: () => gsap.utils.random(-distance, distance),
      rotation: () => gsap.utils.random(-rotation, rotation),
      opacity: 0,
      stagger: 0.03,
      duration,
      ease: "power2.out"
    });
    setTimeout(() => {
      gsap.to(spans, {
        y: 0,
        x: 0,
        rotation: 0,
        opacity: 1,
        stagger: 0.01,
        duration: 0.5,
        ease: "power2.inOut"
      });
      setTimeout(() => setBlown(false), 500);
    }, restoreDelay);
  };

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', cursor: 'pointer' }}
      onMouseDown={blow}
      onTouchStart={blow}
      onMouseEnter={blow}
    >
      {letters}
    </span>
  );
} 