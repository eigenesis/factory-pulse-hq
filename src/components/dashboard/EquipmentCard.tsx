import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusIndicator } from "./StatusIndicator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface EquipmentCardProps {
  name: string
  line: string
  status: 'running' | 'idle' | 'down' | 'maintenance'
  efficiency: number
  output: {
    current: number
    target: number
    unit: string
  }
  lastUpdate: string
  alerts?: number
}

export function EquipmentCard({
  name,
  line,
  status,
  efficiency,
  output,
  lastUpdate,
  alerts = 0
}: EquipmentCardProps) {
  const progressColor = efficiency >= 85 ? 'bg-success' : efficiency >= 70 ? 'bg-warning' : 'bg-destructive'

  return (
    <Card className="transition-all duration-200 hover:shadow-elevated">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <p className="text-sm text-muted-foreground">{line}</p>
          </div>
          <div className="flex items-center gap-2">
            {alerts > 0 && (
              <Badge variant="destructive" className="text-xs">
                {alerts} Alert{alerts > 1 ? 's' : ''}
              </Badge>
            )}
            <StatusIndicator status={status} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Efficiency */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Efficiency</span>
            <span className="font-medium">{efficiency}%</span>
          </div>
          <Progress value={efficiency} className="h-2" />
        </div>

        {/* Output */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Output</span>
            <span className="font-medium">
              {output.current}/{output.target} {output.unit}
            </span>
          </div>
          <Progress 
            value={(output.current / output.target) * 100} 
            className="h-2"
          />
        </div>

        {/* Last Update */}
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Last Update</span>
          <span className="text-muted-foreground">{lastUpdate}</span>
        </div>
      </CardContent>
    </Card>
  )
}