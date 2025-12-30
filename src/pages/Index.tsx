import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Pricing />
      <Process />
      <WhyUs />
      <WhoWeWorkWith />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
