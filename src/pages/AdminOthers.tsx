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
import { Plus, Pencil, Trash2 } from "lucide-react";

interface OtherItem {
  id: string;
  title: string;
  display_order: number;
  active: boolean;
}

const AdminOthers = () => {
  const [items, setItems] = useState<OtherItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<OtherItem | null>(null);
  const [title, setTitle] = useState("");
  const { toast } = useToast();

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("others_items")
      .select("*")
      .order("display_order");

    if (error) {
      toast({ title: "Error fetching items", variant: "destructive" });
    } else {
      setItems((data || []) as OtherItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast({ title: "Please enter a title", variant: "destructive" });
      return;
    }

    if (editing) {
      const { error } = await supabase
        .from("others_items")
        .update({ title })
        .eq("id", editing.id);
      if (error) toast({ title: "Error updating", variant: "destructive" });
      else {
        toast({ title: "Item updated" });
        fetchItems();
      }
    } else {
      const maxOrder = items.length > 0 ? Math.max(...items.map((i) => i.display_order)) : 0;
      const { error } = await supabase
        .from("others_items")
        .insert({ title, display_order: maxOrder + 1 });
      if (error) toast({ title: "Error adding", variant: "destructive" });
      else {
        toast({ title: "Item added" });
        fetchItems();
      }
    }

    setDialogOpen(false);
    setEditing(null);
    setTitle("");
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("others_items").delete().eq("id", id);
    if (error) toast({ title: "Error deleting", variant: "destructive" });
    else {
      toast({ title: "Item deleted" });
      fetchItems();
    }
  };

  const openEdit = (item: OtherItem) => {
    setEditing(item);
    setTitle(item.title);
    setDialogOpen(true);
  };

  const openAdd = () => {
    setEditing(null);
    setTitle("");
    setDialogOpen(true);
  };

  return (
    <AdminLayout title="Manage Others">
      <div className="flex justify-end mb-6">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Item" : "Add Item"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Landing Page Development"
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editing ? "Update" : "Add"} Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, i) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                    No items yet. Add your first one above.
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

export default AdminOthers;