'use client'

import { auth } from "@/lib/firebaseClient"
import { cn } from "@/lib/utils"
import { onAuthStateChanged } from "firebase/auth"
import {
  BarChart3,
  Calendar,
  Crosshair,
  FileText,
  Gauge,
  LayoutGrid,
  MessageSquare,
  PieChart,
  Plug,
  Search,
  Settings,
  ShieldAlert,
  Tag,
  TrendingUp,
  Users
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "./ui/sidebar"
import { RedditStatusBell } from "./RedditStatusBell"

export function AppSidebar({ companySlug, isAdmin , companyName }) {
  const { open } = useSidebar()
  const pathname = usePathname()
  const [unreadStatusCount, setUnreadStatusCount] = useState(0)
  const firebaseUserRef = useRef(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      firebaseUserRef.current = user
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    const fetchUnread = async () => {
      const user = firebaseUserRef.current
      if (!user || !mountedRef.current) return
      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/reddit/status-changes?limit=1', { headers: { Authorization: `Bearer ${token}` } })
        if (!res.ok || !mountedRef.current) return
        const { unreadCount } = await res.json()
        if (mountedRef.current) setUnreadStatusCount(unreadCount || 0)
      } catch { /* silent */ }
    }
    fetchUnread()
    const interval = setInterval(fetchUnread, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Use admin paths when companySlug isn't available yet (prevents /c/undefined hydration mismatch)
  const useCompanyPath = !isAdmin && companySlug;
  const prefix = useCompanyPath ? `/threadflow/c/${companySlug}` : "/threadflow";

  const mainItems = [
    { title: "Dashboard", url: `${prefix}/client-dashboard`, icon: Gauge },
    { title: "Clients", url: `${prefix}/clients`, icon: LayoutGrid },
    { title: "Reddit Posts", url: `${prefix}/posts`, icon: MessageSquare },
    { title: "Reddit Comments", url: `${prefix}/comment`, icon: MessageSquare },
    { title: "Status Changes", url: `/threadflow/status-changes`, icon: ShieldAlert },
    { title: "Analytics", url: `${prefix}/analytics`, icon: TrendingUp },
    { title: "Analytics Overview", url: `${prefix}/analytics-overview`, icon: PieChart },
    { title: "Communities", url: `${prefix}/communities`, icon: Users, soon: true },
    { title: "SubredditSense", url: `${prefix}/subredditsense`, icon: TrendingUp },
    { title: "Serp Scout", url: `${prefix}/serp-scout`, icon: Search },
    { title: "Competitive Sense", url: `${prefix}/competitive-sense`, icon: Crosshair },
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
    const isStatusChanges = item.url === '/threadflow/status-changes'
    const showBadge = isStatusChanges && unreadStatusCount > 0
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
            {open && showBadge && (
              <span className="ml-auto min-w-[18px] h-[18px] rounded-full bg-[#f87171] text-[#0a0a0a] text-[10px] font-bold flex items-center justify-center px-1 leading-none">
                {unreadStatusCount > 99 ? "99+" : unreadStatusCount}
              </span>
            )}
            {!open && showBadge && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#f87171]" />
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

      <SidebarFooter className="border-t border-[rgba(255,255,255,0.06)] px-3 py-2">
        <div className={cn("flex items-center gap-2", open ? "justify-between" : "justify-center")}>
          {open && (
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[12px] text-[rgba(255,255,255,0.35)] font-medium truncate">Reddit Alerts</span>
              {unreadStatusCount > 0 && (
                <span className="shrink-0 min-w-[18px] h-[18px] rounded-full bg-[rgba(248,113,113,0.15)] text-[#f87171] text-[10px] font-semibold flex items-center justify-center px-1 leading-none border border-[rgba(248,113,113,0.25)]">
                  {unreadStatusCount > 99 ? "99+" : unreadStatusCount}
                </span>
              )}
            </div>
          )}
          <RedditStatusBell />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
