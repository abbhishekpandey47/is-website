'use client';
import { useState } from "react";
import { Button } from "../../../Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../Components/ui/card";
import { Input } from "../../../Components/ui/input";
import { Badge } from "../../../Components/ui/badge";
import { SidebarTrigger } from "../../../Components/ui/sidebar";
import { UserProfile } from "../../../Components/UserProfile";
import { Plus, Edit, Trash2, Tag } from "lucide-react";

const mockCategories = [
  {
    id: "1",
    name: "Drift Detection",
    description: "Tools and strategies for detecting infrastructure drift",
    postsCount: 2,
    color: "bg-blue-500",
    createdDate: "15/08/2025"
  },
  {
    id: "2", 
    name: "IaC",
    description: "Infrastructure as Code discussions and tools",
    postsCount: 1,
    color: "bg-green-500",
    createdDate: "10/08/2025"
  },
  {
    id: "3",
    name: "DevOps",
    description: "General DevOps practices and workflows",
    postsCount: 0,
    color: "bg-purple-500",
    createdDate: "05/08/2025"
  },
  {
    id: "4",
    name: "AWS",
    description: "Amazon Web Services related content",
    postsCount: 0,
    color: "bg-orange-500",
    createdDate: "01/08/2025"
  }
];

const CategoriesPage = () => {
  const [categories] = useState(mockCategories);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Categories</h1>
              <p className="text-sm text-muted-foreground">Organize your Reddit content by categories</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
            <UserProfile />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="max-w-md">
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <Tag className="h-4 w-4 text-white" />
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    {category.postsCount} posts
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Created {category.createdDate}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No categories found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try adjusting your search terms." : "Create your first category to get started."}
              </p>
              {!searchQuery && (
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;