import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ThemeToggle"

interface DashboardHeaderProps {
  title: string
  subtitle?: string
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const currentTime = new Date().toLocaleString()

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-3 md:px-6 shadow-sm">
      <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
        <SidebarTrigger className="hover:bg-accent flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <h1 className="text-lg md:text-xl font-bold text-foreground truncate">{title}</h1>
          {subtitle && (
            <p className="text-xs md:text-sm text-muted-foreground truncate">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
        {/* Status Indicator - Hidden on small screens */}
        <div className="hidden lg:flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-muted-foreground">Online</span>
        </div>

        {/* Current Time - Hidden on mobile */}
        <div className="hidden md:block text-sm text-muted-foreground">
          {currentTime}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Alerts */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4 md:w-5 md:h-5" />
          <Badge variant="destructive" className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 text-xs p-0 flex items-center justify-center">
            3
          </Badge>
        </Button>

        {/* User Menu - Hidden on small screens */}
        <Button variant="ghost" size="sm" className="hidden sm:flex">
          <User className="w-4 h-4 md:w-5 md:h-5" />
        </Button>

        {/* Settings - Hidden on small screens */}
        <Button variant="ghost" size="sm" className="hidden sm:flex">
          <Settings className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </div>
    </header>
  )
}