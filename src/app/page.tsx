import dynamic from "next/dynamic";
import EnhancedHeroSection from "@/components/EnhancedHeroSection";
import AboutSection from "@/components/AboutSection";
import EnhancedSkillsSection from "@/components/EnhancedSkillsSection";
import EnhancedProjectsSection from "@/components/EnhancedProjectsSection";
import CompetitionsSection from "@/components/CompetitionsSection";
import SpecialOfferSection from "@/components/SpecialOfferSection";
import ContactSection from "@/components/ContactSection";
import ArticlesSection from "@/components/ArticlesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProcessSection from "@/components/ProcessSection";
import AchievementsTimelineSection from "@/components/AchievementsTimelineSection";
import VideoIntroSection from "@/components/VideoIntroSection";
import NewsletterSection from "@/components/NewsletterSection";

// Dynamically import EnhancedHeroSection to avoid hydration mismatch
const DynamicEnhancedHeroSection = dynamic(
  () => import("@/components/EnhancedHeroSection"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="flex flex-col gap-20 items-center w-full relative overflow-hidden">
      {/* Hero Section with enhanced 3D background and particles */}
      <section id="home"><DynamicEnhancedHeroSection /></section>
      
      {/* About Section with animated timeline */}
      <section id="about"><AboutSection /></section>
      
      {/* Skills Section with 3D icons and interactive effects */}
      <section id="skills"><EnhancedSkillsSection /></section>
      
      {/* Projects Section with enhanced carousel and grid views */}
      <section id="projects"><EnhancedProjectsSection /></section>
      
      {/* Competitions Section with animated progress and badges */}
      <CompetitionsSection />
      
      {/* Special Offer Call-to-Action */}
      <SpecialOfferSection />
      
      {/* Contact & Social Links Section with magnetic effects */}
      <section id="contact"><ContactSection /></section>
      
      {/* Additional sections with enhanced animations */}
      <ArticlesSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <ProcessSection />
      <AchievementsTimelineSection />
      <VideoIntroSection />
      <NewsletterSection />
    </main>
  );
}