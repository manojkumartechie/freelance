"use client";
import { motion } from "framer-motion";

// About section with bio, highlights, and animated timeline
export default function AboutSection() {
  return (
    <section className="w-full flex flex-col items-center">
      <motion.div
        className="glass soft-light rounded-2xl p-8 max-w-2xl w-full text-center mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-2">About Me</h2>
        <p className="text-lg opacity-80 mb-4">
          I am a freelance data engineer with experience delivering 20+ advanced data engineering projects for clients worldwide. My expertise spans data pipelines, analytics, and cloud solutions. I actively participate in LeetCode and Kaggle competitions, working with public, government, and synthetic datasets.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">20+ Projects</span>
          <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold">LeetCode & Kaggle</span>
          <span className="bg-soft text-white px-3 py-1 rounded-full text-xs font-semibold">Public & Synthetic Data</span>
        </div>
      </motion.div>
      {/* Animated Timeline for Professional Journey */}
      <motion.ol
        className="relative border-l-2 border-primary/40 max-w-xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {/* Timeline Item Example */}
        {["Started freelancing (2020)", "Completed 10+ client projects (2021)", "Top 5% LeetCode (2022)", "Kaggle Silver Medal (2023)", "Built 20th project (2024)", "Ongoing learning & innovation"].map((item, idx) => (
          <motion.li
            key={item}
            className="mb-8 ml-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-primary rounded-full ring-4 ring-white dark:ring-gray-900">
              <span className="w-3 h-3 bg-white rounded-full" />
            </span>
            <div className="glass p-4 rounded-xl shadow-md">
              <span className="font-semibold text-base">{item}</span>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
} 