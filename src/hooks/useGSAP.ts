import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export const useGSAP = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {}, ref);
    return () => ctx.revert();
  }, []);

  return { ref, gsap, ScrollTrigger };
};

export const useScrollAnimation = (
  trigger: string,
  animation: gsap.TweenVars,
  options?: ScrollTrigger.Vars
) => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...options,
      },
    });

    tl.fromTo(trigger, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ...animation });

    return () => {
      tl.kill();
    };
  }, [trigger, animation, options]);
};

export const useParallax = (element: string, speed: number = 0.5) => {
  useEffect(() => {
    gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, [element, speed]);
};