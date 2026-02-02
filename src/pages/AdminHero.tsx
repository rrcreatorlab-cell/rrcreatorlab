import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const AdminHero = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    badge_text: "",
    heading_line_1: "",
    heading_line_2: "",
    subtitle: "",
    primary_cta_text: "",
    secondary_cta_text: "",
  });

  const { data: heroData, isLoading } = useQuery({
    queryKey: ["hero_section"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_section")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (heroData) {
      setFormData({
        badge_text: heroData.badge_text || "",
        heading_line_1: heroData.heading_line_1 || "",
        heading_line_2: heroData.heading_line_2 || "",
        subtitle: heroData.subtitle || "",
        primary_cta_text: heroData.primary_cta_text || "",
        secondary_cta_text: heroData.secondary_cta_text || "",
      });
    }
  }, [heroData]);

  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (heroData?.id) {
        const { error } = await supabase
          .from("hero_section")
          .update(data)
          .eq("id", heroData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("hero_section").insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero_section"] });
      toast({ title: "Hero section updated successfully!" });
    },
    onError: (error) => {
      toast({ title: "Error updating hero section", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Hero Section">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Hero Section">
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="badge_text">Badge Text</Label>
            <Input
              id="badge_text"
              value={formData.badge_text}
              onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
              placeholder="e.g., Content Growth Studio"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heading_line_1">Heading Line 1</Label>
            <Input
              id="heading_line_1"
              value={formData.heading_line_1}
              onChange={(e) => setFormData({ ...formData, heading_line_1: e.target.value })}
              placeholder="e.g., Building Creators."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heading_line_2">Heading Line 2 (Gradient)</Label>
            <Input
              id="heading_line_2"
              value={formData.heading_line_2}
              onChange={(e) => setFormData({ ...formData, heading_line_2: e.target.value })}
              placeholder="e.g., Scaling Reach."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Textarea
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="Enter subtitle text..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary_cta_text">Primary CTA Text</Label>
              <Input
                id="primary_cta_text"
                value={formData.primary_cta_text}
                onChange={(e) => setFormData({ ...formData, primary_cta_text: e.target.value })}
                placeholder="e.g., Book Free Consultation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondary_cta_text">Secondary CTA Text</Label>
              <Input
                id="secondary_cta_text"
                value={formData.secondary_cta_text}
                onChange={(e) => setFormData({ ...formData, secondary_cta_text: e.target.value })}
                placeholder="e.g., Get Started"
              />
            </div>
          </div>

          <Button type="submit" disabled={updateMutation.isPending}>
            <Save className="w-4 h-4 mr-2" />
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminHero;
