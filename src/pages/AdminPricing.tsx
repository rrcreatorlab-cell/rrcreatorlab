import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Star } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price_min: number;
  price_max: number;
  duration: string;
  features: string;
  popular: boolean;
  active: boolean;
  display_order: number;
}

const AdminPricing = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price_min: 0,
    price_max: 0,
    duration: "Monthly",
    features: "",
    popular: false,
    active: true,
    display_order: 0,
  });

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["pricing_plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pricing_plans")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as PricingPlan[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("pricing_plans").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing_plans"] });
      toast({ title: "Pricing plan created successfully!" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Error creating plan", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase.from("pricing_plans").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing_plans"] });
      toast({ title: "Pricing plan updated successfully!" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Error updating plan", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("pricing_plans").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing_plans"] });
      toast({ title: "Pricing plan deleted successfully!" });
    },
    onError: (error) => {
      toast({ title: "Error deleting plan", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({ name: "", price_min: 0, price_max: 0, duration: "Monthly", features: "", popular: false, active: true, display_order: 0 });
    setEditingPlan(null);
    setIsOpen(false);
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price_min: plan.price_min,
      price_max: plan.price_max,
      duration: plan.duration,
      features: plan.features,
      popular: plan.popular,
      active: plan.active,
      display_order: plan.display_order,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlan) {
      updateMutation.mutate({ id: editingPlan.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const formatPrice = (min: number, max: number) => {
    return `₹${min.toLocaleString()} – ₹${max.toLocaleString()}`;
  };

  return (
    <AdminLayout title="Pricing Plans">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Manage pricing plans for your services</p>
          <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Add Plan</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingPlan ? "Edit Pricing Plan" : "Add Pricing Plan"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Plan Name</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price Min (₹)</Label>
                    <Input type="number" value={formData.price_min} onChange={(e) => setFormData({ ...formData, price_min: parseInt(e.target.value) || 0 })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Price Max (₹)</Label>
                    <Input type="number" value={formData.price_max} onChange={(e) => setFormData({ ...formData, price_max: parseInt(e.target.value) || 0 })} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select value={formData.duration} onValueChange={(v) => setFormData({ ...formData, duration: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Yearly">Yearly</SelectItem>
                        <SelectItem value="One-time">One-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Display Order</Label>
                    <Input type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Features (one per line)</Label>
                  <Textarea 
                    value={formData.features} 
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })} 
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    rows={5}
                  />
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.popular} onCheckedChange={(v) => setFormData({ ...formData, popular: v })} />
                    <Label>Most Popular</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.active} onCheckedChange={(v) => setFormData({ ...formData, active: v })} />
                    <Label>Active</Label>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  {editingPlan ? "Update Plan" : "Create Plan"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price Range</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.display_order}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {plan.name}
                      {plan.popular && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                    </div>
                  </TableCell>
                  <TableCell>{formatPrice(plan.price_min, plan.price_max)}</TableCell>
                  <TableCell>{plan.duration}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${plan.active ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                      {plan.active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(plan)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(plan.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPricing;
