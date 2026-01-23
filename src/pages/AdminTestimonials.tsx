import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Star,
  Trash2,
  Pencil,
  Plus,
  Save,
  X,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  approved: boolean;
  created_at: string;
}

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    rating: 5,
    review: "",
    approved: true,
  });

  useEffect(() => {
    fetchAllTestimonials();
  }, []);

  const fetchAllTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast({
        title: "Error",
        description: "Failed to load testimonials.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.name.trim() || !formData.role.trim() || !formData.review.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("testimonials").insert({
        name: formData.name.trim(),
        role: formData.role.trim(),
        rating: formData.rating,
        review: formData.review.trim(),
        approved: formData.approved,
      });

      if (error) throw error;

      toast({ title: "Success", description: "Testimonial added successfully." });
      setFormData({ name: "", role: "", rating: 5, review: "", approved: true });
      setIsAddDialogOpen(false);
      fetchAllTestimonials();
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast({ title: "Error", description: "Failed to add testimonial.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!formData.name.trim() || !formData.role.trim() || !formData.review.trim()) {
      toast({ title: "Missing fields", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({
          name: formData.name.trim(),
          role: formData.role.trim(),
          rating: formData.rating,
          review: formData.review.trim(),
          approved: formData.approved,
        })
        .eq("id", id);

      if (error) throw error;

      toast({ title: "Success", description: "Testimonial updated successfully." });
      setEditingId(null);
      setFormData({ name: "", role: "", rating: 5, review: "", approved: true });
      fetchAllTestimonials();
    } catch (error) {
      console.error("Error updating testimonial:", error);
      toast({ title: "Error", description: "Failed to update testimonial.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Deleted", description: "Testimonial removed successfully." });
      fetchAllTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast({ title: "Error", description: "Failed to delete testimonial.", variant: "destructive" });
    }
  };

  const handleToggleApproval = async (id: string, currentApproved: boolean) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ approved: !currentApproved })
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Updated", description: `Testimonial ${!currentApproved ? "approved" : "hidden"}.` });
      fetchAllTestimonials();
    } catch (error) {
      console.error("Error toggling approval:", error);
      toast({ title: "Error", description: "Failed to update testimonial.", variant: "destructive" });
    }
  };

  const startEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      rating: testimonial.rating,
      review: testimonial.review,
      approved: testimonial.approved,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", role: "", rating: 5, review: "", approved: true });
  };

  const renderStars = (rating: number, interactive = false, onSelect?: (star: number) => void) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onSelect?.(star)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            className={`w-4 h-4 ${
              star <= rating ? "fill-primary text-primary" : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <AdminLayout title="Manage Testimonials">
      <div className="flex justify-end mb-6">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Client name"
                />
              </div>
              <div>
                <Label>Role/Company</Label>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="YouTuber, Business, etc."
                />
              </div>
              <div>
                <Label>Rating</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Review</Label>
                <Textarea
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="What did they say about us?"
                  rows={4}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.approved}
                  onCheckedChange={(checked) => setFormData({ ...formData, approved: checked })}
                />
                <Label>Approved (visible on site)</Label>
              </div>
              <Button onClick={handleAdd} disabled={submitting} className="w-full">
                {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                Add Testimonial
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
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="hidden md:table-cell max-w-xs">Review</TableHead>
                <TableHead>Approved</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No testimonials yet. Add your first one!
                  </TableCell>
                </TableRow>
              ) : (
                testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    {editingId === testimonial.id ? (
                      <>
                        <TableCell>
                          <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          />
                        </TableCell>
                        <TableCell>
                          {renderStars(formData.rating, true, (star) =>
                            setFormData({ ...formData, rating: star })
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Textarea
                            value={formData.review}
                            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                            rows={2}
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={formData.approved}
                            onCheckedChange={(checked) => setFormData({ ...formData, approved: checked })}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="icon" onClick={() => handleUpdate(testimonial.id)} disabled={submitting}>
                              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            </Button>
                            <Button size="icon" variant="ghost" onClick={cancelEdit}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="font-medium">{testimonial.name}</TableCell>
                        <TableCell className="text-muted-foreground">{testimonial.role}</TableCell>
                        <TableCell>{renderStars(testimonial.rating)}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground max-w-xs truncate">
                          {testimonial.review}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={testimonial.approved}
                            onCheckedChange={() => handleToggleApproval(testimonial.id, testimonial.approved)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" onClick={() => startEdit(testimonial)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleDelete(testimonial.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminTestimonials;
