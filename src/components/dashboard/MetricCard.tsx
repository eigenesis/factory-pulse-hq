import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  unit?: string
  trend?: {
    value: number
    label: string
    type: 'positive' | 'negative' | 'neutral'
  }
  status?: 'success' | 'warning' | 'critical' | 'neutral'
  icon?: LucideIcon
  className?: string
}

export function MetricCard({
  title,
  value,
  unit,
  trend,
  status = 'neutral',
  icon: Icon,
  className
}: MetricCardProps) {
  const statusColors = {
    success: 'border-l-success bg-success/5',
    warning: 'border-l-warning bg-warning/5',
    critical: 'border-l-destructive bg-destructive/5',
    neutral: 'border-l-primary bg-primary/5'
  }

  const trendColors = {
    positive: 'text-success',
    negative: 'text-destructive', 
    neutral: 'text-muted-foreground'
  }

  return (
    <Card className={cn(
      "relative border-l-4 transition-all duration-200 hover:shadow-elevated",
      statusColors[status],
      className
    )}>
      <CardContent className="p-3 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm font-medium text-muted-foreground mb-1 truncate">
              {title}
            </p>
            <div className="flex items-baseline gap-1 md:gap-2">
              <span className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground truncate">
                {value}
              </span>
              {unit && (
                <span className="text-xs md:text-sm text-muted-foreground">
                  {unit}
                </span>
              )}
            </div>
            {trend && (
              <div className="flex items-center gap-1 mt-1 md:mt-2">
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", trendColors[trend.type])}
                >
                  {trend.type === 'positive' ? '↗' : trend.type === 'negative' ? '↘' : '→'} 
                  {trend.value}%
                </Badge>
                <span className="text-xs text-muted-foreground truncate">
                  {trend.label}
                </span>
              </div>
            )}
          </div>
          {Icon && (
            <div className="flex-shrink-0">
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}