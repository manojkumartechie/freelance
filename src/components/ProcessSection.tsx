"use client";
import { motion } from "framer-motion";
import { MdOutlineArrowForward } from "react-icons/md";
import BlowText from "./BlowText";

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
      <h2 className="text-3xl font-bold mb-8 text-center">
        <BlowText text="My Process" distance={60} rotation={50} glowColor="#00C9A7" />
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-0 max-w-5xl w-full overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal py-4 px-4 md:px-0 scroll-snap-x scroll-smooth">
        {steps.map((step, idx) => (
          <div key={step} className="flex flex-col md:flex-row items-center min-w-[220px] scroll-snap-align-start">
            <motion.div
              className="glass soft-light p-6 rounded-2xl flex flex-col items-center gap-2 shadow-lg min-w-[180px] text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="text-2xl font-bold text-primary mb-1">Step {idx + 1}</span>
              <span className="font-semibold text-base">{step}</span>
            </motion.div>
            {/* Arrow between steps, except after last step */}
            {idx < steps.length - 1 && (
              <span className="flex md:flex-col justify-center items-center mx-0 md:mx-4 my-4 md:my-0">
                <MdOutlineArrowForward className="text-3xl text-accent rotate-90 md:rotate-0" />
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 