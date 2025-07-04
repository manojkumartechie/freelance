"use client";
import { motion } from "framer-motion";
import BlowText from "./BlowText";

// Special Offer section with glass morphism and animated CTA
export default function SpecialOfferSection() {
  return (
    <section className="w-full flex flex-col items-center">
      <motion.div
        className="glass soft-light rounded-2xl p-8 max-w-2xl w-full flex flex-col items-center gap-4 shadow-2xl border-2 border-primary/30"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-center mb-2 text-primary">
          <BlowText text="Special Offer" distance={60} rotation={50} glowColor="#FFD700" />
        </h2>
        <p className="text-lg text-center opacity-90 mb-4">
          First 10 projects for new clients at just <span className="font-bold text-accent">₹10,000</span> each!
        </p>
        <motion.a
          href="#contact"
          className="px-8 py-3 rounded-full bg-primary text-white font-bold shadow-lg hover:bg-accent transition animated text-lg"
          whileHover={{ scale: 1.08 }}
        >
          Contact Me
        </motion.a>
      </motion.div>
    </section>
  );
} 