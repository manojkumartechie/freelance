"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import BlowText from "./BlowText";

// Newsletter Signup section
export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  function validate() {
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) return "Valid email required";
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    setError(err);
    if (err) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1200); // Simulate async
  }

  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">
        <BlowText text="Newsletter" distance={60} rotation={50} glowColor="#FFD700" />
      </h2>
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
          placeholder="Your Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {error && <span className="text-accent text-xs">{error}</span>}
        <motion.button
          type="submit"
          className="mt-2 px-8 py-3 rounded-full bg-primary text-white font-bold shadow-lg hover:bg-accent transition animated text-lg disabled:opacity-60"
          whileHover={{ scale: 1.08 }}
          disabled={status === "sending" || status === "sent"}
        >
          {status === "idle" && "Subscribe"}
          {status === "sending" && "Subscribing..."}
          {status === "sent" && "Subscribed!"}
        </motion.button>
        {status === "sent" && <motion.div className="text-primary text-center mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Thank you for subscribing!</motion.div>}
      </motion.form>
    </section>
  );
} 