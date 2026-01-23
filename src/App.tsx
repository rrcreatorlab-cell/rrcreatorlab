import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import FloatingBookButton from "@/components/FloatingBookButton";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import SocialProofToast from "@/components/SocialProofToast";
import CursorGlow from "@/components/CursorGlow";
import Index from "./pages/Index";
import SuccessStories from "./pages/SuccessStories";
import LetsConnect from "./pages/LetsConnect";
import Auth from "./pages/Auth";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminFaqs from "./pages/AdminFaqs";
import AdminStats from "./pages/AdminStats";
import AdminClients from "./pages/AdminClients";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollProgress />
          <CursorGlow />
          <FloatingBookButton />
          <BackToTop />
          <SocialProofToast />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/lets-connect" element={<LetsConnect />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/faqs" element={<AdminFaqs />} />
            <Route path="/admin/stats" element={<AdminStats />} />
            <Route path="/admin/clients" element={<AdminClients />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
