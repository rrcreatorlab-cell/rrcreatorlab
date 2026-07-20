import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Courses from "@/components/Courses";
import PerformancePackages from "@/components/PerformancePackages";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEO from "@/components/SEO";

const PricingPage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    // Wait for sections to mount, then scroll with navbar offset
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
    return () => clearTimeout(t);
  }, [hash]);

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
        <PerformancePackages />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PricingPage;
