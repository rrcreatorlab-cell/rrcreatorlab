import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Courses from "@/components/Courses";
import DigitalServices from "@/components/DigitalServices";
import ComboPackages from "@/components/ComboPackages";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEO from "@/components/SEO";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Pricing"
        description="Affordable YouTube and Instagram management plans for creators and brands. Choose the right plan to scale your content growth."
        canonical="/pricing"
      />
      <Navbar />
      <div className="pt-20">
        <Pricing />
        <Courses />
        <DigitalServices />
        <ComboPackages />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PricingPage;
