"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, Box, Cylinder, RoundedBox, Text, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import * as THREE from "three";

// Enhanced Humanized Robot with realistic features
function EnhancedHumanizedRobot() {
  const robotRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const chestLightRef = useRef<THREE.Mesh>(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isWaving, setIsWaving] = useState(false);
  const [eyeBlinkTimer, setEyeBlinkTimer] = useState(0);

  // Mouse tracking for robot interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation frame updates
  useFrame((state) => {
    if (!robotRef.current || !headRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Breathing animation
    robotRef.current.scale.y = 1 + Math.sin(time * 1.5) * 0.02;
    
    // Head follows mouse with smooth interpolation
    const targetRotationY = mousePosition.x * 0.3;
    const targetRotationX = mousePosition.y * 0.2;
    
    headRef.current.rotation.y = THREE.MathUtils.lerp(
      headRef.current.rotation.y,
      targetRotationY,
      0.05
    );
    headRef.current.rotation.x = THREE.MathUtils.lerp(
      headRef.current.rotation.x,
      targetRotationX,
      0.05
    );

    // Eye tracking
    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeTargetX = mousePosition.x * 0.1;
      const eyeTargetY = mousePosition.y * 0.1;
      
      leftEyeRef.current.position.x = THREE.MathUtils.lerp(
        leftEyeRef.current.position.x,
        -0.18 + eyeTargetX,
        0.1
      );
      leftEyeRef.current.position.y = THREE.MathUtils.lerp(
        leftEyeRef.current.position.y,
        0.15 + eyeTargetY,
        0.1
      );
      
      rightEyeRef.current.position.x = THREE.MathUtils.lerp(
        rightEyeRef.current.position.x,
        0.18 + eyeTargetX,
        0.1
      );
      rightEyeRef.current.position.y = THREE.MathUtils.lerp(
        rightEyeRef.current.position.y,
        0.15 + eyeTargetY,
        0.1
      );
    }

    // Blinking animation
    setEyeBlinkTimer(prev => prev + 0.016);
    if (eyeBlinkTimer > 3 + Math.random() * 2) {
      setEyeBlinkTimer(0);
      if (leftEyeRef.current && rightEyeRef.current) {
        gsap.to([leftEyeRef.current.scale, rightEyeRef.current.scale], {
          y: 0.1,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        });
      }
    }

    // Chest light pulsing
    if (chestLightRef.current) {
      const intensity = 0.8 + Math.sin(time * 2) * 0.4;
      (chestLightRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }

    // Idle hand gestures
    if (leftArmRef.current && rightArmRef.current && !isWaving) {
      leftArmRef.current.rotation.z = 0.2 + Math.sin(time * 0.8) * 0.1;
      rightArmRef.current.rotation.z = -0.15 + Math.cos(time * 0.9) * 0.1;
    }
  });

  // Waving animation on click
  const handleWave = () => {
    if (isWaving || !rightArmRef.current) return;
    
    setIsWaving(true);
    gsap.timeline()
      .to(rightArmRef.current.rotation, {
        z: -1.2,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(rightArmRef.current.rotation, {
        z: -0.8,
        duration: 0.2,
        repeat: 3,
        yoyo: true,
      })
      .to(rightArmRef.current.rotation, {
        z: -0.15,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => setIsWaving(false)
      });
  };

  useEffect(() => {
    if (!robotRef.current) return;

    // Initial entrance animation
    gsap.fromTo(robotRef.current.scale, 
      { x: 0, y: 0, z: 0 },
      { 
        x: 0.8, 
        y: 0.8, 
        z: 0.8, 
        duration: 1.5, 
        ease: "back.out(1.7)",
        delay: 0.5
      }
    );

    // Gentle floating
    gsap.to(robotRef.current.position, {
      y: 0.3,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });

    // Subtle rotation
    gsap.to(robotRef.current.rotation, {
      y: Math.PI * 2,
      duration: 60,
      repeat: -1,
      ease: "none"
    });
  }, []);

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group 
        ref={robotRef} 
        scale={[0.8, 0.8, 0.8]} 
        onClick={handleWave}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        
        {/* Enhanced Head Assembly */}
        <group ref={headRef} position={[0, 1.8, 0]}>
          {/* Main Head - More human proportions */}
          <RoundedBox args={[1.0, 1.2, 0.9]} radius={0.2} smoothness={8} castShadow receiveShadow>
            <meshPhysicalMaterial
              color="#F8F8F8"
              metalness={0.1}
              roughness={0.3}
              clearcoat={0.8}
              clearcoatRoughness={0.2}
              emissive="#F0F0F0"
              emissiveIntensity={0.02}
            />
          </RoundedBox>
          
          {/* Face Plate with more detail */}
          <RoundedBox position={[0, 0.1, 0.4]} args={[0.8, 0.9, 0.12]} radius={0.15} smoothness={8} castShadow>
            <meshPhysicalMaterial
              color="#2C3E50"
              metalness={0.9}
              roughness={0.1}
              clearcoat={1.0}
              emissive="#34495E"
              emissiveIntensity={0.05}
            />
          </RoundedBox>
          
          {/* Enhanced Eyes with realistic materials */}
          <Sphere ref={leftEyeRef} position={[-0.18, 0.15, 0.45]} args={[0.09]} castShadow>
            <meshPhysicalMaterial
              color="#00E4FF"
              emissive="#00E4FF"
              emissiveIntensity={1.2}
              transparent
              opacity={0.95}
              transmission={0.3}
              thickness={0.5}
            />
          </Sphere>
          <Sphere ref={rightEyeRef} position={[0.18, 0.15, 0.45]} args={[0.09]} castShadow>
            <meshPhysicalMaterial
              color="#00E4FF"
              emissive="#00E4FF"
              emissiveIntensity={1.2}
              transparent
              opacity={0.95}
              transmission={0.3}
              thickness={0.5}
            />
          </Sphere>
          
          {/* Eye Sockets with depth */}
          <RoundedBox position={[-0.18, 0.15, 0.42]} args={[0.18, 0.18, 0.1]} radius={0.08} smoothness={8}>
            <meshPhysicalMaterial color="#1A252F" metalness={0.95} roughness={0.05} />
          </RoundedBox>
          <RoundedBox position={[0.18, 0.15, 0.42]} args={[0.18, 0.18, 0.1]} radius={0.08} smoothness={8}>
            <meshPhysicalMaterial color="#1A252F" metalness={0.95} roughness={0.05} />
          </RoundedBox>
          
          {/* Enhanced Mouth/Speaker with grill pattern */}
          <RoundedBox position={[0, -0.15, 0.43]} args={[0.35, 0.12, 0.06]} radius={0.03} smoothness={8}>
            <meshPhysicalMaterial color="#0A0A0A" metalness={0.8} roughness={0.2} />
          </RoundedBox>
          
          {/* Speaker grill lines */}
          {Array.from({ length: 5 }).map((_, i) => (
            <Box key={i} position={[-0.12 + i * 0.06, -0.15, 0.44]} args={[0.02, 0.08, 0.02]}>
              <meshPhysicalMaterial color="#333" metalness={0.9} roughness={0.1} />
            </Box>
          ))}
          
          {/* Antenna/Sensors */}
          <Cylinder position={[-0.4, 0.4, 0.2]} args={[0.02, 0.02, 0.2]} rotation={[0, 0, Math.PI / 2]}>
            <meshPhysicalMaterial color="#FF6B81" emissive="#FF6B81" emissiveIntensity={0.5} />
          </Cylinder>
          <Cylinder position={[0.4, 0.4, 0.2]} args={[0.02, 0.02, 0.2]} rotation={[0, 0, Math.PI / 2]}>
            <meshPhysicalMaterial color="#FF6B81" emissive="#FF6B81" emissiveIntensity={0.5} />
          </Cylinder>
        </group>

        {/* Enhanced Neck with cables */}
        <Cylinder position={[0, 1.2, 0]} args={[0.16, 0.2, 0.35]} castShadow>
          <meshPhysicalMaterial color="#D8D8D8" metalness={0.8} roughness={0.2} />
        </Cylinder>
        
        {/* Neck cables */}
        <Cylinder position={[-0.1, 1.2, 0.15]} args={[0.02, 0.02, 0.3]} castShadow>
          <meshPhysicalMaterial color="#444" metalness={0.7} roughness={0.3} />
        </Cylinder>
        <Cylinder position={[0.1, 1.2, 0.15]} args={[0.02, 0.02, 0.3]} castShadow>
          <meshPhysicalMaterial color="#444" metalness={0.7} roughness={0.3} />
        </Cylinder>

        {/* Enhanced Torso with more detail */}
        <RoundedBox position={[0, 0.4, 0]} args={[1.5, 1.7, 1.0]} radius={0.12} smoothness={8} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#E8E8E8"
            metalness={0.4}
            roughness={0.2}
            clearcoat={0.6}
            emissive="#DDDDDD"
            emissiveIntensity={0.02}
          />
        </RoundedBox>
        
        {/* Enhanced Chest Panel */}
        <RoundedBox position={[0, 0.6, 0.51]} args={[0.9, 1.1, 0.1]} radius={0.08} smoothness={8} castShadow>
          <meshPhysicalMaterial
            color="#2C3E50"
            metalness={0.95}
            roughness={0.05}
            clearcoat={1.0}
            emissive="#34495E"
            emissiveIntensity={0.08}
          />
        </RoundedBox>
        
        {/* Pulsing Chest Light */}
        <Sphere ref={chestLightRef} position={[0, 0.8, 0.57]} args={[0.1]} castShadow>
          <meshPhysicalMaterial
            color="#00C9A7"
            emissive="#00C9A7"
            emissiveIntensity={1.0}
            transparent
            opacity={0.9}
            transmission={0.2}
          />
        </Sphere>

        {/* Enhanced Shoulder Joints */}
        <Sphere position={[-0.85, 0.8, 0]} args={[0.22]} castShadow>
          <meshPhysicalMaterial color="#B8B8B8" metalness={0.9} roughness={0.1} />
        </Sphere>
        <Sphere position={[0.85, 0.8, 0]} args={[0.22]} castShadow>
          <meshPhysicalMaterial color="#B8B8B8" metalness={0.9} roughness={0.1} />
        </Sphere>

        {/* Enhanced Left Arm with more realistic proportions */}
        <group ref={leftArmRef} position={[-0.85, 0.8, 0]}>
          {/* Upper Arm */}
          <Cylinder position={[-0.45, -0.2, 0]} args={[0.13, 0.16, 0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshPhysicalMaterial color="#D0D0D0" metalness={0.7} roughness={0.2} />
          </Cylinder>
          
          {/* Elbow Joint */}
          <Sphere position={[-0.9, -0.2, 0]} args={[0.17]} castShadow>
            <meshPhysicalMaterial color="#A8A8A8" metalness={0.85} roughness={0.15} />
          </Sphere>
          
          {/* Forearm */}
          <Cylinder position={[-1.25, -0.2, 0]} args={[0.11, 0.13, 0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshPhysicalMaterial color="#D0D0D0" metalness={0.7} roughness={0.2} />
          </Cylinder>
          
          {/* Enhanced Hand */}
          <RoundedBox position={[-1.7, -0.2, 0]} args={[0.28, 0.4, 0.18]} radius={0.06} smoothness={8} castShadow>
            <meshPhysicalMaterial color="#B0B0B0" metalness={0.6} roughness={0.3} />
          </RoundedBox>
          
          {/* Detailed Fingers */}
          {[0.08, 0, -0.08].map((offset, i) => (
            <RoundedBox key={i} position={[-1.88, -0.1 + offset, 0.08]} args={[0.18, 0.09, 0.06]} radius={0.02} smoothness={8} castShadow>
              <meshPhysicalMaterial color="#989898" metalness={0.75} roughness={0.25} />
            </RoundedBox>
          ))}
          
          {/* Thumb */}
          <RoundedBox position={[-1.82, -0.35, 0.05]} args={[0.12, 0.07, 0.05]} radius={0.02} smoothness={8} castShadow>
            <meshPhysicalMaterial color="#989898" metalness={0.75} roughness={0.25} />
          </RoundedBox>
        </group>

        {/* Enhanced Right Arm (mirrored) */}
        <group ref={rightArmRef} position={[0.85, 0.8, 0]}>
          {/* Upper Arm */}
          <Cylinder position={[0.45, -0.2, 0]} args={[0.13, 0.16, 0.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshPhysicalMaterial color="#D0D0D0" metalness={0.7} roughness={0.2} />
          </Cylinder>
          
          {/* Elbow Joint */}
          <Sphere position={[0.9, -0.2, 0]} args={[0.17]} castShadow>
            <meshPhysicalMaterial color="#A8A8A8" metalness={0.85} roughness={0.15} />
          </Sphere>
          
          {/* Forearm */}
          <Cylinder position={[1.25, -0.2, 0]} args={[0.11, 0.13, 0.8]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <meshPhysicalMaterial color="#D0D0D0" metalness={0.7} roughness={0.2} />
          </Cylinder>
          
          {/* Enhanced Hand */}
          <RoundedBox position={[1.7, -0.2, 0]} args={[0.28, 0.4, 0.18]} radius={0.06} smoothness={8} castShadow>
            <meshPhysicalMaterial color="#B0B0B0" metalness={0.6} roughness={0.3} />
          </RoundedBox>
          
          {/* Detailed Fingers */}
          {[0.08, 0, -0.08].map((offset, i) => (
            <RoundedBox key={i} position={[1.88, -0.1 + offset, 0.08]} args={[0.18, 0.09, 0.06]} radius={0.02} smoothness={8} castShadow>
              <meshPhysicalMaterial color="#989898" metalness={0.75} roughness={0.25} />
            </RoundedBox>
          ))}
          
          {/* Thumb */}
          <RoundedBox position={[1.82, -0.35, 0.05]} args={[0.12, 0.07, 0.05]} radius={0.02} smoothness={8} castShadow>
            <meshPhysicalMaterial color="#989898" metalness={0.75} roughness={0.25} />
          </RoundedBox>
        </group>

        {/* Enhanced Lower Body */}
        <Cylinder position={[0, -0.5, 0]} args={[0.45, 0.55, 0.35]} castShadow>
          <meshPhysicalMaterial color="#C0C0C0" metalness={0.7} roughness={0.2} />
        </Cylinder>

        {/* Hip Joints */}
        <Sphere position={[-0.28, -0.8, 0]} args={[0.2]} castShadow>
          <meshPhysicalMaterial color="#A8A8A8" metalness={0.85} roughness={0.15} />
        </Sphere>
        <Sphere position={[0.28, -0.8, 0]} args={[0.2]} castShadow>
          <meshPhysicalMaterial color="#A8A8A8" metalness={0.85} roughness={0.15} />
        </Sphere>

        {/* Enhanced Legs */}
        <Cylinder position={[-0.28, -1.35, 0]} args={[0.16, 0.2, 1.1]} castShadow>
          <meshPhysicalMaterial color="#C8C8C8" metalness={0.7} roughness={0.2} />
        </Cylinder>
        <Cylinder position={[0.28, -1.35, 0]} args={[0.16, 0.2, 1.1]} castShadow>
          <meshPhysicalMaterial color="#C8C8C8" metalness={0.7} roughness={0.2} />
        </Cylinder>

        {/* Knee Joints */}
        <Sphere position={[-0.28, -1.95, 0]} args={[0.18]} castShadow>
          <meshPhysicalMaterial color="#A8A8A8" metalness={0.85} roughness={0.15} />
        </Sphere>
        <Sphere position={[0.28, -1.95, 0]} args={[0.18]} castShadow>
          <meshPhysicalMaterial color="#A8A8A8" metalness={0.85} roughness={0.15} />
        </Sphere>

        {/* Lower Legs */}
        <Cylinder position={[-0.28, -2.5, 0]} args={[0.13, 0.16, 1.1]} castShadow>
          <meshPhysicalMaterial color="#C8C8C8" metalness={0.7} roughness={0.2} />
        </Cylinder>
        <Cylinder position={[0.28, -2.5, 0]} args={[0.13, 0.16, 1.1]} castShadow>
          <meshPhysicalMaterial color="#C8C8C8" metalness={0.7} roughness={0.2} />
        </Cylinder>

        {/* Enhanced Feet */}
        <RoundedBox position={[-0.28, -3.2, 0.18]} args={[0.4, 0.3, 0.7]} radius={0.08} smoothness={8} castShadow>
          <meshPhysicalMaterial color="#888888" metalness={0.85} roughness={0.15} />
        </RoundedBox>
        <RoundedBox position={[0.28, -3.2, 0.18]} args={[0.4, 0.3, 0.7]} radius={0.08} smoothness={8} castShadow>
          <meshPhysicalMaterial color="#888888" metalness={0.85} roughness={0.15} />
        </RoundedBox>

        {/* Enhanced Status Lights */}
        <Sphere position={[-0.35, 0.4, 0.52]} args={[0.04]} castShadow>
          <meshPhysicalMaterial 
            color="#FF6B81" 
            emissive="#FF6B81" 
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </Sphere>
        <Sphere position={[0, 0.4, 0.52]} args={[0.04]} castShadow>
          <meshPhysicalMaterial 
            color="#00C9A7" 
            emissive="#00C9A7" 
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </Sphere>
        <Sphere position={[0.35, 0.4, 0.52]} args={[0.04]} castShadow>
          <meshPhysicalMaterial 
            color="#FFD700" 
            emissive="#FFD700" 
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </Sphere>
      </group>
    </Float>
  );
}

export default function RealisticRobot() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 50 }}
      shadows={{ type: THREE.PCFSoftShadowMap }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      }}
    >
      {/* Enhanced Lighting Setup */}
      <ambientLight intensity={0.3} color="#ffffff" />
      
      {/* Main directional light */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0001}
        color="#ffffff"
      />
      
      {/* Accent lights */}
      <pointLight position={[-10, 5, 10]} intensity={0.8} color="#00D4FF" />
      <pointLight position={[10, -5, 10]} intensity={0.8} color="#FF6B81" />
      <pointLight position={[0, 8, -5]} intensity={0.6} color="#00C9A7" />
      
      {/* Rim lighting */}
      <spotLight 
        position={[0, 15, 15]} 
        intensity={1.2} 
        angle={0.4} 
        penumbra={0.6} 
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Fill light */}
      <spotLight 
        position={[-8, -8, 8]} 
        intensity={0.4} 
        angle={0.6} 
        penumbra={0.8} 
        color="#E8E8FF"
      />

      <EnhancedHumanizedRobot />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 3.5}
        maxAzimuthAngle={Math.PI / 3}
        minAzimuthAngle={-Math.PI / 3}
        enableDamping
        dampingFactor={0.05}
      />
    </Canvas>
  );
}