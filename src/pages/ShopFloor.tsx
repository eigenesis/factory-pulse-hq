import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EquipmentCard } from "@/components/dashboard/EquipmentCard"
import { StatusIndicator } from "@/components/dashboard/StatusIndicator"
import { ShopFloorBlueprint } from "@/components/dashboard/ShopFloorBlueprint"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, AlertTriangle, Settings, RefreshCw } from "lucide-react"

export default function ShopFloor() {
  const shopFloorData = [
    {
      name: "CNC Machine #1",
      line: "Machining Station 1",
      status: 'running' as const,
      efficiency: 94,
      output: { current: 127, target: 150, unit: 'parts' },
      lastUpdate: "30 sec ago",
      alerts: 0,
      operator: "John D.",
      nextMaintenance: "2 days"
    },
    {
      name: "Assembly Robot #2",
      line: "Assembly Station A",
      status: 'running' as const,
      efficiency: 87,
      output: { current: 89, target: 100, unit: 'assemblies' },
      lastUpdate: "1 min ago", 
      alerts: 1,
      operator: "Sarah M.",
      nextMaintenance: "5 days"
    },
    {
      name: "Quality Inspection",
      line: "QC Station 1",
      status: 'idle' as const,
      efficiency: 0,
      output: { current: 0, target: 80, unit: 'inspections' },
      lastUpdate: "15 min ago",
      alerts: 0,
      operator: "Mike R.",
      nextMaintenance: "1 day"
    },
    {
      name: "Packaging Line #1",
      line: "Packaging Station",
      status: 'down' as const,
      efficiency: 0,
      output: { current: 0, target: 200, unit: 'packages' },
      lastUpdate: "45 min ago",
      alerts: 2,
      operator: "Lisa K.",
      nextMaintenance: "Overdue"
    }
  ]

  const workOrders = [
    { id: "WO-2024-001", product: "Widget Type A", quantity: 500, priority: "High", status: "In Progress" },
    { id: "WO-2024-002", product: "Widget Type B", quantity: 300, priority: "Medium", status: "Queued" },
    { id: "WO-2024-003", product: "Widget Type C", quantity: 150, priority: "Low", status: "Completed" },
  ]

  return (
    <DashboardLayout 
      title="Shop Floor Control" 
      subtitle="Real-time equipment monitoring and operator interface"
    >
      <div className="space-y-6">
        {/* Shop Floor Blueprint */}
        <ShopFloorBlueprint />
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Play className="w-4 h-4" />
                Start All Lines
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Pause className="w-4 h-4" />
                Emergency Stop
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <AlertTriangle className="w-4 h-4" />
                Report Issue
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {shopFloorData.map((equipment, index) => (
            <Card key={index} className="transition-all duration-200 hover:shadow-elevated">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">{equipment.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{equipment.line}</p>
                  </div>
                  <StatusIndicator status={equipment.status} />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Operator & Status */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Operator:</span>
                    <p className="font-medium">{equipment.operator}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next Maintenance:</span>
                    <p className={`font-medium ${equipment.nextMaintenance === 'Overdue' ? 'text-destructive' : ''}`}>
                      {equipment.nextMaintenance}
                    </p>
                  </div>
                </div>

                {/* Output Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Current Output</span>
                    <span className="font-medium">
                      {equipment.output.current}/{equipment.output.target} {equipment.output.unit}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2 transition-all duration-300" 
                      style={{ width: `${(equipment.output.current / equipment.output.target) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Alerts & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {equipment.alerts > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {equipment.alerts} Alert{equipment.alerts > 1 ? 's' : ''}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      Updated {equipment.lastUpdate}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      Control
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Work Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Active Work Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {workOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.product}</p>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Qty: </span>
                      <span className="font-medium">{order.quantity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={order.priority === 'High' ? 'destructive' : order.priority === 'Medium' ? 'outline' : 'secondary'}
                      className="text-xs"
                    >
                      {order.priority}
                    </Badge>
                    <Badge 
                      variant={order.status === 'In Progress' ? 'default' : order.status === 'Completed' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {order.status}
                    </Badge>
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