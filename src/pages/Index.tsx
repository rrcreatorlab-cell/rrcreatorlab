import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import StatsCounter from "@/components/StatsCounter";
import GrowthShowcase from "@/components/GrowthShowcase";
import GrowthVisuals from "@/components/GrowthVisuals";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import Founder from "@/components/Founder";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ChatSidebar from "@/components/ChatSidebar";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ClientLogos />
      <StatsCounter />
      <GrowthShowcase />
      <GrowthVisuals />
      <Services />
      <Pricing />
      <Process />
      <WhyUs />
      <WhoWeWorkWith />
      <Founder />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
      <ChatSidebar />
      <ScrollToTop />
    </div>
  );
};

export default Index;
