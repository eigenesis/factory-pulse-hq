import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Activity, Shield, Clock, TrendingUp, BarChart3 } from "lucide-react"

export default function OEEAnalytics() {
  // OEE Components: Availability × Performance × Quality
  const oeeData = {
    overall: 87.3,
    availability: 94.8, // Uptime / Planned Production Time
    performance: 91.2,  // Actual Output / Expected Output
    quality: 98.7      // Good Units / Total Units
  }

  const lineOEE = [
    { name: "Line A", availability: 96.2, performance: 89.1, quality: 99.2, overall: 85.1 },
    { name: "Line B", availability: 92.8, performance: 94.3, quality: 98.9, overall: 86.5 },
    { name: "Line C", availability: 89.4, performance: 87.6, quality: 97.8, overall: 76.5 },
    { name: "Line D", availability: 98.1, performance: 93.8, quality: 99.1, overall: 91.2 }
  ]

  const downtimeReasons = [
    { reason: "Changeover/Setup", time: 45, percentage: 35 },
    { reason: "Equipment Failure", time: 28, percentage: 22 },
    { reason: "Material Shortage", time: 23, percentage: 18 },
    { reason: "Quality Issues", time: 18, percentage: 14 },
    { reason: "Operator Break", time: 14, percentage: 11 }
  ]

  const productionTargets = {
    daily: { actual: 2847, target: 3200, percentage: 89 },
    weekly: { actual: 18234, target: 20000, percentage: 91 },
    monthly: { actual: 76432, target: 85000, percentage: 90 }
  }

  return (
    <DashboardLayout 
      title="OEE Analytics" 
      subtitle="Overall Equipment Effectiveness analysis and performance metrics"
    >
      <div className="space-y-6">
        {/* OEE Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Overall OEE"
            value={oeeData.overall}
            unit="%"
            status={oeeData.overall >= 85 ? 'success' : oeeData.overall >= 75 ? 'warning' : 'critical'}
            trend={{ value: 2.3, label: 'vs last week', type: 'positive' }}
            icon={Target}
          />
          <MetricCard
            title="Availability"
            value={oeeData.availability}
            unit="%"
            status={oeeData.availability >= 90 ? 'success' : 'warning'}
            trend={{ value: 1.2, label: 'vs last week', type: 'positive' }}
            icon={Clock}
          />
          <MetricCard
            title="Performance"
            value={oeeData.performance}
            unit="%"
            status={oeeData.performance >= 85 ? 'success' : 'warning'}
            trend={{ value: 3.1, label: 'vs last week', type: 'positive' }}
            icon={Activity}
          />
          <MetricCard
            title="Quality"
            value={oeeData.quality}
            unit="%"
            status={oeeData.quality >= 95 ? 'success' : 'warning'}
            trend={{ value: 0.5, label: 'vs last week', type: 'positive' }}
            icon={Shield}
          />
        </div>

        {/* Production Line OEE Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Production Line OEE Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {lineOEE.map((line, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{line.name}</h3>
                    <Badge 
                      variant={line.overall >= 85 ? 'default' : line.overall >= 75 ? 'secondary' : 'destructive'}
                      className="text-sm"
                    >
                      {line.overall}% OEE
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Availability */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Availability</span>
                        <span className="font-medium">{line.availability}%</span>
                      </div>
                      <Progress value={line.availability} className="h-2" />
                    </div>
                    
                    {/* Performance */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Performance</span>
                        <span className="font-medium">{line.performance}%</span>
                      </div>
                      <Progress value={line.performance} className="h-2" />
                    </div>
                    
                    {/* Quality */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Quality</span>
                        <span className="font-medium">{line.quality}%</span>
                      </div>
                      <Progress value={line.quality} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Downtime Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Top Downtime Reasons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {downtimeReasons.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{item.reason}</span>
                        <span className="text-muted-foreground">{item.time} min</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Production Targets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Production vs Targets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Daily */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Daily Target</span>
                  <span className="font-medium">
                    {productionTargets.daily.actual.toLocaleString()} / {productionTargets.daily.target.toLocaleString()}
                  </span>
                </div>
                <Progress value={productionTargets.daily.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {productionTargets.daily.percentage}% of target achieved
                </p>
              </div>

              {/* Weekly */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Weekly Target</span>
                  <span className="font-medium">
                    {productionTargets.weekly.actual.toLocaleString()} / {productionTargets.weekly.target.toLocaleString()}
                  </span>
                </div>
                <Progress value={productionTargets.weekly.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {productionTargets.weekly.percentage}% of target achieved
                </p>
              </div>

              {/* Monthly */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Monthly Target</span>
                  <span className="font-medium">
                    {productionTargets.monthly.actual.toLocaleString()} / {productionTargets.monthly.target.toLocaleString()}
                  </span>
                </div>
                <Progress value={productionTargets.monthly.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {productionTargets.monthly.percentage}% of target achieved
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}