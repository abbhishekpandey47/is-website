'use client';
import { onAuthStateChanged } from "firebase/auth";
import { ArrowLeft, Plus, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { SidebarTrigger } from "@/Components/ui/sidebar";
import { Textarea } from "@/Components/ui/textarea";
import { UserProfile } from "@/Components/UserProfile";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebaseClient";

const AddPostPage = () => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [companiesList , setCompaniesList] = useState([]);

  // Predefined categories
  const [categories, setCategories] = useState([
    "Drift Detection",
    "IaC",
    "DevOps",
    "AWS",
    "Enterprise AI",
    "AI Workflow"
  ]);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    engagementText: "",
    datePosted: "",
    postedLink: "",
    status: "pending",
    clientFeedback: "",
    targetedSubreddit: "",
    postURL: "",
    redditUsername: "",
    postedCommentStatus: "underModeration",
    companyId:""
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoading(false);
      if (!user) {
        router.push("/auth/signin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Category name required",
        description: "Please enter a category name.",
        variant: "destructive",
      });
      return;
    }

    if (categories.includes(newCategory.name.trim())) {
      toast({
        title: "Category already exists",
        description: "A category with this name already exists.",
        variant: "destructive",
      });
      return;
    }

    setCategories(prev => [...prev, newCategory.name.trim()]);
    setFormData(prev => ({ ...prev, category: newCategory.name.trim() }));
    setNewCategory({ name: "", description: "" });
    setShowAddCategory(false);

    toast({
      title: "Category added",
      description: `Category "${newCategory.name.trim()}" has been added successfully.`,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!firebaseUser) {
    toast({
      title: "Authentication Required",
      description: "Please log in before adding a post.",
      variant: "destructive",
    });
    router.push("/auth/signup");
    return;
  }

  if (!formData.category || !formData.title) {
    toast({
      title: "Missing Information",
      description: "Please fill in category and title fields.",
      variant: "destructive",
    });
    return;
  }

  try {
    const token = await firebaseUser.getIdToken();
    const res = await fetch("/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...formData }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Failed to save post");
    }

    toast({
      title: "Post Added Successfully!",
      description: "Your post has been added to the tracker.",
    });

    router.push("/threadflow/comment");
  } catch (err) {
    console.error("Error saving post:", err);
    toast({
      title: "Error",
      description: err.message,
      variant: "destructive",
    });
  }
};

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    setFirebaseUser(user);
    setLoading(false);

    if (!user) {
      router.push("/auth/signin");
    } else {
       try {
        const token = await user.getIdToken();
        const [catRes, companyRes] = await Promise.allSettled([
          fetch(`/api/comment?categories=true`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`/api/companies`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (catRes.status === 'fulfilled' && catRes.value.ok) {
          const result = await catRes.value.json();
          if (result.categories) {
            setCategories((prev) => {
              const merged = [...prev, ...result.categories];
              return [...new Set(merged.map((c) => c.trim()))];
            });
          }
        } else if (catRes.status === 'rejected') {
          console.error("Failed to fetch categories:", catRes.reason);
        }

        if (companyRes.status === 'fulfilled' && companyRes.value.ok) {
          const companyResult = await companyRes.value.json();
          setCompaniesList(companyResult.data || []);
        } else if (companyRes.status === 'rejected') {
          console.error("Failed to fetch companies:", companyRes.reason);
        }
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
      }
    }
  });

  return () => unsubscribe();
}, [router]);


  if (loading) return <p>Loading...</p>;

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
                onClick={() => router.back()}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Add New Reddit Comment</h1>
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
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  Comment Details
                </CardTitle>
                <p className="text-sm text-muted-foreground">Fill in the information below to create a new Reddit Comment entry</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <div className="space-y-2">
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Choose a category" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground border-b border-border/50 mb-1">
                            Available Categories
                          </div>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category} className="py-2">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
                                {category}
                              </div>
                            </SelectItem>
                          ))}
                          <div className="border-t border-border/50 mt-1 pt-1">
                            <SelectItem value="add-new" className="text-primary font-medium py-2">
                              <div className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Create New Category
                              </div>
                            </SelectItem>
                          </div>
                        </SelectContent>
                      </Select>

                      {formData.category === "add-new" && (
                        <div className="border border-border/50 rounded-lg p-4 bg-card/50 backdrop-blur-sm shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <Label className="text-sm font-semibold text-foreground">Create New Category</Label>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-muted"
                              onClick={() => {
                                setShowAddCategory(false);
                                setFormData(prev => ({ ...prev, category: "" }));
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="newCategoryName" className="text-xs font-medium text-muted-foreground mb-2 block">
                                Category Name *
                              </Label>
                              <Input
                                id="newCategoryName"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="e.g., Cloud Security, Monitoring, etc."
                                className="h-9 text-sm"
                                autoFocus
                              />
                            </div>
                            <div>
                              <Label htmlFor="newCategoryDescription" className="text-xs font-medium text-muted-foreground mb-2 block">
                                Description (Optional)
                              </Label>
                              <Input
                                id="newCategoryDescription"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Brief description of this category"
                                className="h-9 text-sm"
                              />
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setShowAddCategory(false);
                                  setFormData(prev => ({ ...prev, category: "" }));
                                }}
                                className="flex-1 h-8 text-xs"
                              >
                                Cancel
                              </Button>
                              <Button
                                type="button"
                                onClick={handleAddCategory}
                                size="sm"
                                className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90"
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Create Category
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="targetedSubreddit">Targeted Subreddit</Label>
                     <Input
                    id="targetedSubreddit"
                    value={formData.targetedSubreddit}
                    onChange={(e) => handleInputChange("targetedSubreddit", e.target.value)}
                    placeholder="Enter the Targeted Subreddit"
                    className="h-10"
                  />
                  </div>
                       {companiesList.length > 0 &&
                  <div>
                    <Label htmlFor="companyId">Company Name</Label>
                    <Select
                      value={formData.companyId}
                      onValueChange={(value) =>
                        handleInputChange("companyId", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          companiesList.map((company) => (
                            <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>}
                </div>

                  <div>
                  <Label htmlFor="postURL" className="text-sm font-medium mb-2 block">Post URL</Label>
                  <Input
                    id="postURL"
                    value={formData.postURL}
                    onChange={(e) => handleInputChange("postURL", e.target.value)}
                    placeholder="Enter the Reddit Post URL"
                    className="h-10"
                  />
                </div>

                  <div>
                  <Label htmlFor="redditUsername" className="text-sm font-medium mb-2 block">Reddit Username</Label>
                  <Input
                    id="redditUsername"
                    value={formData.redditUsername}
                    onChange={(e) => handleInputChange("redditUsername", e.target.value)}
                    placeholder="Enter the Reddit Username"
                    className="h-10"
                  />
                </div>

                <div>
                  <Label htmlFor="title" className="text-sm font-medium mb-2 block">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter the Reddit Comment title"
                    className="h-10"
                  />
                </div>

                {/* Content */}
                <div>
                  <Label htmlFor="engagementText" className="text-sm font-medium mb-2 block">Engagement Text</Label>
                  <Textarea
                    id="engagementText"
                    value={formData.engagementText}
                    onChange={(e) => handleInputChange("engagementText", e.target.value)}
                    placeholder="Enter your engagement text or comment for this Reddit Comment..."
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">This will be your response or engagement with the Reddit Comment</p>
                </div>

                 <div>
                  <Label htmlFor="clientFeedback" className="text-sm font-medium mb-2 block">Customer Comments</Label>
                  <Textarea
                    id="clientFeedback"
                    value={formData.clientFeedback}
                    onChange={(e) => handleInputChange("clientFeedback", e.target.value)}
                    placeholder="Enter your feedback for this Reddit Comment..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                {/* <div>
                  <Label htmlFor="kimsVersion">Kim's Version</Label>
                  <Textarea
                    id="kimsVersion"
                    value={formData.kimsVersion}
                    onChange={(e) => handleInputChange("kimsVersion", e.target.value)}
                    placeholder="Revised version of the engagement text"
                    rows={4}
                  />
                </div> */}

                {/* Tracking Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="datepostted">Date Posted</Label>
                    <Input
                      id="datePosted"
                      type="date"
                      value={formData.datePosted}
                      onChange={(e) => handleInputChange("datePosted", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Client Approval Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="notApproved">Not Approved</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <Label htmlFor="postedLink">Comment URL</Label>
                  <Input
                    id="postedLink"
                    type="url"
                    value={formData.postedLink}
                    onChange={(e) => handleInputChange("postedLink", e.target.value)}
                    placeholder="Direct link to the posted content"
                  />
                </div>
                <div>
                      <Label htmlFor="postedCommentStatus">Posted Comment Status</Label>
                      <Select
                        value={formData.postedCommentStatus}
                        onValueChange={(value) => handleInputChange("postedCommentStatus", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="commentUnderApproval">Comment Under Approval</SelectItem>
                          <SelectItem value="live">Live</SelectItem>
                          <SelectItem value="removed">Removed </SelectItem>
                          <SelectItem value="underModeration">Under Moderation</SelectItem>
                          <SelectItem value="notPosted">Not Posted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-8 border-t border-border/50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="h-10 px-6"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-6"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
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
