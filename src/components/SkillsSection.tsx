"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiPython, SiAmazonwebservices, SiGooglecloud, SiApacheairflow, SiApachespark, SiDocker } from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { MdOutlineDataObject } from "react-icons/md";
import BlowText from "./BlowText";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const skills = [
  { name: "Python", icon: <SiPython className="text-yellow-300" />, level: 95 },
  { name: "SQL", icon: <FaDatabase className="text-blue-400" />, level: 90 },
  { name: "Spark", icon: <SiApachespark className="text-orange-400" />, level: 85 },
  { name: "Airflow", icon: <SiApacheairflow className="text-cyan-400" />, level: 80 },
  { name: "AWS", icon: <SiAmazonwebservices className="text-yellow-500" />, level: 88 },
  { name: "GCP", icon: <SiGooglecloud className="text-blue-300" />, level: 82 },
  { name: "Docker", icon: <SiDocker className="text-blue-500" />, level: 85 },
  { name: "Data Modeling", icon: <MdOutlineDataObject className="text-pink-400" />, level: 92 },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);
  const [particlePositions, setParticlePositions] = useState<Array<{ left: string; top: string }>>([]);

  useEffect(() => {
    // Generate particle positions once on client mount
    setParticlePositions(
      Array.from({ length: 6 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }))
    );
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Skills grid animation
      const skillCards = skillsGridRef.current?.children;
      if (skillCards) {
        gsap.fromTo(skillCards,
          { 
            opacity: 0, 
            y: 100, 
            rotationX: -90,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: skillsGridRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Skill level animations
        Array.from(skillCards).forEach((card, index) => {
          const progressBar = card.querySelector('.progress-bar');
          const skill = skills[index];
          
          if (progressBar && skill) {
            gsap.fromTo(progressBar,
              { width: '0%' },
              {
                width: `${skill.level}%`,
                duration: 1.5,
                ease: "power2.out",
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

      // Floating animation for skill cards
      gsap.to(".skill-card", {
        y: -10,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="w-full flex flex-col items-center relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        <BlowText text="Skills & Expertise" distance={70} rotation={60} glowColor="#3B82F6" />
      </h2>
      
      <div ref={skillsGridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-6xl w-full">
        {skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            className="skill-card glass soft-light p-8 rounded-2xl flex flex-col items-center gap-4 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
              z: 50
            }}
            onHoverStart={() => {
              gsap.to(`.skill-${idx}`, {
                rotationY: 360,
                duration: 0.6,
                ease: "power2.out"
              });
            }}
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            
            {/* Icon */}
            <div className={`skill-${idx} text-5xl md:text-6xl mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
              {skill.icon}
            </div>
            
            {/* Skill name */}
            <span className="font-semibold text-lg text-center relative z-10 group-hover:text-primary transition-colors duration-300">
              {skill.name}
            </span>
            
            {/* Particle effect on hover */}
            <div className="absolute inset-0 pointer-events-none">
              {particlePositions.map((position, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    left: position.left,
                    top: position.top,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}