import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Target, TrendingUp, Calendar, Users, Clock } from "lucide-react"

export default function DailyProduction() {
  const dailyMetrics = {
    target: 3200,
    actual: 2847,
    efficiency: 89,
    shifts: [
      { name: "Night Shift", target: 800, actual: 823, efficiency: 103 },
      { name: "Day Shift", target: 1600, actual: 1524, efficiency: 95 },
      { name: "Evening Shift", target: 800, actual: 500, efficiency: 63, current: true }
    ]
  }

  const productionLines = [
    { line: "Line A", target: 1000, actual: 847, efficiency: 85, status: "On Track" },
    { line: "Line B", target: 800, actual: 623, efficiency: 78, status: "Behind" },
    { line: "Line C", target: 600, actual: 0, efficiency: 0, status: "Down" },
    { line: "Line D", target: 800, actual: 1377, efficiency: 172, status: "Ahead" }
  ]

  const hourlyProduction = [
    { hour: "06:00", target: 200, actual: 187 },
    { hour: "07:00", target: 200, actual: 203 },
    { hour: "08:00", target: 200, actual: 195 },
    { hour: "09:00", target: 200, actual: 208 },
    { hour: "10:00", target: 200, actual: 184 },
    { hour: "11:00", target: 200, actual: 198 },
    { hour: "12:00", target: 200, actual: 176 },
    { hour: "13:00", target: 200, actual: 189 },
  ]

  return (
    <DashboardLayout 
      title="Daily Production" 
      subtitle="Shift performance tracking and production targets"
    >
      <div className="space-y-6">
        {/* Daily Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Daily Target"
            value={dailyMetrics.target.toLocaleString()}
            unit="units"
            status="neutral"
            icon={Target}
          />
          <MetricCard
            title="Actual Output"
            value={dailyMetrics.actual.toLocaleString()}
            unit="units"
            status={dailyMetrics.actual >= dailyMetrics.target * 0.9 ? 'success' : 'warning'}
            trend={{ value: -11, label: 'vs target', type: 'negative' }}
            icon={BarChart3}
          />
          <MetricCard
            title="Overall Efficiency"
            value={dailyMetrics.efficiency}
            unit="%"
            status={dailyMetrics.efficiency >= 85 ? 'success' : 'warning'}
            trend={{ value: 3.2, label: 'vs yesterday', type: 'positive' }}
            icon={TrendingUp}
          />
          <MetricCard
            title="Current Shift"
            value="Evening"
            status="warning"
            trend={{ value: -37, label: 'vs target', type: 'negative' }}
            icon={Clock}
          />
        </div>

        {/* Shift Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Shift Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyMetrics.shifts.map((shift, index) => (
                <div key={index} className={`p-4 rounded-lg border ${shift.current ? 'bg-primary/5 border-primary' : 'bg-muted/30'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{shift.name}</h3>
                      {shift.current && <Badge variant="default" className="text-xs">Current</Badge>}
                    </div>
                    <Badge 
                      variant={shift.efficiency >= 100 ? 'default' : shift.efficiency >= 85 ? 'secondary' : 'destructive'}
                      className="text-sm"
                    >
                      {shift.efficiency}% Efficiency
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Target: </span>
                      <span className="font-medium">{shift.target}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Actual: </span>
                      <span className="font-medium">{shift.actual}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Variance: </span>
                      <span className={`font-medium ${shift.actual >= shift.target ? 'text-success' : 'text-destructive'}`}>
                        {shift.actual >= shift.target ? '+' : ''}{shift.actual - shift.target}
                      </span>
                    </div>
                  </div>
                  
                  <Progress value={(shift.actual / shift.target) * 100} className="h-2 mt-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Production Lines & Hourly Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Production Lines */}
          <Card>
            <CardHeader>
              <CardTitle>Production Line Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productionLines.map((line, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                    <div>
                      <p className="font-medium">{line.line}</p>
                      <p className="text-sm text-muted-foreground">
                        {line.actual} / {line.target} units
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={line.status === 'Ahead' ? 'default' : line.status === 'On Track' ? 'secondary' : 'destructive'}
                        className="text-xs mb-1"
                      >
                        {line.status}
                      </Badge>
                      <p className="text-sm font-medium">{line.efficiency}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hourly Production */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Hourly Production Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hourlyProduction.map((hour, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium w-16">{hour.hour}</span>
                    <div className="flex-1 mx-4">
                      <Progress value={(hour.actual / hour.target) * 100} className="h-2" />
                    </div>
                    <span className="text-sm text-muted-foreground w-20 text-right">
                      {hour.actual}/{hour.target}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}