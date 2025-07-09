"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, Box, Cylinder, RoundedBox } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import AnimatedText from "./AnimatedText";
import MagneticButton from "./MagneticButton";
import { Object3DContext } from "@/app/Object3DContext";
import BlowText from "./BlowText";
import * as THREE from "three";


function HumanizedRobot() {
  const robotRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (robotRef.current) {
      // Main robot rotation
      gsap.to(robotRef.current.rotation, {
        y: Math.PI * 2,
        duration: 30,
        repeat: -1,
        ease: "none"
      });
      
      // Gentle floating
      gsap.to(robotRef.current.position, {
        y: 0.2,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });
    }

    // Head subtle movement
    if (headRef.current) {
      gsap.to(headRef.current.rotation, {
        x: 0.1,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });
    }

    // Arm movements
    if (leftArmRef.current) {
      gsap.to(leftArmRef.current.rotation, {
        z: 0.2,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });
    }

    if (rightArmRef.current) {
      gsap.to(rightArmRef.current.rotation, {
        z: -0.15,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });
    }
  }, []);

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={robotRef} scale={[0.8, 0.8, 0.8]}>
        
        {/* Head Assembly */}
        <group ref={headRef} position={[0, 1.8, 0]}>
          {/* Main Head - More human proportions */}
          <RoundedBox args={[0.9, 1.1, 0.8]} radius={0.15} smoothness={4} castShadow receiveShadow>
            <meshStandardMaterial
              color="#F5F5F5"
              metalness={0.3}
              roughness={0.4}
              emissive="#E8E8E8"
              emissiveIntensity={0.05}
            />
          </RoundedBox>
          
          {/* Face Plate */}
          <RoundedBox position={[0, 0.1, 0.35]} args={[0.7, 0.8, 0.1]} radius={0.1} smoothness={4} castShadow>
            <meshStandardMaterial
              color="#2C3E50"
              metalness={0.8}
              roughness={0.2}
              emissive="#34495E"
              emissiveIntensity={0.1}
            />
          </RoundedBox>
          
          {/* Eyes - More realistic */}
          <Sphere position={[-0.18, 0.15, 0.42]} args={[0.08]} castShadow>
            <meshStandardMaterial
              color="#00D4FF"
              emissive="#00D4FF"
              emissiveIntensity={0.9}
              transparent
              opacity={0.9}
            />
          </Sphere>
          <Sphere position={[0.18, 0.15, 0.42]} args={[0.08]} castShadow>
            <meshStandardMaterial
              color="#00D4FF"
              emissive="#00D4FF"
              emissiveIntensity={0.9}
              transparent
              opacity={0.9}
            />
          </Sphere>
          
          {/* Eye Sockets */}
          <RoundedBox position={[-0.18, 0.15, 0.38]} args={[0.15, 0.15, 0.08]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color="#1A252F" metalness={0.9} roughness={0.1} />
          </RoundedBox>
          <RoundedBox position={[0.18, 0.15, 0.38]} args={[0.15, 0.15, 0.08]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color="#1A252F" metalness={0.9} roughness={0.1} />
          </RoundedBox>
          
          {/* Mouth/Speaker Grille */}
          <RoundedBox position={[0, -0.2, 0.4]} args={[0.3, 0.1, 0.05]} radius={0.02} smoothness={4}>
            <meshStandardMaterial color="#1A1A1A" metalness={0.7} roughness={0.3} />
          </RoundedBox>
          
          {/* Head Details */}
          <Cylinder position={[-0.35, 0.3, 0.2]} args={[0.03, 0.03, 0.15]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#FF6B81" emissive="#FF6B81" emissiveIntensity={0.3} />
          </Cylinder>
          <Cylinder position={[0.35, 0.3, 0.2]} args={[0.03, 0.03, 0.15]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#FF6B81" emissive="#FF6B81" emissiveIntensity={0.3} />
          </Cylinder>
        </group>

        {/* Neck */}
        <Cylinder position={[0, 1.2, 0]} args={[0.15, 0.18, 0.3]} castShadow>
          <meshStandardMaterial color="#D0D0D0" metalness={0.7} roughness={0.3} />
        </Cylinder>

        {/* Torso */}
        <RoundedBox position={[0, 0.4, 0]} args={[1.4, 1.6, 0.9]} radius={0.1} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial
            color="#E0E0E0"
            metalness={0.6}
            roughness={0.3}
            emissive="#CCCCCC"
            emissiveIntensity={0.03}
          />
        </RoundedBox>
        
        {/* Chest Panel */}
        <RoundedBox position={[0, 0.6, 0.46]} args={[0.8, 1, 0.08]} radius={0.05} smoothness={4} castShadow>
          <meshStandardMaterial
            color="#2C3E50"
            metalness={0.9}
            roughness={0.1}
            emissive="#34495E"
            emissiveIntensity={0.1}
          />
        </RoundedBox>
        
        {/* Chest Light */}
        <Sphere position={[0, 0.8, 0.52]} args={[0.08]} castShadow>
          <meshStandardMaterial
            color="#00C9A7"
            emissive="#00C9A7"
            emissiveIntensity={1.2}
            transparent
            opacity={0.8}
          />
        </Sphere>

        {/* Shoulder Joints */}
        <Sphere position={[-0.8, 0.8, 0]} args={[0.2]} castShadow>
          <meshStandardMaterial color="#B0B0B0" metalness={0.8} roughness={0.2} />
        </Sphere>
        <Sphere position={[0.8, 0.8, 0]} args={[0.2]} castShadow>
          <meshStandardMaterial color="#B0B0B0" metalness={0.8} roughness={0.2} />
        </Sphere>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.8, 0.8, 0]}>
          {/* Upper Arm */}
          <Cylinder position={[-0.4, -0.2, 0]} args={[0.12, 0.15, 0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshStandardMaterial color="#C8C8C8" metalness={0.7} roughness={0.3} />
          </Cylinder>
          
          {/* Elbow Joint */}
          <Sphere position={[-0.8, -0.2, 0]} args={[0.15]} castShadow>
            <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} />
          </Sphere>
          
          {/* Forearm */}
          <Cylinder position={[-1.15, -0.2, 0]} args={[0.1, 0.12, 0.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshStandardMaterial color="#C8C8C8" metalness={0.7} roughness={0.3} />
          </Cylinder>
          
          {/* Hand */}
          <RoundedBox position={[-1.6, -0.2, 0]} args={[0.25, 0.35, 0.15]} radius={0.05} smoothness={4} castShadow>
            <meshStandardMaterial color="#A8A8A8" metalness={0.6} roughness={0.4} />
          </RoundedBox>
          
          {/* Fingers */}
          <RoundedBox position={[-1.75, -0.1, 0.05]} args={[0.15, 0.08, 0.05]} radius={0.02} smoothness={4} castShadow>
            <meshStandardMaterial color="#909090" metalness={0.7} roughness={0.3} />
          </RoundedBox>
          <RoundedBox position={[-1.75, -0.2, 0.05]} args={[0.15, 0.08, 0.05]} radius={0.02} smoothness={4} castShadow>
            <meshStandardMaterial color="#909090" metalness={0.7} roughness={0.3} />
          </RoundedBox>
          <RoundedBox position={[-1.75, -0.3, 0.05]} args={[0.15, 0.08, 0.05]} radius={0.02} smoothness={4} castShadow>
            <meshStandardMaterial color="#909090" metalness={0.7} roughness={0.3} />
          </RoundedBox>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.8, 0.8, 0]}>
          {/* Upper Arm */}
          <Cylinder position={[0.4, -0.2, 0]} args={[0.12, 0.15, 0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshStandardMaterial color="#C8C8C8" metalness={0.7} roughness={0.3} />
          </Cylinder>
          
          {/* Elbow Joint */}
          <Sphere position={[0.8, -0.2, 0]} args={[0.15]} castShadow>
            <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} />
          </Sphere>
          
          {/* Forearm */}
          <Cylinder position={[1.15, -0.2, 0]} args={[0.1, 0.12, 0.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshStandardMaterial color="#C8C8C8" metalness={0.7} roughness={0.3} />
          </Cylinder>
          
          {/* Hand */}
          <RoundedBox position={[1.6, -0.2, 0]} args={[0.25, 0.35, 0.15]} radius={0.05} smoothness={4} castShadow>
            <meshStandardMaterial color="#A8A8A8" metalness={0.6} roughness={0.4} />
          </RoundedBox>
          
          {/* Fingers */}
          <RoundedBox position={[1.75, -0.1, 0.05]} args={[0.15, 0.08, 0.05]} radius={0.02} smoothness={4} castShadow>
            <meshStandardMaterial color="#909090" metalness={0.7} roughness={0.3} />
          </RoundedBox>
          <RoundedBox position={[1.75, -0.2, 0.05]} args={[0.15, 0.08, 0.05]} radius={0.02} smoothness={4} castShadow>
            <meshStandardMaterial color="#909090" metalness={0.7} roughness={0.3} />
          </RoundedBox>
          <RoundedBox position={[1.75, -0.3, 0.05]} args={[0.15, 0.08, 0.05]} radius={0.02} smoothness={4} castShadow>
            <meshStandardMaterial color="#909090" metalness={0.7} roughness={0.3} />
          </RoundedBox>
        </group>

        {/* Waist */}
        <Cylinder position={[0, -0.5, 0]} args={[0.4, 0.5, 0.3]} castShadow>
          <meshStandardMaterial color="#B8B8B8" metalness={0.7} roughness={0.3} />
        </Cylinder>

        {/* Hip Joints */}
        <Sphere position={[-0.25, -0.8, 0]} args={[0.18]} castShadow>
          <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} />
        </Sphere>
        <Sphere position={[0.25, -0.8, 0]} args={[0.18]} castShadow>
          <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} />
        </Sphere>

        {/* Thighs */}
        <Cylinder position={[-0.25, -1.3, 0]} args={[0.15, 0.18, 1]} castShadow>
          <meshStandardMaterial color="#C0C0C0" metalness={0.7} roughness={0.3} />
        </Cylinder>
        <Cylinder position={[0.25, -1.3, 0]} args={[0.15, 0.18, 1]} castShadow>
          <meshStandardMaterial color="#C0C0C0" metalness={0.7} roughness={0.3} />
        </Cylinder>

        {/* Knee Joints */}
        <Sphere position={[-0.25, -1.9, 0]} args={[0.16]} castShadow>
          <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} />
        </Sphere>
        <Sphere position={[0.25, -1.9, 0]} args={[0.16]} castShadow>
          <meshStandardMaterial color="#A0A0A0" metalness={0.8} roughness={0.2} />
        </Sphere>

        {/* Shins */}
        <Cylinder position={[-0.25, -2.4, 0]} args={[0.12, 0.15, 1]} castShadow>
          <meshStandardMaterial color="#C0C0C0" metalness={0.7} roughness={0.3} />
        </Cylinder>
        <Cylinder position={[0.25, -2.4, 0]} args={[0.12, 0.15, 1]} castShadow>
          <meshStandardMaterial color="#C0C0C0" metalness={0.7} roughness={0.3} />
        </Cylinder>

        {/* Feet */}
        <RoundedBox position={[-0.25, -3.1, 0.15]} args={[0.35, 0.25, 0.6]} radius={0.05} smoothness={4} castShadow>
          <meshStandardMaterial color="#808080" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        <RoundedBox position={[0.25, -3.1, 0.15]} args={[0.35, 0.25, 0.6]} radius={0.05} smoothness={4} castShadow>
          <meshStandardMaterial color="#808080" metalness={0.8} roughness={0.2} />
        </RoundedBox>

        {/* Status Lights */}
        <Sphere position={[-0.3, 0.4, 0.46]} args={[0.03]} castShadow>
          <meshStandardMaterial color="#FF6B81" emissive="#FF6B81" emissiveIntensity={0.8} />
        </Sphere>
        <Sphere position={[0, 0.4, 0.46]} args={[0.03]} castShadow>
          <meshStandardMaterial color="#00C9A7" emissive="#00C9A7" emissiveIntensity={0.8} />
        </Sphere>
        <Sphere position={[0.3, 0.4, 0.46]} args={[0.03]} castShadow>
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} />
        </Sphere>
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
      {/* 3D Humanized Robot Background */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 50 }}
          shadows
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.2} 
            castShadow 
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-8, 5, 8]} intensity={0.6} color="#00D4FF" />
          <pointLight position={[8, -5, 8]} intensity={0.6} color="#FF6B81" />
          <spotLight 
            position={[0, 10, 10]} 
            intensity={0.8} 
            angle={0.3} 
            penumbra={0.5} 
            color="#00C9A7"
            castShadow
          />
          <HumanizedRobot />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
            maxAzimuthAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 4}
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