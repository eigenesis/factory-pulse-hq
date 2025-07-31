import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingDown, AlertTriangle, Wrench, BarChart3, Activity } from "lucide-react"

export default function Downtime() {
  const downtimeMetrics = {
    totalDowntime: 4.2, // hours today
    plannedDowntime: 1.5,
    unplannedDowntime: 2.7,
    availability: 94.8
  }

  const downtimeEvents = [
    {
      equipment: "Packaging Line #1",
      reason: "Conveyor Belt Malfunction",
      type: "Unplanned",
      startTime: "14:35",
      duration: "2h 45m",
      status: "Active",
      impact: "High",
      technician: "John D.",
      estimatedRepair: "1h 30m"
    },
    {
      equipment: "CNC Machine #2",
      reason: "Scheduled Maintenance",
      type: "Planned",
      startTime: "06:00",
      duration: "1h 30m",
      status: "Completed",
      impact: "Medium",
      technician: "Mike R.",
      estimatedRepair: "Completed"
    },
    {
      equipment: "Assembly Robot #1",
      reason: "Software Error",
      type: "Unplanned",
      startTime: "11:20",
      duration: "45m",
      status: "Completed",
      impact: "Low",
      technician: "Sarah M.",
      estimatedRepair: "Completed"
    },
    {
      equipment: "Quality Station",
      reason: "Sensor Calibration",
      type: "Planned",
      startTime: "08:15",
      duration: "30m",
      status: "Completed",
      impact: "Low",
      technician: "Lisa K.",
      estimatedRepair: "Completed"
    }
  ]

  const downtimeCategories = [
    { category: "Equipment Failure", time: 2.1, percentage: 50, color: "bg-destructive" },
    { category: "Planned Maintenance", time: 1.5, percentage: 36, color: "bg-primary" },
    { category: "Material Shortage", time: 0.4, percentage: 10, color: "bg-warning" },
    { category: "Operator Issues", time: 0.2, percentage: 4, color: "bg-muted-foreground" }
  ]

  const monthlyTrend = [
    { month: "Oct", planned: 12, unplanned: 8 },
    { month: "Nov", planned: 15, unplanned: 12 },
    { month: "Dec", planned: 11, unplanned: 6 },
    { month: "Jan", planned: 14, unplanned: 9 }
  ]

  return (
    <DashboardLayout 
      title="Downtime Analysis" 
      subtitle="Equipment downtime tracking and root cause analysis"
    >
      <div className="space-y-6">
        {/* Downtime Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Total Downtime"
            value={downtimeMetrics.totalDowntime}
            unit="hrs"
            status="warning"
            trend={{ value: 1.2, label: 'vs yesterday', type: 'negative' }}
            icon={Clock}
          />
          <MetricCard
            title="Planned Downtime"
            value={downtimeMetrics.plannedDowntime}
            unit="hrs"
            status="neutral"
            icon={Wrench}
          />
          <MetricCard
            title="Unplanned Downtime"
            value={downtimeMetrics.unplannedDowntime}
            unit="hrs"
            status="critical"
            trend={{ value: 0.8, label: 'vs yesterday', type: 'negative' }}
            icon={AlertTriangle}
          />
          <MetricCard
            title="Equipment Availability"
            value={downtimeMetrics.availability}
            unit="%"
            status="success"
            trend={{ value: -0.5, label: 'vs target', type: 'negative' }}
            icon={Activity}
          />
        </div>

        {/* Active Downtime Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Downtime Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {downtimeEvents.map((event, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        event.status === 'Active' ? 'bg-destructive animate-pulse' : 'bg-success'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-sm">{event.equipment}</h3>
                        <p className="text-xs text-muted-foreground">{event.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={event.type === 'Planned' ? 'default' : 'destructive'} className="text-xs">
                        {event.type}
                      </Badge>
                      <Badge 
                        variant={event.status === 'Active' ? 'destructive' : 'secondary'} 
                        className="text-xs"
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Start:</span>
                      <p className="font-medium">{event.startTime}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">{event.duration}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Impact:</span>
                      <Badge 
                        variant={event.impact === 'High' ? 'destructive' : event.impact === 'Medium' ? 'outline' : 'secondary'} 
                        className="text-xs"
                      >
                        {event.impact}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Technician:</span>
                      <p className="font-medium">{event.technician}</p>
                    </div>
                  </div>
                  
                  {event.status === 'Active' && (
                    <div className="mt-3 p-2 bg-warning/10 rounded border">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Estimated Repair Time: </span>
                        <span className="font-medium">{event.estimatedRepair}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Downtime Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Downtime by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Downtime by Category (Today)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {downtimeCategories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{category.category}</span>
                      <span className="text-muted-foreground">{category.time}h ({category.percentage}%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className={`${category.color} rounded-full h-3 transition-all duration-300`}
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                Monthly Downtime Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrend.map((month, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{month.month}</span>
                      <span className="text-muted-foreground">
                        {month.planned + month.unplanned}h total
                      </span>
                    </div>
                    
                    <div className="flex gap-1">
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">Planned: {month.planned}h</div>
                        <Progress value={(month.planned / 25) * 100} className="h-2" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">Unplanned: {month.unplanned}h</div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-destructive rounded-full h-2"
                            style={{ width: `${(month.unplanned / 25) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MTTR & MTBF */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Mean Time To Repair (MTTR)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2.3 hours</div>
                <p className="text-sm text-muted-foreground">Average repair time</p>
                <div className="mt-4 text-xs">
                  <Badge variant="outline" className="text-success">
                    ↓ 0.3h vs last month
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Mean Time Between Failures (MTBF)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">147 hours</div>
                <p className="text-sm text-muted-foreground">Average uptime between failures</p>
                <div className="mt-4 text-xs">
                  <Badge variant="outline" className="text-success">
                    ↑ 12h vs last month
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}