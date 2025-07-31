import { cn } from "@/lib/utils"

interface StatusIndicatorProps {
  status: 'running' | 'idle' | 'down' | 'maintenance'
  label?: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function StatusIndicator({ 
  status, 
  label, 
  size = 'md', 
  showLabel = true,
  className 
}: StatusIndicatorProps) {
  const statusConfig = {
    running: {
      color: 'bg-equipment-running',
      label: label || 'Running',
      animate: 'animate-pulse'
    },
    idle: {
      color: 'bg-equipment-idle',
      label: label || 'Idle',
      animate: ''
    },
    down: {
      color: 'bg-equipment-down',
      label: label || 'Down',
      animate: 'animate-pulse'
    },
    maintenance: {
      color: 'bg-equipment-maintenance',
      label: label || 'Maintenance',
      animate: ''
    }
  }

  const sizeConfig = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  const config = statusConfig[status]

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div 
        className={cn(
          "rounded-full",
          config.color,
          config.animate,
          sizeConfig[size]
        )}
      />
      {showLabel && (
        <span className="text-sm font-medium text-foreground">
          {config.label}
        </span>
      )}
    </div>
  )
}