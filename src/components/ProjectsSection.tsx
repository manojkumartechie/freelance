"use client";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaCode } from "react-icons/fa";
import { MdAutoAwesome } from "react-icons/md";

// Placeholder project data
const projects = Array.from({ length: 20 }).map((_, i) => ({
  title: `Project ${i + 1}`,
  description: "Advanced data engineering project with ETL, analytics, and cloud integration.",
  tech: ["Python", "Spark", "AWS"],
  dataset: i % 3 === 0 ? "Kaggle Dataset" : i % 3 === 1 ? "Open Gov Data" : "Synthetic Data",
  code: "#",
  demo: "#",
  lowCode: i % 4 === 0,
}));

// Projects section with animated cards and 3D icon placeholder
export default function ProjectsSection() {
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            className="glass soft-light p-6 rounded-2xl flex flex-col gap-3 shadow-lg hover:shadow-2xl transition animated relative"
            whileHover={{ scale: 1.04, y: -6 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.04 }}
            viewport={{ once: true }}
          >
            {/* Placeholder for 3D animated icon (replace with Three.js) */}
            <div className="flex items-center justify-center mb-2">
              <MdAutoAwesome className="text-4xl text-primary animate-pulse" />
            </div>
            <h3 className="font-bold text-lg mb-1">{project.title}</h3>
            <p className="text-sm opacity-80 mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tech.map((t) => (
                <span key={t} className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">{t}</span>
              ))}
              <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full text-xs font-semibold">{project.dataset}</span>
              {project.lowCode && (
                <span className="bg-soft text-white px-2 py-0.5 rounded-full text-xs font-semibold">Low-code</span>
              )}
            </div>
            <div className="flex gap-3 mt-auto">
              <a href={project.code} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition">
                <FaCode className="inline mr-1" /> Code
              </a>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition">
                <FaExternalLinkAlt className="inline mr-1" /> Demo
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 