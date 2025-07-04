"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "./AnimatedText";
import MagneticButton from "./MagneticButton";
import { Object3DContext } from "@/app/Object3DContext";
import BlowText from "./BlowText";
import { Shape } from "three";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function AnimatedDatabase() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      {/* Bottom Cylinder */}
      <mesh position={[0, -0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 1.1, 0.5, 64]} />
        <meshStandardMaterial
          color="#B0C4DE"
          metalness={0.8}
          roughness={0.25}
          emissive="#A9A9A9"
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Top Cylinder */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.5, 64]} />
        <meshStandardMaterial
          color="#E0E7EF"
          metalness={0.9}
          roughness={0.18}
          emissive="#B0C4DE"
          emissiveIntensity={0.12}
        />
      </mesh>
    </Float>
  );
}

function AnimatedStar() {
  // Five-pointed star geometry
  // We'll use a custom shape for the star
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2.5}>
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <extrudeGeometry args={[
          (() => {
            const shape = new Shape();
            const outerRadius = 1.1;
            const innerRadius = 0.45;
            const spikes = 5;
            let rot = Math.PI / 2 * 3;
            let step = Math.PI / spikes;
            shape.moveTo(0, -outerRadius);
            for (let i = 0; i < spikes; i++) {
              shape.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius);
              rot += step;
              shape.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius);
              rot += step;
            }
            shape.lineTo(0, -outerRadius);
            return shape;
          })(),
          { depth: 0.4, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1, bevelSegments: 2 }
        ]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={1}
          roughness={0.15}
          emissive="#FFF700"
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { objectType } = useContext(Object3DContext);

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
          <AnimatedStar />
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
            <BlowText text="Manoj Kumar" distance={90} rotation={80} glowColor="#FFD700" />
          </h1>
        </div>

        <div ref={subtitleRef} className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary">
            <BlowText text="Freelance Data Engineer" distance={60} rotation={50} glowColor="#00C9A7" />
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