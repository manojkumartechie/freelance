import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
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

export default function Home() {
  return (
    <main className="flex flex-col gap-16 items-center w-full">
      {/* Hero Section with 3D background and particles */}
      <HeroSection />
      {/* About Section with animated timeline */}
      <AboutSection />
      {/* Skills Section with 3D icons/cards */}
      <SkillsSection />
      {/* Projects Section with animated grid/carousel */}
      <ProjectsSection />
      {/* Competitions Section with badges and progress bars */}
      <CompetitionsSection />
      {/* Special Offer Call-to-Action */}
      <SpecialOfferSection />
      {/* Contact & Social Links Section */}
      <ContactSection />
      {/* Articles/Blog Section */}
      <ArticlesSection />
      {/* Case Studies Section */}
      <CaseStudiesSection />
      {/* Testimonials Section */}
      <TestimonialsSection />
      {/* Process Section */}
      <ProcessSection />
      {/* Achievements Timeline Section */}
      <AchievementsTimelineSection />
      {/* Video Introduction Section */}
      <VideoIntroSection />
      {/* Newsletter Signup Section */}
      <NewsletterSection />
    </main>
  );
}
