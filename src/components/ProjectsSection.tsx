"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaExternalLinkAlt, FaCode, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdAutoAwesome } from "react-icons/md";
import MagneticButton from "./MagneticButton";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  description: "Advanced data engineering project with ETL, analytics, and cloud integration featuring real-time processing and machine learning capabilities.",
  tech: ["Python", "Spark", "AWS", "Docker"],
  dataset: i % 3 === 0 ? "Kaggle Dataset" : i % 3 === 1 ? "Open Gov Data" : "Synthetic Data",
  code: "#",
  demo: "#",
  lowCode: i % 4 === 0,
  featured: i < 6,
}));

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isClient, setIsClient] = useState(false);

  const featuredProjects = projects.filter(p => p.featured);
  const allProjects = projects;

  useEffect(() => {
    setIsClient(true);
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
            toggleActions: "play none none reverse",
          },
        }
      );

      // Carousel animation
      if (viewMode === 'carousel' && carouselRef.current) {
        const slides = carouselRef.current.children;
        gsap.fromTo(slides,
          { opacity: 0, x: 100, rotationY: 45 },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Grid animation
      if (viewMode === 'grid' && gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(cards,
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [viewMode]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const ProjectCard = ({ project, featured = false }: { project: typeof projects[0], featured?: boolean }) => (
    <motion.div
      className={`glass soft-light p-6 rounded-2xl flex flex-col gap-4 shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden ${
        featured ? 'min-h-[400px]' : 'min-h-[350px]'
      }`}
      whileHover={{ 
        scale: 1.02,
        y: -10,
        rotateX: 5,
        rotateY: 5
      }}
      layout
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Floating icon */}
      <div className="flex items-center justify-center mb-4 relative z-10">
        <motion.div
          className="text-5xl text-primary"
          animate={{ 
            rotateY: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <MdAutoAwesome />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-sm opacity-80 mb-4 flex-1 leading-relaxed">
          {project.description}
        </p>
        
        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold hover:bg-primary/30 transition-colors">
              {t}
            </span>
          ))}
          <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold">
            {project.dataset}
          </span>
          {project.lowCode && (
            <span className="bg-soft text-white px-3 py-1 rounded-full text-xs font-semibold">
              Low-code
            </span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-4 mt-auto">
          <MagneticButton className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold">
            <FaCode /> Code
          </MagneticButton>
          <MagneticButton className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold">
            <FaExternalLinkAlt /> Demo
          </MagneticButton>
        </div>
      </div>

      {/* Hover particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isClient && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );

  return (
    <section ref={sectionRef} id="projects" className="w-full flex flex-col items-center relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
        Featured Projects
      </h2>

      {/* View mode toggle */}
      <div className="flex gap-4 mb-12">
        <MagneticButton
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            viewMode === 'carousel' 
              ? 'bg-primary text-white shadow-lg' 
              : 'glass text-primary hover:bg-primary/20'
          }`}
          onClick={() => setViewMode('carousel')}
        >
          Featured Carousel
        </MagneticButton>
        <MagneticButton
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            viewMode === 'grid' 
              ? 'bg-primary text-white shadow-lg' 
              : 'glass text-primary hover:bg-primary/20'
          }`}
          onClick={() => setViewMode('grid')}
        >
          All Projects
        </MagneticButton>
      </div>

      {/* Carousel View */}
      {viewMode === 'carousel' && (
        <div className="relative w-full max-w-6xl">
          <div ref={carouselRef} className="flex gap-8 overflow-hidden">
            <motion.div
              className="flex gap-8 min-w-full"
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {featuredProjects.map((project) => (
                <div key={project.id} className="min-w-[400px] max-w-[400px]">
                  <ProjectCard project={project} featured />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel controls */}
          <div className="flex justify-center gap-4 mt-8">
            <MagneticButton
              className="p-3 glass rounded-full text-primary hover:bg-primary/20 transition-colors"
              onClick={prevSlide}
            >
              <FaChevronLeft />
            </MagneticButton>
            <MagneticButton
              className="p-3 glass rounded-full text-primary hover:bg-primary/20 transition-colors"
              onClick={nextSlide}
            >
              <FaChevronRight />
            </MagneticButton>
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-primary scale-125' : 'bg-white/30'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
          {allProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}