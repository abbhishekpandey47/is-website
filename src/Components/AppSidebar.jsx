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

const mainItems = [
  { title: "Dashboard", url: "/threadflow", icon: BarChart3 },
  { title: "Reddit Posts", url: "/threadflow/posts", icon: MessageSquare },
  { title: "Reddit Comments", url: "/threadflow/comment", icon: MessageSquare },
  { title: "Analytics", url: "/threadflow/analytics", icon: TrendingUp },
  { title: "Communities", url: "/threadflow/communities", icon: Users },
  { title: "SubredditSense", url: "/threadflow/subredditsense", icon: TrendingUp },
]



const managementItems = [
  { title: "Categories", url: "/threadflow/management/categories", icon: Tag },
  { title: "Schedule", url: "/threadflow/management/schedule", icon: Calendar },
  { title: "Templates", url: "/threadflow/management/templates", icon: FileText },
  { title: "Settings", url: "/threadflow/management/settings", icon: Settings },
]

export function AppSidebar() {
  const { open } = useSidebar()
  const pathname = usePathname()

  const isActive = (href) => {
    if (href === "/threadflow") return pathname === "/threadflow"
    return pathname === href || pathname.startsWith(href + "/")
  }

  const renderItem = (item) => {
    const active = isActive(item.url)
    return (
      <SidebarMenuItem key={item.title}>
        {/* asChild lets SidebarMenuButton pass its styles/props to Link */}
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
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium uppercase tracking-wider mb-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(renderItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium uppercase tracking-wider mb-2">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map(renderItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
