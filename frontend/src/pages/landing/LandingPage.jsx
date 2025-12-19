import { useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import HeroSection from '../../components/landing/HeroSection';
import NotAverageSection from '../../components/landing/NotAverageSection';
import ServicesSection from '../../components/landing/ServicesSection';
import AboutSection from '../../components/landing/AboutSection';
import ProjectsSection from '../../components/landing/ProjectsSection';
import ClientsSection from '../../components/landing/ClientsSection';
import ContactSection from '../../components/landing/ContactSection';
import NewsletterSection from '../../components/landing/NewsletterSection';
import CallToActionSection from '../../components/landing/CallToActionSection';
import { scrollToSection } from '../../utils/navigation';

const LandingPage = memo(() => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation when component mounts or hash changes
    if (location.hash) {
      setTimeout(() => scrollToSection(location.hash), 100);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <div className="bg-white">
        <Header />
        <HeroSection />
        <NotAverageSection />
        <ServicesSection />
        <AboutSection />
        <ProjectsSection />
        <ClientsSection />
        <ContactSection />
        <NewsletterSection />
        <CallToActionSection />
        <Footer />
      </div>
    </div>
  );
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;
