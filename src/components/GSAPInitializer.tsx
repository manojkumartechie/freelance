"use client";
import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function GSAPInitializer() {
  useEffect(() => {
    // Dynamically import and register GSAP plugins on the client side only
    const loadPlugins = async () => {
      const [
        { ScrollTrigger },
        { TextPlugin },
        { ScrollToPlugin }
      ] = await Promise.all([
        import('gsap/ScrollTrigger'),
        import('gsap/TextPlugin'),
        import('gsap/ScrollToPlugin')
      ]);

      gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);
    };

    loadPlugins();
  }, []);

  return null;
}