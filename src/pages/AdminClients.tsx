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

interface ClientLogo {
  id: string;
  name: string;
  handle: string;
  display_order: number;
}

const AdminClients = () => {
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientLogo | null>(null);
  const [formData, setFormData] = useState({ name: "", handle: "" });
  const { toast } = useToast();

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("client_logos")
      .select("*")
      .order("display_order");

    if (error) {
      toast({ title: "Error fetching clients", variant: "destructive" });
    } else {
      setClients(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.handle.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    if (editingClient) {
      const { error } = await supabase
        .from("client_logos")
        .update({ name: formData.name, handle: formData.handle })
        .eq("id", editingClient.id);

      if (error) {
        toast({ title: "Error updating client", variant: "destructive" });
      } else {
        toast({ title: "Client updated successfully" });
        fetchClients();
      }
    } else {
      const maxOrder = clients.length > 0 ? Math.max(...clients.map(c => c.display_order)) : 0;
      const { error } = await supabase
        .from("client_logos")
        .insert({ name: formData.name, handle: formData.handle, display_order: maxOrder + 1 });

      if (error) {
        toast({ title: "Error adding client", variant: "destructive" });
      } else {
        toast({ title: "Client added successfully" });
        fetchClients();
      }
    }

    setDialogOpen(false);
    setEditingClient(null);
    setFormData({ name: "", handle: "" });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("client_logos").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting client", variant: "destructive" });
    } else {
      toast({ title: "Client deleted successfully" });
      fetchClients();
    }
  };

  const openEdit = (client: ClientLogo) => {
    setEditingClient(client);
    setFormData({ name: client.name, handle: client.handle });
    setDialogOpen(true);
  };

  const openAdd = () => {
    setEditingClient(null);
    setFormData({ name: "", handle: "" });
    setDialogOpen(true);
  };

  return (
    <AdminLayout title="Manage Client Logos">
      <div className="flex justify-end mb-6">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingClient ? "Edit Client" : "Add Client"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium">Client Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., The Currency India Official"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Handle</label>
                <Input
                  value={formData.handle}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  placeholder="e.g., @thecurrencyindiaofficial"
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingClient ? "Update" : "Add"} Client
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
                <TableHead>Name</TableHead>
                <TableHead>Handle</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client, index) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="text-muted-foreground">{client.handle}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(client)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(client.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {clients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No clients found. Add your first client above.
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

export default AdminClients;
