"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import Particles from "react-tsparticles";
import { motion } from "framer-motion";

// Hero section with 3D animated background, particles, and glass overlay
export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] w-full overflow-hidden">
      {/* 3D Animated Background (React Three Fiber) */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 2.5] }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 2, 2]} intensity={1.2} />
          <Sphere args={[1, 64, 64]} scale={1.2}>
            <MeshDistortMaterial
              color="#00C9A7"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.2}
            />
          </Sphere>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
        </Canvas>
      </div>
      {/* Interactive Particles (tsparticles) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles
          id="tsparticles-hero"
          options={{
            fullScreen: false,
            background: { color: { value: "transparent" } },
            particles: {
              number: { value: 60 },
              color: { value: "#fff" },
              opacity: { value: 0.15 },
              size: { value: 2 },
              move: { enable: true, speed: 0.6 },
              links: { enable: true, color: "#fff", opacity: 0.1 },
            },
            interactivity: {
              events: { onHover: { enable: true, mode: "repulse" } },
              modes: { repulse: { distance: 80 } },
            },
          }}
        />
      </div>
      {/* Glass Morphism Overlay */}
      <motion.div
        className="relative z-20 glass soft-light p-10 rounded-3xl flex flex-col items-center gap-6 shadow-2xl max-w-xl w-full mt-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center">
          Manoj Kumar
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-primary text-center">
          Freelance Data Engineer
        </h2>
        <p className="text-center text-lg opacity-80 max-w-md">
          Building advanced data pipelines, analytics, and AI solutions for modern businesses.
        </p>
        <motion.a
          href="#contact"
          className="mt-4 px-8 py-3 rounded-full bg-primary text-white font-bold shadow-lg hover:bg-accent transition animated"
          whileHover={{ scale: 1.08 }}
        >
          Let&apos;s Connect
        </motion.a>
      </motion.div>
    </section>
  );
} 