"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Competitions", href: "#competitions" },
  { name: "Offer", href: "#offer" },
  { name: "Contact", href: "#contact" },
  { name: "Articles", href: "#articles" },
  { name: "Case Studies", href: "#case-studies" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Process", href: "#process" },
  { name: "Achievements", href: "#achievements" },
  { name: "Video", href: "#video" },
  { name: "Newsletter", href: "#newsletter" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-40 flex justify-center">
      <div className="glass soft-light mt-4 mx-2 px-6 py-3 rounded-full shadow-xl flex items-center justify-between w-full max-w-5xl">
        {/* Logo/Brand */}
        <a href="#home" className="font-extrabold text-xl text-primary tracking-tight">Manoj</a>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="font-semibold text-white/90 hover:text-primary transition px-2 py-1 rounded-lg"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-primary focus:outline-none"
          onClick={() => setOpen((o) => !o)}
          aria-label="Open menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {/* Mobile Nav */}
      <AnimatePresence>
        {open && (
          <motion.ul
            className="fixed top-0 left-0 w-full h-screen bg-black/80 flex flex-col items-center justify-center gap-8 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navLinks.map((link) => (
              <motion.li key={link.name} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}>
                <a
                  href={link.href}
                  className="text-2xl font-bold text-white hover:text-primary transition"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
} 