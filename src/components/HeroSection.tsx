"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "./AnimatedText";
import MagneticButton from "./MagneticButton";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function AnimatedSphere() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color="#FFD700"
          emissive="#FF69B4"
          emissiveIntensity={0.25}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, buttonRef.current], {
        opacity: 0,
        y: 100,
      });

      // Main timeline
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8")
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.6")
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, "-=0.4");

      // Parallax effect for hero content
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Floating animation for the glass card
      gsap.to(".hero-card", {
        y: -20,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
    >
      {/* 3D Animated Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 2.5] }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 2, 2]} intensity={1.2} />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
        </Canvas>
      </div>

      {/* Hero Content */}
      <motion.div
        className="hero-card relative z-20 p-12 rounded-3xl flex flex-col items-center gap-8 shadow-2xl max-w-2xl w-full mt-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div ref={titleRef} className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent">
            <AnimatedText text="Manoj Kumar" delay={1} />
          </h1>
        </div>

        <div ref={subtitleRef} className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary">
            <AnimatedText text="Freelance Data Engineer" delay={1.5} typewriter />
          </h2>
        </div>

        <div ref={descriptionRef} className="text-center">
          <p className="text-lg md:text-xl opacity-90 max-w-lg leading-relaxed">
            Building advanced data pipelines, analytics, and AI solutions for modern businesses with cutting-edge technology.
          </p>
        </div>

        <div ref={buttonRef}>
          <MagneticButton 
            className="mt-6 px-10 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold shadow-2xl hover:shadow-primary/25 transition-all duration-300 text-lg relative overflow-hidden group glass soft-light backdrop-blur-xl"
            strength={0.4}
          >
            <span className="relative z-10">Let's Connect</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </MagneticButton>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}