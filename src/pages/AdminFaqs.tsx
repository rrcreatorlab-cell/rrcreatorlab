import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
}

const AdminFaqs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const { toast } = useToast();

  const fetchFaqs = async () => {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("display_order");

    if (error) {
      toast({ title: "Error fetching FAQs", variant: "destructive" });
    } else {
      setFaqs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSubmit = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    if (editingFaq) {
      const { error } = await supabase
        .from("faqs")
        .update({ question: formData.question, answer: formData.answer })
        .eq("id", editingFaq.id);

      if (error) {
        toast({ title: "Error updating FAQ", variant: "destructive" });
      } else {
        toast({ title: "FAQ updated successfully" });
        fetchFaqs();
      }
    } else {
      const maxOrder = faqs.length > 0 ? Math.max(...faqs.map(f => f.display_order)) : 0;
      const { error } = await supabase
        .from("faqs")
        .insert({ question: formData.question, answer: formData.answer, display_order: maxOrder + 1 });

      if (error) {
        toast({ title: "Error adding FAQ", variant: "destructive" });
      } else {
        toast({ title: "FAQ added successfully" });
        fetchFaqs();
      }
    }

    setDialogOpen(false);
    setEditingFaq(null);
    setFormData({ question: "", answer: "" });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting FAQ", variant: "destructive" });
    } else {
      toast({ title: "FAQ deleted successfully" });
      fetchFaqs();
    }
  };

  const openEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    setDialogOpen(true);
  };

  const openAdd = () => {
    setEditingFaq(null);
    setFormData({ question: "", answer: "" });
    setDialogOpen(true);
  };

  return (
    <AdminLayout title="Manage FAQs">
      <div className="flex justify-end mb-6">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFaq ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium">Question</label>
                <Input
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Enter question"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Answer</label>
                <Textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Enter answer"
                  rows={4}
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingFaq ? "Update" : "Add"} FAQ
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
                <TableHead>Question</TableHead>
                <TableHead className="hidden md:table-cell">Answer</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs.map((faq, index) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{faq.question}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground max-w-md truncate">
                    {faq.answer}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(faq)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(faq.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {faqs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No FAQs found. Add your first FAQ above.
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

export default AdminFaqs;
