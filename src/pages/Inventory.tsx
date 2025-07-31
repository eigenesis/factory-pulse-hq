import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, AlertTriangle, TrendingDown, Truck, BarChart3, RefreshCw } from "lucide-react"

export default function Inventory() {
  const inventoryMetrics = {
    totalItems: 1247,
    lowStock: 23,
    outOfStock: 7,
    inTransit: 156
  }

  const criticalItems = [
    { name: "Steel Plates 10mm", current: 45, minimum: 100, maximum: 500, status: "Critical", location: "Warehouse A" },
    { name: "Aluminum Rods", current: 12, minimum: 50, maximum: 300, status: "Critical", location: "Warehouse B" },
    { name: "Copper Wire 2mm", current: 78, minimum: 75, maximum: 400, status: "Low", location: "Warehouse A" },
    { name: "Plastic Pellets", current: 234, minimum: 200, maximum: 800, status: "Low", location: "Warehouse C" },
  ]

  const categories = [
    { name: "Raw Materials", count: 450, value: "$1,234,567", turnover: 85 },
    { name: "Components", count: 623, value: "$856,432", turnover: 92 },
    { name: "Finished Goods", count: 174, value: "$2,145,890", turnover: 78 },
  ]

  const recentMovements = [
    { item: "Steel Plates 10mm", type: "OUT", quantity: 25, time: "2 hours ago", order: "WO-2024-001" },
    { item: "Aluminum Rods", type: "OUT", quantity: 15, time: "3 hours ago", order: "WO-2024-002" },
    { item: "Copper Wire 2mm", type: "IN", quantity: 100, time: "5 hours ago", order: "PO-2024-156" },
    { item: "Plastic Pellets", type: "OUT", quantity: 50, time: "1 day ago", order: "WO-2024-003" },
  ]

  return (
    <DashboardLayout 
      title="Inventory Management" 
      subtitle="Real-time stock levels and material flow tracking"
    >
      <div className="space-y-6">
        {/* Inventory Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Total Items"
            value={inventoryMetrics.totalItems.toLocaleString()}
            status="neutral"
            icon={Package}
          />
          <MetricCard
            title="Low Stock Items"
            value={inventoryMetrics.lowStock}
            status="warning"
            trend={{ value: 12, label: 'vs last week', type: 'negative' }}
            icon={TrendingDown}
          />
          <MetricCard
            title="Out of Stock"
            value={inventoryMetrics.outOfStock}
            status="critical"
            trend={{ value: 3, label: 'vs yesterday', type: 'positive' }}
            icon={AlertTriangle}
          />
          <MetricCard
            title="In Transit"
            value={inventoryMetrics.inTransit}
            status="neutral"
            icon={Truck}
          />
        </div>

        {/* Critical Stock Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Critical Stock Alerts
              </CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalItems.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                    </div>
                    <Badge variant={item.status === 'Critical' ? 'destructive' : 'outline'} className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current Stock</span>
                      <span className="font-medium">{item.current} units</span>
                    </div>
                    
                    <div className="relative">
                      <Progress value={(item.current / item.maximum) * 100} className="h-3" />
                      <div 
                        className="absolute top-0 h-3 w-0.5 bg-warning"
                        style={{ left: `${(item.minimum / item.maximum) * 100}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Min: {item.minimum}</span>
                      <span>Max: {item.maximum}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="text-xs">
                      Reorder
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories & Recent Movements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inventory Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Inventory Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{category.name}</h3>
                      <span className="text-sm font-medium">{category.count} items</span>
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Value: {category.value}</span>
                      <span>Turnover: {category.turnover}%</span>
                    </div>
                    
                    <Progress value={category.turnover} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Movements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Stock Movements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMovements.map((movement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${movement.type === 'IN' ? 'bg-success' : 'bg-warning'}`} />
                      <div>
                        <p className="font-medium text-sm">{movement.item}</p>
                        <p className="text-xs text-muted-foreground">{movement.order}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {movement.type === 'IN' ? '+' : '-'}{movement.quantity}
                      </p>
                      <p className="text-xs text-muted-foreground">{movement.time}</p>
                    </div>
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