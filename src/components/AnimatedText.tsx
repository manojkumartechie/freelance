"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  typewriter?: boolean;
}

export default function AnimatedText({ 
  text, 
  className = '', 
  delay = 0, 
  duration = 1,
  typewriter = false 
}: AnimatedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    
    if (typewriter) {
      gsap.set(element, { text: '' });
      gsap.to(element, {
        text: text,
        duration: duration * 2,
        delay,
        ease: 'none',
      });
    } else {
      // Split text into characters for stagger animation
      const chars = text.split('').map(char => 
        `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
      
      element.innerHTML = chars;
      
      gsap.fromTo(element.children, 
        { opacity: 0, y: 20, rotationX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 0.8,
          delay,
          stagger: 0.02,
          ease: 'back.out(1.7)'
        }
      );
    }
  }, [text, delay, duration, typewriter]);

  return <span ref={textRef} className={className}></span>;
}