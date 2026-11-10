import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import TechMarquee from "@/components/sections/TechMarquee";
import StatsSection from "@/components/sections/StatsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import DeveloperCartoon3D from "@/components/sections/DeveloperCartoon3D";
import EngineeringProcessTimeline from "@/components/sections/EngineeringProcessTimeline";
import ArchitectureComparisonSlider from "@/components/sections/ArchitectureComparisonSlider";
import ProjectEstimator from "@/components/sections/ProjectEstimator";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TeamSection from "@/components/sections/TeamSection";
import CareersSection from "@/components/sections/CareersSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";
import AIChatWidget from "@/components/sections/AIChatWidget";
import WebsiteTour from "@/components/sections/WebsiteTour";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <HeroSection />
      <TechMarquee />
      <StatsSection />
      <ServicesSection />
      <DeveloperCartoon3D />
      <EngineeringProcessTimeline />
      <ArchitectureComparisonSlider />
      <ProjectEstimator />
      <WhyChooseUsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <TeamSection />
      <CareersSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
      <AIChatWidget />
      <WebsiteTour />
    </main>
  );
}
