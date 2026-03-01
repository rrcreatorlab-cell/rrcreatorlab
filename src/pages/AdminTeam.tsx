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
import ImageUpload from "@/components/admin/ImageUpload";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  active: boolean;
  display_order: number;
}

const AdminTeam = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image_url: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    active: true,
    display_order: 0,
  });

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { instagram, linkedin, twitter, ...rest } = data;
      const socials: Record<string, string> = {};
      if (instagram) socials.instagram = instagram;
      if (linkedin) socials.linkedin = linkedin;
      if (twitter) socials.twitter = twitter;
      
      const { error } = await supabase.from("team").insert([{ ...rest, socials }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      toast({ title: "Team member added successfully!" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Error adding member", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { instagram, linkedin, twitter, ...rest } = data;
      const socials: Record<string, string> = {};
      if (instagram) socials.instagram = instagram;
      if (linkedin) socials.linkedin = linkedin;
      if (twitter) socials.twitter = twitter;
      
      const { error } = await supabase.from("team").update({ ...rest, socials }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      toast({ title: "Team member updated successfully!" });
      resetForm();
    },
    onError: (error) => {
      toast({ title: "Error updating member", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("team").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      toast({ title: "Team member removed successfully!" });
    },
    onError: (error) => {
      toast({ title: "Error removing member", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({ name: "", role: "", bio: "", image_url: "", instagram: "", linkedin: "", twitter: "", active: true, display_order: 0 });
    setEditingMember(null);
    setIsOpen(false);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      image_url: member.image_url,
      instagram: member.socials?.instagram || "",
      linkedin: member.socials?.linkedin || "",
      twitter: member.socials?.twitter || "",
      active: member.active,
      display_order: member.display_order,
    });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateMutation.mutate({ id: editingMember.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <AdminLayout title="Team Members">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Manage your team members</p>
          <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Add Member</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Image</Label>
                  <ImageUpload
                    value={formData.image_url}
                    onChange={(url) => setFormData({ ...formData, image_url: url })}
                    folder="team"
                    minSizeMB={0.1}
                    maxSizeMB={50}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Social Links</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} placeholder="Instagram URL" />
                    <Input value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} placeholder="LinkedIn URL" />
                    <Input value={formData.twitter} onChange={(e) => setFormData({ ...formData, twitter: e.target.value })} placeholder="Twitter URL" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={formData.active} onCheckedChange={(v) => setFormData({ ...formData, active: v })} />
                  <Label>Active</Label>
                </div>
                <Button type="submit" className="w-full">
                  {editingMember ? "Update Member" : "Add Member"}
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
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.display_order}</TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${member.active ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                      {member.active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(member.id)}>
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

export default AdminTeam;
