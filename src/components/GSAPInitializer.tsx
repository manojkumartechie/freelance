"use client";
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default function GSAPInitializer() {
  useEffect(() => {
    // Register all GSAP plugins on the client side only
    gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);
  }, []);

  return null;
}