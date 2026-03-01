'use client';
import { onAuthStateChanged } from "firebase/auth";
import { ArrowLeft, Plus, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../../../Components/ui/button";
import { Input } from "../../../../Components/ui/input";
import { Label } from "../../../../Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../Components/ui/select";
import { SidebarTrigger } from "../../../../Components/ui/sidebar";
import { Textarea } from "../../../../Components/ui/textarea";
import { UserProfile } from "../../../../Components/UserProfile";
import { useToast } from "../../../../hooks/use-toast";
import { auth } from "../../../../lib/firebaseClient";

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
    postedCommentStatus: "notPosted",
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


  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] p-6 space-y-4 font-geist">
      <div className="animate-pulse h-6 w-48 bg-[rgba(255,255,255,0.04)] rounded-[7px]" />
      <div className="animate-pulse h-10 w-full bg-[rgba(255,255,255,0.04)] rounded-[7px]" />
      <div className="animate-pulse h-10 w-full bg-[rgba(255,255,255,0.04)] rounded-[7px]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-geist">
      {/* Header */}
      <header className="border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-7 w-7 text-[rgba(255,255,255,0.4)] hover:text-[#ededed]" />
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="h-8 w-8 inline-flex items-center justify-center rounded-[7px] text-[rgba(255,255,255,0.4)] hover:text-[#ededed] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h1 className="text-[16px] font-semibold text-[#ededed]">Add New Reddit Comment</h1>
                <p className="text-[13px] text-[rgba(255,255,255,0.4)]">Create a new entry for tracking</p>
              </div>
            </div>
          </div>
          <UserProfile />
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 animate-fade-up">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
              <div className="mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                <h2 className="text-[16px] font-semibold text-[#ededed] flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#34d399] rounded-full"></div>
                  Comment Details
                </h2>
                <p className="text-[13px] text-[rgba(255,255,255,0.4)] mt-1">Fill in the information below to create a new Reddit Comment entry</p>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Category *</Label>
                    <div className="space-y-2">
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px]">
                          <SelectValue placeholder="Choose a category" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60 bg-[#141414] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                          <div className="px-2 py-1.5 text-[11px] font-medium text-[rgba(255,255,255,0.25)] border-b border-[rgba(255,255,255,0.06)] mb-1 uppercase tracking-[0.06em]">
                            Available Categories
                          </div>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category} className="py-2 text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-[#34d399]/60 rounded-full"></div>
                                {category}
                              </div>
                            </SelectItem>
                          ))}
                          <div className="border-t border-[rgba(255,255,255,0.06)] mt-1 pt-1">
                            <SelectItem value="add-new" className="text-[#34d399] font-medium py-2 text-[13px] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#34d399]">
                              <div className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Create New Category
                              </div>
                            </SelectItem>
                          </div>
                        </SelectContent>
                      </Select>

                      {formData.category === "add-new" && (
                        <div className="border border-[rgba(255,255,255,0.06)] rounded-xl p-4 bg-[rgba(255,255,255,0.02)]">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#34d399] rounded-full"></div>
                              <Label className="text-[13px] font-semibold text-[#ededed]">Create New Category</Label>
                            </div>
                            <button
                              type="button"
                              className="h-6 w-6 inline-flex items-center justify-center rounded-[7px] text-[rgba(255,255,255,0.4)] hover:text-[#ededed] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                              onClick={() => {
                                setShowAddCategory(false);
                                setFormData(prev => ({ ...prev, category: "" }));
                              }}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="newCategoryName" className="text-[11px] font-medium text-[rgba(255,255,255,0.4)] mb-2 block uppercase tracking-[0.06em]">
                                Category Name *
                              </Label>
                              <Input
                                id="newCategoryName"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="e.g., Cloud Security, Monitoring, etc."
                                className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                                autoFocus
                              />
                            </div>
                            <div>
                              <Label htmlFor="newCategoryDescription" className="text-[11px] font-medium text-[rgba(255,255,255,0.4)] mb-2 block uppercase tracking-[0.06em]">
                                Description (Optional)
                              </Label>
                              <Input
                                id="newCategoryDescription"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Brief description of this category"
                                className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                              />
                            </div>
                            <div className="flex gap-2 pt-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowAddCategory(false);
                                  setFormData(prev => ({ ...prev, category: "" }));
                                }}
                                className="flex-1 h-8 text-[12px] font-medium rounded-[7px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)] hover:text-[#ededed] hover:bg-[rgba(255,255,255,0.06)] transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={handleAddCategory}
                                className="flex-1 h-8 text-[12px] font-medium rounded-[7px] bg-[#ededed] text-[#0a0a0a] hover:bg-[#d4d4d4] transition-colors inline-flex items-center justify-center gap-1"
                              >
                                <Plus className="h-3 w-3" />
                                Create Category
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="targetedSubreddit" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Targeted Subreddit</Label>
                     <Input
                    id="targetedSubreddit"
                    value={formData.targetedSubreddit}
                    onChange={(e) => handleInputChange("targetedSubreddit", e.target.value)}
                    placeholder="Enter the Targeted Subreddit"
                    className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                  />
                  </div>
                       {companiesList.length > 0 &&
                  <div>
                    <Label htmlFor="companyId" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Company Name</Label>
                    <Select
                      value={formData.companyId}
                      onValueChange={(value) =>
                        handleInputChange("companyId", value)
                      }
                    >
                      <SelectTrigger className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#141414] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                        {
                          companiesList
                            .filter((company) => !['perplexity', 'spacelift', 'akgec'].includes(company.name.toLowerCase()))
                            .map((company) => (
                              <SelectItem key={company.id} value={company.id} className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">{company.name}</SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                  </div>}
                </div>

                  <div>
                  <Label htmlFor="postURL" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Post URL</Label>
                  <Input
                    id="postURL"
                    value={formData.postURL}
                    onChange={(e) => handleInputChange("postURL", e.target.value)}
                    placeholder="Enter the Reddit Post URL"
                    className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                  />
                </div>

                  <div>
                  <Label htmlFor="redditUsername" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Reddit Username</Label>
                  <Input
                    id="redditUsername"
                    value={formData.redditUsername}
                    onChange={(e) => handleInputChange("redditUsername", e.target.value)}
                    placeholder="Enter the Reddit Username"
                    className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                  />
                </div>

                <div>
                  <Label htmlFor="title" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter the Reddit Comment title"
                    className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                  />
                </div>

                {/* Content */}
                <div>
                  <Label htmlFor="engagementText" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Engagement Text</Label>
                  <Textarea
                    id="engagementText"
                    value={formData.engagementText}
                    onChange={(e) => handleInputChange("engagementText", e.target.value)}
                    placeholder="Enter your engagement text or comment for this Reddit Comment..."
                    rows={4}
                    className="resize-none text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                  />
                  <p className="text-[11px] text-[rgba(255,255,255,0.25)] mt-1.5">This will be your response or engagement with the Reddit Comment</p>
                </div>

                 <div>
                  <Label htmlFor="clientFeedback" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Customer Comments</Label>
                  <Textarea
                    id="clientFeedback"
                    value={formData.clientFeedback}
                    onChange={(e) => handleInputChange("clientFeedback", e.target.value)}
                    placeholder="Enter your feedback for this Reddit Comment..."
                    rows={4}
                    className="resize-none text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                  />
                </div>

                {/* Tracking Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="datepostted" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Date Posted</Label>
                    <Input
                      id="datePosted"
                      type="date"
                      value={formData.datePosted}
                      onChange={(e) => handleInputChange("datePosted", e.target.value)}
                      className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="status" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Client Approval Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#141414] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                         <SelectItem value="approved" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Approved</SelectItem>
                          <SelectItem value="notApproved" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Not Approved</SelectItem>
                          <SelectItem value="pending" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <Label htmlFor="postedLink" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Comment URL</Label>
                  <Input
                    id="postedLink"
                    type="url"
                    value={formData.postedLink}
                    onChange={(e) => handleInputChange("postedLink", e.target.value)}
                    placeholder="Direct link to the posted content"
                    className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)]"
                  />
                </div>
                <div>
                      <Label htmlFor="postedCommentStatus" className="text-[13px] font-medium text-[rgba(255,255,255,0.6)] mb-2 block">Posted Comment Status</Label>
                      <Select
                        value={formData.postedCommentStatus}
                        onValueChange={(value) => handleInputChange("postedCommentStatus", value)}
                      >
                        <SelectTrigger className="h-9 text-[13px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#141414] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                          <SelectItem value="commentUnderApproval" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Comment Under Approval</SelectItem>
                          <SelectItem value="live" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Live</SelectItem>
                          <SelectItem value="removed" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Removed</SelectItem>
                          <SelectItem value="reposted" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Reposted</SelectItem>
                          <SelectItem value="notPosted" className="text-[13px] text-[rgba(255,255,255,0.6)] focus:bg-[rgba(255,255,255,0.04)] focus:text-[#ededed]">Not Posted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="h-9 px-6 text-[13px] font-medium rounded-[7px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.6)] hover:text-[#ededed] hover:bg-[rgba(255,255,255,0.06)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-9 px-6 text-[13px] font-medium rounded-[7px] bg-[#ededed] text-[#0a0a0a] hover:bg-[#d4d4d4] transition-colors inline-flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPostPage;
