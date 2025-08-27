'use client';
import { useState } from "react";
import { Button } from "../../../../Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../Components/ui/card";
import { Input } from "../../../../Components/ui/input";
import { Label } from "../../../../Components/ui/label";
import { Textarea } from "../../../../Components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../Components/ui/select";
import { SidebarTrigger } from "../../../../Components/ui/sidebar";
import { UserProfile } from "../../../../Components/UserProfile";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddPostPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    url: "",
    status: "pending",
    engagementText: "",
    kimsVersion: "",
    datePosted: "",
    postedLink: "",
    currentStatus: "pending"
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.category || !formData.title || !formData.url) {
      toast({
        title: "Missing Information",
        description: "Please fill in category, title, and URL fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to a database
    console.log("Saving post:", formData);
    
    toast({
      title: "Post Added Successfully!",
      description: "Your Reddit post has been added to the tracker.",
    });

    // Navigate back to posts page
    navigate("/crm/posts");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-8 w-8" />
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/crm/posts")}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Add New Reddit Post</h1>
                <p className="text-sm text-muted-foreground">Create a new entry for tracking</p>
              </div>
            </div>
          </div>
          <UserProfile />
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Drift Detection">Drift Detection</SelectItem>
                        <SelectItem value="IaC">IaC</SelectItem>
                        <SelectItem value="DevOps">DevOps</SelectItem>
                        <SelectItem value="AWS">AWS</SelectItem>
                        <SelectItem value="Enterprise AI">Enterprise AI</SelectItem>
                        <SelectItem value="AI Workflow">AI Workflow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="live">Live</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter the post title"
                  />
                </div>

                <div>
                  <Label htmlFor="url">URL *</Label>
                  <Input
                    id="url"
                    type="url"
                    value={formData.url}
                    onChange={(e) => handleInputChange("url", e.target.value)}
                    placeholder="https://www.reddit.com/r/..."
                  />
                </div>

                {/* Content */}
                <div>
                  <Label htmlFor="engagementText">Engagement Text</Label>
                  <Textarea
                    id="engagementText"
                    value={formData.engagementText}
                    onChange={(e) => handleInputChange("engagementText", e.target.value)}
                    placeholder="Original engagement text for the post"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="kimsVersion">Kim's Version</Label>
                  <Textarea
                    id="kimsVersion"
                    value={formData.kimsVersion}
                    onChange={(e) => handleInputChange("kimsVersion", e.target.value)}
                    placeholder="Revised version of the engagement text"
                    rows={4}
                  />
                </div>

                {/* Tracking Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="datePosted">Date Posted</Label>
                    <Input
                      id="datePosted"
                      type="date"
                      value={formData.datePosted}
                      onChange={(e) => handleInputChange("datePosted", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="currentStatus">Current Status</Label>
                    <Select value={formData.currentStatus} onValueChange={(value) => handleInputChange("currentStatus", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="live">Live</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="postedLink">Posted Link</Label>
                  <Input
                    id="postedLink"
                    type="url"
                    value={formData.postedLink}
                    onChange={(e) => handleInputChange("postedLink", e.target.value)}
                    placeholder="Direct link to the posted content"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/crm/posts")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Save className="h-4 w-4 mr-2" />
                    Save Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPostPage;