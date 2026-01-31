import AboutSection from "@/components/AboutSection";
import AgentContact from "@/components/AgentContact";
import CitiesSection from "@/components/CitiesSection";
import ContactSection from "@/components/ContactSection";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ListingsSection from "@/components/ListingSection";
import MainFooter from "@/components/MainFooter";
import Navbar from "@/components/Navbar";

import NewestHomes from "@/components/NewestHomes";
import PreFooter from "@/components/PreFooter";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <AboutSection />
        <StatsSection />
        <ServicesSection />
        <NewestHomes />
        <CitiesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </div>
  );
}
