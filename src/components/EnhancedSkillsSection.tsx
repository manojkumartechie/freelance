"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiPython, SiAmazonwebservices, SiGooglecloud, SiApacheairflow, SiApachespark, SiDocker, SiKubernetes, SiTensorflow } from "react-icons/si";
import { FaDatabase, FaChartLine } from "react-icons/fa";
import { MdOutlineDataObject, MdCloud } from "react-icons/md";
import BlowText from "./BlowText";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const skills = [
  { name: "Python", icon: <SiPython className="text-yellow-300" />, level: 95, category: "Programming" },
  { name: "SQL", icon: <FaDatabase className="text-blue-400" />, level: 90, category: "Database" },
  { name: "Spark", icon: <SiApachespark className="text-orange-400" />, level: 85, category: "Big Data" },
  { name: "Airflow", icon: <SiApacheairflow className="text-cyan-400" />, level: 80, category: "Orchestration" },
  { name: "AWS", icon: <SiAmazonwebservices className="text-yellow-500" />, level: 88, category: "Cloud" },
  { name: "GCP", icon: <SiGooglecloud className="text-blue-300" />, level: 82, category: "Cloud" },
  { name: "Docker", icon: <SiDocker className="text-blue-500" />, level: 85, category: "DevOps" },
  { name: "Data Modeling", icon: <MdOutlineDataObject className="text-pink-400" />, level: 92, category: "Architecture" },
  { name: "Kubernetes", icon: <SiKubernetes className="text-blue-600" />, level: 78, category: "DevOps" },
  { name: "TensorFlow", icon: <SiTensorflow className="text-orange-500" />, level: 75, category: "ML" },
  { name: "Analytics", icon: <FaChartLine className="text-green-400" />, level: 88, category: "Analytics" },
  { name: "Cloud Architecture", icon: <MdCloud className="text-purple-400" />, level: 85, category: "Architecture" },
];

export default function EnhancedSkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  // Enhanced cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Enhanced title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 100, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Enhanced skills grid animation
      const skillCards = skillsGridRef.current?.children;
      if (skillCards) {
        gsap.fromTo(skillCards,
          { 
            opacity: 0, 
            y: 150, 
            rotationX: -90,
            scale: 0.6
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: skillsGridRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Skill level animations with enhanced effects
        Array.from(skillCards).forEach((card, index) => {
          const progressBar = card.querySelector('.progress-bar');
          const progressText = card.querySelector('.progress-text');
          const skill = skills[index];
          
          if (progressBar && skill && progressText) {
            gsap.fromTo(progressBar,
              { width: '0%' },
              {
                width: `${skill.level}%`,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );

            // Animate percentage counter
            gsap.fromTo(progressText,
              { textContent: '0%' },
              {
                textContent: `${skill.level}%`,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      }

      // Enhanced floating animation with mouse interaction
      gsap.to(".skill-card", {
        y: -15,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Skill card mouse interaction
  const handleSkillHover = (index: number, isHovering: boolean) => {
    setHoveredSkill(isHovering ? index : null);
    
    const card = document.querySelector(`.skill-card-${index}`);
    if (card) {
      gsap.to(card, {
        scale: isHovering ? 1.1 : 1,
        rotationY: isHovering ? 15 : 0,
        z: isHovering ? 50 : 0,
        duration: 0.3,
        ease: "power2.out"
      });

      // Icon rotation on hover
      const icon = card.querySelector('.skill-icon');
      if (icon) {
        gsap.to(icon, {
          rotationY: isHovering ? 360 : 0,
          duration: 0.6,
          ease: "power2.out"
        });
      }
    }
  };

  return (
    <section ref={sectionRef} id="skills" className="w-full flex flex-col items-center relative">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      {/* Floating background elements that follow cursor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-primary/5 rounded-full blur-xl"
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${20 + Math.floor(i / 4) * 40}%`,
            }}
            animate={{
              x: mousePosition.x * (20 + i * 5),
              y: mousePosition.y * (15 + i * 3),
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        ))}
      </div>
      
      <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-20 text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
        <BlowText text="Skills & Expertise" distance={90} rotation={80} glowColor="#3B82F6" />
      </h2>
      
      <div ref={skillsGridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-7xl w-full">
        {skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            className={`skill-card skill-card-${idx} glass soft-light p-8 rounded-2xl flex flex-col items-center gap-6 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}
            onMouseEnter={() => handleSkillHover(idx, true)}
            onMouseLeave={() => handleSkillHover(idx, false)}
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
            }}
            animate={{
              x: hoveredSkill === idx ? mousePosition.x * 10 : 0,
              y: hoveredSkill === idx ? mousePosition.y * 10 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Enhanced hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-300" />
            
            {/* Category badge */}
            <div className="absolute top-2 right-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {skill.category}
            </div>
            
            {/* Icon with enhanced effects */}
            <div className={`skill-icon text-5xl md:text-6xl mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
              {skill.icon}
            </div>
            
            {/* Skill name */}
            <span className="font-semibold text-lg text-center relative z-10 group-hover:text-primary transition-colors duration-300">
              {skill.name}
            </span>
            
            {/* Enhanced progress bar */}
            <div className="w-full relative z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs opacity-60">Proficiency</span>
                <span className="progress-text text-xs font-bold text-primary">0%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div 
                  className="progress-bar h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                  style={{ width: '0%' }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Particle effect on hover */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Ripple effect on click */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 scale-0 group-active:scale-100 transition-transform duration-300 rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skills summary */}
      <motion.div
        className="mt-16 glass soft-light p-8 rounded-2xl max-w-4xl w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-6 text-center">Technical Expertise</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5+</div>
            <div className="text-sm opacity-70">Years of Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">12+</div>
            <div className="text-sm opacity-70">Technologies Mastered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">20+</div>
            <div className="text-sm opacity-70">Projects Delivered</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}