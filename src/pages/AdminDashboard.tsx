import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquare, 
  HelpCircle, 
  BarChart3, 
  Users, 
  ArrowRight,
  Layout,
  Briefcase,
  CreditCard,
  Zap,
  ListOrdered,
  UserCircle
} from "lucide-react";

interface DashboardStats {
  hero: number;
  services: number;
  pricingPlans: number;
  oneTimeServices: number;
  processSteps: number;
  team: number;
  testimonials: number;
  pendingTestimonials: number;
  faqs: number;
  stats: number;
  clients: number;
}

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    hero: 0,
    services: 0,
    pricingPlans: 0,
    oneTimeServices: 0,
    processSteps: 0,
    team: 0,
    testimonials: 0,
    pendingTestimonials: 0,
    faqs: 0,
    stats: 0,
    clients: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          heroRes,
          servicesRes,
          pricingRes,
          oneTimeRes,
          processRes,
          teamRes,
          testimonialsRes, 
          pendingRes, 
          faqsRes, 
          statsRes, 
          clientsRes
        ] = await Promise.all([
          supabase.from("hero_section").select("id", { count: "exact", head: true }),
          supabase.from("services").select("id", { count: "exact", head: true }),
          supabase.from("pricing_plans").select("id", { count: "exact", head: true }),
          supabase.from("one_time_services").select("id", { count: "exact", head: true }),
          supabase.from("process_steps").select("id", { count: "exact", head: true }),
          supabase.from("team").select("id", { count: "exact", head: true }),
          supabase.from("testimonials").select("id", { count: "exact", head: true }),
          supabase.from("testimonials").select("id", { count: "exact", head: true }).eq("featured", false),
          supabase.from("faqs").select("id", { count: "exact", head: true }),
          supabase.from("stats").select("id", { count: "exact", head: true }),
          supabase.from("client_logos").select("id", { count: "exact", head: true }),
        ]);

        setDashboardStats({
          hero: heroRes.count || 0,
          services: servicesRes.count || 0,
          pricingPlans: pricingRes.count || 0,
          oneTimeServices: oneTimeRes.count || 0,
          processSteps: processRes.count || 0,
          team: teamRes.count || 0,
          testimonials: testimonialsRes.count || 0,
          pendingTestimonials: pendingRes.count || 0,
          faqs: faqsRes.count || 0,
          stats: statsRes.count || 0,
          clients: clientsRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Hero Section",
      value: dashboardStats.hero > 0 ? "Configured" : "Not Set",
      subtitle: "Main landing section",
      icon: Layout,
      href: "/admin/hero",
      color: "text-primary",
    },
    {
      title: "Services",
      value: dashboardStats.services,
      subtitle: "Service offerings",
      icon: Briefcase,
      href: "/admin/services",
      color: "text-blue-500",
    },
    {
      title: "Pricing Plans",
      value: dashboardStats.pricingPlans,
      subtitle: "Monthly/yearly plans",
      icon: CreditCard,
      href: "/admin/pricing",
      color: "text-green-500",
    },
    {
      title: "One-Time Services",
      value: dashboardStats.oneTimeServices,
      subtitle: "Quick setup solutions",
      icon: Zap,
      href: "/admin/one-time-services",
      color: "text-yellow-500",
    },
    {
      title: "Impact Stats",
      value: dashboardStats.stats,
      subtitle: "Impact metrics",
      icon: BarChart3,
      href: "/admin/impact",
      color: "text-purple-500",
    },
    {
      title: "Process Steps",
      value: dashboardStats.processSteps,
      subtitle: "How it works",
      icon: ListOrdered,
      href: "/admin/process",
      color: "text-cyan-500",
    },
    {
      title: "Team Members",
      value: dashboardStats.team,
      subtitle: "Your team",
      icon: UserCircle,
      href: "/admin/team",
      color: "text-pink-500",
    },
    {
      title: "Testimonials",
      value: dashboardStats.testimonials,
      subtitle: `${dashboardStats.pendingTestimonials} pending`,
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "text-indigo-500",
    },
    {
      title: "FAQs",
      value: dashboardStats.faqs,
      subtitle: "Questions & answers",
      icon: HelpCircle,
      href: "/admin/faqs",
      color: "text-emerald-500",
    },
    {
      title: "Trusted Creators",
      value: dashboardStats.clients,
      subtitle: "Featured creators",
      icon: Users,
      href: "/admin/clients",
      color: "text-orange-500",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((card) => (
            <Link key={card.title} to={card.href}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
                  <div className="flex items-center gap-1 text-xs text-primary mt-3">
                    Manage <ArrowRight className="h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
