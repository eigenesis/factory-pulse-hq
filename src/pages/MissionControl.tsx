import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { EquipmentCard } from "@/components/dashboard/EquipmentCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  Package,
  Users,
  Zap
} from "lucide-react"

export default function MissionControl() {
  // Mock real-time data
  const overallMetrics = {
    oee: 87.3,
    production: { current: 2847, target: 3200, unit: 'units' },
    efficiency: 91.2,
    quality: 98.7,
    uptime: 94.8
  }

  const equipmentData = [
    {
      name: "Line A - Assembly",
      line: "Production Line A",
      status: 'running' as const,
      efficiency: 89,
      output: { current: 847, target: 1000, unit: 'units' },
      lastUpdate: "2 min ago",
      alerts: 0
    },
    {
      name: "Line B - Packaging",
      line: "Production Line B", 
      status: 'idle' as const,
      efficiency: 76,
      output: { current: 623, target: 800, unit: 'units' },
      lastUpdate: "5 min ago",
      alerts: 1
    },
    {
      name: "Line C - Quality Check",
      line: "Production Line C",
      status: 'down' as const,
      efficiency: 0,
      output: { current: 0, target: 600, unit: 'units' },
      lastUpdate: "23 min ago",
      alerts: 3
    },
    {
      name: "Line D - Final Assembly",
      line: "Production Line D",
      status: 'maintenance' as const,
      efficiency: 0,
      output: { current: 0, target: 800, unit: 'units' },
      lastUpdate: "1 hour ago",
      alerts: 0
    }
  ]

  const criticalAlerts = [
    { id: 1, severity: 'critical', message: 'Line C: Conveyor belt malfunction detected', time: '23 min ago' },
    { id: 2, severity: 'warning', message: 'Line B: Temperature sensor reading high', time: '35 min ago' },
    { id: 3, severity: 'critical', message: 'Inventory: Raw material steel plates below minimum', time: '1 hour ago' },
  ]

  return (
    <DashboardLayout 
      title="Mission Control" 
      subtitle="Real-time manufacturing overview and critical operations monitoring"
    >
      <div className="space-y-6">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            title="Overall OEE"
            value={overallMetrics.oee}
            unit="%"
            status={overallMetrics.oee >= 85 ? 'success' : overallMetrics.oee >= 75 ? 'warning' : 'critical'}
            trend={{ value: 2.3, label: 'vs yesterday', type: 'positive' }}
            icon={Target}
          />
          <MetricCard
            title="Production Output"
            value={overallMetrics.production.current.toLocaleString()}
            unit="units"
            status={overallMetrics.production.current >= overallMetrics.production.target * 0.9 ? 'success' : 'warning'}
            trend={{ value: 5.2, label: 'vs target', type: 'negative' }}
            icon={Activity}
          />
          <MetricCard
            title="Efficiency"
            value={overallMetrics.efficiency}
            unit="%"
            status="success"
            trend={{ value: 1.8, label: 'vs last week', type: 'positive' }}
            icon={TrendingUp}
          />
          <MetricCard
            title="Quality Rate"
            value={overallMetrics.quality}
            unit="%"
            status="success"
            trend={{ value: 0.3, label: 'vs yesterday', type: 'positive' }}
            icon={Package}
          />
          <MetricCard
            title="Uptime"
            value={overallMetrics.uptime}
            unit="%"
            status={overallMetrics.uptime >= 95 ? 'success' : 'warning'}
            trend={{ value: 2.1, label: 'vs last month', type: 'negative' }}
            icon={Clock}
          />
        </div>

        {/* Production Lines Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {equipmentData.map((equipment, index) => (
            <EquipmentCard key={index} {...equipment} />
          ))}
        </div>

        {/* Bottom Row - Alerts and Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Critical Alerts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Critical Alerts & Actions Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {criticalAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.severity === 'critical' ? 'bg-destructive' : 'bg-warning'
                  } animate-pulse`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {alert.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.time}
                    </p>
                  </div>
                  <Badge variant={alert.severity === 'critical' ? 'destructive' : 'outline'} className="text-xs">
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Production Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Today's Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Shift Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Shift Progress</span>
                  <span className="font-medium">6h 23m / 8h</span>
                </div>
                <Progress value={79} className="h-2" />
              </div>

              {/* Energy Consumption */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-warning" />
                  <span className="text-sm text-muted-foreground">Energy</span>
                </div>
                <span className="text-sm font-medium">847 kWh</span>
              </div>

              {/* Active Operators */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Operators</span>
                </div>
                <span className="text-sm font-medium">12 / 15</span>
              </div>

              {/* Completed Orders */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-success" />
                  <span className="text-sm text-muted-foreground">Orders</span>
                </div>
                <span className="text-sm font-medium">23 / 31</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}