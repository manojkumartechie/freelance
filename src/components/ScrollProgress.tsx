"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';


export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      transformOrigin: 'left',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white/10">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-primary via-accent to-primary scale-x-0"
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}