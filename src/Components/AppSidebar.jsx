'use client'

import {
  BarChart3,
  Calendar,
  FileText,
  Gauge,
  LayoutGrid,
  MessageSquare,
  PieChart,
  Plug,
  Search,
  Settings,
  Tag,
  TrendingUp,
  Users
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "./ui/sidebar"

export function AppSidebar({ companySlug, isAdmin , companyName }) {
  const { open } = useSidebar()
  const pathname = usePathname()

  // Use admin paths when companySlug isn't available yet (prevents /c/undefined hydration mismatch)
  const useCompanyPath = !isAdmin && companySlug;
  const prefix = useCompanyPath ? `/threadflow/c/${companySlug}` : "/threadflow";

  const mainItems = [
    { title: "Dashboard", url: `${prefix}/client-dashboard`, icon: Gauge },
    { title: "Clients", url: `${prefix}/clients`, icon: LayoutGrid },
    { title: "Reddit Posts", url: `${prefix}/posts`, icon: MessageSquare },
    { title: "Reddit Comments", url: `${prefix}/comment`, icon: MessageSquare },
    { title: "Analytics", url: `${prefix}/analytics`, icon: TrendingUp },
    { title: "Analytics Overview", url: `${prefix}/analytics-overview`, icon: PieChart },
    { title: "Communities", url: `${prefix}/communities`, icon: Users, soon: true },
    { title: "SubredditSense", url: `${prefix}/subredditsense`, icon: TrendingUp },
    { title: "Serp Scout", url: `${prefix}/serp-scout`, icon: Search },
  ]

  const planningItems = [
    { title: "Cadence Planner", url: `${prefix}/cadence-planner`, icon: Gauge },
  ]

  const managementItems = [
    { title: "Categories", url: `${prefix}/management/categories`, icon: Tag, soon: true },
    { title: "Schedule", url: `${prefix}/management/schedule`, icon: Calendar, soon: true },
    { title: "Templates", url: `${prefix}/management/templates`, icon: FileText, soon: true },
    { title: "Settings", url: `${prefix}/management/settings`, icon: Settings },
    { title: "Integrations", url: `${prefix}/integrations`, icon: Plug },
  ]

  const isActive = (href) => {
    const pathParts = pathname.split("/").filter(Boolean);
    const hrefParts = href.split("/").filter(Boolean);
    if (pathname === href) return true;
    return (
      hrefParts.length === pathParts.length && hrefParts.every((part, index) => part === pathParts[index])
    );
  };

  const camelCaseToName = (str) => {
    if (!str) return "";
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
      .replace(/^./, (s) => s.toUpperCase());
  }

  const renderItem = (item) => {
    const active = isActive(item.url)
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <Link
            href={item.url}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center w-full px-2.5 py-2 rounded-[7px] transition-all duration-150 text-[13px]",
              active
                ? "bg-[rgba(255,255,255,0.06)] text-[#ededed] font-medium"
                : "text-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.03)] hover:text-[rgba(255,255,255,0.7)]"
            )}
          >
            <item.icon className={cn("mr-2.5 h-4 w-4 shrink-0", active ? "opacity-100" : "opacity-50")} />
            {open && <span>{item.title}</span>}
            {open && item.soon && (
              <span style={{fontSize:10, padding:"2px 6px", background:"rgba(255,255,255,0.06)", borderRadius:4, color:"rgba(255,255,255,0.3)", marginLeft:"auto"}}>Soon</span>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar className="border-r border-[rgba(255,255,255,0.06)]">
      <SidebarContent className="bg-[rgba(255,255,255,0.01)] font-geist">
        {/* Logo + brand */}
        <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
          <div className="flex items-center justify-center w-7 h-7 rounded-[7px] bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] shrink-0">
            <BarChart3 className="w-3.5 h-3.5 text-white" />
          </div>
          {open && (
            <span className="text-[15px] font-semibold text-[#ededed] tracking-[-0.01em]">
              {companyName ? camelCaseToName(companyName) : "Infrasity"}
            </span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-medium uppercase tracking-[0.08em] text-[rgba(255,255,255,0.25)] px-3 mb-1">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{mainItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-medium uppercase tracking-[0.08em] text-[rgba(255,255,255,0.25)] px-3 mb-1">
            Planning
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{planningItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-medium uppercase tracking-[0.08em] text-[rgba(255,255,255,0.25)] px-3 mb-1">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{managementItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
