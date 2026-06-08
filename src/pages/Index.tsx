import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import MissionBanner from "@/components/MissionBanner";
import Services from "@/components/Services";

import Process from "@/components/Process";
import CoursesList from "@/components/CoursesList";
import WhyUs from "@/components/WhyUs";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import Team from "@/components/Team";
import Founder from "@/components/Founder";
import Testimonials from "@/components/Testimonials";
import BookingSection from "@/components/BookingSection";
import FAQ from "@/components/FAQ";

import Footer from "@/components/Footer";
import ChatSidebar from "@/components/ChatSidebar";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO canonical="/" />
      <Navbar />
      <Hero />
      <ClientLogos />
      <MissionBanner />
      
      
      <Services />
      <CoursesList />
      <Process />
      <WhyUs />
      <Team />
      <Founder />
      <WhoWeWorkWith />
      <Testimonials />
      <BookingSection />
      <FAQ />
      
      <Footer />
      <ChatSidebar />
      <ScrollToTop />
    </div>
  );
};

export default Index;
