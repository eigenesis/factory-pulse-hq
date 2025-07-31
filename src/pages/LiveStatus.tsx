import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { StatusIndicator } from "@/components/dashboard/StatusIndicator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap, Users, Package, RefreshCw } from "lucide-react"

export default function LiveStatus() {
  const systemStatus = {
    overall: 'running' as const,
    lastUpdate: new Date().toLocaleTimeString()
  }

  const liveMetrics = [
    { label: "Production Rate", value: "847 units/hr", status: "running" as const, target: "1000 units/hr" },
    { label: "Energy Consumption", value: "1,247 kWh", status: "running" as const, target: "1,500 kWh max" },
    { label: "Active Operators", value: "12/15", status: "running" as const, target: "15 operators" },
    { label: "Quality Rate", value: "98.7%", status: "running" as const, target: ">95%" }
  ]

  const equipmentStatus = [
    { name: "CNC Machine #1", status: 'running' as const, output: "127/150 parts", efficiency: 94, lastPing: "5s" },
    { name: "CNC Machine #2", status: 'running' as const, output: "142/150 parts", efficiency: 89, lastPing: "3s" },
    { name: "Assembly Robot #1", status: 'running' as const, output: "89/100 assemblies", efficiency: 87, lastPing: "2s" },
    { name: "Assembly Robot #2", status: 'idle' as const, output: "0/100 assemblies", efficiency: 0, lastPing: "1m" },
    { name: "Quality Station", status: 'idle' as const, output: "0/80 inspections", efficiency: 0, lastPing: "15m" },
    { name: "Packaging Line #1", status: 'down' as const, output: "0/200 packages", efficiency: 0, lastPing: "45m" },
    { name: "Conveyor System A", status: 'running' as const, output: "Active", efficiency: 98, lastPing: "1s" },
    { name: "Conveyor System B", status: 'maintenance' as const, output: "Stopped", efficiency: 0, lastPing: "2h" }
  ]

  const networkStatus = [
    { device: "PLC Controller #1", ip: "192.168.1.10", status: "Online", latency: "2ms", uptime: "99.8%" },
    { device: "HMI Station A", ip: "192.168.1.15", status: "Online", latency: "5ms", uptime: "99.2%" },
    { device: "Sensor Network", ip: "192.168.1.20", status: "Online", latency: "1ms", uptime: "99.9%" },
    { device: "Camera System", ip: "192.168.1.25", status: "Warning", latency: "15ms", uptime: "98.1%" },
    { device: "RFID Readers", ip: "192.168.1.30", status: "Online", latency: "3ms", uptime: "99.5%" }
  ]

  const alerts = [
    { time: "14:35", message: "Packaging Line #1 - Conveyor malfunction detected", severity: "critical" },
    { time: "13:42", message: "Temperature sensor reading high on CNC #1", severity: "warning" },
    { time: "12:15", message: "Shift change completed - 12 operators on duty", severity: "info" }
  ]

  return (
    <DashboardLayout 
      title="Live System Status" 
      subtitle="Real-time monitoring of all manufacturing systems and equipment"
    >
      <div className="space-y-6">
        {/* System Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                System Overview
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="text-sm text-muted-foreground">
                  Last Update: {systemStatus.lastUpdate}
                </div>
                <StatusIndicator status={systemStatus.overall} label="System Status" />
                <RefreshCw className="w-4 h-4 text-muted-foreground animate-spin" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {liveMetrics.map((metric, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <StatusIndicator status={metric.status} size="sm" showLabel={false} />
                    <span className="text-sm font-medium">{metric.label}</span>
                  </div>
                  <div className="text-lg font-bold">{metric.value}</div>
                  <div className="text-xs text-muted-foreground">Target: {metric.target}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Equipment Status Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment Status Grid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {equipmentStatus.map((equipment, index) => (
                <div key={index} className="p-3 border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{equipment.name}</h3>
                    <StatusIndicator status={equipment.status} size="sm" showLabel={false} />
                  </div>
                  
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Output:</span>
                      <span className="font-medium">{equipment.output}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Efficiency:</span>
                      <span className="font-medium">{equipment.efficiency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Ping:</span>
                      <span className={`font-medium ${
                        equipment.lastPing.includes('m') || equipment.lastPing.includes('h') 
                          ? 'text-warning' 
                          : 'text-success'
                      }`}>
                        {equipment.lastPing} ago
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Network & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Network Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Network Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {networkStatus.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        device.status === 'Online' ? 'bg-success' : 
                        device.status === 'Warning' ? 'bg-warning' : 'bg-destructive'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{device.device}</p>
                        <p className="text-xs text-muted-foreground">{device.ip}</p>
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <Badge 
                        variant={device.status === 'Online' ? 'default' : 'outline'}
                        className="text-xs mb-1"
                      >
                        {device.status}
                      </Badge>
                      <div className="text-muted-foreground">
                        <div>{device.latency}</div>
                        <div>{device.uptime}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Live Alerts Feed */}
          <Card>
            <CardHeader>
              <CardTitle>Live Alerts Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.severity === 'critical' ? 'bg-destructive animate-pulse' :
                      alert.severity === 'warning' ? 'bg-warning' : 'bg-primary'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium">{alert.time}</span>
                        <Badge 
                          variant={
                            alert.severity === 'critical' ? 'destructive' :
                            alert.severity === 'warning' ? 'outline' : 'secondary'
                          }
                          className="text-xs"
                        >
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Resources */}
        <Card>
          <CardHeader>
            <CardTitle>System Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">87%</div>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '87%' }} />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">64%</div>
                <p className="text-sm text-muted-foreground">Memory Usage</p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '64%' }} />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">45%</div>
                <p className="text-sm text-muted-foreground">Storage Usage</p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '45%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}