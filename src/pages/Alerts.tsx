import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, XCircle, Activity, RefreshCw, Filter } from "lucide-react"

export default function Alerts() {
  const alertSummary = {
    critical: 5,
    warning: 12,
    info: 8,
    total: 25
  }

  const alerts = [
    {
      id: 1,
      severity: 'critical',
      title: 'Line C Conveyor Belt Malfunction',
      message: 'Conveyor belt has stopped moving. Production halted on Line C.',
      equipment: 'Packaging Line #1',
      timestamp: '23 minutes ago',
      acknowledged: false,
      assignedTo: 'John D.'
    },
    {
      id: 2,
      severity: 'critical',
      title: 'Raw Material Steel Plates Critical Low',
      message: 'Steel plates inventory below critical threshold (45/100 units)',
      equipment: 'Warehouse A',
      timestamp: '1 hour ago',
      acknowledged: true,
      assignedTo: 'Sarah M.'
    },
    {
      id: 3,
      severity: 'warning',
      title: 'Temperature Sensor Reading High',
      message: 'CNC Machine #1 operating temperature exceeds normal range (85°C)',
      equipment: 'CNC Machine #1',
      timestamp: '35 minutes ago',
      acknowledged: false,
      assignedTo: 'Mike R.'
    },
    {
      id: 4,
      severity: 'warning',
      title: 'Planned Maintenance Due',
      message: 'Assembly Robot #2 scheduled maintenance due in 2 days',
      equipment: 'Assembly Robot #2',
      timestamp: '2 hours ago',
      acknowledged: true,
      assignedTo: 'Lisa K.'
    },
    {
      id: 5,
      severity: 'info',
      title: 'Shift Change Notification',
      message: 'Evening shift started. 12 operators on duty.',
      equipment: 'General',
      timestamp: '3 hours ago',
      acknowledged: true,
      assignedTo: 'System'
    },
    {
      id: 6,
      severity: 'critical',
      title: 'Quality Check Failed',
      message: 'Batch BT-2024-157 failed quality inspection - 3 defects found',
      equipment: 'Quality Station',
      timestamp: '4 hours ago',
      acknowledged: false,
      assignedTo: 'Mike R.'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive'
      case 'warning': return 'outline'
      case 'info': return 'secondary'
      default: return 'secondary'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'info': return <Activity className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  return (
    <DashboardLayout 
      title="Alert Management" 
      subtitle="Real-time monitoring and alert response system"
    >
      <div className="space-y-6">
        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-destructive bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Critical Alerts</p>
                  <p className="text-2xl font-bold text-destructive">{alertSummary.critical}</p>
                </div>
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning bg-warning/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Warning Alerts</p>
                  <p className="text-2xl font-bold text-warning">{alertSummary.warning}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Info Alerts</p>
                  <p className="text-2xl font-bold text-primary">{alertSummary.info}</p>
                </div>
                <Activity className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-muted bg-muted/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Active</p>
                  <p className="text-2xl font-bold text-foreground">{alertSummary.total}</p>
                </div>
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Actions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Alert Actions</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
                <Button size="sm" className="gap-2">
                  Acknowledge All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Button variant="outline" size="sm">All ({alertSummary.total})</Button>
              <Button variant="outline" size="sm">Critical ({alertSummary.critical})</Button>
              <Button variant="outline" size="sm">Warnings ({alertSummary.warning})</Button>
              <Button variant="outline" size="sm">Info ({alertSummary.info})</Button>
              <Button variant="outline" size="sm">Unacknowledged</Button>
            </div>
          </CardContent>
        </Card>

        {/* Alert List */}
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-sm ${
                    !alert.acknowledged ? 'bg-muted/50 border-l-4' : 'bg-muted/20'
                  } ${
                    alert.severity === 'critical' && !alert.acknowledged ? 'border-l-destructive' :
                    alert.severity === 'warning' && !alert.acknowledged ? 'border-l-warning' :
                    alert.severity === 'info' && !alert.acknowledged ? 'border-l-primary' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-0.5">
                        {getSeverityIcon(alert.severity)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{alert.title}</h3>
                          <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                            {alert.severity.toUpperCase()}
                          </Badge>
                          {alert.acknowledged && (
                            <Badge variant="outline" className="text-xs">
                              Acknowledged
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Equipment: {alert.equipment}</span>
                          <span>Assigned: {alert.assignedTo}</span>
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      {!alert.acknowledged && (
                        <Button size="sm" variant="outline" className="text-xs">
                          Acknowledge
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="text-xs">
                        View Details
                      </Button>
                      {alert.severity === 'critical' && (
                        <Button size="sm" variant="destructive" className="text-xs">
                          Escalate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}