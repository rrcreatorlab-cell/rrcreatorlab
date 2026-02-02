import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface ProcessStep {
  id: string;
  step_title: string;
  step_description: string;
  step_number: number;
  active: boolean;
}

const AdminProcess = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null);
  const [formData, setFormData] = useState({
    step_title: "",
    step_description: "",
    step_number: 1,
    active: true,
  });

  const { data: steps = [], isLoading } = useQuery({
    queryKey: ["process_steps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("process_steps")
        .select("*")
        .order("step_number", { ascending: true });
      if (error) throw error;
      return data as ProcessStep[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("process_steps").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["process_steps"] });
      toast({ title: "Process step created successfully!" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Error creating step", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase.from("process_steps").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["process_steps"] });
      toast({ title: "Process step updated successfully!" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Error updating step", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("process_steps").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["process_steps"] });
      toast({ title: "Process step deleted successfully!" });
    },
    onError: (error) => {
      toast({ title: "Error deleting step", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({ step_title: "", step_description: "", step_number: steps.length + 1, active: true });
    setEditingStep(null);
    setIsOpen(false);
  };

  const handleEdit = (step: ProcessStep) => {
    setEditingStep(step);
    setFormData({
      step_title: step.step_title,
      step_description: step.step_description,
      step_number: step.step_number,
      active: step.active,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStep) {
      updateMutation.mutate({ id: editingStep.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <AdminLayout title="Process Steps">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Manage "How It Works" process steps</p>
          <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Add Step</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingStep ? "Edit Process Step" : "Add Process Step"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Step Number</Label>
                  <Input type="number" min="1" value={formData.step_number} onChange={(e) => setFormData({ ...formData, step_number: parseInt(e.target.value) || 1 })} required />
                </div>
                <div className="space-y-2">
                  <Label>Step Title</Label>
                  <Input value={formData.step_title} onChange={(e) => setFormData({ ...formData, step_title: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    value={formData.step_description} 
                    onChange={(e) => setFormData({ ...formData, step_description: e.target.value })} 
                    rows={3}
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={formData.active} onCheckedChange={(v) => setFormData({ ...formData, active: v })} />
                  <Label>Active</Label>
                </div>
                <Button type="submit" className="w-full">
                  {editingStep ? "Update Step" : "Create Step"}
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
                <TableHead>Step #</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {steps.map((step) => (
                <TableRow key={step.id}>
                  <TableCell className="font-bold">{step.step_number}</TableCell>
                  <TableCell className="font-medium">{step.step_title}</TableCell>
                  <TableCell className="max-w-xs truncate">{step.step_description}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${step.active ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                      {step.active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(step)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(step.id)}>
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

export default AdminProcess;
