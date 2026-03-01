'use client';
import { useState } from "react";
import { SidebarTrigger } from "../../../Components/ui/sidebar";
import { UserProfile } from "../../../Components/UserProfile";
import { Plus, Edit, Trash2, Tag, Search } from "lucide-react";

const mockCategories = [
  {
    id: "1",
    name: "Drift Detection",
    description: "Tools and strategies for detecting infrastructure drift",
    postsCount: 2,
    color: "#60a5fa",
    createdDate: "15/08/2025"
  },
  {
    id: "2",
    name: "IaC",
    description: "Infrastructure as Code discussions and tools",
    postsCount: 1,
    color: "#34d399",
    createdDate: "10/08/2025"
  },
  {
    id: "3",
    name: "DevOps",
    description: "General DevOps practices and workflows",
    postsCount: 0,
    color: "#9382ff",
    createdDate: "05/08/2025"
  },
  {
    id: "4",
    name: "AWS",
    description: "Amazon Web Services related content",
    postsCount: 0,
    color: "#fbbf24",
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
    <div className="min-h-screen bg-[#0a0a0a] font-geist">
      {/* Header */}
      <header className="border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="h-7 w-7 text-[rgba(255,255,255,0.4)] hover:text-[#ededed]" />
            <div>
              <h1 className="text-[16px] font-semibold text-[#ededed]">Categories</h1>
              <p className="text-[13px] text-[rgba(255,255,255,0.4)]">Organize your Reddit content by categories</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-[#ededed] text-[#0a0a0a] font-medium text-[13px] h-9 px-4 rounded-[7px] hover:bg-white transition-colors">
              <Plus className="h-4 w-4" />
              Add Category
            </button>
            <UserProfile />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 animate-fade-up">
        {/* Search */}
        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgba(255,255,255,0.25)]" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 text-[13px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-[#ededed] rounded-[7px] placeholder:text-[rgba(255,255,255,0.25)] focus:outline-none focus:border-[rgba(255,255,255,0.12)] transition-colors"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category, index) => (
            <div
              key={category.id}
              className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 hover:border-[rgba(255,255,255,0.12)] transition-all"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center h-8 w-8 rounded-lg"
                    style={{ backgroundColor: `${category.color}1a` }}
                  >
                    <Tag className="h-4 w-4" style={{ color: category.color }} />
                  </div>
                  <h3 className="text-[14px] font-medium text-[#ededed]">{category.name}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button className="inline-flex items-center justify-center h-7 w-7 rounded-[7px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.4)] hover:text-[#ededed] hover:border-[rgba(255,255,255,0.12)] transition-all">
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button className="inline-flex items-center justify-center h-7 w-7 rounded-[7px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.4)] hover:text-[#f87171] hover:border-[rgba(255,255,255,0.12)] transition-all">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-[13px] text-[rgba(255,255,255,0.4)] mb-4 leading-relaxed">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center text-[12px] font-medium text-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] px-2.5 py-1 rounded-[7px]">
                  {category.postsCount} posts
                </span>
                <span className="text-[12px] text-[rgba(255,255,255,0.25)]">
                  Created {category.createdDate}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-up">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] mb-4">
              <Tag className="h-6 w-6 text-[rgba(255,255,255,0.25)]" />
            </div>
            <h3 className="text-[14px] font-medium text-[#ededed] mb-1">No categories found</h3>
            <p className="text-[13px] text-[rgba(255,255,255,0.4)] mb-5">
              {searchQuery ? "Try adjusting your search terms." : "Create your first category to get started."}
            </p>
            {!searchQuery && (
              <button className="inline-flex items-center gap-2 bg-[#ededed] text-[#0a0a0a] font-medium text-[13px] h-9 px-4 rounded-[7px] hover:bg-white transition-colors">
                <Plus className="h-4 w-4" />
                Add Category
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
