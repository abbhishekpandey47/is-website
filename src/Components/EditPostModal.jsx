"use client";
import { useState } from "react";
import { Modal } from "./ui/modal"; // If you don’t have modal, use shadcn Dialog
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "react-toastify";

export default function EditPostModal({ post, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    ...post,
    engagementText: post.engagement_text || "",
    kimsVersion: post.kims_version || "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to update post");

      toast.success("Post updated successfully");
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Error updating post");
    }
  };

  return (
    <Modal open onOpenChange={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <h2 className="text-lg font-bold">Edit Post</h2>

        <div>
          <Label>Title</Label>
          <Input value={formData.title} onChange={(e) => handleChange("title", e.target.value)} />
        </div>

        <div>
          <Label>URL</Label>
          <Input value={formData.url} onChange={(e) => handleChange("url", e.target.value)} />
        </div>

        <div>
          <Label>Engagement Text</Label>
          <Textarea value={formData.engagementText} onChange={(e) => handleChange("engagementText", e.target.value)} />
        </div>

        <div>
          <Label>Status</Label>
          <Select value={formData.status} onValueChange={(v) => handleChange("status", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="live">Live</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="bg-primary">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
}
