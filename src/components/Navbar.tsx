"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";
import { Object3DContext } from "@/app/Object3DContext";
import BlowText from "./BlowText";


const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const navGlowColors = [
  "#FFD700", // Home - gold
  "#00C9A7", // About - teal
  "#3B82F6", // Skills - blue
  "#FF6B81", // Projects - pink
  "#FF6B81"  // Contact - accent pink
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { setObjectType } = useContext(Object3DContext);
  const [blowIndex, setBlowIndex] = useState<number | null>(null);
  const [navBlow, setNavBlow] = useState<{ [k: number]: boolean }>({});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      // Navbar scroll animation
      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { className: "scrolled", targets: navRef.current },
        onUpdate: (self) => {
          setScrolled(self.progress > 0);
        },
      });

      // Initial navbar animation
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const triggerNavBlow = (index: number) => {
    setNavBlow((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => setNavBlow((prev) => ({ ...prev, [index]: false })), 700);
  };

  const handleLinkClick = (href: string, index?: number) => {
    setOpen(false);
    if (typeof index === 'number') {
      setBlowIndex(index);
      setObjectType('star');
      setTimeout(() => {
        setBlowIndex(null);
        setObjectType('database');
      }, 1200);
    }
    // Smooth scroll with GSAP
    const target = document.querySelector(href);
    if (target) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: target, offsetY: 80 },
        ease: "power3.inOut",
      });
    }
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-40 flex justify-center transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className={`mx-4 px-8 py-4 rounded-full flex items-center justify-between w-full max-w-6xl transition-all duration-500`}>
          {/* Logo/Brand */}
          <motion.a 
            href="#home" 
            className="font-extrabold text-2xl tracking-tight relative"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
          >
            Manoj
          </motion.a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 items-center">
            {navLinks.map((link, index) => (
              <motion.li 
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <MagneticButton
                  className={`font-semibold transition-colors px-4 py-2 rounded-lg relative group ${blowIndex === index ? 'animate-blow' : ''} ${navBlow[index] ? 'animate-blow' : ''}`}
                  onClick={() => { handleLinkClick(link.href, index); triggerNavBlow(index); }}
                  onMouseDown={() => triggerNavBlow(index)}
                  onTouchStart={() => triggerNavBlow(index)}
                  onMouseEnter={() => triggerNavBlow(index)}
                >
                  <BlowText text={link.name} />
                </MagneticButton>
              </motion.li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <MagneticButton
            className="md:hidden text-2xl focus:outline-none p-2"
            onClick={() => setOpen(!open)}
          >
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {open ? <FaTimes /> : <FaBars />}
            </motion.div>
          </MagneticButton>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.ul
              className="relative z-10 flex flex-col items-center gap-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MagneticButton
                    className={`text-3xl font-bold transition-colors px-6 py-3 ${blowIndex === index ? 'animate-blow' : ''} ${navBlow[index] ? 'animate-blow' : ''}`}
                    onClick={() => { handleLinkClick(link.href, index); triggerNavBlow(index); }}
                    onMouseDown={() => triggerNavBlow(index)}
                    onTouchStart={() => triggerNavBlow(index)}
                    onMouseEnter={() => triggerNavBlow(index)}
                  >
                    <BlowText text={link.name} />
                  </MagneticButton>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}