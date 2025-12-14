import Hero from "@/components/Hero";
import WhatWeAre from "@/components/WhatWeAre";
import VideoSection from "@/components/VideoSection";
import GiftIdeas from "@/components/GiftIdeas";
import AboutUs from "@/components/AboutUs";
import CoCreators from "@/components/CoCreators";
import ProductCategories from "@/components/ProductCategories";
import CardsSection from "@/components/CardsSection";
import PrintsSection from "@/components/PrintsSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CollectorsSection from "@/components/CollectorsSection";
import CommissionedArt from "@/components/CommissionedArt";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
export default function Home() {
  // Updated: Section backgrounds now alternate between #ecece9 and #ffffff
  return (
    <main className="min-h-screen bg-brand-lightest">
      <Navbar />
      <Hero />
      <WhatWeAre />
      <VideoSection />
      <GiftIdeas />
      <AboutUs />
      <CoCreators />
      <CardsSection />
      <PrintsSection />
      <FeaturedProducts />
      <CollectorsSection />
      <CommissionedArt />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

