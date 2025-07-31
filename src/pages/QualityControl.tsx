import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, TrendingDown, AlertTriangle, CheckCircle, XCircle, BarChart3 } from "lucide-react"

export default function QualityControl() {
  const qualityMetrics = {
    firstPassYield: 98.7,
    defectRate: 1.3,
    customerComplaints: 2,
    qualityScore: 96.8
  }

  const qualityTests = [
    { name: "Dimensional Check", passed: 847, failed: 8, rate: 99.1, status: "Excellent" },
    { name: "Surface Finish", passed: 823, failed: 12, rate: 98.6, status: "Good" },
    { name: "Material Strength", passed: 834, failed: 4, rate: 99.5, status: "Excellent" },
    { name: "Visual Inspection", passed: 798, failed: 23, rate: 97.2, status: "Good" },
  ]

  const defectCategories = [
    { category: "Surface Defects", count: 15, percentage: 45, trend: -2.3 },
    { category: "Dimensional Issues", count: 8, percentage: 24, trend: 1.2 },
    { category: "Material Flaws", count: 6, percentage: 18, trend: -0.8 },
    { category: "Assembly Errors", count: 4, percentage: 13, trend: 0.5 },
  ]

  const inspectionResults = [
    { batch: "BT-2024-156", product: "Widget Type A", inspector: "Sarah M.", result: "Pass", defects: 0, time: "30 min ago" },
    { batch: "BT-2024-157", product: "Widget Type B", inspector: "Mike R.", result: "Fail", defects: 3, time: "1 hour ago" },
    { batch: "BT-2024-158", product: "Widget Type C", inspector: "Lisa K.", result: "Pass", defects: 1, time: "2 hours ago" },
    { batch: "BT-2024-159", product: "Widget Type A", inspector: "John D.", result: "Pass", defects: 0, time: "3 hours ago" },
  ]

  const complianceChecks = [
    { standard: "ISO 9001", compliance: 98, lastAudit: "2024-01-15", status: "Compliant" },
    { standard: "ISO 14001", compliance: 95, lastAudit: "2024-01-20", status: "Compliant" },
    { standard: "OHSAS 18001", compliance: 97, lastAudit: "2024-01-25", status: "Compliant" },
  ]

  return (
    <DashboardLayout 
      title="Quality Control" 
      subtitle="Quality assurance monitoring and compliance tracking"
    >
      <div className="space-y-6">
        {/* Quality Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="First Pass Yield"
            value={qualityMetrics.firstPassYield}
            unit="%"
            status="success"
            trend={{ value: 0.3, label: 'vs last week', type: 'positive' }}
            icon={CheckCircle}
          />
          <MetricCard
            title="Defect Rate"
            value={qualityMetrics.defectRate}
            unit="%"
            status="success"
            trend={{ value: -0.2, label: 'vs last week', type: 'positive' }}
            icon={TrendingDown}
          />
          <MetricCard
            title="Customer Complaints"
            value={qualityMetrics.customerComplaints}
            status="success"
            trend={{ value: -1, label: 'vs last month', type: 'positive' }}
            icon={AlertTriangle}
          />
          <MetricCard
            title="Quality Score"
            value={qualityMetrics.qualityScore}
            unit="%"
            status="success"
            trend={{ value: 1.2, label: 'vs last month', type: 'positive' }}
            icon={Shield}
          />
        </div>

        {/* Quality Tests & Defect Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quality Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Quality Test Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qualityTests.map((test, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{test.name}</h3>
                      <Badge 
                        variant={test.status === 'Excellent' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {test.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm mb-2">
                      <div>
                        <span className="text-success">✓ {test.passed}</span>
                      </div>
                      <div>
                        <span className="text-destructive">✗ {test.failed}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{test.rate}%</span>
                      </div>
                    </div>
                    
                    <Progress value={test.rate} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Defect Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Defect Category Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {defectCategories.map((defect, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{defect.category}</span>
                        <span className="text-muted-foreground">{defect.count} defects</span>
                      </div>
                      <Progress value={defect.percentage} className="h-2" />
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-muted-foreground">{defect.percentage}% of total</span>
                        <span className={`${defect.trend > 0 ? 'text-destructive' : 'text-success'}`}>
                          {defect.trend > 0 ? '+' : ''}{defect.trend}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Inspections & Compliance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Inspections */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Inspection Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inspectionResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${result.result === 'Pass' ? 'bg-success' : 'bg-destructive'}`} />
                      <div>
                        <p className="font-medium text-sm">{result.batch}</p>
                        <p className="text-xs text-muted-foreground">{result.product}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        {result.result === 'Pass' ? 
                          <CheckCircle className="w-4 h-4 text-success" /> : 
                          <XCircle className="w-4 h-4 text-destructive" />
                        }
                        <Badge variant={result.result === 'Pass' ? 'default' : 'destructive'} className="text-xs">
                          {result.result}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{result.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compliance Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Compliance Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceChecks.map((check, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{check.standard}</h3>
                      <Badge variant="default" className="text-xs">
                        {check.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Compliance Rate</span>
                        <span className="font-medium">{check.compliance}%</span>
                      </div>
                      <Progress value={check.compliance} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        Last Audit: {check.lastAudit}
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline" className="text-xs mt-2">
                      View Report
                    </Button>
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