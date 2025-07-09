"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import MagneticButton from "./MagneticButton";
import BlowText from "./BlowText";
import dynamic from "next/dynamic";

const RealisticRobot = dynamic(() => import("./RealisticRobot"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-10" />
});


export default function EnhancedHeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Initial setup - hide all elements
      gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, buttonRef.current], {
        opacity: 0,
        y: 100,
        rotationX: -90,
        scale: 0.8
      });

      // Main timeline with enhanced animations
      const tl = gsap.timeline({ 
        delay: 0.8,
        onComplete: () => setAnimationComplete(true)
      });
      
      // Title animation with dramatic entrance
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 1.5,
        ease: "back.out(2)",
        onComplete: () => {
          // Title reappears after initial animation
          setTimeout(() => {
            gsap.to(titleRef.current, {
              opacity: 1,
              scale: 1.05,
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut"
            });
          }, 500);
        }
      })
      // Subtitle with stagger effect
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      }, "-=1.0")
      // Description with smooth entrance
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8")
      // Button with bounce effect
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      }, "-=0.6");

      // Enhanced parallax effect
      gsap.to(heroRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Floating animation for the hero card
      gsap.to(".hero-card", {
        y: -25,
        rotation: 1,
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Background elements animation
      gsap.to(".bg-element", {
        rotation: 360,
        duration: 20,
        ease: "none",
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
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated background shapes */}
        <div className="bg-element absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
        <div className="bg-element absolute bottom-32 right-32 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />
        <div className="bg-element absolute top-1/2 left-10 w-24 h-24 bg-primary/20 rounded-full blur-lg" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-white/10" />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced 3D Robot Background */}
      <div className="absolute inset-0 z-10">
        <RealisticRobot />
      </div>

      {/* Enhanced Hero Content */}
      <motion.div
        className="hero-card relative z-20 p-16 rounded-3xl flex flex-col items-center gap-10 shadow-2xl max-w-4xl w-full mt-20 backdrop-blur-2xl"
        initial={{ opacity: 0, scale: 0.6, rotateX: -30 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3), 0 2px 16px 0 rgba(255,255,255,0.1) inset'
        }}
      >
        {/* Animated particles inside card */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div 
          ref={titleRef} 
          className="text-center relative z-10"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent leading-tight">
            <BlowText 
              text="Manoj Kumar" 
              distance={120} 
              rotation={100} 
              glowColor="#FFD700"
              className="inline-block"
            />
          </h1>
          
          {/* Animated underline */}
          <motion.div
            className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 1.5 }}
          />
        </div>

        <div ref={subtitleRef} className="text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-2">
            <BlowText 
              text="Freelance Data Engineer" 
              distance={80} 
              rotation={60} 
              glowColor="#00C9A7" 
            />
          </h2>
          <motion.div
            className="flex items-center justify-center gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm opacity-80">Available for Projects</span>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          </motion.div>
        </div>

        <div ref={descriptionRef} className="text-center relative z-10 max-w-3xl">
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-6">
            Building <span className="text-primary font-semibold">advanced data pipelines</span>, 
            <span className="text-accent font-semibold"> analytics solutions</span>, and 
            <span className="text-primary font-semibold"> AI-powered systems</span> for modern businesses 
            with cutting-edge technology.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">20+</div>
              <div className="text-sm opacity-70">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">5+</div>
              <div className="text-sm opacity-70">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm opacity-70">Client Satisfaction</div>
            </div>
          </div>
        </div>

        <div ref={buttonRef} className="relative z-10">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <MagneticButton 
              className="px-12 py-5 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold shadow-2xl hover:shadow-primary/25 transition-all duration-300 text-xl relative overflow-hidden group glass soft-light backdrop-blur-xl"
              strength={0.5}
            >
              <span className="relative z-10 flex items-center gap-3">
                Let's Connect
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>
            
            <MagneticButton 
              className="px-12 py-5 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300 text-xl backdrop-blur-xl"
              strength={0.3}
            >
              View Portfolio
            </MagneticButton>
          </div>
        </div>

        {/* Social proof */}
        <motion.div
          className="flex items-center gap-6 mt-8 opacity-70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 3 }}
        >
          <span className="text-sm">Trusted by companies worldwide</span>
          <div className="flex gap-4">
            {['AWS', 'Google', 'Microsoft'].map((company) => (
              <div key={company} className="px-3 py-1 glass rounded-full text-xs">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center relative">
            <motion.div 
              className="w-1 h-3 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="text-xs opacity-60">Scroll to explore</span>
        </div>
      </motion.div>
    </section>
  );
}