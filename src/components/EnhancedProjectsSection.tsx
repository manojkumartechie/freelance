"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaExternalLinkAlt, FaCode, FaChevronLeft, FaChevronRight, FaFilter, FaGithub, FaPlay } from "react-icons/fa";
import { MdAutoAwesome, MdDataObject, MdCloud, MdAnalytics } from "react-icons/md";
import { SiPython, SiAmazonwebservices, SiDocker, SiKubernetes } from "react-icons/si";
import MagneticButton from "./MagneticButton";
import BlowText from "./BlowText";


const projectCategories = ["All", "Data Pipeline", "Analytics", "Cloud", "Machine Learning"];

const projects = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `${["Real-time Analytics", "ETL Pipeline", "Data Warehouse", "ML Platform", "Cloud Migration"][i % 5]} ${Math.floor(i / 5) + 1}`,
  description: "Advanced data engineering project featuring real-time processing, scalable architecture, and comprehensive analytics capabilities with modern cloud infrastructure.",
  longDescription: "This project demonstrates expertise in building scalable data solutions using modern technologies. Features include automated data ingestion, real-time processing, advanced analytics, and comprehensive monitoring.",
  tech: [
    ["Python", "Spark", "AWS", "Docker"],
    ["Airflow", "Kafka", "PostgreSQL", "Redis"],
    ["GCP", "BigQuery", "Kubernetes", "Terraform"],
    ["TensorFlow", "MLflow", "FastAPI", "MongoDB"],
    ["Azure", "Databricks", "Snowflake", "dbt"]
  ][i % 5],
  category: projectCategories[1 + (i % 4)],
  dataset: ["Kaggle Dataset", "Open Gov Data", "Synthetic Data", "Real-time Streams"][i % 4],
  code: "#",
  demo: "#",
  image: `https://images.pexels.com/photos/${[
    '1181671', '1181677', '1181675', '1181676', '1181678'
  ][i % 5]}/pexels-photo-${[
    '1181671', '1181677', '1181675', '1181676', '1181678'
  ][i % 5]}.jpeg?auto=compress&cs=tinysrgb&w=800`,
  lowCode: i % 4 === 0,
  featured: i < 6,
  metrics: {
    performance: Math.floor(Math.random() * 30) + 70,
    scalability: Math.floor(Math.random() * 25) + 75,
    reliability: Math.floor(Math.random() * 20) + 80
  },
  status: ["Completed", "In Progress", "Deployed"][i % 3],
  year: 2020 + (i % 5)
}));

