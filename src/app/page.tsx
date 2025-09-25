import dynamic from "next/dynamic";

// Dynamically import all client components to avoid SSR conflicts
const DynamicEnhancedHeroSection = dynamic(
  () => import("@/components/EnhancedHeroSection"),
  { ssr: false }
);

const DynamicAboutSection = dynamic(
  () => import("@/components/AboutSection"),
  { ssr: false }
);

const DynamicEnhancedSkillsSection = dynamic(
  () => import("@/components/EnhancedSkillsSection"),
  { ssr: false }
);

const DynamicEnhancedProjectsSection = dynamic(
  () => import("@/components/EnhancedProjectsSection"),
  { ssr: false }
);

const DynamicCompetitionsSection = dynamic(
  () => import("@/components/CompetitionsSection"),
  { ssr: false }
);

const DynamicSpecialOfferSection = dynamic(
  () => import("@/components/SpecialOfferSection"),
  { ssr: false }
);

const DynamicContactSection = dynamic(
  () => import("@/components/ContactSection"),
  { ssr: false }
);

const DynamicArticlesSection = dynamic(
  () => import("@/components/ArticlesSection"),
  { ssr: false }
);

const DynamicCaseStudiesSection = dynamic(
  () => import("@/components/CaseStudiesSection"),
  { ssr: false }
);

const DynamicTestimonialsSection = dynamic(
  () => import("@/components/TestimonialsSection"),
  { ssr: false }
);

const DynamicProcessSection = dynamic(
  () => import("@/components/ProcessSection"),
  { ssr: false }
);

const DynamicAchievementsTimelineSection = dynamic(
  () => import("@/components/AchievementsTimelineSection"),
  { ssr: false }
);

const DynamicVideoIntroSection = dynamic(
  () => import("@/components/VideoIntroSection"),
  { ssr: false }
);

const DynamicNewsletterSection = dynamic(
  () => import("@/components/NewsletterSection"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="flex flex-col gap-20 items-center w-full relative overflow-hidden">
      {/* Hero Section with enhanced 3D background and particles */}
      <section id="home"><DynamicEnhancedHeroSection /></section>
      
      {/* About Section with animated timeline */}
      <section id="about"><DynamicAboutSection /></section>
      
      {/* Skills Section with 3D icons and interactive effects */}
      <section id="skills"><DynamicEnhancedSkillsSection /></section>
      
      {/* Projects Section with enhanced carousel and grid views */}
      <section id="projects"><DynamicEnhancedProjectsSection /></section>
      
      {/* Competitions Section with animated progress and badges */}
      <DynamicCompetitionsSection />
      
      {/* Special Offer Call-to-Action */}
      <DynamicSpecialOfferSection />
      
      {/* Contact & Social Links Section with magnetic effects */}
      <section id="contact"><DynamicContactSection /></section>
      
      {/* Additional sections with enhanced animations */}
      <DynamicArticlesSection />
      <DynamicCaseStudiesSection />
      <DynamicTestimonialsSection />
      <DynamicProcessSection />
      <DynamicAchievementsTimelineSection />
      <DynamicVideoIntroSection />
      <DynamicNewsletterSection />
    </main>
  );
}