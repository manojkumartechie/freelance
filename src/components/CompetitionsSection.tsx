"use client";
import { motion } from "framer-motion";
import { FaMedal } from "react-icons/fa";
import { SiLeetcode, SiKaggle } from "react-icons/si";

// Competitions section with badges, rankings, and animated progress bars
export default function CompetitionsSection() {
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">Competitions</h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        {/* LeetCode */}
        <motion.div
          className="glass soft-light p-6 rounded-2xl flex-1 flex flex-col items-center gap-3 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SiLeetcode className="text-4xl text-yellow-400 mb-2" />
          <span className="font-bold text-lg">LeetCode</span>
          <span className="text-sm opacity-80">Top 5% Global Ranking</span>
          <div className="w-full mt-2">
            <span className="text-xs">Problems Solved</span>
            <div className="w-full bg-gray-700 rounded-full h-3 mt-1">
              <motion.div
                className="bg-primary h-3 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "85%" }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
              />
            </div>
            <span className="text-xs ml-1">850+</span>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">Arrays</span>
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">Graphs</span>
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">DP</span>
          </div>
        </motion.div>
        {/* Kaggle */}
        <motion.div
          className="glass soft-light p-6 rounded-2xl flex-1 flex flex-col items-center gap-3 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <SiKaggle className="text-4xl text-blue-400 mb-2" />
          <span className="font-bold text-lg">Kaggle</span>
          <span className="text-sm opacity-80">Silver Medalist</span>
          <div className="w-full mt-2">
            <span className="text-xs">Competitions</span>
            <div className="w-full bg-gray-700 rounded-full h-3 mt-1">
              <motion.div
                className="bg-accent h-3 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "70%" }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
              />
            </div>
            <span className="text-xs ml-1">12+</span>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full text-xs font-semibold">Public Datasets</span>
            <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full text-xs font-semibold">Gov Data</span>
            <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full text-xs font-semibold">Synthetic</span>
          </div>
        </motion.div>
      </div>
      {/* Achievements Badges */}
      <div className="flex gap-4 mt-8 flex-wrap justify-center">
        <motion.div
          className="flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full font-semibold shadow-md"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <FaMedal className="text-xl" /> 5x Competition Finalist
        </motion.div>
        <motion.div
          className="flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full font-semibold shadow-md"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <FaMedal className="text-xl" /> 2x Silver Medalist
        </motion.div>
      </div>
    </section>
  );
} 