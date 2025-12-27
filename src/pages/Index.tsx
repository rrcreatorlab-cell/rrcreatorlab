import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <WhyUs />
      <WhoWeWorkWith />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
