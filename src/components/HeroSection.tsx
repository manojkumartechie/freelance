"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, Box, Cylinder } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedText from "./AnimatedText";
import MagneticButton from "./MagneticButton";
import { Object3DContext } from "@/app/Object3DContext";
import BlowText from "./BlowText";
import * as THREE from "three";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function AnimatedRobot() {
  const robotRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (robotRef.current) {
      // Gentle floating animation
      gsap.to(robotRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
      
      gsap.to(robotRef.current.position, {
        y: 0.3,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });
    }
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={robotRef}>
        {/* Robot Head */}
        <Box position={[0, 1.2, 0]} args={[0.8, 0.8, 0.8]} castShadow receiveShadow>
          <meshStandardMaterial
            color="#E8E8E8"
            metalness={0.7}
            roughness={0.3}
            emissive="#B0C4DE"
            emissiveIntensity={0.1}
          />
        </Box>
        
        {/* Robot Eyes */}
        <Sphere position={[-0.2, 1.3, 0.4]} args={[0.1]} castShadow>
          <meshStandardMaterial
            color="#00C9A7"
            emissive="#00C9A7"
            emissiveIntensity={0.8}
          />
        </Sphere>
        <Sphere position={[0.2, 1.3, 0.4]} args={[0.1]} castShadow>
          <meshStandardMaterial
            color="#00C9A7"
            emissive="#00C9A7"
            emissiveIntensity={0.8}
          />
        </Sphere>
        
        {/* Robot Antenna */}
        <Cylinder position={[0, 1.8, 0]} args={[0.02, 0.02, 0.4]} castShadow>
          <meshStandardMaterial color="#FF6B81" />
        </Cylinder>
        <Sphere position={[0, 2.1, 0]} args={[0.08]} castShadow>
          <meshStandardMaterial
            color="#FF6B81"
            emissive="#FF6B81"
            emissiveIntensity={0.6}
          />
        </Sphere>
        
        {/* Robot Body */}
        <Box position={[0, 0.2, 0]} args={[1.2, 1.4, 0.8]} castShadow receiveShadow>
          <meshStandardMaterial
            color="#D3D3D3"
            metalness={0.8}
            roughness={0.2}
            emissive="#A9A9A9"
            emissiveIntensity={0.05}
          />
        </Box>
        
        {/* Robot Chest Panel */}
        <Box position={[0, 0.3, 0.41]} args={[0.6, 0.8, 0.05]} castShadow>
          <meshStandardMaterial
            color="#1E1E1E"
            metalness={0.9}
            roughness={0.1}
          />
        </Box>
        
        {/* Robot Arms */}
        <Cylinder position={[-0.8, 0.2, 0]} args={[0.15, 0.15, 1]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <meshStandardMaterial
            color="#C0C0C0"
            metalness={0.7}
            roughness={0.3}
          />
        </Cylinder>
        <Cylinder position={[0.8, 0.2, 0]} args={[0.15, 0.15, 1]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <meshStandardMaterial
            color="#C0C0C0"
            metalness={0.7}
            roughness={0.3}
          />
        </Cylinder>
        
        {/* Robot Hands */}
        <Sphere position={[-1.4, 0.2, 0]} args={[0.2]} castShadow>
          <meshStandardMaterial
            color="#808080"
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
        <Sphere position={[1.4, 0.2, 0]} args={[0.2]} castShadow>
          <meshStandardMaterial
            color="#808080"
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
        
        {/* Robot Legs */}
        <Cylinder position={[-0.3, -0.8, 0]} args={[0.18, 0.18, 1.2]} castShadow>
          <meshStandardMaterial
            color="#B8B8B8"
            metalness={0.7}
            roughness={0.3}
          />
        </Cylinder>
        <Cylinder position={[0.3, -0.8, 0]} args={[0.18, 0.18, 1.2]} castShadow>
          <meshStandardMaterial
            color="#B8B8B8"
            metalness={0.7}
            roughness={0.3}
          />
        </Cylinder>
        
        {/* Robot Feet */}
        <Box position={[-0.3, -1.6, 0.2]} args={[0.4, 0.2, 0.6]} castShadow>
          <meshStandardMaterial
            color="#696969"
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
        <Box position={[0.3, -1.6, 0.2]} args={[0.4, 0.2, 0.6]} castShadow>
          <meshStandardMaterial
            color="#696969"
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
      </group>
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
      {/* 3D Animated Robot Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <pointLight position={[-5, 5, 5]} intensity={0.5} color="#00C9A7" />
          <pointLight position={[5, -5, 5]} intensity={0.5} color="#FF6B81" />
          <AnimatedRobot />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
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