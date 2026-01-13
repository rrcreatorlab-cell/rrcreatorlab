import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Star,
  Trash2,
  Edit2,
  Plus,
  Save,
  X,
  Loader2,
  Shield,
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();

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
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (!authLoading && !adminLoading && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    if (isAdmin) {
      fetchAllTestimonials();
    }
  }, [user, authLoading, isAdmin, adminLoading, navigate, toast]);

  const fetchAllTestimonials = async () => {
    try {
      // Admins can see all testimonials through RLS
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

      toast({
        title: "Success",
        description: "Testimonial added successfully.",
      });

      setFormData({ name: "", role: "", rating: 5, review: "", approved: true });
      setIsAddDialogOpen(false);
      fetchAllTestimonials();
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to add testimonial.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (id: string) => {
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

      toast({
        title: "Success",
        description: "Testimonial updated successfully.",
      });

      setEditingId(null);
      setFormData({ name: "", role: "", rating: 5, review: "", approved: true });
      fetchAllTestimonials();
    } catch (error) {
      console.error("Error updating testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to update testimonial.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: "Testimonial removed successfully.",
      });

      fetchAllTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial.",
        variant: "destructive",
      });
    }
  };

  const handleToggleApproval = async (id: string, currentApproved: boolean) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ approved: !currentApproved })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Updated",
        description: `Testimonial ${!currentApproved ? "approved" : "hidden"}.`,
      });

      fetchAllTestimonials();
    } catch (error) {
      console.error("Error toggling approval:", error);
      toast({
        title: "Error",
        description: "Failed to update testimonial.",
        variant: "destructive",
      });
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "fill-primary text-primary" : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  if (authLoading || adminLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="font-display text-3xl font-bold">
                Manage <span className="gradient-text">Testimonials</span>
              </h1>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="hero">
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
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <Label>Role/Company</Label>
                    <Input
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
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
                          onClick={() =>
                            setFormData({ ...formData, rating: star })
                          }
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
                      onChange={(e) =>
                        setFormData({ ...formData, review: e.target.value })
                      }
                      placeholder="What did they say about us?"
                      rows={4}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.approved}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, approved: checked })
                      }
                    />
                    <Label>Approved (visible on site)</Label>
                  </div>
                  <Button
                    onClick={handleAdd}
                    disabled={submitting}
                    className="w-full"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    Add Testimonial
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Testimonials Table */}
          <div className="glass-card rounded-2xl border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="max-w-xs">Review</TableHead>
                  <TableHead>Approved</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-muted-foreground">
                        No testimonials yet. Add your first one!
                      </p>
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
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={formData.role}
                              onChange={(e) =>
                                setFormData({ ...formData, role: e.target.value })
                              }
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() =>
                                    setFormData({ ...formData, rating: star })
                                  }
                                >
                                  <Star
                                    className={`w-4 h-4 ${
                                      star <= formData.rating
                                        ? "fill-primary text-primary"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Textarea
                              value={formData.review}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  review: e.target.value,
                                })
                              }
                              rows={2}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={formData.approved}
                              onCheckedChange={(checked) =>
                                setFormData({ ...formData, approved: checked })
                              }
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleUpdate(testimonial.id)}
                                disabled={submitting}
                              >
                                {submitting ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Save className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={cancelEdit}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell className="font-medium">
                            {testimonial.name}
                          </TableCell>
                          <TableCell>{testimonial.role}</TableCell>
                          <TableCell>{renderStars(testimonial.rating)}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {testimonial.review}
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={testimonial.approved}
                              onCheckedChange={() =>
                                handleToggleApproval(
                                  testimonial.id,
                                  testimonial.approved
                                )
                              }
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => startEdit(testimonial)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(testimonial.id)}
                              >
                                <Trash2 className="w-4 h-4" />
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminTestimonials;
