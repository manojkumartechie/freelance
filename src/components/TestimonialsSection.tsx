"use client";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

// Placeholder testimonials
const testimonials = [
  {
    name: "A. Client",
    quote: "Manoj delivered a robust data pipeline that transformed our analytics.",
    video: null,
  },
  {
    name: "B. Collaborator",
    quote: "Great to work with, highly skilled in cloud data engineering!",
    video: null,
  },
  {
    name: "C. Client",
    quote: "Automated our ETL and saved us countless hours.",
    video: null,
  },
];

// Testimonials section with animated cards and video placeholders
export default function TestimonialsSection() {
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.name}
            className="glass soft-light p-8 rounded-2xl flex flex-col gap-3 shadow-lg hover:shadow-2xl transition animated items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <FaQuoteLeft className="text-2xl text-primary mb-2" />
            <blockquote className="italic text-center opacity-90 mb-2">"{t.quote}"</blockquote>
            <span className="font-semibold text-base text-primary">{t.name}</span>
            {/* Placeholder for video testimonial */}
            {t.video && (
              <div className="w-full aspect-video rounded-lg overflow-hidden mt-2">
                <video src={t.video} controls className="w-full h-full object-cover" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
} 