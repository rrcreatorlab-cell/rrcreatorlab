import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Users, TrendingUp, Award, Star } from "lucide-react";

interface Stat {
  id: string;
  icon: string;
  value: number;
  suffix: string;
  label: string;
  color: string;
  display_order: number;
}

const iconOptions = [
  { value: "users", label: "Users", icon: Users },
  { value: "trending-up", label: "Trending Up", icon: TrendingUp },
  { value: "award", label: "Award", icon: Award },
  { value: "star", label: "Star", icon: Star },
];

const colorOptions = [
  { value: "text-primary", label: "Primary" },
  { value: "text-green-400", label: "Green" },
  { value: "text-blue-400", label: "Blue" },
  { value: "text-accent", label: "Accent" },
  { value: "text-purple-400", label: "Purple" },
  { value: "text-orange-400", label: "Orange" },
];

const AdminStats = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const [formData, setFormData] = useState({
    icon: "users",
    value: 0,
    suffix: "",
    label: "",
    color: "text-primary",
  });
  const { toast } = useToast();

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .order("display_order");

    if (error) {
      toast({ title: "Error fetching stats", variant: "destructive" });
    } else {
      setStats(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSubmit = async () => {
    if (!formData.label.trim()) {
      toast({ title: "Please enter a label", variant: "destructive" });
      return;
    }

    if (editingStat) {
      const { error } = await supabase
        .from("stats")
        .update(formData)
        .eq("id", editingStat.id);

      if (error) {
        toast({ title: "Error updating stat", variant: "destructive" });
      } else {
        toast({ title: "Stat updated successfully" });
        fetchStats();
      }
    } else {
      const maxOrder = stats.length > 0 ? Math.max(...stats.map(s => s.display_order)) : 0;
      const { error } = await supabase
        .from("stats")
        .insert({ ...formData, display_order: maxOrder + 1 });

      if (error) {
        toast({ title: "Error adding stat", variant: "destructive" });
      } else {
        toast({ title: "Stat added successfully" });
        fetchStats();
      }
    }

    setDialogOpen(false);
    setEditingStat(null);
    setFormData({ icon: "users", value: 0, suffix: "", label: "", color: "text-primary" });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("stats").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting stat", variant: "destructive" });
    } else {
      toast({ title: "Stat deleted successfully" });
      fetchStats();
    }
  };

  const openEdit = (stat: Stat) => {
    setEditingStat(stat);
    setFormData({
      icon: stat.icon,
      value: stat.value,
      suffix: stat.suffix,
      label: stat.label,
      color: stat.color,
    });
    setDialogOpen(true);
  };

  const openAdd = () => {
    setEditingStat(null);
    setFormData({ icon: "users", value: 0, suffix: "", label: "", color: "text-primary" });
    setDialogOpen(true);
  };

  const getIconComponent = (iconName: string) => {
    const found = iconOptions.find(i => i.value === iconName);
    return found ? found.icon : Users;
  };

  return (
    <AdminLayout title="Manage Stats">
      <div className="flex justify-end mb-6">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Stat
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingStat ? "Edit Stat" : "Add Stat"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Icon</label>
                  <Select value={formData.icon} onValueChange={(v) => setFormData({ ...formData, icon: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          <div className="flex items-center gap-2">
                            <opt.icon className="h-4 w-4" />
                            {opt.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Color</label>
                  <Select value={formData.color} onValueChange={(v) => setFormData({ ...formData, color: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          <span className={opt.value}>{opt.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Value</label>
                  <Input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Suffix (e.g., +, %, K+)</label>
                  <Input
                    value={formData.suffix}
                    onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                    placeholder="+"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Label</label>
                <Input
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g., Creators Helped"
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingStat ? "Update" : "Add"} Stat
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Label</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.map((stat, index) => {
                const IconComponent = getIconComponent(stat.icon);
                return (
                  <TableRow key={stat.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <IconComponent className={`h-5 w-5 ${stat.color}`} />
                    </TableCell>
                    <TableCell className={`font-bold ${stat.color}`}>
                      {stat.value}{stat.suffix}
                    </TableCell>
                    <TableCell>{stat.label}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(stat)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(stat.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {stats.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No stats found. Add your first stat above.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminStats;
