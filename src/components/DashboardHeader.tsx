import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  title: string
  subtitle?: string
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const currentTime = new Date().toLocaleString()

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-accent" />
        <div>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-muted-foreground">System Online</span>
        </div>

        {/* Current Time */}
        <div className="text-sm text-muted-foreground">
          {currentTime}
        </div>

        {/* Alerts */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <Button variant="ghost" size="sm">
          <User className="w-5 h-5" />
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="sm">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}