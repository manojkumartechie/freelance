"use client";
import { motion } from "framer-motion";
import { SiPython, SiAmazonwebservices, SiGooglecloud, SiApacheairflow, SiApachespark, SiDocker } from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { MdOutlineDataObject } from "react-icons/md";

// Placeholder for 3D icons: Replace with Three.js/React Three Fiber for advanced 3D
const skills = [
  { name: "Python", icon: <SiPython className="text-yellow-300" /> },
  { name: "SQL", icon: <FaDatabase className="text-blue-400" /> },
  { name: "Spark", icon: <SiApachespark className="text-orange-400" /> },
  { name: "Airflow", icon: <SiApacheairflow className="text-cyan-400" /> },
  { name: "AWS", icon: <SiAmazonwebservices className="text-yellow-500" /> },
  { name: "GCP", icon: <SiGooglecloud className="text-blue-300" /> },
  { name: "Docker", icon: <SiDocker className="text-blue-500" /> },
  { name: "Data Modeling", icon: <MdOutlineDataObject className="text-pink-400" /> },
  { name: "ETL", icon: <FaDatabase className="text-green-400" /> },
  { name: "Data Pipelines", icon: <FaDatabase className="text-purple-400" /> },
  { name: "Low-code Tools", icon: <MdOutlineDataObject className="text-indigo-400" /> },
];

// Skills section with animated cards and glass morphism
export default function SkillsSection() {
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl w-full">
        {skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            className="glass soft-light p-6 rounded-2xl flex flex-col items-center gap-3 shadow-lg cursor-pointer hover:shadow-2xl transition animated"
            whileHover={{ scale: 1.08, rotate: [0, 2, -2, 0] }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            viewport={{ once: true }}
          >
            {/* Replace icon with 3D Three.js icon for advanced effect */}
            <div className="text-4xl md:text-5xl mb-2">{skill.icon}</div>
            <span className="font-semibold text-base text-center">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 