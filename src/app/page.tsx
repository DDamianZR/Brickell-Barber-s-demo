import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import BarbersSection from "@/components/home/BarbersSection";
import GallerySection from "@/components/home/GallerySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LoyaltySection from "@/components/home/LoyaltySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <BarbersSection />
      <GallerySection />
      <TestimonialsSection />
      <LoyaltySection />
    </>
  );
}
