'use client'

import {
    BarChart3,
    Calendar,
    FileText,
    MessageSquare,
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

  // Define main and management items dynamically based on admin/client
  const mainItems = [
    { title: "Dashboard", url: isAdmin ? "/threadflow" : `/threadflow/c/${companySlug}`, icon: BarChart3 },
    { title: "Reddit Posts", url: isAdmin ? "/threadflow/posts" : `/threadflow/c/${companySlug}/posts`, icon: MessageSquare },
    { title: "Reddit Comments", url: isAdmin ? "/threadflow/comment" : `/threadflow/c/${companySlug}/comment`, icon: MessageSquare },
    { title: "Analytics", url: isAdmin ? "/threadflow/analytics" : `/threadflow/c/${companySlug}/analytics`, icon: TrendingUp },
    { title: "Communities", url: isAdmin ? "/threadflow/communities" : `/threadflow/c/${companySlug}/communities`, icon: Users },
    { title: "SubredditSense", url: isAdmin ? "/threadflow/subredditsense" : `/threadflow/c/${companySlug}/subredditsense`, icon: TrendingUp },
  ]

  const managementItems = [
    { title: "Categories", url: isAdmin ? "/threadflow/management/categories" : `/threadflow/c/${companySlug}/management/categories`, icon: Tag },
    { title: "Schedule", url: isAdmin ? "/threadflow/management/schedule" : `/threadflow/c/${companySlug}/management/schedule`, icon: Calendar },
    { title: "Templates", url: isAdmin ? "/threadflow/management/templates" : `/threadflow/c/${companySlug}/management/templates`, icon: FileText },
    { title: "Settings", url: isAdmin ? "/threadflow/management/settings" : `/threadflow/c/${companySlug}/management/settings`, icon: Settings },
  ]

  // const isActive = (href) => {
  //   if (href === "/threadflow") return pathname === "/threadflow"
  //   return pathname === href || pathname.startsWith(href + "/")
  // }
const isActive = (href) => {
  const pathParts = pathname.split("/").filter(Boolean);
  const hrefParts = href.split("/").filter(Boolean);

  // Exact match
  if (pathname === href) return true;

  // For parent routes, only active if last part of href matches and lengths align
  return (
    hrefParts.length === pathParts.length && hrefParts.every((part, index) => part === pathParts[index])
  );
};




  const camelCaseToName = (str) => {
  if (!str) return "";
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // add space before capital letters
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // handle multiple capitals
    .replace(/^./, (s) => s.toUpperCase()); // capitalize first letter
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
              "flex items-center w-full px-3 py-2 rounded-md transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
            )}
          >
            <item.icon className="mr-3 h-4 w-4" />
            {open && <span>{item.title}</span>}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar className="border-sidebar-border">
      <SidebarContent className="bg-sidebar text-sidebar-foreground">
      <div className="text-center mt-5 text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{companyName ? camelCaseToName(companyName) : "Infrasity"}</div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium uppercase tracking-wider mb-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{mainItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium uppercase tracking-wider mb-2">
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
