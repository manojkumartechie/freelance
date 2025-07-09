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

export default function BlowText({ text }: { text: string }) {
  // Just render the text as plain spans, no glow or lighting
  return (
    <span>{text}</span>
  );
} 