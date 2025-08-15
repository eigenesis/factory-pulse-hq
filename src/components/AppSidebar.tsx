import { useState } from "react"
import { 
  LayoutDashboard, 
  Factory, 
  Target, 
  BarChart3, 
  Package, 
  ShieldCheck, 
  Settings,
  Activity,
  AlertTriangle,
  Clock
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

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
} from "@/components/ui/sidebar"

const dashboardItems = [
  { title: "Mission Control", url: "/", icon: LayoutDashboard },
  { title: "Shop Floor", url: "/shop-floor", icon: Factory },
  { title: "OEE Analytics", url: "/oee", icon: Target },
  { title: "Daily Production", url: "/production", icon: BarChart3 },
]

const managementItems = [
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Quality Control", url: "/quality", icon: ShieldCheck },
  { title: "Maintenance", url: "/maintenance", icon: Settings },
]

const monitoringItems = [
  { title: "Live Status", url: "/status", icon: Activity },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Downtime", url: "/downtime", icon: Clock },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-primary font-medium border-l-2 border-sidebar-primary" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground"

  const isCollapsed = state === "collapsed"

  return (
    <Sidebar
      className={isCollapsed ? "w-16" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar border-r border-sidebar-border">
        {/* Header */}
        <div className="p-3 md:p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Factory className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <h2 className="text-base md:text-lg font-bold text-sidebar-foreground truncate">FactoryPulse</h2>
                <p className="text-xs text-sidebar-foreground/70 truncate">Manufacturing HQ</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Dashboards */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-semibold">
            Dashboards
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="ml-2 md:ml-3 truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-semibold">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="ml-2 md:ml-3 truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Monitoring */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-semibold">
            Monitoring
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {monitoringItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="ml-2 md:ml-3 truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}