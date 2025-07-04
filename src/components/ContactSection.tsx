"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaInstagram, FaGithub, FaYoutube, FaTwitter, FaPaperPlane } from "react-icons/fa";
import { SiLeetcode, SiKaggle } from "react-icons/si";
import MagneticButton from "./MagneticButton";
import AnimatedText from "./AnimatedText";
import BlowText from "./BlowText";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const socials = [
  { name: "LinkedIn", icon: <FaLinkedin />, url: "#", color: "#0077B5" },
  { name: "Instagram", icon: <FaInstagram />, url: "#", color: "#E4405F" },
  { name: "GitHub", icon: <FaGithub />, url: "#", color: "#333" },
  { name: "YouTube", icon: <FaYoutube />, url: "#", color: "#FF0000" },
  { name: "Twitter", icon: <FaTwitter />, url: "#", color: "#1DA1F2" },
  { name: "LeetCode", icon: <SiLeetcode />, url: "#", color: "#FFA116" },
  { name: "Kaggle", icon: <SiKaggle />, url: "#", color: "#20BEFF" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [isClient, setIsClient] = useState(false);
  const [particlePositions, setParticlePositions] = useState<Array<{ left: string; top: string }>>([]);

  useEffect(() => {
    setIsClient(true);
    // Generate particle positions once on client mount
    setParticlePositions(
      Array.from({ length: 20 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }))
    );
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Social links animation
      const socialLinks = socialsRef.current?.children;
      if (socialLinks) {
        gsap.fromTo(socialLinks,
          { opacity: 0, y: 30, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: socialsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Form animation
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 50, rotationX: -15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating animation for form
      gsap.to(formRef.current, {
        y: -10,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
    
    // Animate form submission
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });
    
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  }

  return (
    <section ref={sectionRef} id="contact" className="w-full flex flex-col items-center relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <h2 ref={titleRef} className="text-3xl font-bold mb-8 text-center">
        <BlowText text="Contact" distance={60} rotation={50} glowColor="#FF6B81" />
      </h2>

      {/* Social Links */}
      <div ref={socialsRef} className="flex flex-wrap gap-6 justify-center mb-16">
        {socials.map((social, idx) => (
          <MagneticButton
            key={social.name}
            className="glass soft-light p-4 rounded-full text-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
            strength={0.3}
          >
            <motion.a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 block"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
              style={{ color: social.color }}
            >
              {social.icon}
            </motion.a>
            
            {/* Hover glow effect */}
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
              style={{ backgroundColor: social.color }}
            />
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-current group-hover:animate-ping" />
          </MagneticButton>
        ))}
      </div>

      {/* Contact Form */}
      <motion.form
        ref={formRef}
        className="glass soft-light rounded-3xl p-10 max-w-2xl w-full flex flex-col gap-6 shadow-2xl relative overflow-hidden"
        onSubmit={handleSubmit}
        layout
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-accent" />
          {isClient && particlePositions.map((position, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              style={{
                left: position.left,
                top: position.top,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6 text-center">
            <AnimatedText text="Send me a message" delay={0.5} />
          </h3>

          {/* Name field */}
          <div className="relative">
            <input
              className="w-full p-4 rounded-xl bg-black/20 dark:bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder-white/60"
              placeholder="Your Name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
            {errors.name && (
              <motion.span 
                className="text-accent text-sm mt-1 block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.name}
              </motion.span>
            )}
          </div>

          {/* Email field */}
          <div className="relative">
            <input
              className="w-full p-4 rounded-xl bg-black/20 dark:bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder-white/60"
              placeholder="Your Email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
            {errors.email && (
              <motion.span 
                className="text-accent text-sm mt-1 block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.email}
              </motion.span>
            )}
          </div>

          {/* Message field */}
          <div className="relative">
            <textarea
              className="w-full p-4 rounded-xl bg-black/20 dark:bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 min-h-[120px] placeholder-white/60 resize-none"
              placeholder="Your Message"
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            />
            {errors.message && (
              <motion.span 
                className="text-accent text-sm mt-1 block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.message}
              </motion.span>
            )}
          </div>

          {/* Submit button */}
          <MagneticButton
            className="w-full mt-6 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-300 text-lg disabled:opacity-60 relative overflow-hidden group"
            strength={0.2}
          >
            <motion.div
              className="flex items-center justify-center gap-3 relative z-10"
              animate={status === "sending" ? { x: [0, 5, -5, 0] } : {}}
              transition={{ duration: 0.5, repeat: status === "sending" ? Infinity : 0 }}
            >
              <FaPaperPlane className={status === "sending" ? "animate-bounce" : ""} />
              {status === "idle" && "Send Message"}
              {status === "sending" && "Sending..."}
              {status === "sent" && "Message Sent!"}
            </motion.div>
            
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </MagneticButton>

          {status === "sent" && (
            <motion.div 
              className="text-primary text-center mt-4 font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              Thank you! I'll get back to you soon. ✨
            </motion.div>
          )}
        </div>
      </motion.form>
    </section>
  );
}