import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, HelpCircle, BarChart3, Users, ArrowRight } from "lucide-react";

interface DashboardStats {
  testimonials: number;
  pendingTestimonials: number;
  faqs: number;
  stats: number;
  clients: number;
}

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
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
        const [testimonialsRes, pendingRes, faqsRes, statsRes, clientsRes] = await Promise.all([
          supabase.from("testimonials").select("id", { count: "exact" }),
          supabase.from("testimonials").select("id", { count: "exact" }).eq("approved", false),
          supabase.from("faqs").select("id", { count: "exact" }),
          supabase.from("stats").select("id", { count: "exact" }),
          supabase.from("client_logos").select("id", { count: "exact" }),
        ]);

        setDashboardStats({
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
      title: "Testimonials",
      value: dashboardStats.testimonials,
      subtitle: `${dashboardStats.pendingTestimonials} pending approval`,
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "text-blue-500",
    },
    {
      title: "FAQs",
      value: dashboardStats.faqs,
      subtitle: "Questions & answers",
      icon: HelpCircle,
      href: "/admin/faqs",
      color: "text-green-500",
    },
    {
      title: "Stats",
      value: dashboardStats.stats,
      subtitle: "Impact metrics",
      icon: BarChart3,
      href: "/admin/stats",
      color: "text-purple-500",
    },
    {
      title: "Client Logos",
      value: dashboardStats.clients,
      subtitle: "Featured clients",
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link key={card.title} to={card.href}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{card.value}</div>
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
