import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import SocialProofToast from "@/components/SocialProofToast";
import CursorGlow from "@/components/CursorGlow";
import Index from "./pages/Index";

// Lazy-load non-critical routes for faster initial paint
const SuccessStories = lazy(() => import("./pages/SuccessStories"));
const LetsConnect = lazy(() => import("./pages/LetsConnect"));
const Auth = lazy(() => import("./pages/Auth"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminHero = lazy(() => import("./pages/AdminHero"));
const AdminServices = lazy(() => import("./pages/AdminServices"));
const AdminPricing = lazy(() => import("./pages/AdminPricing"));
const AdminOneTimeServices = lazy(() => import("./pages/AdminOneTimeServices"));
const AdminProcess = lazy(() => import("./pages/AdminProcess"));
const AdminTeam = lazy(() => import("./pages/AdminTeam"));
const AdminTestimonials = lazy(() => import("./pages/AdminTestimonials"));
const AdminFaqs = lazy(() => import("./pages/AdminFaqs"));
const AdminStats = lazy(() => import("./pages/AdminStats"));
const AdminClients = lazy(() => import("./pages/AdminClients"));
const AdminPortfolio = lazy(() => import("./pages/AdminPortfolio"));
const AdminOthers = lazy(() => import("./pages/AdminOthers"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
  </div>
);

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollProgress />
          <CursorGlow />
          <BackToTop />
          <SocialProofToast />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/lets-connect" element={<LetsConnect />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/hero" element={<AdminHero />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/pricing" element={<AdminPricing />} />
              <Route path="/admin/one-time-services" element={<AdminOneTimeServices />} />
              <Route path="/admin/impact" element={<AdminStats />} />
              <Route path="/admin/process" element={<AdminProcess />} />
              <Route path="/admin/team" element={<AdminTeam />} />
              <Route path="/admin/testimonials" element={<AdminTestimonials />} />
              <Route path="/admin/faqs" element={<AdminFaqs />} />
              <Route path="/admin/clients" element={<AdminClients />} />
              <Route path="/admin/portfolio" element={<AdminPortfolio />} />
              <Route path="/admin/others" element={<AdminOthers />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
