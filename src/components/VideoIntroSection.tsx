"use client";
import { motion } from "framer-motion";
import BlowText from "./BlowText";

// Video Introduction section with embedded video placeholder
export default function VideoIntroSection() {
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">
        <BlowText text="Video Introduction" distance={60} rotation={50} glowColor="#3B82F6" />
      </h2>
      <motion.div
        className="glass soft-light rounded-2xl p-8 max-w-2xl w-full flex flex-col items-center gap-4 shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="w-full aspect-video rounded-lg overflow-hidden bg-black mb-4 flex items-center justify-center">
          {/* Replace src with your video URL or file */}
          <video controls className="w-full h-full object-cover" poster="/globe.svg">
            <source src="#" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-lg opacity-80 text-center">
          Hi, I&apos;m Manoj Kumar. Here&apos;s a quick introduction to my freelance data engineering services and how I can help your business grow with data-driven solutions.
        </p>
      </motion.div>
    </section>
  );
} 