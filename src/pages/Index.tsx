import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GrowthShowcase from "@/components/GrowthShowcase";
import GrowthVisuals from "@/components/GrowthVisuals";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import Founder from "@/components/Founder";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ChatSidebar from "@/components/ChatSidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <GrowthShowcase />
      <GrowthVisuals />
      <Services />
      <Pricing />
      <Process />
      <WhyUs />
      <WhoWeWorkWith />
      <Founder />
      <Testimonials />
      <Footer />
      <ChatSidebar />
    </div>
  );
};

export default Index;
