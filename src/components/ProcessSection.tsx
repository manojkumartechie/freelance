"use client";
import { motion } from "framer-motion";
import { MdOutlineArrowForward } from "react-icons/md";

// Placeholder workflow steps
const steps = [
  "Discovery & Requirements",
  "Data Modeling & Design",
  "Pipeline Development",
  "Testing & QA",
  "Deployment & Monitoring",
  "Client Training & Handover",
];

// Process section with animated step-by-step visual
export default function ProcessSection() {
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">My Process</h2>
      <div className="flex flex-col md:flex-row items-center gap-6 max-w-5xl w-full justify-center">
        {steps.map((step, idx) => (
          <motion.div
            key={step}
            className="glass soft-light p-6 rounded-2xl flex flex-col items-center gap-2 shadow-lg min-w-[180px] text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <span className="text-2xl font-bold text-primary mb-1">Step {idx + 1}</span>
            <span className="font-semibold text-base">{step}</span>
          </motion.div>
        ))}
        {/* Animated arrows between steps (desktop only) */}
        <div className="hidden md:flex flex-row items-center gap-2 absolute pointer-events-none">
          {steps.slice(0, -1).map((_, idx) => (
            <motion.span
              key={idx}
              className="text-3xl text-accent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
              viewport={{ once: true }}
            >
              <MdOutlineArrowForward />
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
} 