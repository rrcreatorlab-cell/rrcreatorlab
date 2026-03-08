import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <Pricing />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PricingPage;