export default function EnhancedProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);
  
  const featuredProjects = filteredProjects.filter(p => p.featured);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay || viewMode !== 'carousel') return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredProjects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, viewMode, featuredProjects.length]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation with enhanced effects
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
            toggleActions: "play none none reverse",
          },
        }
      );

      // Enhanced carousel animation
      if (viewMode === 'carousel' && carouselRef.current) {
        const slides = carouselRef.current.querySelectorAll('.project-card');
        gsap.fromTo(slides,
          { opacity: 0, x: 200, rotationY: 45, scale: 0.8 },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Enhanced grid animation
      if (viewMode === 'grid' && gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 150, scale: 0.6, rotationX: -45 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.08,
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
  }, [viewMode, selectedCategory]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    setIsAutoPlay(false);
  };

  const getProjectIcon = (category: string) => {
    switch (category) {
      case "Data Pipeline": return <MdDataObject />;
      case "Analytics": return <MdAnalytics />;
      case "Cloud": return <MdCloud />;
      case "Machine Learning": return <MdAutoAwesome />;
      default: return <MdAutoAwesome />;
    }
  };

  const ProjectCard = ({ project, featured = false }: { project: typeof projects[0], featured?: boolean }) => (
    <motion.div
      className={`project-card glass soft-light p-6 rounded-2xl flex flex-col gap-4 shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden cursor-pointer ${
        featured ? 'min-h-[500px]' : 'min-h-[400px]'
      }`}
      whileHover={{ 
        scale: 1.03,
        y: -15,
        rotateX: 5,
        rotateY: 5,
        z: 50
      }}
      onClick={() => setSelectedProject(project)}
      layout
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Project image */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-4">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 right-4 flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
            project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-blue-500/20 text-blue-400'
          }`}>
            {project.status}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-2xl mb-2">
            {getProjectIcon(project.category)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-sm opacity-60">{project.year}</span>
        </div>
        
        <p className="text-sm opacity-80 mb-4 flex-1 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Performance metrics */}
        {featured && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-xs opacity-60 capitalize">{key}</div>
                <div className="font-bold text-primary">{value}%</div>
              </div>
            ))}
          </div>
        )}
        
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
        <div className="flex gap-3 mt-auto">
          <MagneticButton className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold text-sm">
            <FaGithub /> Code
          </MagneticButton>
          <MagneticButton className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold text-sm">
            <FaPlay /> Demo
          </MagneticButton>
          <MagneticButton className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold text-sm ml-auto">
            View Details
          </MagneticButton>
        </div>
      </div>

      {/* Hover particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
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
              delay: i * 0.3,
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
      
      <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
        <BlowText text="Featured Projects" distance={80} rotation={70} glowColor="#FF6B81" />
      </h2>

      {/* Enhanced Controls */}
      <div className="flex flex-col sm:flex-row gap-6 mb-12 items-center">
        {/* View mode toggle */}
        <div className="flex gap-2 p-1 glass rounded-full">
          <MagneticButton
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              viewMode === 'carousel' 
                ? 'bg-primary text-white shadow-lg' 
                : 'text-primary hover:bg-primary/20'
            }`}
            onClick={() => setViewMode('carousel')}
          >
            Featured Carousel
          </MagneticButton>
          <MagneticButton
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              viewMode === 'grid' 
                ? 'bg-primary text-white shadow-lg' 
                : 'text-primary hover:bg-primary/20'
            }`}
            onClick={() => setViewMode('grid')}
          >
            All Projects
          </MagneticButton>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 items-center">
          <FaFilter className="text-primary" />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="glass px-4 py-2 rounded-full bg-transparent text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {projectCategories.map(cat => (
              <option key={cat} value={cat} className="bg-gray-900 text-white">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enhanced Carousel View */}
      {viewMode === 'carousel' && (
        <div className="relative w-full max-w-7xl">
          <div ref={carouselRef} className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex gap-8"
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {featuredProjects.map((project) => (
                <div key={project.id} className="min-w-full sm:min-w-[500px] max-w-[500px] mx-auto">
                  <ProjectCard project={project} featured />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Enhanced carousel controls */}
          <div className="flex justify-center gap-6 mt-8">
            <MagneticButton
              className="p-4 glass rounded-full text-primary hover:bg-primary/20 transition-colors shadow-lg"
              onClick={prevSlide}
            >
              <FaChevronLeft className="text-xl" />
            </MagneticButton>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  isAutoPlay ? 'bg-primary text-white' : 'text-primary border border-primary'
                }`}
              >
                {isAutoPlay ? 'Pause' : 'Play'}
              </button>
            </div>
            
            <MagneticButton
              className="p-4 glass rounded-full text-primary hover:bg-primary/20 transition-colors shadow-lg"
              onClick={nextSlide}
            >
              <FaChevronRight className="text-xl" />
            </MagneticButton>
          </div>

          {/* Enhanced carousel indicators */}
          <div className="flex justify-center gap-3 mt-6">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide 
                    ? 'w-8 h-3 bg-primary' 
                    : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                }`}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlay(false);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Grid View */}
      {viewMode === 'grid' && (
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-8xl w-full">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              className="relative glass soft-light rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-2xl text-white/60 hover:text-white"
              >
                ×
              </button>
              
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              
              <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
              <p className="text-lg opacity-80 mb-6">{selectedProject.longDescription}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(selectedProject.metrics).map(([key, value]) => (
                  <div key={key} className="text-center glass p-4 rounded-xl">
                    <div className="text-sm opacity-60 capitalize mb-1">{key}</div>
                    <div className="text-xl font-bold text-primary">{value}%</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                <MagneticButton className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold">
                  <FaGithub /> View Code
                </MagneticButton>
                <MagneticButton className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-semibold">
                  <FaPlay /> Live Demo
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}