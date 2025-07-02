"use client";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaGithub, FaYoutube, FaTwitter } from "react-icons/fa";
import { SiLeetcode, SiKaggle } from "react-icons/si";
import { useState } from "react";

const socials = [
  { name: "LinkedIn", icon: <FaLinkedin />, url: "#" },
  { name: "Instagram", icon: <FaInstagram />, url: "#" },
  { name: "GitHub", icon: <FaGithub />, url: "#" },
  { name: "YouTube", icon: <FaYoutube />, url: "#" },
  { name: "Twitter", icon: <FaTwitter />, url: "#" },
  { name: "LeetCode", icon: <SiLeetcode />, url: "#" },
  { name: "Kaggle", icon: <SiKaggle />, url: "#" },
];

// Contact section with animated social links and contact form
export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  function validate() {
    const errs: { [k: string]: string } = {};
    if (!form.name) errs.name = "Name required";
    if (!form.email || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = "Valid email required";
    if (!form.message) errs.message = "Message required";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1200); // Simulate async
  }

  return (
    <section id="contact" className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">Contact & Social Links</h2>
      {/* Social Links */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {socials.map((s, idx) => (
          <motion.a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass soft-light p-3 rounded-full text-2xl shadow-md hover:scale-110 hover:bg-primary/20 transition animated"
            whileHover={{ scale: 1.15 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            viewport={{ once: true }}
            aria-label={s.name}
          >
            {s.icon}
          </motion.a>
        ))}
      </div>
      {/* Contact Form */}
      <motion.form
        className="glass soft-light rounded-2xl p-8 max-w-lg w-full flex flex-col gap-4 shadow-2xl"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <input
          className="p-3 rounded-lg bg-black/10 dark:bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary transition"
          placeholder="Your Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
        {errors.name && <span className="text-accent text-xs">{errors.name}</span>}
        <input
          className="p-3 rounded-lg bg-black/10 dark:bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary transition"
          placeholder="Your Email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        {errors.email && <span className="text-accent text-xs">{errors.email}</span>}
        <textarea
          className="p-3 rounded-lg bg-black/10 dark:bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary transition min-h-[100px]"
          placeholder="Your Message"
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
        />
        {errors.message && <span className="text-accent text-xs">{errors.message}</span>}
        <motion.button
          type="submit"
          className="mt-2 px-8 py-3 rounded-full bg-primary text-white font-bold shadow-lg hover:bg-accent transition animated text-lg disabled:opacity-60"
          whileHover={{ scale: 1.08 }}
          disabled={status === "sending" || status === "sent"}
        >
          {status === "idle" && "Send Message"}
          {status === "sending" && "Sending..."}
          {status === "sent" && "Sent!"}
        </motion.button>
        {status === "sent" && <motion.div className="text-primary text-center mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Thank you! I will get back to you soon.</motion.div>}
      </motion.form>
    </section>
  );
} 