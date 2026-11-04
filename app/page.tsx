import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import ServicesSection from "@/components/sections/ServicesSection";
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
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
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
