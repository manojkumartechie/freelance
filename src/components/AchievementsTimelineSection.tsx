"use client";
import { motion } from "framer-motion";
import { FaTrophy, FaCertificate } from "react-icons/fa";

// Placeholder achievements
const achievements = [
  { year: "2020", title: "Started Freelancing", icon: <FaTrophy className="text-yellow-400" /> },
  { year: "2021", title: "10+ Projects Completed", icon: <FaTrophy className="text-primary" /> },
  { year: "2022", title: "Top 5% LeetCode", icon: <FaTrophy className="text-accent" /> },
  { year: "2023", title: "Kaggle Silver Medal", icon: <FaTrophy className="text-blue-400" /> },
  { year: "2023", title: "AWS Certified Data Engineer", icon: <FaCertificate className="text-green-400" /> },
  { year: "2024", title: "20th Project Milestone", icon: <FaTrophy className="text-yellow-300" /> },
];

// Achievements Timeline section with animated timeline
export default function AchievementsTimelineSection() {
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">Achievements Timeline</h2>
      <ol className="relative border-l-2 border-primary/40 max-w-xl mx-auto">
        {achievements.map((a, idx) => (
          <motion.li
            key={a.title}
            className="mb-8 ml-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-primary rounded-full ring-4 ring-white dark:ring-gray-900">
              {a.icon}
            </span>
            <div className="glass p-4 rounded-xl shadow-md">
              <span className="font-semibold text-base">{a.year} - {a.title}</span>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
} 